function Hide(element) {
    element.style.display = "none";
}
function Show(element) {
    element.style.display = "block";
}

let topicChoosing = document.querySelector(".topicChoosing");
let topics = document.querySelectorAll(".topic");
let topicName, levelName;

let topicLevel = document.querySelector(".topicLevel");

topics.forEach((topic) => {
    topic.addEventListener("click", () => {
        topicName = topic.textContent;
        Hide(topicChoosing);
        Show(topicLevel);
    });
});

let levels = document.querySelectorAll(".level");
let questionsContainer = document.querySelector(".questionsContainer");
let options = document.querySelectorAll(".option");
let question = document.querySelector(".question");
let questionNumber = document.querySelector(".questionNumber");

levels.forEach((level) => {
    level.addEventListener("click", () => {
        levelName = level.textContent;
        Hide(topicLevel);
        Show(questionsContainer);
        getQuestions();
        startTimer();
    });
});

let questionIndex = 0;
let score = 0;
let quizQuestions = [];
let rating = document.querySelector(".rating");

// function to fetch questions from the json file and display them
async function getQuestions() {
    try {
        let response = await fetch(`./questions.json`);
        let data = await response.json();
        quizQuestions = data.filter(
            (question) =>
                question.label === topicName && question.level === levelName
        )[0].questions;

        if (questionIndex >= quizQuestions.length ) {
            endQuiz();
            return;
        }

        question.textContent = quizQuestions[questionIndex].question;
        questionNumber.textContent = `${questionIndex + 1} / ${quizQuestions.length}`;

        options.forEach((option, index) => {
            option.textContent = quizQuestions[questionIndex].options[index];
            option.onclick = () => {
                if (option.textContent === quizQuestions[questionIndex].correct_answer) {
                    score++;
                }
                questionIndex++;
                getQuestions(); 
            };
        });

    } catch (e) {
        console.error(e);
    }
}

let timer = document.querySelector(".timer");
let timeLeft = 100;
function startTimer() {
    let timeInterval = setInterval(() => {
        timeLeft -= 2;
        timer.style.width = `${timeLeft}%`;
        if (timeLeft <= 60) {
            timer.style.backgroundColor = "yellow";
        }
        if (timeLeft <= 30) {
            timer.style.backgroundColor = "red";
        }
        if (timeLeft <= 0) {
            endQuiz();
            clearInterval(timeInterval);
        }
    }, 1000);
}

let resultsContainer = document.querySelector(".resultsContainer");
let result = document.querySelector(".result");
function endQuiz() {
    Hide(questionsContainer);
    Show(resultsContainer);
    result.textContent = `${score} / ${quizQuestions.length}`;
    if(score >= 8){
        rating.textContent = "Excellent!";
    } else if(score >= 5){
        rating.textContent = "Good but try harder!";
    } else if(score >= 3){
        rating.textContent = "Better luck next time!";
    } else {
        rating.textContent = "Try harder next time!";
    }
}

let restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
    Hide(resultsContainer);
    Show(topicChoosing);
    questionIndex = 0;
    score = 0;
    timeLeft = 100;
    timer.style.width = "100%";
    timer.style.backgroundColor = "green";
});