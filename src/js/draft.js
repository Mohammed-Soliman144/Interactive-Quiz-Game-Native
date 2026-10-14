


/* ============================== UI ================================== */
import { decodeEntities, memorizationApi, randomAnswers, moveNextQuestion, getQuestion } from "./utilis.js"
import { quizState } from "./state.js"
import { cloneNode } from "./utilis.js"

let isPressed = false, idBtnPressed = ""

// export function renderQuestions(results = [], index, head = "", btns = []) {
//     if(!results.length ||  index === results.length - 1) 
//         return "question is loading"
//     const {question, correct_answer, incorrect_answers} = results[index]
//     const {all: answers, correctAnswer} = randomAnswers(correct_answer, incorrect_answers)
//     // console.log(answers, correctAnswer)
//     if(head)
//         head.textContent = decodeEntities(question)
//     if(btns.length) {
//         btns.forEach((btn, idx )=> {
//             btn.textContent = decodeEntities(answers[idx])
//             btn.addEventListener("click", (e) => {
//                 isPressed = true
//                 idBtnPressed = btn.id
//                 btn.dataset.isPressed = idBtnPressed
//                 console.log(isPressed)
//                 if(correctAnswer === answers[idx]) {
//                     e.currentTarget.dataset.correct = "correct" 
//                     e.currentTarget.classList.toggle("selected")
//                 }else {
//                     e.currentTarget.classList.toggle("selected")
//                     e.currentTarget.dataset.correct = "wrong"
//                 }
//                 btns.forEach((button) => {
//                     if(button !== e.currentTarget)
//                         button.disabled = true
//                 })
//                 if(isPressed)
//                     displayNextQuestion()
//             })
//         })
//     }
// }


// function displayNextQuestion() {
//     if(!isPressed) return
//     const quesTitle = document.querySelector(".question-sec h2.question-sec__title")
//     const answerBtns = document.querySelectorAll(".question-sec .answers-btns button.answers-btns__button")
//     const currQuesNum = document.getElementById("current-question-number")
//     const quesTotalNum = document.getElementById("question-total")
//     const progessBar = document.getElementById("progress-bar")
    
//     moveNextQuestion()
//     const {hashIdData, curQuesIdx} = quizState
//     console.log(hashIdData)
//     // console.log(localStorage.getItem(hashIdData))
//     const {questions, currScore, isProcess} = JSON.parse(localStorage.getItem(hashIdData))
//     // console.log(localStorage.getItem(hashIdData))
//     setTimeout(() => {
//         answerBtns.forEach(btn => {
//             btn.disabled = false
//             btn.dataset.correct = ""
//             btn.dataset.wrong = ""
//             btn.classList.remove("selected")
//         })
        
//         renderQuestions(questions, curQuesIdx, quesTitle, answerBtns)
        
//         console.log("is pressed", questions, curQuesIdx, quesTitle, answerBtns)
//         console.log(quizState)
//         isPressed = !isPressed
//     }, 1500)
// }


/* ======================================================================== */



// DOM Selectors
const quesTitle = document.querySelector(".question-sec h2.question-sec__title")
const answerBtns = document.querySelectorAll(".question-sec .answers-btns button.answers-btns__button")
const currQuesNum = document.getElementById("current-question-number")
const quesTotalNum = document.getElementById("question-total")
const progessBar = document.getElementById("progress-bar")
const container = document.querySelector(".container")


// clone questions section from <template> to render and appended to root element
// cloneNode("#quiz-question-sec", "", "", "active", "active", "", "#question-sec", container)



const {all: allAnswers, correctAnswer} = randomAnswers(getQuestion(quizState.curQuesIdx))

currQuesNum.textContent = quizState.curQuesIdx
quesTotalNum.textContent = quizState.questionLength
quesTitle.textContent = decodeEntities(getQuestion(quizState.curQuesIdx).question)

answerBtns.forEach((btn, idx) => {
    btn.textContent = decodeEntities(allAnswers[idx])
    btn.addEventListener("click", (e) => {
    // isPressed = true
    // idBtnPressed = btn.id
    // btn.dataset.isPressed = idBtnPressed
    // console.log(isPressed)
        if(correctAnswer === allAnswers[idx]) {
            e.currentTarget.dataset.correct = "correct" 
            e.currentTarget.classList.toggle("selected")
        }else {
            e.currentTarget.classList.toggle("selected")
            e.currentTarget.dataset.correct = "wrong"
        }
        answerBtns.forEach((button) => {
            if(button !== e.currentTarget)
                button.disabled = true
        })
    })
})

// export function renderQuestions(index) {
//     if(!results.length ||  index === results.length - 1) 
//         return "question is loading"
//     const {question, correct_answer, incorrect_answers} = results[index]
//     const {all: answers, correctAnswer} = randomAnswers(correct_answer, incorrect_answers)
//     // console.log(answers, correctAnswer)
//     if(head)
//         head.textContent = decodeEntities(question)
//     if(btns.length) {
//         btns.forEach((btn, idx )=> {
//             btn.textContent = decodeEntities(answers[idx])
//             btn.addEventListener("click", (e) => {
//                 isPressed = true
//                 idBtnPressed = btn.id
//                 btn.dataset.isPressed = idBtnPressed
//                 console.log(isPressed)
//                 if(correctAnswer === answers[idx]) {
//                     e.currentTarget.dataset.correct = "correct" 
//                     e.currentTarget.classList.toggle("selected")
//                 }else {
//                     e.currentTarget.classList.toggle("selected")
//                     e.currentTarget.dataset.correct = "wrong"
//                 }
//                 btns.forEach((button) => {
//                     if(button !== e.currentTarget)
//                         button.disabled = true
//                 })
//                 if(isPressed)
//                     displayNextQuestion()
//             })
//         })
//     }
// }