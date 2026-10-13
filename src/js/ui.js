import { quizState, getResult } from "./state.js"
import { container, tempResultSec, tempQuizSec } from "./selectors.js"
import { randomAnswers, decodeEntities, upateLocalStorage } from "./utils.js"

/**
 * render result section after cloned from template (#Document.Fragement) to DOM
 * update quiz states before append cloned template content to root element
 * @returns {void}
 */
export function renderResultSection() {
    let {currScore, questionLength} = quizState
    container.querySelector("#question-sec")?.remove()
    container.querySelector(".result-sec")?.remove()
    const clonedTemp = tempResultSec.content.cloneNode(true)
    clonedTemp.querySelector(".result-sec .result-sec__info .result-sec__text .result").textContent = currScore
    clonedTemp.querySelector("#total-results").textContent = questionLength
    clonedTemp.querySelector("#result-message").textContent = getResult()
    container.appendChild(clonedTemp)
}

/**
 * render next question after extract questions cached from localStorage
 * remove previous question section
 * clone content of template from #Document.Fragement to DOM
 * update quiz state by new question
 * append clone template to root element
 * @returns {void}
 */
export function renderNextQuestion() {
    // remove all old quizSec that cloned after fill previous question and answers
    // console.log(container.querySelector(".question-sec"))
    container.querySelector(".question-sec")?.remove()
    let { hashIdData, curQuesIdx, currScore, questionLength } = quizState
    
    // check if reach last question
    if(curQuesIdx === questionLength) return

    // check if window is not undefined to retrieve data from localStorage
    if(typeof window === "undefined") return 
    
    // Extract question from api data
    const {questions} = JSON.parse(localStorage.getItem(hashIdData))
    const {all: allAnswers, correctAnswer} = randomAnswers(questions[curQuesIdx])
    
    const clonedTemp = tempQuizSec?.content.cloneNode(true)
    clonedTemp.querySelector(".question-sec").classList.remove("active")
    clonedTemp.querySelector(".question-sec").classList.add("active")
    clonedTemp.querySelector(".question-sec h2.question-sec__title").textContent = questions[curQuesIdx].question
    clonedTemp.querySelector("#current-question-number").textContent = curQuesIdx + 1
    clonedTemp.querySelector("#question-total").textContent = questionLength
    clonedTemp.querySelector("#progress-bar").value =  Math.floor((currScore / questionLength) * 100)

    clonedTemp.querySelector("#question-info-result").textContent = currScore
    clonedTemp.querySelectorAll(".question-sec .answers-btns button.answers-btns__button").forEach((btn, idx) => {
        btn.textContent = decodeEntities(allAnswers[idx]) 
        btn.dataset.correct = allAnswers[idx] === correctAnswer ? "correct" : "wrong"
    })
    // increment question index by one
    quizState.curQuesIdx++
    container.appendChild(clonedTemp)
}
