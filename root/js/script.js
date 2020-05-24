const original = document.body.innerHTML;
const selectDifficulty = document.getElementById('js--selectDifficulty');
const easyMode = document.getElementById('js--easyMode');
const hardMode = document.getElementById('js--hardMode');
const survivalMode = document.getElementById('js--survivalMode');
const optionsMenu = document.querySelector('.options-menu');
const help = document.querySelector('.help');
const gameoverScreen = document.querySelector('.gameover');
const victoryScreen = document.querySelector('.victory');
const h2 = document.querySelector('.heading-secondary');

let menu;
let mode;
let score;
let goal;
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

    if(element.classList.contains('js--classic')) {
        displayDifficultyMenu();
    }
    else if(element.id === 'arrowDifficulty') {
        displayMainMenu();
    }
    else if(element.classList.contains('js--easy')) {
        displayGameContent(easyMode);
        setPrompt();
        changeBoxColor();
    }
    else if(element.classList.contains('js--hard')) {
        displayGameContent(hardMode);
        setPrompt();
        changeBoxColor();
    }
    else if(element.classList.contains('js--survival')) {
        displayGameContent(survivalMode);
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
    mode = document.querySelector('.js--mode');

    if(element.classList.contains('js--options')) {
        displayScreen(optionsMenu);
        document.querySelector('.main-menu-list__item:nth-child(2)').style.display = 'block';

        if(document.querySelector('.js--mode').innerText === 'SURVIVAL') {
            document.querySelector('.main-menu-list__item:nth-child(2)').style.display = 'none';
        }
    }
    else if(element.parentElement.innerText === 'Options') {
        exitOptionsMenu();
    }
    else if(element.classList.contains('js--exit')) {
        displayMainMenu();
    }
    else if(element.classList.contains('js--newGame')) {
        optionsMenu.style.display = 'none';
        setPrompt();
        reset();
        changeBoxColor();
        
        exitScreen(gameoverScreen);
        exitScreen(victoryScreen);
    }
    else if(element.classList.contains('js--difficulty') && (mode.innerText === 'EASY' || mode.innerText === 'HARD')) {
        displayDifficultyMenu();
    }
}

function displayScreen(screen) {
    if(document.body.contains(screen)) {
        document.body.style.overflowY = 'hidden';
        screen.style.display = 'block';
    }
    else {
        document.body.appendChild(screen);
        document.body.style.overflowY = 'hidden';
        screen.style.display = 'block'; 
    }
}

function exitScreen(screen) {
    document.body.style.overflowY = 'scroll'
    screen.style.display = 'none';
}

function toggleHelp(e) {
    const element = e.target;

    if(element.classList.contains('js--help')) {
        displayScreen(help);
    }
    else if(element.classList.contains('js--helpOut')) {
        exitScreen(help);
    }
}

