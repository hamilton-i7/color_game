const original = document.body.innerHTML;
const selectDifficulty = document.getElementById('js--selectDifficulty');
const easyMode = document.getElementById('js--easyMode');
const optionsMenu = document.querySelector('.options-menu');
const h2 = document.querySelector('.heading-secondary');

let menu;
let options;
let arrow;

document.addEventListener('click', changePage);
document.addEventListener('click', toggleMenu);


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

function toggleMenu(e) {
    const element = e.target;

    if(element.id === 'js--options') {
        displayOptionsMenu();
    }
    else if(element.parentElement.innerText === 'Options') {
        optionsMenu.style.display = 'none';
    }
    else if(element.id === 'js--exit') {
        reset();
    }
}

function reset() {
    document.body.innerHTML = original;
    document.body.removeAttribute('style');
}

function displayOptionsMenu() { 
    if(document.body.contains(optionsMenu)) {
        optionsMenu.style.display = 'block';
    }
    else {
        document.body.appendChild(optionsMenu);
        optionsMenu.style.display = 'block'; 
    }
}