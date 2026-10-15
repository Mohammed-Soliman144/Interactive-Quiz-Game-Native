/* ============================ Fetching question from API (trivia api) ===================== */
import { quizState } from "./state.js"
// API EndPoint (BASE URL)
const API_URL = "https://opentdb.com/api.php"
const QUESTIONS_LENGHT = "30"
const CATEGORY = "18"
const DIFFCULTY = "medium"
const TYPE = "multiple"

/**
 * fetch whole questions from the trivia api
 * @returns {object} data
 */
export async function getQuestions() {
    try {
        const controller = new AbortController()
        const response = await fetch(`${API_URL}?amount=${QUESTIONS_LENGHT}&category=${CATEGORY}&difficulty=${DIFFCULTY}&type=${TYPE}`, {
            method: "GET",
            signal: controller.signal
        })
        if(!response.ok){
            quizState.error = `HTTP Error ${response.status} - ${response.statusText}`
            console.log(quizState)
            throw new Error(`HTTP Error ${response.status} - ${response.statusText}`)
        }
            
        const data = await response.json()
        return data
    } catch(err) {
        quizState.error = `Failed to fetch, ${err}`
        console.log(quizState)
        console.error(`Failed to fetch`, err)
    }
}