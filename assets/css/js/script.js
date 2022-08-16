const codeQuestions = [
    {
      title:"Which answer is not a fundamental data type in javascript?",
      options: ["String", "Booleon", "Object", "Null"],
      correctOption: "Null",
    },
    {
      title: "What does this operator mean (&&)?",
      options: ["Or Operator", "And Operator", "If Operator", "Else Operator"],
      correctOption: "And  Operator",
    },
    {
      title:"What is string interpolation",
      options: ["When you insert variables into strings using template literals", "Printing as string to the console", "Changing the value of a variable", "When we join multiple strings together"],
      correctOption: "When you insert variables into strings using template literals",
    },
  ];
  
  let currentQuestionIndex = 0;
  let count = codeQuestions.length * 5;
  // let count = 5;
  
  const constructOptions = function (options) {
    const optionsContainer = document.createElement("div");
    optionsContainer.setAttribute("class", "options-container");
  
    for (let i = 0; i < options.length; i++) {
      // get the current option from array
      const option = options[i];
  
      // create my button
      const optionButton = document.createElement("button");
      optionButton.setAttribute("class", "option-item");
      optionButton.setAttribute("name", "option");
      optionButton.setAttribute("data-option", option);
      optionButton.textContent = option;
  
    
      optionsContainer.appendChild(optionButton);
    }
  
    return optionsContainer;
  };
  
  const constructAlert = function (className, text) {
  
    const alertDiv = document.createElement("div");
    alertDiv.setAttribute("class", className);
    alertDiv.textContent = text;
  
    return alertDiv;
  };
  
  const getFromLocalStorage = function (key, defaultValue) {
    const localStorageData = JSON.parse(localStorage.getItem(key));
  
    if (!localStorageData) {
      return defaultValue;
    } else {
      return localStorageData;
    }
  };
  
  const storeScore = function () {
    // get count value
    const score = count;
  
    // get user initials from input
    const initials = document.getElementById("user-initials").value;
  
    // construct score object
    const scoreObject = {
      score: score,
      initials: initials,
    };
  
    // get from LS before inserting object
    const highscores = getFromLocalStorage("highscores", []);
  
    // insert the score object
    highscores.push(scoreObject);
  
    // write back to LS
    localStorage.setItem("highscores", JSON.stringify(highscores));
  };
  
  const constructForm = function () {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container score-form");
  
    const form = document.createElement("form");
  
    const h2Element = document.createElement("h2");
    h2Element.setAttribute("class", "question");
    h2Element.textContent = "Your score is " + count;
  
    const formContainer = document.createElement("div");
    formContainer.setAttribute("class", "form-container");
  
    const formInputDiv = document.createElement("div");
    formInputDiv.setAttribute("class", "form-item");
  
    const formInput = document.createElement("input");
    formInput.setAttribute("placeholder", "Enter your initials");
    formInput.setAttribute("id", "user-initials");
  
    const formButtonDiv = document.createElement("div");
    formButtonDiv.setAttribute("class", "form-item");
  
    const formButton = document.createElement("button");
    formButton.setAttribute("class", "btn");
    formButton.textContent = "Submit";
  
    formInputDiv.append(formInput);
    formButtonDiv.append(formButton);
  
    formContainer.append(formInputDiv, formButtonDiv);
  
    form.append(h2Element, formContainer);
    divContainer.append(form);
  
    form.addEventListener("submit", storeScore);
  
    return divContainer;
  };
  
  const renderSuccessAlert = function () {
  
    const alert = constructAlert(
      "container answer-alert answer-alert-success",
      "Congratulations, you are correct!!"
    );
  
  
    document.getElementById("alert-container").appendChild(alert);
  
  
    const afterWait = function () {
    
      alert.remove();
  
    
      clearTimeout(delay);
    };
  
  
    const delay = setTimeout(afterWait, 1000);
  };
  
  const renderDangerAlert = function () {
  
    const alert = constructAlert(
      "container answer-alert answer-alert-danger",
      "Oops, you are incorrect!!"
    );
  
  
    document.getElementById("alert-container").appendChild(alert);
  
  
    const afterWait = function () {
    
      alert.remove();
  
    
      clearTimeout(delay);
    };
  
  
    const delay = setTimeout(afterWait, 1000);
  };
  
  const renderScoreForm = function () {
  
    removeQuestionContainer();
  
  
    const form = constructForm();
  
  
    document.getElementById("start-container").append(form);
  };
  
  const verifyAnswer = function (event) {
    const target = event.target;
    const currentTarget = event.currentTarget;
  
  
    if (target.getAttribute("name") === "option") {
    
      const userOption = target.getAttribute("data-option");
  
    
      const correctOption = currentTarget.getAttribute("data-correct");
  
    
      if (userOption !== correctOption) {
      
        count -= 5;
        renderDangerAlert();
        if (count > 0) {
          document.getElementById("countdown").textContent = count;
        } else {
          document.getElementById("countdown").textContent = 0;
        }
      } else {
        renderSuccessAlert();
      }
  
    
      currentQuestionIndex += 1;
  
    
      if (currentQuestionIndex < codeQuestions.length) {
      
        removeQuestionContainer();
        renderQuestionContainer();
      } else {
        if (count > 0) {
          renderScoreForm();
        } else {
          removeQuestionContainer();
          renderGameOver();
        }
      }
    }
  };
  
  const constructQuestionContainer = function (question) {
   
    const questionContainer = document.createElement("div");
    questionContainer.setAttribute("class", "container question-container");
    questionContainer.setAttribute("id", "question-container");
    questionContainer.setAttribute("data-correct", question.correctOption);
  
    
    const questionH2 = document.createElement("h2");
    questionH2.setAttribute("class", "question");
    questionH2.textContent = question.title;
  
    
    const options = constructOptions(question.options);
  
  
    questionContainer.append(questionH2, options);
  
    questionContainer.addEventListener("click", verifyAnswer);
  
    return questionContainer;
  };
  

  const renderQuestionContainer = function () {
 
    const currentQuestion = codeQuestions[currentQuestionIndex];
  
  
    const questionContainer = constructQuestionContainer(currentQuestion);
  
  
    document.getElementById("quiz-container").appendChild(questionContainer);
  };
  
  const removeStartContainer = function () {
  
    const startContainer = document.getElementById("start-container");
  
    startContainer.remove();
  };
  
  const removeQuestionContainer = function () {
  
    const questionContainer = document.getElementById("question-container");
  
    questionContainer.remove();
  };
  
  const renderGameOver = function () {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container game-over");
  
    const h2Element = document.createElement("h2");
    h2Element.textContent = "GAME OVER";
  
    divContainer.append(h2Element);
  
    document.getElementById("start-container").append(divContainer);
  };
  
  const startTimer = function () {
  
    const timerTick = function () {
      if (currentQuestionIndex >= codeQuestions.length) {
        clearInterval(timer);
      } else if (count < 0) {
        clearInterval(timer);
        removeQuestionContainer();
        renderGameOver();
      } else {
        count -= 1;
        document.getElementById("countdown").textContent = count;
      }
    };
  
  
    const timer = setInterval(timerTick, 1000);
  };
  
  const initialLocalStorage = function () {
    const dataFromLS = JSON.parse(localStorage.getItem("highscores"));
  
    if (!dataFromLS) {
      localStorage.setItem("highscores", JSON.stringify([]));
    }
  };
  

  const startQuiz = function () {
  
    initialLocalStorage();
  
  
    removeStartContainer();
  
  
    renderQuestionContainer();
  
  
    startTimer();
  };
  

  const startButton = document.getElementById("start-quiz");
  

  startButton.addEventListener("click", startQuiz);