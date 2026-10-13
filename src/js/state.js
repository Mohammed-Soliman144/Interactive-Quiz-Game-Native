import { memorizationApi, resetAnswers} from "./utils.js";
import { getQuestions } from "./api.js";
import { checkAnswer } from "./events.js";
import { renderNextQuestion } from "./ui.js";


// Quiz States
export const quizState = {
    curQuesIdx: 0,
    currScore: 0,
    lastIdxAnswered: 0,
    questionLength: 0,
    isRestartBtnClicked: false,
    isStartBtnClicked: false,
    hashIdData: "quiz-cache-data"
}

// Resul tStates
export const resultsState = [
    // 90 - 100
    "Perfect! You are a genius!",
    // 80 - 89
    "Great job! You Know your stuff!",
    // 70 - 79
    "Good effort! keep learning",
    // 60 - 69
    "Not bad! Try again to improve",
    // 50 - 59
    "Keep studying! You will be better",
    // 40 - 49
    "Don't give up! Every mistake is a lesson.",
    // 30 - 39
    "A good start, but there is room to grow!",
    // 20 - 29
    "Keep practicing! Mastery takes time.",
    // 0 - 19
    "Don't worry! Reset, review, and try again!"
]

/**
 * show result of quiz based on user score
 * @returns {void}
 */
export function getResult() {
    const {currScore, questionLength} = quizState
    const resultScore = Math.floor((currScore / questionLength) * 100) 

    // numeric range so set true (strict equality)
    // switch(number) compare with boolean according strict equality always return false (different types)
    switch(true) {
        case (resultScore >= 90):
            return resultsState[0]
        case (resultScore >= 80 && resultScore < 90):
            return resultsState[1]
        case (resultScore >= 70 && resultScore < 80):
            return resultsState[2]
        case (resultScore >= 60 && resultScore < 70):
            return resultsState[3]
        case (resultScore >= 50 && resultScore < 60):
            return resultsState[4]
        case (resultScore >= 40 && resultScore < 50):
            return resultsState[5]
        case (resultScore >= 30 && resultScore < 40):
            return resultsState[6]
        case (resultScore >= 20 && resultScore < 30):
            return resultsState[7]
        default:
            return resultsState[8]
    }
}

/**
 * retreive question from The-trivia-api
 * caching retieve questions in localStorage and js memory
 * render next question
 * check answer
 * @returns {void}
 */
export async function fetchQuestions() {
    // reset Quiz Answers and states
    resetAnswers()
    // Fetch Data from Open Trivia DB 
    // extract or destructuring questions as array from api
    const {results: questions} = await getQuestions()
    
    // caching data fetched from api
    const cache = {
        questions: questions,
        curQuesIdx: quizState.curQuesIdx,
        lastIdxAnswered: quizState.lastIdxAnswered,
        isRestartBtnClicked: quizState.isRestartBtnClicked,
        isStartBtnClicked: quizState.isStartBtnClicked,
        currScore: quizState.currScore
    }
    
    
    // update quiz state by hashid of caching api
    quizState.hashIdData = memorizationApi(cache)
    // update quiz state by length of questions
    quizState.questionLength = questions.length
    
    // render next question
    renderNextQuestion()
    // attach event click to answer button after click and check answer
    checkAnswer()
}