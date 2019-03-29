
var game = [
    {
        question: "Who scored 81 points against the Toronto Raptors?",
        options: ["James Harden", "Kobe Bryant", "Michael Jordan", "Allen Iverson"],
        answer: "Kobe Bryant",
    },
    {
        question: "What NBA team has won the most Championships?",
        options: ["Chicago Bulls", "Los Angeles Lakers", "Boston Celtics", "San Antonio Spurs"],
        answer: "Boston Celtics",
    },
    {
        question: "Who has the most steals in NBA history?",
        options: ["John Stockton", "Steve Nash", "Jason Kidd", "Magic Johnson"],
        answer: "John Stockton",
    },
    {
        question: "Who has made the most 3 point baskets in a single season?",
        options: ["Klay Thompson", "Ray Allen", "Stephen Curry", "Reggie Miller"],
        answer: "Stephen Curry",
    },
    {
        question: "How many teams play in the NBA",
        options: [29, 30, 31, 32],
        answer: "30",
    }
]

var userPick = "";
var questionsCorrect = 0;
var questionsWrong = 0;
var questionsSkipped = 0;
var remainingTime = 15;
var timerOn = false;
var intervalId;
var currentQuestion = [];
var chosenQuestions = [];
var choices = [];
var answer = "";

$(document).ready(function () {
    $("#start").show();
    $("#start").on("click", startGame);
    $("#results").on("click", startGame);
    $("#results").hide();
    $("#wrapper").hide();

})

function startGame() {
    $("#start").hide();
    $("#results").hide();
    $("#wrapper").show()
    questionsCorrect = 0;
    questionsWrong = 0;
    questionsSkipped = 0;
    timerOn = false;
    chosenQuestions = [];
    currentQuestion = "";
    choices = [];
    answer = "";
    remainingTime = 15;
    nextQuestion();
}

function timerStart() {
    if (!timerOn) {
        timerOn = true
        intervalId = setInterval(decrement, 1000);
    }
}

function timerStop() {
    timerOn = false;
    clearInterval(intervalId);
}

function decrement() {
    $("#timer").html("<h2>You have: " + remainingTime + " seconds left</h2>");
    remainingTime--;
    if (remainingTime === 0) {
        questionsSkipped++;
        timerStop();
        checkWin();
    }
}


function nextQuestion() {
    timerStart();
    $("#timer").html("<h2>You have: " + remainingTime + " seconds left</h2>");
    $("#wrapper").show()
    currentQuestion = game[Math.floor(Math.random() * game.length)]
    chosenQuestions.push(currentQuestion)
    checkQuestion();
    choices = currentQuestion.options
    answer = currentQuestion.answer
    $("#question").empty();
    $("#question").append(currentQuestion.question)
    $("#choices").empty();
    for (var i = 0; i < choices.length; i++) {
        var a = $("<button>");
        a.addClass("bballChoices");
        a.attr("data-name", choices[i]);
        a.text(choices[i]);
        $("#choices").append(a);
    }
    $(document).off("click", ".bballChoices", checkAnswer);
    $(document).on("click", ".bballChoices", checkAnswer);
}

function checkQuestion() {
    if(currentQuestion === chosenQuestions.indexOf()) {
        nextQuestion();
    }
}

function checkAnswer() {
    userPick = $(this).attr("data-name");
    if (userPick === answer) {
        questionsCorrect++;
        timerStop();
    } else {
        questionsWrong++;
        timerStop();
    }
    console.log(questionsCorrect)
    console.log(questionsWrong)
    checkWin();

}

function checkWin() {
    console.log(game.length)
    if(questionsCorrect + questionsWrong + questionsSkipped === game.length) {
        $("#question").empty();
        $("#choices").empty();
        $("#question").append("You got " + questionsCorrect + " correct");
        $("#choices").append("You got " + questionsWrong + " wrong");
        $("#choices").append("you missed ")
        $("#results").show()
    } else {
        remainingTime = 15;
        timerStart();
        nextQuestion();
    }
    
}
