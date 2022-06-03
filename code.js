let randomNumber = 0;
let tryCount = 0; //compteur d'essai
let gameStart = false; //si la game à commencer
const infoStart = document.getElementById('infoStart');
const localHighScore = getHighScore();
const buttonStart = document.getElementById('start_game');
const titleHighScore = document.getElementById('titleHighScore');
const h1 = document.getElementById('h1');

buttonStart.onclick = function () {
  if (gameStart === false) {
    randomNumber = getRandomInt(100);
    console.log('Game started with number:', randomNumber);
    gameStart = true;
    infoStart.innerHTML =
      'La partie à commencer. <br /> Tu peux remplir le champs avec un nombre positif.';
    buttonStart.innerHTML = 'Restart';
    tryCount = 0;
    answer.innerHTML = '';
  } else {
    randomNumber = getRandomInt(100);
    console.log('Game started with number:', randomNumber);
    tryCount = 0;
    answer.innerHTML = '';
    infoStart.innerHTML =
      'La partie de <span id="infosrart_re">recommencer</span>. Le nombre à été regénéré. <br /> Tu peux remplir le champs avec un nombre positif.';
    setTimeout(function () {
      answer.innerHTML = '';
    }, 2200);
    setTimeout(function () {
      infoStart.innerHTML =
        'La partie à commencer. <br /> Tu peux remplir le champs avec un nombre positif.';
    }, 3500);
  }
};

// Utils
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getHighScore() {
  return JSON.parse(localStorage.getItem('high_score'));
}

function getUserPseudo() {
  const pseudo = prompt(
    `Bravo ! Tu as réussi en ${tryCount} essai. Donne moi ton pseudo pour faire partie du highScore !`
  );
  if (pseudo === null) {
    return null;
  }
  if (pseudo === '') {
    return null;
  }
  if (pseudo === undefined) {
    return null;
  }

  if (pseudo.length < 3 || pseudo.length > 18) {
    alert('Votre pseudo doit contenir entre 3 et 18 caractères.');
    return getUserPseudo();
  } else {
    if (localHighScore === null) {
      return pseudo;
    } else {
      const found = localHighScore.find((highScore) => highScore.pseudo === pseudo);

      if (found) {
        alert('Votre pseudo est déjà utilisé.');
        return getUserPseudo();
      }
      return pseudo;
    }
  }
}
function changeStyleAnswer(couleur, fontWeight) {
  answer.style.color = couleur;
  answer.style.fontWeight = fontWeight;
}

const sendNumber = document.getElementById('sendNumber');
const numberByUser = document.getElementById('number_give');

//lorsque qu'on clic sur tester
sendNumber.onclick = function () {
  const answer = document.getElementById('answer');
  newNumber = Number(numberByUser.value);
  numberByUser.value = '';

  console.log('User have sent the number: ', newNumber);

  tryCount++;
  if (gameStart) {
    if (randomNumber === newNumber) {
      answer.innerHTML = `<h2><span class="h2_color1">B</span><span class="h2_color2">R</span><span class="h2_color3">A</span><span class="h2_color4">V</span><span class="h2_color5">O</span></h2>
      Tu as réussi à trouver le nombre que je pensais qui était <span class="configuration_number">${randomNumber}</span>. <br/> Tu l'as trouvé en ${tryCount} essais. `;

      gameStart = false;
      console.log('Game stop successful');

      pseudoUser = getUserPseudo();
      const previousHighScore = localStorage.getItem('high_score');
      let highScore;

      if (pseudoUser === null) {
      } else {
        if (previousHighScore) {
          highScore = JSON.parse(previousHighScore);
          highScore.push({ pseudo: pseudoUser, score: tryCount });
        } else {
          highScore = [{ pseudo: pseudoUser, score: tryCount }];
        }
      }

      localStorage.setItem('high_score', JSON.stringify(highScore));
      //let b = [{ pseudo: "Pascal", score: 13 }, { pseudo: "Lopiro", score: 11 }, { pseudo: "Calme", score: 25 }, { pseudo: "sorcière", score: 20 }, { pseudo: "PascalLeGrandFrere", score: 22 }, { pseudo: "Jean-mi", score: 65 }, { pseudo: "Aurelien", score: 16 }, { pseudo: "LeMenuisier", score: 30 },{ pseudo: "Karott", score: 85 },{ pseudo: "Zèbre", score: 38 }, { pseudo: "Pommier", score: 56 }, { pseudo: "PatateOfourt", score: 58 }, { pseudo: "Toto", score: 89 }];

      window.location.reload();
    } else if (newNumber < 0) {
      answer.innerHTML = newNumber + ': Tu dois donner un nombre positif.';
      changeStyleAnswer('black', 'bold');
      console.log(answer.style.fontWeight);
      setTimeout(function () {
        answer.innerHTML = '';
      }, 2200);
    } else if (newNumber > 100) {
      answer.innerHTML = `Si je te dis un nombre entre 0 et 100 c'est pas pour me donner ${newNumber} ! Ta bus quoi ??`;
      changeStyleAnswer('black', 'normal');
      setTimeout(function () {
        answer.innerHTML = '';
      }, 3500);
    } else if (randomNumber > newNumber) {
      answer.innerHTML = newNumber + ': Ce nombre est trop petit !!';
      setTimeout(function () {
        answer.innerHTML = '';
      }, 2200);
      changeStyleAnswer('#05308b', 'normal');
    } else if (randomNumber < newNumber) {
      answer.innerHTML = newNumber + ': Ce nombre est trop grand !!';
      setTimeout(function () {
        answer.innerHTML = '';
      }, 2200);
      changeStyleAnswer('#7a1010', 'bold');
    } else {
      answer.innerHTML = "Ce nombre n'en ai pas un.";
      setTimeout(function () {
        answer.innerHTML = '';
      }, 2200);
      changeStyleAnswer('#592d01', 'normal');
    }
  } else {
    answer.innerHTML = "Erreur: La partie n'a pas encore commencer.";
    setTimeout(function () {
      answer.innerHTML = '';
    }, 3000);
    changeStyleAnswer('#592d01', 'normal');
  }
};

