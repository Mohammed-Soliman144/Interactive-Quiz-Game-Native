import { quizState } from "./state.js"
import { getScore, updateLocalStorage } from "./utils.js"
import { container, header, startQuizBtn } from "./selectors.js"
import { renderNextQuestion, renderResultSection } from "./ui.js"


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
            quizState.status = "finished"
            updateLocalStorage()
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
                        isBtnPressed = false
                    }, 1500)
            }
        })
}


