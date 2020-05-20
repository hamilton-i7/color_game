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
        if(document.body.contains(menu)) {
            menu = document.querySelector('.options-menu');
            menu.style.display = 'block';
        }
        else {
            document.body.appendChild(optionsMenu.content);  
            menu = document.querySelector('.options-menu');
            menu.style.display = 'block'; 
        }
    }
    else if(element.id === 'js--arrow' || element.classList.contains('heading-secondary') || element.id === 'icon-arrow') {
        menu = document.querySelector('.options-menu');
        menu.style.display = 'none';
        console.log('works');
    }
}