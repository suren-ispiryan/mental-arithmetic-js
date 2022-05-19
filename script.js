let difficultyLevel;
let single;
let double;
let numbers = [];
let gameBoard = document.getElementById('game-board');
let correctAnswer = 0;

window.onload = () => {
    document.getElementById('start').addEventListener('click', start);
};

const start = () => {
    difficultyLevel = +document.getElementById('difficulty-level').value;
    chooseLevel();
    createNumbers();

    // draw random numbers
    let timer;
    let index = 0;
    timer = setInterval(() => {
        drawNumbers(index);
        index++;
        if (index === 5) {
            clearInterval(timer);

            // draw answer input
            setTimeout(() => {
                drawAnswerForm();

                document.getElementById('answer-button').addEventListener('click', submitAnswer);
            }, difficultyLevel);
        }
    }, difficultyLevel);
}

const chooseLevel = () => {
    if (difficultyLevel === 500) {
        single = 0;
        double = 5;
    } else if (difficultyLevel === 1000) {
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
    randomisedNumber.innerText = numbers[i];
    randomisedNumber.style.marginTop = Math.round(-50 + Math.random() * 100) + '%';
    randomisedNumber.style.marginLeft = Math.round(-50 + Math.random() * 100) + '%';
    gameBoard.innerHTML = '';
    gameBoard.append(randomisedNumber);
}

const drawAnswerForm = () => {
    // answer input
    const answerInput = document.createElement('input');
    answerInput.setAttribute('type', 'number');
    answerInput.setAttribute('placeholder', 'write answer');
    answerInput.setAttribute('id', 'answer-input');
    answerInput.classList.add('answer-input');

    // answer button
    const answerButton = document.createElement('button');
    answerButton.setAttribute('id', 'answer-button');
    answerButton.classList.add('answer-button', 'btn', 'btn-success');
    answerButton.innerText = 'answer';

    // append to DOM
    gameBoard.innerHTML = '';
    gameBoard.append(answerInput);
    gameBoard.append(answerButton);
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
    location.reload();
}
