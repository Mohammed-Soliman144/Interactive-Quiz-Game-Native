// Query Parameters
// API EndPoint (BASE URL)
const API_URL = "https://opentdb.com/api.php"
const QUESTIONS_LENGHT = "4"
const CATEGORY = "18"
const DIFFCULTY = "medium"
const TYPE = "multiple"

/**
 * fetch whole questions from the-trivia-api
 * @returns {object} data
 */
export async function getQuestions() {
    try {
        const controller = new AbortController()
        // https://opentdb.com/api.php?amount=30&category=19&difficulty=medium&type=multiple
        const response = await fetch(`${API_URL}?amount=${QUESTIONS_LENGHT}&category=${CATEGORY}&difficulty=${DIFFCULTY}&type=${TYPE}`, {
            method: "GET",
            signal: controller.signal
        })
        if(!response.ok)
            throw new Error(`HTTP Error ${response.status} - ${response.statusText}`)
        const data = await response.json()
        return data
    } catch(err) {
        console.error(`Failed to fetch`, err)
    }
}