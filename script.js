// These are my list of questions that I am going to be asking.This is the easiest and 
// quickest part.
var questions=[
    {
        title: "Commonly used data types DO Not Include:",
        choices: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ],
        answer: "3. alerts"
    },
    {
    title: "The condition in an if/else statement is enclosed with___.",
        choices: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"
        ],
        answer: "3. parenthesis"
    },
    {
        title: "Arrays in Javascript can be used to store ___.",
        choices: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ],
        answer: "4. all of the above"
    },
{
    title: "Sring values must be enclosed within ___ when being assigned to variables.",
        choices: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis"
        ],
        answer: "3. quotes"
    },
{
    title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "1. Javascript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log"
        ],
        answer: "4. console.log"
},
];
// In this section, I am going to be going through the DOCUMENT to get to the #items below.
var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// These are the variables for the questions
var activeQuestionIndex = 0;
var secondsLeft = questions.length * 10;
var setTimer;
// This is the function for startquiz
function startQuiz() {

    
            // Here we are hiding the starting page we began with.
            var startInfoEl = document.querySelector("#start-page");
            startInfoEl.setAttribute("class", "hide");
            // showing my question elements
            questionsEl.removeAttribute("class");
           // SetTImer is setting the timer, has 2 parameters below in parenthesis.
           setTimer = setInterval(setTime, 1000);
            // This is going throuhg the timer element, its content, and saying how 
            // many seconds left.
            timerEl.textContent = secondsLeft;
            startQuestion();
       }     
    //    look back to module 4 sections!!
function startQuestion() {

    var activeQuestion = questions[activeQuestionIndex];

    var titleEl = document.querySelector("#title")
    titleEl.textContent = activeQuestion.title;

    choicesEl.innerHTML = "";
//    stack overflow help
    activeQuestion.choices.forEach(function(choice) {
// Ask tutor for help with this part
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", choiceClick);
        choicesEl.appendChild(choiceButton);
    });
}

function choiceClick() {
    if (this.value !== questions[activeQuestionIndex].answer) {
    //    IF you answer incorrectly,youre going to get time deducted from your quiz time!!

        secondsLeft -= 15;

        if(secondsLeft < 0) {
            secondsLeft = 0;
        }
        // How many seconds left on the page.
        // if correct, then the text will come out green.
        // if incorrect, then the text will be red
        timerEl.textContent = secondsLeft;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "300%";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "300%";
    }

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // This ++ means that it will show the next question.
    activeQuestionIndex++;
   
    if (activeQuestionIndex === questions.length) {
        endQuestion();        
    } else {
        startQuestion();
    }
}

// function to end the quiz
// Need to ask tutor for help with this part.
function endQuestion() {
    clearInterval(setTimer);
    var inputEl = document.querySelector('#save-score');
    inputEl.removeAttribute("class");

    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = secondsLeft;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function setTime() {

    secondsLeft --;
    timerEl.textContent = secondsLeft;    

    if (secondsLeft <= 0) {
       endQuestion();               
    }
}
// Here we are defining the function of savehighscore.
function saveHighscore() {
// we can check this on inspect.
    var initials = initialsEl.value.trim();

    if (initials !== "") {
        // breaking down
        // going through window, then to the localstorage to .getitem
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // New score for whoever last played and filled in initials
        var newScore = {
            score: secondsLeft,
            initials: initials
        };

        // essentially what this is doing is saving the latest score on our localstorage
        
        highscores.push(newScore);
        // and we are able to check through inspect
        window.localStorage.setItem("highscore", JSON.stringify(highscores));
    
        //  This is taking us to our other html page besides the main.
        window.location.href = "ViewScores.html";
    }
}
// adding an event lister for when key is pressed!
initialsEl.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
});

//type in your intitials to record your high score!
submitBtn.addEventListener("click", saveHighscore);

// adding the click event to the button!
startBtn.addEventListener("click", startQuiz);