const submitButton = document.getElementById('submit__btn');
const playerNameInput = document.getElementById('player-name');
const playerRoleInput = document.getElementById('player-role');
const playerShirtNumberInput = document.getElementById('shirt-no');
const captainCheck = document.getElementById('captain');
const wicketkeeperCheck = document.getElementById('wicketkeeper');

submitButton.addEventListener('click', () => {
    const playerProps = {
        name: playerNameInput.value,
        role: playerRoleInput.value,
        shirtNo: playerShirtNumberInput.value,
        isCaptain: captainCheck.checked,
        isWicketkeeper: wicketkeeperCheck.checked
    };

    console.log(playerProps);

    const apiUrl = 'http://localhost:3000/players/register'; 

    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Define a callback function to handle the response
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

});
