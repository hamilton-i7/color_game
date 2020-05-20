const original = document.body.innerHTML;
const selectDifficulty = document.getElementById('js--selectDifficulty');
const easyMode = document.getElementById('js--easyMode');
const optionsMenu = document.querySelector('.options-menu');
const help = document.querySelector('.help');
const h2 = document.querySelector('.heading-secondary');

let menu;
let options;
let arrow;
let helpContent;

document.addEventListener('click', changePage);
document.addEventListener('click', toggleOptionsMenu);
document.addEventListener('click', toggleHelp);


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
        reset();
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

function reset() {
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