const original = document.body.innerHTML;
const selectDifficulty = document.getElementById('js--selectDifficulty');
const easyMode = document.getElementById('js--easyMode');
const optionsMenu = document.getElementById('js--optionsMenu');

document.addEventListener('click', changePage);
document.addEventListener('click', toggleMenu);


function changePage(e) {
    const element = e.target;

    if(element.id === 'js--classic') {
        document.body.innerHTML = selectDifficulty.innerHTML;
    }
    else if(element.id ==='js--arrow') {
        // document.body.innerHTML = original;
        // document.body.removeAttribute('style');
        optionsMenu.style.display = 'none';
        console.log('works');
    }
    else if(element.id === 'js--easy') {
        document.body.innerHTML = easyMode.innerHTML;
        document.body.style.backgroundImage = 'none';     
    }
}

function toggleMenu(e) {
    const element = e.target;

    if(element.id === 'js--options') {
        document.body.append(optionsMenu.content);
        optionsMenu.style.display = 'block';
    }
}

function off() {
    document.querySelector('.options').style.display = 'none';
}