import { header, startQuizBtn, quizSpan } from "./selectors.js"
import { attachEvent, isQuestionsFetched } from "./utils.js"
import { fetchQuestions} from "./state.js"
import { loadContent } from "./events.js"

/**
 * start quiz functionality
 * @returns {void}
 */
export function startQuiz() {
    if(!header) return
    if(isQuestionsFetched())
        return
    // disabled to avoid many times fetch api at once
    startQuizBtn.disabled = true
    quizSpan.textContent = "Loading Questions..."
    quizSpan.classList.add("spinner")
    startQuizBtn.classList.add("spinner")
}


/**
 * helper method to attach handler function with event to any element
 * attach start Quiz and Fetch question from api when clicked on startQuizBtn
 */
attachEvent(startQuizBtn, "click", async () => {
    startQuiz()
    fetchQuestions()
})


// load last status of quiz app when DOM content loaded
loadContent()