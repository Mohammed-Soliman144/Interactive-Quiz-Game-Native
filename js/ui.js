

/* 

{response_code: 0, results: Array(20)}
response_code
: 
0
results
: 
Array(20)
0
: 
category
: 
"Science%3A%20Computers"
correct_answer
: 
"C%23"
difficulty
: 
"medium"
incorrect_answers
: 
(3) ['Java', 'C%2B%2B', 'Objective-C']
question
: 
"Which%20of%20the%20following%20languages%20is%20used%20as%20a%20scripting%20language%20in%20the%20Unity%203D%20game%20engine%3F"
type
: 
"multiple"


*/


export function renderQuestions(quesTitle, answerBtns, results = []) {
    console.log("here", results)
    if(!results.length)
        return "Question is loading"
    else {
        const len = results.length
        const curr = 0;
        const next = (curr + 1) % len

        quesTitle.textContent = results[curr].question
        const answers = [
            {answer: results[curr].correctAnswer, correct: true},
            {answer: results[curr].incorrectAnswers[0], correct: false},
            {answer: results[curr].incorrectAnswers[1], correct: false},
            {answer: results[curr].incorrectAnswers[2], correct: false},
        ]

        answerBtns.forEach((btn, idx) => {
            // const idx = Math.ceil(Math.random() * answers.length--)
            btn.textContent = answers[idx].answer
            btn.dataset.correct = answer[idx].correct
        })
    }

}


