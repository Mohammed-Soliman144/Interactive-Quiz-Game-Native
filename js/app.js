import { cloneNode } from "./utils.js"
import { getQuestions } from "./api.js"
import { renderQuestions } from "./ui.js"

// DOM SELECTORS
const container = document.querySelector(".container")
const header = document.querySelector("header.header")
const startQuizBtn = document.getElementById("start-quiz-btn")
// const tempQuizSec = document.getElementById("quiz-question-sec")


const quizSec = document.getElementById("question-sec")
const quesTitle = document.querySelector(".question-sec h2.question-sec__title")
const currQuesNum = document.getElementById("current-question-number")
const quesTotalNum = document.getElementById("question-total")
const answerBtns = document.querySelectorAll(".question-sec .answers-btns button.answers-btns__button")
const progessBar = document.getElementById("progress-bar")
const tempResultSec = document.getElementById("quiz-result-sec")
const resultSec = document.querySelector(".result-sec")
const resultScore = document.getElementById("result")
const totalResults = document.getElementById("total-results")
const resultMessage = document.getElementById("result-message")
const restartQuizBtn = document.getElementById("restart-quiz-btn")



// StartQuiz
if(startQuizBtn)
    startQuizBtn.addEventListener("click", startQuiz)


const {results} = await getQuestions()
console.log(results)
console.log(quesTitle)
console.log(answerBtns)
function startQuiz(e) {
    if(header) {
        header.classList.remove("active")
        header.classList.add("inactive")
        cloneNode("#quiz-question-sec", "", "", "active", "active", "", "#question-sec", container)
        // cloneNode("#quiz-question-sec", "", "", "active", "active", "", ".question-sec h2.question-sec__title", container)
        // cloneNode("#quiz-question-sec", "", "", "active", "active", "", ".question-sec .answers-btns button.answers-btns__button", container)
        renderQuestions(quesTitle, answerBtns, results)
        // resultSec.classList.remove("inactive")
        // resultSec.classList.add("active")

        // const tempCloned = tempQuizSec.content.cloneNode(true)
        // tempCloned.querySelector(".question-sec").classList.toggle("active")
        // container.append(tempCloned)
        // const tempCloned = tempResultSec.content.cloneNode(true)
        // tempCloned.querySelector("#restart-quiz-btn").addEventListener("click", restartQuiz)
        // tempCloned.querySelector(".result-sec").classList.toggle("active")
        // container.append(tempCloned)
    }
}


console.log(resultSec)

// Restart Quiz
// if(restartQuizBtn)
//     restartQuizBtn.addEventListener("click", restartQuiz)

function restartQuiz(e) {
    console.log(header)
    if(header) {
        document.querySelector(".result-sec").classList.remove("active")
        document.querySelector(".result-sec").classList.add("inactive")
        header.classList.remove("inactive")
        header.classList.add("active")
    }
    console.log("hello world")

} 