// model
const html = document.getElementById('app');
let userChoice;
let computerChoice;
let userscore = 0;
let computerscore = 0;
let sfxx = new Audio(`./ResultSFX/tie${Math.ceil(Math.random() * 3)}.mp3`);
let endGameMusic;
let battleTheme = new Audio("battlesong.mp3");
let userSelect = '';
let computerSelect = '';
let winnerImg = '';
let winner;
let canSelectPokemon = true;
let battleEnd = false;
let vs = '';
let wonLost = '';
let rematch = '';



// view
updateView()
function updateView() {
    html.innerHTML = `
                        <div id="score">${userscore}:${computerscore}</div>
                        <p id="winloose">${wonLost}</p>
                        ${rematch}
                        <div id="selector">
                        <div ${canSelectPokemon ? "" : "hidden"} id="pokemons">
                        <button class="selection" id="blastoise" onclick="getUserChoice(blastoise);"><img src="blastoise.png"></button>
                        <button class="selection" id="venesaur" onclick="getUserChoice(venesaur);"><img src="venesaur.png"></button>
                        <button class="selection" id="charizard" onclick="getUserChoice(charizard);"><img src="charizard.png"></button>
                        </div>
                        <div id="user">${userSelect}</div>
                        <div id="vs">${vs}</div>
                        <div id="computer">${computerSelect}</div>
                        <div id="winner">${winnerImg}</div>
                        </div>
    `
}


// CONTROLLER


// AUDIO

function playResultSFX(result) {
    let sfx = new Audio('./ResultSFX/' + result + (Math.ceil(Math.random() * 3)) + '.mp3');
    console.log(sfx);
    sfx.play();

}

function playBattleTheme () {
    battleTheme.loop = true;
    battleTheme.volume = 0.2;
    battleTheme.play();
}

function playMonsterCry(name) {
    let cry = new Audio(name+ "_cry.mp3");
    cry.play ();
}


function getUserChoice(selected) {
 //Stian
 // får info når du trykker på en knapp, som sender IDen til knappen inn i variabelen "userchoice"
 if (canSelectPokemon === false){ return };
 canSelectPokemon = false;
 userChoice = selected.id;
 userSelect = `<img src="${userChoice}.png">`;
 vs = 'VS';
 playMonsterCry(userChoice);
 console.log("User selected " + userChoice);
 setTimeout(getComputerChoice, 2000);
 updateView();
}

//Genererer et tall mellom 0 - 2 og gir computerChoice en verdi basert på tallet.
function getComputerChoice() {
    //Henrik
    let number = Math.floor(Math.random() * 3)
    switch (number) {
        case 0:
            computerChoice = "blastoise"
            break;   
        case 1:
            computerChoice = "venesaur"
            break;   
        case 2:
            computerChoice = "charizard"
            break;              
        default:
            return 'Error';
        
    }   
    computerSelect =`<img src=${computerChoice}.png>`;
    playMonsterCry(computerChoice);
    console.log("Computer selected " + computerChoice );
    setTimeout(battleResult, 2000);
    updateView();
}
// sjekker resultatet mellom userChoice og computerChoice, legger til +1 i poeng til vinneren, eller 0 hvis uavgjort. 
function battleResult() {

result = checkIfUserWon(userChoice, computerChoice)
console.log(result)
playResultSFX(result);
switch(result){
    case 'tie':
        break;
    case 'victory':
        userscore++;
        updateView();
        break;
    
    case 'loss':
        computerscore++;
        updateView();
        break;
}
setTimeout(checkGameFinished, 3500);
vs = '';
}



function checkIfUserWon(userChoice, computerChoice) {
 
//Jonas
//Tar inn 2 valg og returnerer enten "victory", "tie" eller "loss"
 switch(userChoice) {
    case "blastoise": 
    switch(computerChoice) {
        case "blastoise":
        return "tie";
        
        case "venesaur":
        return "loss";
    
        case "charizard":
        return "victory";
    }
    break;

    case "venesaur": 
    switch(computerChoice) {
        case "blastoise":
        return "victory";
        
        case "venesaur":
        return "tie";
    
        case "charizard":
        return "loss";
    }
    break;

    case "charizard": 
    switch(computerChoice) {
        case "blastoise":
        return "loss";
        
        case "venesaur":
        return "victory";
    
        case "charizard":
        return "tie";
    }
    break;
    
    default:
    return "Error";
 }
 
} 

//Sjekk om e
function checkGameFinished() {
    
    if (userscore === 3 || computerscore === 3) {
        if (userscore === 3) {
            winnerImg =  `<img id="winner" src="ash_happy.png" />`
            wonLost = 'YOU WON!'
            rematch = `<a href="./intro.html"><button id="reset">Play again?</button></a>`
            battleEnd = true;
            endGameMusic = new Audio(`./ResultSFX/gameWon.mp3`)
            endGameMusic.play()
            battleTheme.pause()
        }
        if (computerscore === 3) {
            winnerImg = `<img id="looser" src="ash_sad.png" />`
            wonLost = 'YOU LOST!'
            rematch = `<a href="./intro.html"><button id="reset">Play again?</button></a>`
            battleEnd = true;
            endGameMusic = new Audio(`./ResultSFX/gameLoss.mp3`)
            endGameMusic.play()
            battleTheme.pause()
        }
    }
    userSelect = "";
    computerSelect = "";
    canSelectPokemon = !battleEnd;
    updateView();   

}



