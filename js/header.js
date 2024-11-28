let hamMenuClass = 'fas fa-bars';
let closeMenuClass = 'fa-solid fa-x';
const username = document.body.getAttribute('data-username');

async function createMenu(){
    let menuUrl = './resources/database/navMenu.json';
    let response = await fetch(menuUrl);
    let menu = await response.json();

    menu.forEach((item) => {
        if(username){
            if(item.id != 3){
                createElement(item);
            }
        } else {
            if(item.id != 4){
                createElement(item);
            }
        }
    });
}

function createElement(elt){
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = elt.url;
    a.textContent = elt.name;
    li.appendChild(a);
    document.querySelector('header nav ul').appendChild(li);
}

createMenu();