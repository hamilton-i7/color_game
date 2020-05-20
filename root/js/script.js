const original = document.body.innerHTML;
const selectDifficulty = document.getElementById('js--selectDifficulty');
const easyMode = document.getElementById('js--easyMode');
const optionsMenu = document.querySelector('.options-menu');
const help = document.querySelector('.help');
const h2 = document.querySelector('.heading-secondary');

let menu;
let options;
let helpContent;
let arrow;

let box1;
let box2;
let box3;

let lifeCount;

document.addEventListener('click', changePage);
document.addEventListener('click', toggleOptionsMenu);
document.addEventListener('click', toggleHelp);
document.addEventListener('click', checkAnswer);
document.addEventListener('click', gameOver);

//* NAVIGATION

function changePage(e) {
    const element = e.target;

    if(element.id === 'js--classic') {
        document.body.innerHTML = selectDifficulty.innerHTML;
        arrow = document.querySelector('.icon-arrow');
        arrow.setAttribute('id', 'arrowDifficulty');
    }
    else if(element.id === 'js--easy') {
        document.body.innerHTML = easyMode.innerHTML;
        document.body.style.backgroundImage = 'none';
        options = document.querySelector('#js--options');

        setPrompt();
        changeBoxColor();
    }
    else if(element.id === 'arrowDifficulty') {
        reset();
    }
}

function toggleOptionsMenu(e) {
    const element = e.target;

    if(element.id === 'js--options') {
        displayOptionsMenu();
    }
    else if(element.parentElement.innerText === 'Options') {
        exitOptionsMenu();
    }
    else if(element.id === 'js--exit') {
        quitGame();
    }
}

function toggleHelp(e) {
    const element = e.target;

    if(element.id === 'js--help') {
        displayHelpInfo();
    }
    else if(element.id === 'js--helpOut') {
        exitHelpInfo();
    }
}

function quitGame() {
    document.body.innerHTML = original;
    document.body.removeAttribute('style');
}

function displayOptionsMenu() { 
    if(document.body.contains(optionsMenu)) {
        document.body.style.overflowY = 'hidden';
        optionsMenu.style.display = 'block';
    }
    else {
        document.body.appendChild(optionsMenu);
        document.body.style.overflowY = 'hidden';
        optionsMenu.style.display = 'block'; 
    }
}

function exitOptionsMenu() {
    document.body.style.overflowY = 'scroll'
    optionsMenu.style.display = 'none';
} 

function displayHelpInfo() {
    if(document.body.contains(help)) {
        document.body.style.overflowY = 'hidden';
        help.style.display = 'block';
    }
    else {
        document.body.appendChild(help);
        document.body.style.overflowY = 'hidden';
        help.style.display = 'block';
    }
}

function exitHelpInfo() {
    document.body.style.overflowY = 'scroll';
    help.style.display = 'none';
}


//* GAME LOGIC

function changeBoxColor(e) {
    box1 = document.getElementById('js--box1');
    box2 = document.getElementById('js--box2');
    box3 = document.getElementById('js--box3');

    const prompt = document.querySelector('.heading-primary').innerText.toLowerCase();
    const answer = prompt;
    const boxes = [box1, box2, box3];
    const max = boxes.length - 1;
    const min = 0;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    boxes[random].style.backgroundColor = answer;

    for(let i = 0; i < boxes.length; i++) {
        if(boxes[i] === boxes[random]) {
            boxes[i].style.backgroundColor = answer;
        }
        else {
            boxes[i].style.backgroundColor = `rgb(${randomNum(0, 255)})`;
        }
    } 
}

function randomNum(min, max) {
    let numbers = [];

    for(let i = 0; i < 3; i++) {
        numbers.push(Math.floor(Math.random() * max) + min);
    }

    return numbers;
}

function setPrompt() {
    const prompt = document.querySelector('.heading-primary');
    prompt.innerText = `rgb(${randomNum(0, 255)[0]}, ${randomNum(0, 255)[1]}, ${randomNum(0, 255)[2]})`;
}

function checkAnswer(e) {
    const element = e.target;
    const answer = document.querySelector('.heading-primary').innerText.toLowerCase();

    if(element.style.backgroundColor === answer) {
        setPrompt();
        changeBoxColor();
        reset();
    }
    else if(element.classList.contains('game__card') && element.style.backgroundColor !== answer) {
        element.style.visibility = 'hidden';
        loseLife();
        // gameOver();
    }
}

function reset() {
    box1 = document.getElementById('js--box1');
    box2 = document.getElementById('js--box2');
    box3 = document.getElementById('js--box3');
    const boxes = [box1, box2, box3];

    boxes.forEach(function(box) {
        box.style.visibility = 'visible';
    });
}

function loseLife() {
    lifeCount = document.getElementById('js--lives');
    const currentLife = Number(lifeCount.innerText.split(' ')[1]);
    const newLife = currentLife - 1;
    const result = lifeCount.innerText.replace(currentLife, newLife);
    
    return lifeCount.innerText = result;
}

function gameOver(e) {
    const element = e.target;
}