let randomNumber = 0;
let tryCount = 0; //compteur d'essai
let game_start = false; //si la game à commencer
const infoStart = document.getElementById('infoStart');
const localHighScore = getHighScore();
const buttonStart = document.getElementById('start_game');
buttonStart.onclick = function () {
  randomNumber = getRandomInt(100);
  console.log("Game started with number:", randomNumber);
  game_start = true;
  infoStart.innerHTML = "La partie à commencer. <br /> Tu peux remplir le champs avec un nombre positif.";
  buttonStart.innerHTML = "Restart";
  tryCount = 0;
  answer.innerHTML = "";
}

// Utils
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getHighScore() {
  return JSON.parse(localStorage.getItem("high_score"));
}

function getUserPseudo() {
  const pseudo = prompt('Donnez moi votre pseudo :');
  if (pseudo === null) {
    return null;
  }

  if (pseudo.length < 3 || pseudo.length > 20) {
    alert('Votre pseudo doit contenir entre 3 et 20 caractères.');
    return getUserPseudo();
  } else {
    if (localHighScore === null) {
      return pseudo;
    } else {

      const found = localHighScore.find(highScore => highScore.pseudo === pseudo);

      if (found) {
        alert('Votre pseudo est déjà utilisé.');
        return getUserPseudo();
      }
      return pseudo
    }
  }
}


const sendNumber = document.getElementById('sendNumber');
const numberByUser = document.getElementById('number_give');


//lorsque qu'on clic sur tester
sendNumber.onclick = function () {

  const answer = document.getElementById('answer');
  newNumber = Number(numberByUser.value);
  numberByUser.value = "";

  console.log("User have sent the number: ", newNumber);


  tryCount++;
  if (game_start) {
    if (randomNumber === newNumber) {
      answer.innerHTML = `<h2><span class="h2_color1">B</span><span class="h2_color2">R</span><span class="h2_color3">A</span><span class="h2_color4">V</span><span class="h2_color5">O</span></h2>
      Tu as réussi à trouver le nombre que je pensais qui était <span class="configuration_number">${randomNumber}</span>. <br/> Tu l'as trouvé en ${tryCount} essais. `;

      game_start = false;
      console.log("Game stop successful");

      pseudoUser = getUserPseudo();
      const previousHighScore = localStorage.getItem('high_score');
      let highScore;


      if (previousHighScore) {
        highScore = JSON.parse(previousHighScore);
        highScore.push({ pseudo: pseudoUser, score: tryCount });
      } else {
        highScore = [{ pseudo: pseudoUser, score: tryCount }];
      }

      localStorage.setItem("high_score", JSON.stringify(highScore))
      window.location.reload();

    } else if (newNumber < 0) {
      answer.innerHTML = "Tu dois donner un nombre positif.";
      setTimeout(function () { answer.innerHTML = ""; }, 2200)
    } else if (newNumber > 100) {
      answer.innerHTML = `Si je te dis un nombre entre 0 et 100 c'est pas pour me donner ${newNumber} ! Ta bus quoi ??`;
    }
    else if (randomNumber > newNumber) {
      answer.innerHTML = "Ton nombre est trop petit !!";
      setTimeout(function () { answer.innerHTML = ""; }, 2200)
    } else if (randomNumber < newNumber) {
      answer.innerHTML = "Ton nombre est trop grand !!";
      setTimeout(function () { answer.innerHTML = ""; }, 2200)
    }
    else {
      answer.innerHTML = "Ton nombre n'en ai pas un.";
      setTimeout(function () { answer.innerHTML = ""; }, 2200)
    }
  } else {
    answer.innerHTML = "La partie n'a pas encore commencer.";
    setTimeout(function () { answer.innerHTML = ""; }, 3000)
  }

}

const buttonStop = document.getElementById('game_stop');

buttonStop.onclick = function () {
  randomNumber = "";
  game_start = false;
  infoStart.innerHTML = "";
  buttonStart.innerHTML = "Start";
  console.log("Game stop successful");
  tryCount = 0;
  infoStart.innerHTML = "Appuis sur start pour commencer la partie<br />Bonne chance :)";
}






// const localHighScore = getHighScore(); je vais ligne 5 moi a plus
const localHighScoreBest = localHighScore.sort((a, b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0));
for (let i = 0; i < localHighScoreBest.length; i++) {

  let pHighScore = document.getElementById(`high_score${i}`);

  console.log(pHighScore)
  pHighScore.innerHTML = `${i + 1}. ${localHighScoreBest[i].pseudo} en ${localHighScoreBest[i].score} essais.`;
}
//Pour changer le tableau : mettre le nouveau tableau dans une variable (a = [1,2,3,4]) puis l'égaliser avec le tableau enregistrer (highScore = a), et set le tableau dans le local storage 
// localStorage.setItem("high_score", JSON.stringify(highScore))