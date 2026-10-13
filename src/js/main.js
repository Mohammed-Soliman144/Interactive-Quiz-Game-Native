import { header, startQuizBtn } from "./selectors.js"
import { attachEvent, upateLocalStorage } from "./utils.js"
import { fetchQuestions, quizState } from "./state.js"
import { container, tempQuizSec } from "./selectors.js"
import { randomAnswers, decodeEntities } from "./utils.js"
import { renderNextQuestion, renderResultSection } from "./ui.js"
import { checkAnswer } from "./events.js"
import { restartQuiz } from "./events.js"

/**
 * Start quiz
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
    // update quiz State
    let {isStartBtnClicked } = quizState
    if(!isStartBtnClicked) {
        isStartBtnClicked = !isStartBtnClicked
        upateLocalStorage()
    }  
}


/**
 * attach start Quiz and Fetch question from api when clicked on startQuizBtn
 */
attachEvent(startQuizBtn, "click", async () => {
    startQuiz()
    fetchQuestions()
})


if(document.readyState === "interactive") {
    document.addEventListener("DOMContentLoaded", () => {
        if(typeof(window) === "undefined") return
        const {hashIdData} = quizState
        console.log(hashIdData)
        const item = JSON.parse(localStorage.getItem(hashIdData))
        const {curQuesIdx, lastIdxAnswered, currScore, questions, isStartBtnClicked, isRestartBtnClicked} = item
        // console.log(item)
        
        if(lastIdxAnswered === curQuesIdx - 1 && curQuesIdx === questions.length){
            if(!isRestartBtnClicked) {
                renderResultSection()
                restartQuiz()
                return
            }
            // restart Quiz
            restartQuiz()
            return
        }

        quizState.curQuesIdx = curQuesIdx
        quizState.lastIdxAnswered = lastIdxAnswered
        quizState.currScore = currScore
        quizState.questionLength = questions.length

        // if(!item) return
        // const {lastIdxAnswered, questions} = item
        // console.log(lastIdxAnswered, questions, questions[lastIdxAnswered])
        // console.log("progeed")
        startQuiz()
        intializeApp()
    })
} else {
    console.log(document.readyState)
}

function intializeApp() {

    // remove all old quizSec that cloned after fill previous question and answers
    // console.log(container.querySelector(".question-sec"))
    container.querySelector(".question-sec")?.remove()
    console.log(quizState)
    let { hashIdData } = quizState
    
    // check if reach last question
    // if(curQuesIdx === questionLength) return

    // check if window is not undefined to retrieve data from localStorage
    if(typeof window === "undefined") return 
    
    // Extract question from api data
    const {lastIdxAnswered, curQuesIdx, currScore, questions} = JSON.parse(localStorage.getItem(hashIdData))
    console.log(lastIdxAnswered, curQuesIdx, currScore, questions, questions[lastIdxAnswered])
    console.log(questions[lastIdxAnswered])
    const {all: allAnswers, correctAnswer} = randomAnswers(questions[lastIdxAnswered])
    
    const clonedTemp = tempQuizSec.content.cloneNode(true)
    clonedTemp.querySelector(".question-sec").classList.remove("active")
    clonedTemp.querySelector(".question-sec").classList.add("active")
    clonedTemp.querySelector(".question-sec h2.question-sec__title").textContent = questions[lastIdxAnswered].question
    clonedTemp.querySelector("#current-question-number").textContent = lastIdxAnswered + 1
    clonedTemp.querySelector("#question-total").textContent = questions.length
    clonedTemp.querySelector("#progress-bar").value =  Math.floor((currScore / questions.length) * 100)

    clonedTemp.querySelector("#question-info-result").textContent = currScore
    clonedTemp.querySelectorAll(".question-sec .answers-btns button.answers-btns__button").forEach((btn, idx) => {
        btn.textContent = decodeEntities(allAnswers[idx]) 
        btn.dataset.correct = allAnswers[idx] === correctAnswer ? "correct" : "wrong"
    })
    // // increment question index by one
    // quizState.curQuesIdx++
    container.appendChild(clonedTemp)
    
    
    // render next question
    renderNextQuestion()
    // attach event click to answer button after click and check answer
    checkAnswer()
}

