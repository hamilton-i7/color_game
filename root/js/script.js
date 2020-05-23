const original = document.body.innerHTML;
const selectDifficulty = document.getElementById('js--selectDifficulty');
const easyMode = document.getElementById('js--easyMode');
const hardMode = document.getElementById('js--hardMode');
const optionsMenu = document.querySelector('.options-menu');
const help = document.querySelector('.help');
const h2 = document.querySelector('.heading-secondary');
const gameoverScreen = document.querySelector('.gameover');

let menu;
let options;
let helpContent;
let arrow;

let box1;
let box2;
let box3;
let box4;
let box5;
let box6;

let lifeCount;
let answerText;
let answerColor;

document.addEventListener('click', changePage);
document.addEventListener('click', toggleOptionsMenu);
document.addEventListener('click', toggleHelp);
document.addEventListener('click', checkAnswer);
document.addEventListener('click', gameover);


//* NAVIGATION
function changePage(e) {
    const element = e.target;

    if(element.id === 'js--classic') {
        displayDifficultyMenu();
    }
    else if(element.id === 'arrowDifficulty') {
        displayMainMenu();
    }
    else if(element.id === 'js--easy') {
        displayGameContent(easyMode);
        setPrompt();
        changeBoxColor();
    }
    else if(element.id === 'js--hard') {
        displayGameContent(hardMode);
        setPrompt();
        changeBoxColor();
    }
}

function displayMainMenu() {
    document.body.innerHTML = original;
    document.body.removeAttribute('style');
}

function displayDifficultyMenu() {
    document.body.innerHTML = selectDifficulty.innerHTML;
    document.body.removeAttribute('style');
    arrow = document.querySelector('.icon-arrow');
    arrow.setAttribute('id', 'arrowDifficulty');
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
        displayMainMenu();
    }
    else if(element.id === 'js--newGame') {
        optionsMenu.style.display = 'none';
        newGame();
        exitGameoverScreen();
    }
    else if(element.id === 'js--difficulty') {
        displayDifficultyMenu();
    }
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

function toggleHelp(e) {
    const element = e.target;

    if(element.id === 'js--help') {
        displayHelpInfo();
    }
    else if(element.id === 'js--helpOut') {
        exitHelpInfo();
    }
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

function displayGameoverScreen() {
    if(document.body.contains(gameoverScreen)) {
        document.body.style.overflowY = 'hidden';
        gameoverScreen.style.display = 'block';
    }
    else {
        document.body.appendChild(gameoverScreen);
        document.body.style.overflowY = 'hidden';
        gameoverScreen.style.display = 'block'; 
    }
}

function exitGameoverScreen() {
    document.body.style.overflowY = 'scroll'
    gameoverScreen.style.display = 'none';
}

function displayGameContent(content) {
    document.body.innerHTML = content.innerHTML;
    document.body.style.backgroundImage = 'none';
    options = document.querySelector('#js--options');
}



//* GAME LOGIC
function settingBackground(boxes) {
    const prompt = document.querySelector('.heading-primary').innerText.toLowerCase();
    const answer = prompt;
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

function changeBoxColor() {

    if(document.body.contains(document.querySelector('#js--box6'))) {
        box1 = document.getElementById('js--box1');
        box2 = document.getElementById('js--box2');
        box3 = document.getElementById('js--box3');
        box4 = document.getElementById('js--box4');
        box5 = document.getElementById('js--box5');
        box6 = document.getElementById('js--box6');
    
        settingBackground([box1, box2, box3, box4, box5, box6]);
    }
    else {
        box1 = document.getElementById('js--box1');
        box2 = document.getElementById('js--box2');
        box3 = document.getElementById('js--box3');
    
        settingBackground([box1, box2, box3]);
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
        newGame();
    }
    else if(element.classList.contains('game__card') && element.style.backgroundColor !== answer) {
        element.style.visibility = 'hidden';
        loseLife();
    }
}

function reset() {
    if(document.body.contains(document.querySelector('#js--box6'))) {
        boxesHard();
        lifeCount = document.getElementById('js--lives').innerText = 'LIVES: 2';
    }
    else {
        boxesEasy();
        lifeCount = document.getElementById('js--lives').innerText = 'LIVES: 2';
    }
}

function boxesEasy() {
    box1 = document.getElementById('js--box1');
    box2 = document.getElementById('js--box2');
    box3 = document.getElementById('js--box3');
    const boxes = [box1, box2, box3];

    return (boxes.forEach(function(box) {
        box.style.visibility = 'visible';
    }));
}

function boxesHard() {
    box1 = document.getElementById('js--box1');
    box2 = document.getElementById('js--box2');
    box3 = document.getElementById('js--box3');
    box4 = document.getElementById('js--box4');
    box5 = document.getElementById('js--box5');
    box6 = document.getElementById('js--box6');
    const boxes = [box1, box2, box3, box4, box5, box6];

    return (boxes.forEach(function(box) {
        box.style.visibility = 'visible';
    }));
}

function newGame() {
    setPrompt();
    reset();

    if(document.body.contains(document.querySelector('#js--box6'))) {
        changeBoxColor();
    }
    else {
        changeBoxColor();
    }
}

function loseLife() {
    lifeCount = document.getElementById('js--lives');
    const currentLife = Number(lifeCount.innerText.split(' ')[1]);
    const newLife = currentLife - 1;
    const result = lifeCount.innerText.replace(currentLife, newLife);
    
    return lifeCount.innerText = result;
}

function gameover(e) {
    const element = e.target;
    const answer = document.querySelector('.heading-primary').innerText;
    lifeCount = document.getElementById('js--lives');

    if((element.classList.contains('game__card') && element.style.backgroundColor !== answer) && lifeCount.innerText === 'LIVES: 0') {
        displayGameoverScreen();
        displayAnswer();
    }
}

function displayAnswer() {
    const answer = document.querySelector('.heading-primary').innerText;

    answerText = document.getElementById('js--answerText');
    answerColor = document.getElementById('js--answerColor');
    answerText.innerHTML = `<span>Answer: </span>${answer.toUpperCase()}`;
    answerColor.style.backgroundColor = answer;
}