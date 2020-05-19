const original = document.body.innerHTML;
const selectDifficulty = document.getElementById('js--selectDifficulty');
const easyMode = document.getElementById('js--easyMode');
const optionsMenu = document.getElementById('js--optionsMenu');
const h2 = document.querySelector('.heading-secondary');

let menu;

document.addEventListener('click', changePage);
document.addEventListener('click', toggleMenu);


function changePage(e) {
    const element = e.target;

    if(element.id === 'js--classic') {
        document.body.innerHTML = selectDifficulty.innerHTML;
    }
    else if(element.id === 'js--easy') {
        document.body.innerHTML = easyMode.innerHTML;
        document.body.style.backgroundImage = 'none';     
    }
}

function toggleMenu(e) {
    const element = e.target;

    if(element.id === 'js--options') {
        document.body.appendChild(optionsMenu.content);
        menu = document.querySelector('.options-menu');
        menu.style.display = 'block';
    }
    else if(element.id === 'js--arrow') {
        element.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }
}