//declared needed variables
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement =document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

//event listeners for buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => { 
    currentQuestionIndex++
    setNextQuestion()
})


//start game function, shuffle questions method is used to sort questions so they are arranged in random order each time
function startGame() {
    console.log('Start')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    })
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild)
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
}


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    } else {
        startButton.innerText ='Start Over'
        startButton.classList.remove('hide')
    }
} 


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
            element.classList.add('wrong')
        }
    }


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}




//The questions for the quiz
const questions = [
    { question: 'What is a string in Java?',
        answers: [
        { text: 'A sequence of characters', correct: true},
        { text: 'A sequenced of numbers', correct: false },
        { text: 'An array', correct: false },
        { text: 'A conditional statement', correct: false },
    ]
},
    { question: 'What does an array do?',
        answers: [
            { text: 'It sorts files', correct: false},
            { text: 'It can store multiple values in a single variable', correct: true},
            { text: 'It changes the background color', correct: false},
            { text: 'It makes a sentence', correct: false},
        ]
},

    { question: 'What is a function?',
        answers: [
            { text: 'A container', correct: false},
            { text: 'An ordered list', correct: false},
            { text: 'A set of statements that performs a task', correct: true},
            { text: 'A set of numbers put in an array', correct: false},
        ]
},
    { question: 'What year was Java released?',
        answers: [
            { text: '1992', correct: false},
            { text: '1995', correct: true},
            { text: '1996', correct: false},
            { text: '1989', correct: false},
        ]
}]