const buttonStop = document.getElementById('game_stop');

buttonStop.onclick = function () {
  randomNumber = '';
  gameStart = false;
  infoStart.innerHTML = '';
  buttonStart.innerHTML = 'Start';
  console.log('Game stop successful');
  tryCount = 0;
  infoStart.innerHTML =
    'Appuis sur start pour commencer la partie<br />Bonne chance :)';
};

// const localHighScore = getHighScore(); je vais ligne 5 moi a plus
const localHighScoreBest = localHighScore.sort((a, b) =>
  a.score > b.score ? 1 : b.score > a.score ? -1 : 0
);
for (let i = 0; i < localHighScoreBest.length; i++) {
  if (i < 10) {
    let pHighScore = document.getElementById(`high_score${i}`);

    console.log(pHighScore);
    pHighScore.innerHTML = `${i + 1}. ${localHighScoreBest[i].pseudo} en ${
      localHighScoreBest[i].score
    } essais.`;
  } else {
    console.log('more up');
  }
}
//Pour changer le tableau : mettre le nouveau tableau dans une variable (a = [1,2,3,4]) puis l'égaliser avec le tableau enregistrer (highScore = a), et set le tableau dans le local storage
// localStorage.setItem("high_score", JSON.stringify(highScore))

const color = [
  'blue',
  'red',
  'yellow',
  'rosybrown',
  'royalblue',
  'hotpink',
  'lawngreen',
  'white',
  'aqua',
  'purple',
  'olivedrab',
  'orange',
  'yellowgreen',
  'maroon',
  'pink',
];
const textHighScore = [
  'MeilLeur Sco_re',
  'FeiLLeur Score',
  'Meill3ur 5cor3',
  'M3illeur Sc0re',
  'MeilleUR Score',
  'SCORE MeiLLeur',
  'm33lleur ScoRE',
  'MeiooeuR sc0re',
  'M$éll$eur ScOrE',
  'M3IkLEUR Score',
  'Meilleur SCORE',
  'meilleur Sc0RE',
  'Meill__r Sc_re',
  'M!ill!ur Score',
  'M!il__ur Sc!re',
];
const colorh1 = ['#592d01', '#301d0b', '#924d0d'];

function changeColorh1(counth1) {
  setTimeout(() => {
    h1.style.color = colorh1[counth1];
    const newValue = (counth1 + 1) % colorh1.length;
    changeColorh1(newValue);
  }, 2000);
}
changeColorh1(0);

function changeColor(countColor) {
  setTimeout(function () {
    titleHighScore.style.backgroundColor = color[countColor];
    titleHighScore.innerHTML = textHighScore[countColor];
    const newValue = (countColor + 1) % color.length;
    changeColor(newValue);
  }, 2500);
}
changeColor(0);

//setTimeout(function () { titleHighScore.style.backgroundColor = color[8] }, 3500);
