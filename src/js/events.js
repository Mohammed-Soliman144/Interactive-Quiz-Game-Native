import { startQuiz } from "./main.js"
import { quizState } from "./state.js"
import { getScore, resetAnswers, updateLocalStorage } from "./utils.js"
import { container, header, startQuizBtn } from "./selectors.js"
import { renderNextQuestion, renderResultSection, intializeApp } from "./ui.js"

let isBtnPressed = false
let isRestartBtnPressed = false

/**
 * reset quiz states and restart quiz from scratch
 * @returns {void}
 */
export function restartQuiz() {
    container.addEventListener("click", (event) => {
        if(event.target.matches("#restart-quiz-btn")) {
            if(isRestartBtnPressed) return
            const restartBtn = event.target
            restartBtn.disabled = true
            container.querySelector(".result-sec")?.remove()
            header.classList.remove("inactive")
            header.classList.add("active")
            startQuizBtn.disabled = false
            resetAnswers()
            isRestartBtnPressed = false
        }
    })
}

/**
 * check answer selected
 * update score of quiz state
 * increment index of question
 * render next question if not last question
 * render result section and restart quiz if last question
 * @returns {void}
 */
export function checkAnswer() {
    container.addEventListener("click", (event) => {
        if(event.target.matches(".question-sec .answers-btns button.answers-btns__button")) {
                const button = event.target
                if(isBtnPressed) return
                let {curQuesIdx, questionLength} = quizState
                // check if user select answer if not added selected class to answer button otherwise ignored
                if(!button.classList.contains("selected")) {
                    button.classList.toggle("selected")
                    button.disabled = true
                    isBtnPressed = true
                    quizState.lastIdxAnswered = quizState.curQuesIdx - 1 
                    quizState.status = "in-progress"
                    // update current score of quiz state
                    getScore()
                    // update LocalStorage
                    updateLocalStorage()
                }
                    
                
                // // Disabled other buttons after user select answer
                const answerBtns = container.querySelectorAll(".question-sec .answers-btns button.answers-btns__button")
                answerBtns.forEach((btn) => {
                    if(btn !== event.target)
                        btn.disabled = true
                })

                if(curQuesIdx < questionLength)
                    setTimeout(() => {
                        renderNextQuestion()
                        isBtnPressed = false
                    }, 1500)
                else 
                    setTimeout(() => {
                        renderResultSection()
                        restartQuiz()
                        quizState.status = "finished"
                        updateLocalStorage()
                        isBtnPressed = false
                    }, 1500)
            }
        })
}

/**
 * load last status of quiz app when DOM content loaded
 * 
 * start quiz => status => idle (quiz state)
 * 
 * each question processed => status => in-progress (storage - persistence)
 * 
 * Render Result Section => status => finished (storage - persistence)
 * 
 * Restart Quiz => status => idle (quiz state)
 * @returns {void}
 */
export function loadContent() {
    document.addEventListener("DOMContentLoaded", () => {
        if(typeof(window) === "undefined") return
        const {hashIdData} = quizState
        const item = JSON.parse(localStorage.getItem(hashIdData))
        if(!item) return
        const {curQuesIdx, lastIdxAnswered, currScore, questions, status} = item
        
        // start quiz => status => idle
        // each question processed => status => in-progress
        // Render Result Section => status => finished
        // Restart Quiz => status => idle
        if(status === "idle") {
            // Start Quiz which status is idle
            startQuizBtn.click()
        } else if (status === "finished") {
            // Reach last question and curQuesIdx === questions.length
            // render Results Section 
            renderResultSection()
            restartQuiz()
        } else if (status === "in-progress") {
            // each question processed => status => in-progress
            quizState.curQuesIdx = curQuesIdx
            quizState.lastIdxAnswered = lastIdxAnswered
            quizState.currScore = currScore
            quizState.questionLength = questions.length
            startQuiz()
            intializeApp()
        }
    })
}

