let difficultyLevel;
let numberTypes;
let single;
let double;
let numbers = [];
let gameBoard;
let correctAnswer = 0;

window.onload = () => {
    gameBoard = document.getElementById('game-board');
    document.getElementById('start').addEventListener('click', start);
};

const start = () => {
    difficultyLevel = +document.getElementById('difficulty-level').value;
    numberTypes = document.getElementById('numbers-types').value;
    chooseLevel();
    createNumbers();
    // draw random numbers
    let timer;
    let index = 0;
    drawNumbers(index)
    index++
    timer = setInterval(() => {
        document.getElementById(index-1).remove()
        drawNumbers(index);
        index++;
        if (index === 5) {
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
    let randomisedNumber = document.createElement('div');
    randomisedNumber.classList.add('randomised-numbers');
    randomisedNumber.setAttribute('id', i);
    randomisedNumber.innerText = numbers[i];
    randomisedNumber.style.marginTop = Math.round(-50 + Math.random() * 100) + 'vh';
    randomisedNumber.style.marginLeft = Math.round(-50 + Math.random() * 100) + 'vw';
    document.getElementById('parent').style.display = 'none';
    gameBoard.append(randomisedNumber);
}

const drawAnswerForm = () => {
    document.getElementById('answer-input').value = '';
    let divsToHide = document.getElementsByClassName('randomised-numbers');
    for (let i = 0; i < divsToHide.length; i++) {
        divsToHide[i].remove();
    }
    document.getElementById('parent2').style.display = 'block';
    document.getElementById('answer-button').addEventListener('click', submitAnswer);
}

const submitAnswer = () => {
    correctAnswer = 0;
    const usersAnswer = document.getElementById('answer-input').value;
    for (let i = 0; i < numbers.length; i++) {
        correctAnswer = correctAnswer + numbers[i];
    }
    // check answer
    if (correctAnswer === +usersAnswer) {
        alert('You won!!!');
    } else {
        alert('You loose!!! correct answer was ' + correctAnswer);
    }
    // start new game
    const answerButtonNewGame = document.createElement('button');
    answerButtonNewGame.setAttribute('id', 'button-new-game');
    answerButtonNewGame.classList.add('button-new-game', 'btn', 'btn-success');
    answerButtonNewGame.innerText = 'start new game';
    document.getElementById('parent2').style.display = 'none';
    gameBoard.append(answerButtonNewGame);
    document.getElementById('button-new-game').addEventListener('click', startNewGame);
}

const startNewGame = () => {
    document.getElementById('button-new-game').remove();
    document.getElementById('parent').style.display = 'block';
    document.getElementById('start').addEventListener('click', start);
}
