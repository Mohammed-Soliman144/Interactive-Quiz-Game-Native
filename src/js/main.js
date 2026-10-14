import { header, startQuizBtn } from "./selectors.js"
import { attachEvent, updateLocalStorage } from "./utils.js"
import { fetchQuestions, quizState } from "./state.js"
import { renderResultSection, intializeApp } from "./ui.js"
import { restartQuiz } from "./events.js"

/**
 * start quiz functionality
 * @returns {void}
 */
function startQuiz() {
    if(!header) return
    // disabled to avoid many times fetch api at once
    startQuizBtn.disabled = true
    // remove active class from header
    header.classList.remove("active")
    // add active class from header
    header.classList.add("inactive")
    // update quiz state
    quizState.status = "in-progress"
    // update localStorage
    updateLocalStorage()
}


/**
 * helper method to attach handler function with event to any element
 * attach start Quiz and Fetch question from api when clicked on startQuizBtn
 */
attachEvent(startQuizBtn, "click", async () => {
    startQuiz()
    fetchQuestions()
})



function loadContent() {
    document.addEventListener("DOMContentLoaded", () => {
        if(typeof(window) === "undefined") return
        const {hashIdData} = quizState
        const item = JSON.parse(localStorage.getItem(hashIdData))
        if(!item) return
        const {curQuesIdx, lastIdxAnswered, currScore, questions, status} = item
        
        if(lastIdxAnswered === curQuesIdx - 1 && curQuesIdx === questions.length){
            if(status !== "idle" && status !== "finished") {
                console.log("1")
                renderResultSection()
                restartQuiz()
                return
            }     
            if(status === "finished") {
                console.log("2")
                // restart Quiz
                restartQuiz()
                return
            }
        } 
        if(!curQuesIdx && !lastIdxAnswered) {
            console.log("3")
            // restart Quiz => status => finished
            // start quiz => status => in-progress
            // each question processed => status => curQuesIdx 
            // open quiz for first time || reset quiz => status => idle
            quizState.curQuesIdx = curQuesIdx
            quizState.lastIdxAnswered = lastIdxAnswered
            quizState.currScore = currScore
            quizState.questionLength = questions.length
            startQuiz()
            intializeApp()
        }
    })


    window.addEventListener("storage", (e) => {
        if(e.key === localStorage.getItem(quizState.hashIdData) && e.newValue) {
            localStorage.setItem(quizState.hashIdData, JSON.stringify(e.newValue))
            console.log(e.newValue)
        }
    })
}


loadContent()