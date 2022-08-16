const getFromLocalStorage = function (key, defaultValue) {
    const localStorageData = JSON.parse(localStorage.getItem(key));
  
    if (!localStorageData) {
      return defaultValue;
    } else {
      return localStorageData;
    }
  };
  
  const renderHighscores = function (highscores) {
  
    const ulElement = document.createElement("ul");
    ulElement.setAttribute("class", "highscores-list");
    ulElement.setAttribute("id", "highscores-list");
  
    for (let i = 0; i < highscores.length; i++) {
    
      const highscore = highscores[i];
  
    
      const liElement = document.createElement("li");
      liElement.setAttribute("class", "highscore-container");
  
    
      const initialsDiv = document.createElement("div");
      initialsDiv.textContent = highscore.initials;
  
    
      const scoreDiv = document.createElement("div");
      scoreDiv.textContent = highscore.score;
  
    
      liElement.append(initialsDiv, scoreDiv);
  
    
      ulElement.appendChild(liElement);
    }
  
  
    document.getElementById("high-scores").append(ulElement);
  };
  
  const onLoad = function () {
  
    const highscores = getFromLocalStorage("highscores", []);
  
    if (highscores.length === 0) {
      renderNoScores();
    } else {
    
      renderHighscores(highscores);
    }
  };
  

  const goBackBtn = document.getElementById("go-back-btn");
  const clearScoresBtn = document.getElementById("clear-scores-btn");
  
  const goBack = function () {
    location.assign("/index.html");
  };
  
  const clearScores = function () {
  
    localStorage.removeItem("highscores");
  
  
    document.getElementById("highscores-list").remove();
  
  
    renderNoScores();
  };
  
  const renderNoScores = function () {
  
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "container game-over");
  
    const h2Element = document.createElement("h2");
    h2Element.textContent = "No High Scores";
  
    divContainer.append(h2Element);
  
  
    document.getElementById("high-scores").append(divContainer);
  };
  

  goBackBtn.addEventListener("click", goBack);
  clearScoresBtn.addEventListener("click", clearScores);
  
  window.addEventListener("load", onLoad);