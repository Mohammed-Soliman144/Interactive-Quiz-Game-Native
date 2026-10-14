import { quizState } from "./state.js"
import { container } from "./selectors.js"

// caching data fetched from api
export const cacheQuestions = new Map()

/**
 * convert html entities to normal string
 * @param {string} str - accept answer as string with html entities and parse it to string
 * @returns answer after convert special html entities to normal string
 */
export function decodeEntities(str = "") {
    const parser = new DOMParser()
    const document = parser.parseFromString(str, 'text/html')
    return document.documentElement.textContent
}

/**
 * attach handler function to element
 * @param {HTMLElement} element - accepts HTMLElement 
 * @param {Event} event - accepts html event click, beforeunload, DOMContentLoaded etc... 
 * @param {() => void} handler - attach handler function to element that executed when trigger event 
 * @returns {void}
 */
export function attachEvent(element, event, handler) {
    if(!element || !event || !handler)
        return
    element.addEventListener(event, handler)
}

/**
 * Manipulate positions of all answers
 * @param {object} question - accept question object with wrong answers array and correct answer string 
 * @returns return object with all answers array after manipulate positions of all answers and correct answer as string
 */
export function randomAnswers(question) {
    if(typeof(window) === "undefined") return
    const {hashIdData} = quizState
    const {curQuesIdx, questions} = JSON.parse(localStorage.getItem(hashIdData))
    if(curQuesIdx === questions.length) return
    const {correct_answer: correctAnswer, incorrect_answers: wrongAnswers} = question
    const allAnswers = wrongAnswers.concat(correctAnswer)
    const len = allAnswers.length;
    for(let i = 0; i < len; i++) {
        const randomIdx = Math.floor(Math.random() * i);
        [allAnswers[i], allAnswers[randomIdx]] = [allAnswers[randomIdx], allAnswers[i]];
    }
    return {all: allAnswers, correctAnswer}
}

/**
 * caching api data retrieve from the-trivia-api inside js memmory (hashmap) and localStorage
 * save data inside js memory (hashmap) and localStorage
 * @param {object} data - accepts data object retreive from api 
 * @returns keyItem of localStorage as raw string 
 */
export function memorizationApi(data = {}) {
    const { hashIdData } = quizState
    if(typeof window === "undefined" || !data) return
    if(cacheQuestions.has(data)) {
        const item = JSON.parse(localStorage.getItem(JSON.stringify(memo.get(data))))
        return item ? cacheQuestions.get(data) : ""
    }
    cacheQuestions.set(data, hashIdData)
    localStorage.setItem(hashIdData, JSON.stringify(data))
    return cacheQuestions.get(data)
}


/**
 * reset Quiz States
 * remove old fetch questions from api
 * reset progress value
 * @returns {void}
 */
export function resetAnswers() {
    if(quizState.curQuesIdx !== quizState.questionLength) return
    if(typeof window === undefined) return
    localStorage.removeItem(quizState.hashIdData)
    resetQuizState()
}

/**
 * reset all quiz states by using Object.assign(target, newSource)
 * all exported methods, objects, variables will be readonly binding when imported to another module according to ECMA SCRIPT 
 * @returns {void}
 */
function resetQuizState() {
    Object.assign(quizState, {
        curQuesIdx: 0,
        currScore: 0,
        lastIdxAnswered: 0,
        questionLength: 0,
        status: "idle",
        hashIdData: "quiz-cache-data"
    })
}

/**
 * update score after answered on each question
 * @returns {void}
 */
export function getScore() {
    container.querySelectorAll(".question-sec .answers-btns button.answers-btns__button").forEach(button => {
        if(button.classList.contains("selected") && button.dataset.correct === "correct")
            quizState.currScore++
    })
}

/**
 * update localStorage by quiz states
 * @returns {void}
 */
export function updateLocalStorage() {
    if(typeof(window) === "undefined") return
    // const {curQuesIdx, currScore, lastIdxAnswered, hashIdData, isStartBtnClicked, isRestartBtnClicked} = quizState
    const {curQuesIdx, currScore, lastIdxAnswered, hashIdData, status} = quizState
    const item = JSON.parse(localStorage.getItem(hashIdData))
    if(!item) return
    localStorage.setItem(hashIdData, JSON.stringify({...item, curQuesIdx, currScore, lastIdxAnswered, status}))
    // console.log(item)
}
