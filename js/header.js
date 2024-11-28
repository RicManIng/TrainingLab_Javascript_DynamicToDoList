let hamMenuClass = 'fas fa-bars';
let closeMenuClass = 'fa-solid fa-x';
const username = document.body.getAttribute('data-username');
let idSel = queryString('selected');

function queryString(name) {
    let value = null;

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.has(prop) ? searchParams.get(prop) : null
    });
    value = params[name];
    console.log(`Value of ${name}: ${value}`);
    return value;
}

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
    if(idSel == elt.id){
        a.classList.add('selected');
    }
    li.appendChild(a);
    document.querySelector('header nav ul').appendChild(li);
}

createMenu();