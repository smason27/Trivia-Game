
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
    $("#start").css("visibility", "visible");
    $("#start").on("click", startGame);
    $("#playAgain").on("click", startGame);
    $("#playAgain").hide();
    $("#wrapper").hide();

})

function startGame() {
    $("#start").css("visibility", "hidden");
    $("#playAgain").hide();
    $("#wrapper").show()
    questionsCorrect = 0;
    questionsWrong = 0;
    questionsSkipped = 0;
    timerOn = false;
    chosenQuestions = game;
    console.log(chosenQuestions)
    currentQuestion = "";
    choices = [];
    answer = "";
    remainingTime = 15;
    timerStart();
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
    remainingTime--;
    $("#timer").html("<h2>You have: " + remainingTime + " seconds left</h2>");
    if (remainingTime === 0) {
        questionsSkipped++;
        timerStop();
        checkWin();
    }
}


function nextQuestion() {
    // timerStart();
    $("#timer").html("<h2>You have: " + remainingTime + " seconds left</h2>");
    $("#wrapper").show()
    var currentQuestionIndex = Math.floor(Math.random() * game.length);
    currentQuestion = game[currentQuestionIndex]
    chosenQuestions.splice(currentQuestionIndex, 1) 
    console.log(chosenQuestions)
    choices = currentQuestion.options
    answer = currentQuestion.answer
    $("#question").empty();
    $("#question").append("<h3>" + currentQuestion.question + "</h3>")
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

// function checkQuestion() {
//     if(chosenQuestions.indexOf(currentQuestion) !== -1) {
//         nextQuestion();
//     }
// }

function checkAnswer() {
    userPick = $(this).attr("data-name");
    if (userPick === answer) {
        questionsCorrect++;
        timerStop();
    } else {
        questionsWrong++;
        $("#")
        timerStop();
    }
    console.log(questionsCorrect)
    console.log(questionsWrong)
    checkWin();

}

function checkWin() {
    console.log(game.length)
    if(chosenQuestions <= 0) {
        $("#timer").empty();
        $("#question").empty();
        $("#choices").empty();
        $("#timer").append("<h2>GAME OVER</h2>")
        $("#question").append("<h2> You got " + questionsCorrect + " correct!</h2>");
        $("#question").append("<h2>You got " + questionsWrong + " wrong!</h2>");
        $("#question").append("<h2>you missed " + questionsSkipped + " questions!</h2>")
        $("#playAgain").show()
        resetGame();
    } else {
        remainingTime = 15;
        timerStart();
        nextQuestion();
    }
    
}

function resetGame() {
    currentQuestion = [];
    chosenQuestions = game;
    questionsCorrect = 0;
    questionsWrong = 0;
    questionsSkipped = 0;
    choices = [];
    answer = "";
    
}
   

