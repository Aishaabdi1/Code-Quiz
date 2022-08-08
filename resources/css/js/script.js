var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");

function beginQuiz() {
  titleScreen.setAttribute("class", "hide");

  quizScreen.setAttribute("class", "show");

  // Begin timer //
  timerId = setInterval(tick, 1000);

  timeEl.textContent = time;

  retrieveQuestion();
}

function tick() {
  time--;
  timeEl.textContent = time;

  if (time <= 0) {
    quizFinish();
  }
}

function retrieveQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timeEl.textContent = time;

    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;


  if (currentQuestionIndex === questions.length) {
    quizFinish();
  } else {
    retrieveQuestion();
  }
}


function quizFinish() {
  clearInterval(timerId);
  var highscoreSectionEl = document.querySelector("#highscore-section");
  highscoreSectionEl.setAttribute("class", "show");

  // show final score
  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = time;
  quizScreen.setAttribute("class", "hide");
}
function saveScore() {
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highScore.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveScore();
  }
}

submitBtn.onclick = saveScore;
startBtn.onclick = beginQuiz;
initialsEl.onkeyup = checkForEnter;
