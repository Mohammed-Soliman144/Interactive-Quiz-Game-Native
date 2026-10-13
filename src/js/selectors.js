// ALL DOM SELECTORS
const container = document.querySelector(".container")
const header = document.querySelector("header.header")
const startQuizBtn = document.getElementById("start-quiz-btn")
const tempQuizSec = document.getElementById("quiz-question-sec")
const quizSec = document.getElementById("question-sec")
const quesTitle = document.querySelector(".question-sec h2.question-sec__title")
const currQuesNum = document.getElementById("current-question-number")
const quesTotalNum = document.getElementById("question-total")
const currScore = document.getElementById("question-info-result")
const answerBtns = document.querySelectorAll(".question-sec .answers-btns button.answers-btns__button")
const progessBar = document.getElementById("progress-bar")
const tempResultSec = document.getElementById("quiz-result-sec")
const resultSec = document.querySelector(".result-sec")
const resultScore = document.getElementById("result")
const totalResults = document.getElementById("total-results")
const resultMessage = document.getElementById("result-message")
const restartQuizBtn = document.getElementById("restart-quiz-btn")


export {container, header, startQuizBtn, quizSec, quesTitle, currQuesNum, quesTotalNum, currScore, answerBtns, progessBar, tempQuizSec, tempResultSec, resultSec, resultScore, totalResults, resultMessage, restartQuizBtn}