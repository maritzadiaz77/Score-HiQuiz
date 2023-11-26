function displayHighscores() {
  // Here we get scores from local storage OR empty array in empty brackets.
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  //refer to web apis activities for this part
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    //  here we want to create an li tag for every recorded score.
    var newTag = document.createElement("li");
    newTag.textContent = score.initials + " - " + score.score;

    // list on the page!
    var olEl = document.querySelector("#highscores");
    olEl.appendChild(newTag);
  });
}
function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").addEventListener("click", clearHighscores);

displayHighscores();
