const API_KEY = "4ecy36aGq0LvnYdBfcYvPbcKZKZzyf2I55rjvI1U";

export async function getQuestions() {
    try {
        // https://api.api-ninjas.com/v1/trivia?category=mathematics
        const response = await fetch("https://opentdb.com/api.php?amount=20&category=18&difficulty=medium&type=multiple&encode=url3986",  {
            method: "GET",
        })
        if(!response.ok)
            throw new Error(`HTTP Error Occured ${response.status}`)
        const data = await response.json()
        return data
    } catch(err) {
        console.error(`Failed to fetch`, err)
    }
}