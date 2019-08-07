const buttonStart = document.getElementById('start_game')
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let randomNumber = 0;
let tryCount = 0; //compteur d'essai
let game_start = false; //si la game à commencer
let infoStart = document.getElementById('infoStart');
//début de partie

let getHighScore = function () {
  localHighScore = JSON.parse(localStorage.getItem("high_score"));
  return localHighScore;
}
getHighScore();

buttonStart.onclick = function () {
  randomNumber = getRandomInt(100);
  console.log("Game started with number:", randomNumber);
  game_start = true;
  infoStart.innerHTML = "La partie à commencer. <br /> Tu peux remplir le champs avec un nombre positif.";
  buttonStart.innerHTML = "Restart";
  tryCount = 0;
  answer.innerHTML = "";
}

const sendNumber = document.getElementById('sendNumber');
let numberByUser = 0;
numberByUser = document.getElementById('number_give');

let high_score = ["Melvyn;12", "Michel;7"];



//lorsque qu'on clic sur tester
sendNumber.onclick = function () {
  
  let answer = document.getElementById('answer');
  newNumber = Number(numberByUser.value);
  numberByUser.value = "";

  console.log("User have send the number: ", newNumber);

  tryCount++;
  console.log(tryCount);
  if (game_start === true) {
    if (randomNumber === newNumber) {
      answer.innerHTML = `<h2><span class="h2_color1">B</span><span class="h2_color2">R</span><span class="h2_color3">A</span><span class="h2_color4">V</span><span class="h2_color5">O</span></h2>
      Tu as réussi à trouver le nombre que je pensais qui était <span class="configuration_number">${randomNumber}</span>. <br/> Tu l'as trouvé en ${tryCount} essais. `;
      
      console.log("Game stop successful");
      game_start = false;
      let pseudoU = prompt('Donnez moi votre pseudo :');
      high_score.push(`${pseudoU};${tryCount}`);
      localStorage.setItem("high_score", JSON.stringify(high_score))
      console.log(high_score);













    } else if (newNumber < 0) {
      answer.innerHTML = "Tu dois donner un nombre positif.";
      setTimeout(function(){ answer.innerHTML = ""; }, 2200)
    } else if (newNumber > 100) {
      answer.innerHTML = `Si je te dis un nombre entre 0 et 100 c'est pas pour me donner ${newNumber} ! Ta bus quoi ??`;
    }
    else if (randomNumber > newNumber) {
      answer.innerHTML = "Ton nombre est trop petit !!";
      setTimeout(function(){ answer.innerHTML = ""; }, 2200)
    } else if (randomNumber < newNumber) {
      answer.innerHTML = "Ton nombre est trop grand !!";
      setTimeout(function(){ answer.innerHTML = ""; }, 2200)
    } 
    else {
      answer.innerHTML = "Ton nombre n'en ai pas un.";
      setTimeout(function(){ answer.innerHTML = ""; }, 2200)
    }
  }else {
    answer.innerHTML = "La partie n'a pas encore commencer.";
    setTimeout(function(){ answer.innerHTML = ""; }, 3000)
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


function splitString(stringToSplit, separator) {
  return stringToSplit.split(separator);
}

for (let i = 0; i < localHighScore.length; i++) {
  const array = splitString(localHighScore[i], ";");
  let pHighScore = document.getElementById(`high_score${i}`);

  console.log(pHighScore)
  pHighScore.innerHTML = `${i + 1}. ${array[0]} en ${array[1]} essais.`;

}








