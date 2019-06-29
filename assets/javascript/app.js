$(document).ready(function() {
    // $("#introSection").hide();
    $("#messageSection").hide();
});

$("#questionSpace").hide()

let rightAnswer = 0,
    wrongAnswer = 0,
    noAnswer = 0,
    currentQuestion = 0;

// function for random number
function randomNum(x) {
    let random = math.floor(math.random() * x);
    return random;
}

function countDown() {
    $('.pickAnswer').click(function() {
        $(this).data('clicked', true);
    });
    var i = 15;
    var myInterval = setInterval(function() {

        if (i < 10) {
            $('#timerSeconds').html("0" + i);
            $(".pickAnswer").on("click", function() {
                clearInterval(myInterval);
            })
        } else {
            $('#timerSeconds').html(i);
            $(".pickAnswer").on("click", function() {
                clearInterval(myInterval);
            })
        }

        if (i === 0) {
            noAnswer++;
            clearInterval(myInterval);
            currentQuestion++;
            i = 30;
            postQuestion(currentQuestionIndex);
        } else {
            i--;
        }
    }, 1000);
}
// start button
    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#startImg").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();
       
        startTrivia();
    })
//start the game
function startTrivia() {
    $('#messageSection').hide();
    $('#gameMessage').empty()
    $('#questionContainer').show();
    $('#choices').show();
    $("#timer").show();
    rightAnswer = 0;
    wrongAnswer = 0;
    noAnswer = 0;
    currentQuestion = 0;

    postQuestion(currentQuestion);
    }

// Game reset
function gameReset() {
    $('#messageSection').show();
    $('#questionContainer').hide();
    $('#choices').hide();
    $('#timer').hide()

    $('#gameMessage').append("<h2>Results</h2>");
    $('#gameMessage').append("<h4>Correct: " + rightAnswer + "</h4>");
    $('#gameMessage').append("<h4>Incorrect: " + wrongAnswer + "</h4>");
    $('#gameMessage').append("<h4>Unanswered: " + noAnswer + "</h4>");
}

function postQuestion(n) {

    if (currentQuestion < questions.length) {
        $('#question').remove();
        $('.pickAnswer').remove();
        countDown();
        $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
        for (var i = 0; i < questions[n].c.length; i++) {
            var newDiv = $("<div>");
            newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
            $('#choices').append(newDiv);
        }

    } else {
        // Conditional resets/loops the game
        gameReset(); 
    }

$(".pickAnswer").on("click", function() {
    // User's choice is stored as a string
    var userChoice = $(this).attr('indexnum'); 
    userChoice = parseInt(userChoice);

    // Conditional to check whether user is correct or not; tallies accordingly
    if (userChoice === questions[currentQuestion].answer) {
        rightAnswer++;
        currentQuestion++
    } else {
        wrongAnswer++;
        currentQuestion++;
    }
        postQuestion(currentQuestion);
    })
}

// Trivia Questions
let questions = [
    {
        "q": 'What kind of sport is cycling',
        "c": ['Endurance', 'Power', 'Strategy'],
        "answer": 0
    },{
        "q": 'What is cadence',
        "c": ['A type of food', 'Revolution of time the crank spin', 'A slang for bike mechanic'],
        "answer": 1
    },{
        "q": 'Which is a pro cycling team?',
        "c": ['EF eduction', 'Golden State warrior', 'Team Solo Mid'],
        "answer": 0
    },{
        "q": 'Which is not a crank arm length size?',
        "c": ['165cm', '172.5cm', '155cm', '170cm',],
        "answer": 2
    },{
        "q": 'What is lube frequently on a bike?',
        "c": ['Stem', 'Saddle', 'Chain'],
        "answer": 2
    },{
        "q": 'What kind of bikes do professional road cyclist ride?',
        "c": ['track', 'road', 'mountain'],
        "answer": 1
    },{
        "q": 'Which is the standard road bike wheel size?',
        "c": ['700', '650', '800', '500'],
        "answer": 0
    },{
        "q": 'Which body part makes all the power for the bike to move?',
        "c": ['Arm', 'Calf', 'Thigh', 'Shoulder', 'Finger'],
        "answer": 2
    },{
        "q": 'What color is the mountain jersey?',
        "c": ['Green', 'Poka-Dot', 'Red', 'Stripped'],
        "answer": 1
    },{
        "q": 'What is Deep Wheel mean in cycling?',
        "c": ['Chicago pizza', 'Aerodynamic wheel', 'Box section wheel'],
        "answer": 1
    },
];

