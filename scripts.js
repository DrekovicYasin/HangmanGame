document.addEventListener('DOMContentLoaded', () => {
    const wordElement = document.getElementById('word'); // Element to display the word
    const wrongLettersElement = document.getElementById('wrong-letters-list'); // Element to display wrong letters
    const messageElement = document.getElementById('message'); // Element to display the message
    const popupContainer = document.getElementById('popup-container'); // Container for win/lose popup
    const successMessageElement = document.getElementById('success-message'); // Element to display the win/lose message
    const playAgainButton = document.getElementById('play-again'); // Button to play again

    let selectedWord = getRandomWord(); // Selecting a random word
    const correctLetters = []; // Array to hold correctly guessed letters
    const wrongLetters = []; // Array to hold wrongly guessed letters
    const hangmanItems = document.querySelectorAll('.item'); // Hangman graphics items

    // Function to select a random word
    function getRandomWord() {
        const words = [
            "javascript", "java", "python", "sql", "html",
            "css", "react", "node", "angular", "vue",
            "mongodb", "express", "typescript", "csharp",
            "ruby", "php", "swift", "kotlin", "perl", "scala"
        ];
        return words[Math.floor(Math.random() * words.length)];
    }

    // Function to display the word on screen
    function displayWord() {
        wordElement.innerHTML = selectedWord
            .split('')
            .map(letter => `
                <div class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </div>
            `)
            .join('');

        const wordText = wordElement.innerText.replace(/\n/g, '');
        // Checking for win condition
        if (wordText === selectedWord) {
            popupContainer.style.display = 'flex';
            successMessageElement.textContent = 'Congratulations, you won!';
        }
    }

    // Function to update wrong guessed letters
    function updateWrongLetters() {
        wrongLettersElement.innerHTML = wrongLetters
            .map(letter => `<span>${letter}</span>`)
            .join(', ');

        hangmanItems.forEach((item, index) => {
            item.style.display = index < wrongLetters.length ? 'block' : 'none';
        });

        // Checking for lose condition
        if (wrongLetters.length === hangmanItems.length) {
            popupContainer.style.display = 'flex';
            successMessageElement.textContent = 'Unfortunately, you lost!';
        }
    }

    // Function to display a message on screen
    function displayMessage() {
        messageElement.classList.add('show');
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 2000);
    }

    // Event listener for play again button
    playAgainButton.addEventListener('click', () => {
        correctLetters.splice(0);
        wrongLetters.splice(0);

        selectedWord = getRandomWord();
        displayWord();
        updateWrongLetters();

        popupContainer.style.display = 'none';
    });

    // Event listener for key press
    window.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        if (/^[a-z]$/.test(key)) {
            if (selectedWord.includes(key)) {
                if (!correctLetters.includes(key)) {
                    correctLetters.push(key);
                    displayWord();
                } else {
                    displayMessage();
                }
            } else {
                if (!wrongLetters.includes(key)) {
                    wrongLetters.push(key);
                    updateWrongLetters();
                } else {
                    displayMessage();
                }
            }
        }
    });

    displayWord(); // Initially display the word on screen
});