function displayGameContent(content) {
    document.body.innerHTML = content.innerHTML;
    document.body.style.backgroundImage = 'none';
    options = document.querySelector('.js--options');
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

    if(document.body.contains(document.querySelector('.js--box6'))) {
        box1 = document.querySelector('.js--box1');
        box2 = document.querySelector('.js--box2');
        box3 = document.querySelector('.js--box3');
        box4 = document.querySelector('.js--box4');
        box5 = document.querySelector('.js--box5');
        box6 = document.querySelector('.js--box6');
    
        settingBackground([box1, box2, box3, box4, box5, box6]);
    }
    else if(document.body.contains(document.querySelector('.js--box5'))) {
        box1 = document.querySelector('.js--box1');
        box2 = document.querySelector('.js--box2');
        box3 = document.querySelector('.js--box3');
        box4 = document.querySelector('.js--box4');
        box5 = document.querySelector('.js--box5');
        settingBackground([box1, box2, box3, box4, box5]);
    }
    else {
        box1 = document.querySelector('.js--box1');
        box2 = document.querySelector('.js--box2');
        box3 = document.querySelector('.js--box3');
    
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
    mode = document.querySelector('.js--mode');

    if(element.style.backgroundColor === answer && mode.innerText === 'SURVIVAL') {
        setPrompt();
        changeBoxColor();
        boxesSurvival();
        addScore();
        checkVictory();
    }
    else if(element.style.backgroundColor === answer && (mode.innerText === 'EASY' || mode.innerText === 'HARD')) {
        setPrompt();
        reset();
        changeBoxColor();
    }
    else if(element.classList.contains('game__card') && element.style.backgroundColor !== answer) {
        element.style.visibility = 'hidden';
        loseLife();
    }
}

function reset() {
    if(document.body.contains(document.querySelector('.js--box6'))) {
        boxesHard();
        lifeCount = document.querySelector('.js--lives').innerText = 'LIVES: 2';
    }
    else if(document.body.contains(document.querySelector('.js--box5'))) {
        boxesSurvival();
        lifeCount = document.querySelector('.js--lives').innerText = 'LIVES: 5';
        score = document.querySelector('.js--score').innerText = 'SCORE: 0';
    }
    else {
        boxesEasy();
        lifeCount = document.querySelector('.js--lives').innerText = 'LIVES: 2';
    }
}

function boxesEasy() {
    box1 = document.querySelector('.js--box1');
    box2 = document.querySelector('.js--box2');
    box3 = document.querySelector('.js--box3');
    const boxes = [box1, box2, box3];

    return (boxes.forEach(function(box) {
        box.style.visibility = 'visible';
    }));
}

function boxesHard() {
    box1 = document.querySelector('.js--box1');
    box2 = document.querySelector('.js--box2');
    box3 = document.querySelector('.js--box3');
    box4 = document.querySelector('.js--box4');
    box5 = document.querySelector('.js--box5');
    box6 = document.querySelector('.js--box6');
    const boxes = [box1, box2, box3, box4, box5, box6];

    return (boxes.forEach(function(box) {
        box.style.visibility = 'visible';
    }));
}

function boxesSurvival() {
    box1 = document.querySelector('.js--box1');
    box2 = document.querySelector('.js--box2');
    box3 = document.querySelector('.js--box3');
    box4 = document.querySelector('.js--box4');
    box5 = document.querySelector('.js--box5');
    const boxes = [box1, box2, box3, box4, box5];

    return (boxes.forEach(function(box) {
        box.style.visibility = 'visible';
    }));
}

function loseLife() {
    lifeCount = document.querySelector('.js--lives');
    const currentLife = Number(lifeCount.innerText.split(' ')[1]);
    const newLife = currentLife - 1;
    const result = lifeCount.innerText.replace(currentLife, newLife);

    return lifeCount.innerText = result;    
}

function gameover(e) {
    const element = e.target;
    const answer = document.querySelector('.heading-primary').innerText;
    lifeCount = document.querySelector('.js--lives');

    if((element.classList.contains('game__card') && element.style.backgroundColor !== answer) && lifeCount.innerText === 'LIVES: 0') {
        displayScreen(gameoverScreen);
        document.querySelector('.main-menu-list__item:nth-child(2)').style.display = 'block';
        displayAnswer();

        if(document.querySelector('.js--mode').innerText === 'SURVIVAL') {
            document.querySelector('.main-menu-list__item:nth-child(2)').style.display = 'none';
        }
    }
}

function displayAnswer() {
    const answer = document.querySelector('.heading-primary').innerText;

    answerText = document.querySelector('.js--answerText');
    answerColor = document.querySelector('.js--answerColor');
    answerText.innerHTML = `<span>Answer: </span>${answer.toUpperCase()}`;
    answerColor.style.backgroundColor = answer;
}

function addScore() {
    score = document.querySelector('.js--score');
    const currentScore = Number(score.innerText.split(' ')[1]);
    const newScore = currentScore + 1;
    const result = score.innerText.replace(currentScore, newScore);

    return score.innerText = result; 
}

function checkVictory() {
    score = document.querySelector('.js--score');
    goal = document.querySelector('.js--goalSurvival');
    const currentScore = Number(score.innerText.split(' ')[1]);
    const currentGoal = Number(goal.innerText.split(' ')[1]);

    if(currentScore === currentGoal) {
        displayScreen(victoryScreen);
    }

}