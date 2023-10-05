// Constants
const SubmitButton = document.getElementById('submit__btn');
const ChoosePlayerButton = document.getElementById('choose__btn');
const PlayerNameInput = document.getElementById('player-name');
const PlayerRoleInput = document.getElementById('player-role');
const PlayerShirtNumberInput = document.getElementById('shirt-no');
const CaptainCheck = document.getElementById('captain');
const WicketkeeperCheck = document.getElementById('wicketkeeper');
const playerProps = {
    Name: PlayerNameInput.value,
    Role: PlayerRoleInput.value,
    ShirtNo: PlayerShirtNumberInput.value,
    IsCaptain: CaptainCheck.checked,
    isWicketkeeper: WicketkeeperCheck.checked
};

// Variables
let JsonData=[];

// Onclick Eventlisteners
SubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    AddPlayersInJson();
});

ChoosePlayerButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchJsonData();
    console.log(JsonData);
});

// Functions
function AddPlayersInJson() {
    const apiUrl = 'http://localhost:3000/players/register/choose';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = xhr.responseText;
            console.log(response);
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