// question and answer object, has all the questions and the associated answers.
var qAndA = [
    {question: "Who is the original creator of RWBY?",
    answers: ["Monty Oum", "Miles Luna", "Kerry Shawcross", "Rooster Teeth"],
    correctAns: "Monty Oum",
    imgPath: "assets/images/monty.gif"},

    {question: "Who are the four main characters of RWBY?",
    answers: ["Jaune Arc, Nora Valkyrie, Pyrrha Nikos, and Lie Ren", "Coco Adel, Fox Alistair, Yatsuhashi Daichi, and Velvet Scarlatina", "Yang Xiao Long, Blake Belladonna, Ruby Rose, and Weiss Schnee", "Sun Wukong, Neptune Vasilias, Scarlet David, and Sage Ayana"],
    correctAns: "Yang Xiao Long, Blake Belladonna, Ruby Rose, and Weiss Schnee",
    imgPath: "assets/images/rwby.gif"},

    {question: "How many kingdoms are there in Remnant?",
    answers: ["5", "4", "6", "2"],
    correctAns: "4",
    imgPath: "assets/images/kingdoms.gif"},

    {question: "Who is the primary antagonist of RWBY?",
    answers: ["Cinder Fall", "Ozpin", "Adam Taurus", "Salem"],
    correctAns: "Salem",
    imgPath: "assets/images/salem.gif"},

    {question: "What is the name of Ruby Rose's weapon?",
    answers: ["Ember Celica", "Crescent Rose", "Magnhild", "Miló and Akoúo̱"],
    correctAns: "Crescent Rose",
    imgPath: "assets/images/crescent-rose.gif"},

    {question: "Who is the primary vocalist for RWBY?",
    answers: ["Jeff Williams", "Lamar Hall", "Casey Lee Williams", "Sandra Lee Casey"],
    correctAns: "Casey Lee Williams",
    imgPath: "assets/images/indomitable.gif"}
]

// I have a time variable (30 seconds)
// an interval variable (for the timing stuff)
// i (for cycling through the object and making sure I'm checking the right question and stuff)
// and counters for your wrong answers, right answers, and the questions you didn't answer at all.
// there's also the reset button, for if you want to replay.
var time = 30;
var interval;
var i = 0;
var correct = 0;
var wrong = 0;
var timeOut = 0;
var resetButton = $("<button/>", {
    text: "Reset",
    id: "reset-button"
});

$("#start").click(startGame);

$("#answers").on("click", function(e) {
    var text = $(e.target).text();

    if(text == qAndA[i].correctAns) {
        correct++;
        clearInterval(interval);

        var displayImg = $("<img>");
        displayImg.attr("src", qAndA[i].imgPath);

        $("#answers").empty();
        $("#question").empty();
        $("#correct-answer").text("You got it right!");
        $("#answer-img").append(displayImg);

        i++;

        if(i < qAndA.length) {
            // the timeout might be a little long, but...whatever.
            setTimeout(getQuestion, 2000);
        }
        else {
            setTimeout(gameOver, 2000);
        }
    }
    else {
        wrong++;
        clearInterval(interval);

        var displayImg = $("<img>");
        displayImg.attr("src", qAndA[i].imgPath);

        $("#answers").empty();
        $("#question").empty();
        $("#correct-answer").text("Sorry, you got it wrong! The correct answer was "+qAndA[i].correctAns+".");
        $("#answer-img").append(displayImg);

        i++;

        if(i < qAndA.length) {
            setTimeout(getQuestion, 2000);
        }
        else {
            setTimeout(gameOver, 2000);
        }
    }
});

// this function exists primarily so that the getQuestion function isn't clearing the start-button div every time it's called, since most of the time, that div would already be empty.
function startGame() {
    $("#answer-img").empty();
    $("#start-button").empty();
    getQuestion();
}

function getQuestion() {
    time = 30;
    $("#time").html("00:30");
    interval = setInterval(count, 1000);

    $("#answer-img").empty();
    $("#correct-answer").empty();

    $("#question").html(qAndA[i].question);

    for(var j = 0; j < qAndA[i].answers.length; j++) {
        var newDiv = $("<div>");
        newDiv.addClass("div-hover");
        newDiv.text(qAndA[i].answers[j]);
        $("#answers").append(newDiv);
    }
}

function count() {
    time--;
    var countdown = timeConverter(time);
    $("#time").html(countdown);

    if(time === 0){
        timeOut++;
        clearInterval(interval);

        var displayImg = $("<img>");
        displayImg.attr("src", qAndA[i].imgPath);

        $("#answers").empty();
        $("#question").empty();
        $("#correct-answer").text("You ran out of time. The answer was "+qAndA[i].correctAns+".");
        $("#answer-img").append(displayImg);

        i++;

        if(i < qAndA.length) {
            setTimeout(getQuestion, 2000);
        }
        else {
            setTimeout(gameOver, 2000);
        }
    }
}

function gameOver() {
    $("#answers").empty();
    $("#question").empty();
    $("#answer-img").empty();
    $("#reset").append(resetButton);
    $("#reset-button").on("click", function() {
        $("#reset").empty();
        $("#correct-answer").empty();
        correct = 0;
        wrong = 0;
        timeOut = 0;
        i = 0;
        time = 30;
        getQuestion();
    });
    $("#correct-answer").html("Game Over.<br>Correct Answers: "+correct+"<br>Wrong Answers: "+wrong+"<br> Unanswered: "+timeOut+"<br>If you'd like to play again, hit the reset button.");
}

// yes, I took this right out of the stopwatch. I don't care. I wanted this to look nice, and this function was right there, so I looked at it and copied it. the only thing I changed is variables, to make more sense to me/make them easier to type.
function timeConverter(time) {
    var mins = Math.floor(time/60);
    var secs = time - (mins*60);
  
    if (secs < 10) {
      secs = "0"+secs;
    }
  
    if (mins === 0) {
      mins = "00";
    }
    else if (mins < 10) {
      mins = "0"+mins;
    }

    return mins+":"+secs;
}