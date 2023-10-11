// Constants of Buttons
const SubmitButton = document.getElementById('submit__btn');
const ChoosePlayerButton = document.getElementById('choose__btn');

// Constants of Inputs
const PlayerNameInput = document.getElementById('player-name');
const PlayerRoleInput = document.getElementById('player-role');
const PlayerShirtNumberInput = document.getElementById('shirt-no');
const CaptainCheck = document.getElementById('captain');
const WicketkeeperCheck = document.getElementById('wicketkeeper');

// Constant of Containers
const playersParentContainer = document.querySelector('.form-players__player');

// Constant Objects
const playerProps = {
    name: PlayerNameInput.value,
    role: PlayerRoleInput.value,
    shirtNo: PlayerShirtNumberInput.value,
    isCaptain: CaptainCheck.checked,
    isWicketkeeper: WicketkeeperCheck.checked
};

// Variable for Json
let JsonData = [];

// Variable for Containers
var userPlayer;

// Onclick Eventlisteners
SubmitButton.addEventListener('click', () => {
    addPlayersInJson();
});

ChoosePlayerButton.addEventListener('click', () => {
    var playersAlreadyInHtml = playersParentContainer.childNodes.length;
    if (playersAlreadyInHtml > 1) {
        for (let i = 1; i > playersAlreadyInHtml; i += 2) {
            playersParentContainer.childNodes[i].style.display = 'none';
            console.log(playersParentContainer.childNodes[i].classList);
        }
    }

    fetchJsonData();

    for (let i = 0; i < JsonData.length; i++) {
        for (let j = 0; j < JsonData[i].length; j++) {
            const element = JsonData[i][j];
            console.log(`Element at index [${i}][${j}] is ${element}`);
            createPlayerDiv(element);
        }
    }

    let selectablePlayer = document.querySelectorAll('.player');
    playerSelection(selectablePlayer)
});

// Function for Create Players
function addPlayersInJson() {
    const apiUrl = 'http://localhost:3000/players/register';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = xhr.responseText;
            alert(response);
        } else {
            // Request encountered an error
            console.log('Request error. ');
        }
    };
    xhr.onerror = function () {
        console.error('Network error occurred.');
    };
    xhr.send(JSON.stringify(playerProps));
}

// Function for fetching Json Data
function fetchJsonData() {
    const jsonFilePath = 'players.json';

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            JsonData.push(data);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}

// Function for Creating Players
function createPlayerDiv(obj) {
    console.log(obj);
    // console.log(playersParentContainer.childNodes);
    let playerContainer = document.createElement('div');
    playerContainer.className = 'player';
    if (obj.isWicketkeeper === true) {
        playerContainer.innerHTML = `<div class="player__name">${obj.name} (WK)</div>
        <div class="player__speciality">Batsman</div>
        <div class="player__name">${obj.shirtNo}</div>`;
        playersParentContainer.appendChild(playerContainer.cloneNode(true));
    }
    else if (obj.isCaptain) {
        playerContainer.innerHTML = `<div class="player__name">${obj.name} (C)</div>
        <div class="player__speciality">${obj.role}</div>
        <div class="player__name">${obj.shirtNo}</div>`;
        playersParentContainer.appendChild(playerContainer.cloneNode(true));
    }
    else {
        playerContainer.innerHTML = `<div class="player__name">${obj.name}</div>
        <div class="player__speciality">${obj.role}</div>
        <div class="player__name">${obj.shirtNo}</div>`;
        playersParentContainer.appendChild(playerContainer.cloneNode(true));
    }

}

// Function for Selecting a Player
function playerSelection(playerArray) {

    for (var i = 0; i < playerArray.length; i++) {
        playerArray[i].addEventListener('click', (e) => {
            userPlayer = e.target;
            console.log(userPlayer);
            selectPlayer();
        })
        for (var i = 0; i < playerArray.length; i++) {
            playerArray[i].removeEventListener('click', selectPlayer);
        }
    }
}

function selectPlayer() {
    userPlayer.parentElement.style.background = 'darkcyan';
    userPlayer.parentElement.style.color = 'white';
}