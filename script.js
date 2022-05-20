let difficultyLevel;
let numberTypes;
let single;
let double;
let numbers = [];
const gameBoard = document.getElementById('game-board');
let correctAnswer = 0;
let number;

window.onload = () => {
    document.getElementById('start').addEventListener('click', start);
};

const start = () => {
    difficultyLevel = +document.getElementById('difficulty-level').value;
    numberTypes = document.getElementById('numbers-types').value;
    chooseLevel();
    createNumbers();
    // draw random numbers
    let index = 0;
    drawNumbers(index)
    index++
    const timer = setInterval(() => {
        document.getElementById(number).remove();
        drawNumbers(index);
        index++;
        if (index === numbers.length) {
            clearInterval(timer);
            // draw answer input
            setTimeout(() => { drawAnswerForm() }, difficultyLevel);
        }
    }, difficultyLevel);
}

const chooseLevel = () => {
    if (numberTypes === 'hard') {
        single = 0;
        double = 5;
    } else if (numberTypes === 'medium') {
        single = 3;
        double = 2;
    } else {
        single = 5;
        double = 0;
    }
}

const createNumbers = () => {
    numbers = [];
    for (let i = 0; i < single; i++) {
        numbers.push(Math.floor(1 + Math.random() * 9));
    }
    for (let i = 0; i < double; i++) {
        numbers.push(Math.floor(10 + Math.random() * 90));
    }
}

const drawNumbers = (i) => {
    number = 'number-'+i
    let randomisedNumber = document.createElement('div');
    randomisedNumber.classList.add('randomised-numbers');
    randomisedNumber.setAttribute('id', number);
    randomisedNumber.innerText = numbers[i];
    const randomPlaceCoordinates = Math.round(-50 + Math.random() * 100);
    randomisedNumber.style.marginTop = randomPlaceCoordinates + 'vh';
    randomisedNumber.style.marginLeft = randomPlaceCoordinates + 'vw';
    document.getElementById('start-form-container').style.display = 'none';
    gameBoard.append(randomisedNumber);
}

const drawAnswerForm = () => {
    document.getElementById('answer-input').value = '';
    let divsToHide = document.getElementsByClassName('randomised-numbers');
    for (let i = 0; i < divsToHide.length; i++) {
        divsToHide[i].remove();
    }
    document.getElementById('answer-form-container').style.display = 'block';
    document.getElementById('answer-button').addEventListener('click', submitAnswer);
}

const submitAnswer = () => {
    correctAnswer = 0;
    const usersAnswer = document.getElementById('answer-input').value;
    for (let i = 0; i < numbers.length; i++) {
        correctAnswer += numbers[i];
    }
    // check answer
    if (correctAnswer === +usersAnswer) {
        alert('You won.');
    } else {
        alert('You loose. correct answer was ' + correctAnswer);
    }
    // start new game
    const answerButtonNewGame = document.createElement('button');
    answerButtonNewGame.setAttribute('id', 'button-new-game');
    answerButtonNewGame.classList.add('button-new-game', 'btn', 'btn-success');
    answerButtonNewGame.innerText = 'start new game';
    document.getElementById('answer-form-container').style.display = 'none';
    gameBoard.append(answerButtonNewGame);
    document.getElementById('button-new-game').addEventListener('click', startNewGame);
}

const startNewGame = () => {
    document.getElementById('button-new-game').remove();
    document.getElementById('start-form-container').style.display = 'block';
}
