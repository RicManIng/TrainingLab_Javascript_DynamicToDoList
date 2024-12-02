async function loadTaskTypes() {
    // Load tasks from local storage
    let menuUrl = './resources/database/taskTypes.json';
    let response = await fetch(menuUrl);
    let taskTypes = await response.json();
    return taskTypes;
}

async function loadTasks() {
    // Load tasks from local storage
    let menuUrl = './resources/database/task.json';
    let response = await fetch(menuUrl);
    let tasks = await response.json();
    return tasks;
}

function queryString(name) {
    let value = null;

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.has(prop) ? searchParams.get(prop) : null
    });
    value = params[name];
    console.log(`Value of ${name}: ${value}`);
    return value;
}

function checkDescriptionLenght(event){
    let elt = event.target;
    let description = elt.value;
    let descriptionLength = description.replace(/\s/g, '').length;
    let infoMsg = document.querySelector('#descriprion-counter');
    if (descriptionLength < 20){
        infoMsg.textContent = `${20 - descriptionLength} characters left`;
    } else {
        infoMsg.textContent = '';
    }
}

function correctTypeStyle(event){
    let elt = event.target;
    let selectValue = elt.value;
    if (selectValue != ''){
        elt.classList.add('full');
    } else {
        elt.classList.remove('full');
    }
}

function loadUrgency(level){
    let buttonArray = document.querySelectorAll('.urgency');
    buttonArray.forEach(urgencyButton => {
        if(urgencyButton.id <= level){
            urgencyButton.classList.add('selected');
        }
    });
}

function urgencyHoverEffect(event){
    let elt = event.target;
    let buttonArray = document.querySelectorAll('.urgency');
    let buttonId = elt.id;
    buttonArray.forEach(urgencyButton => {
        if(urgencyButton.id < buttonId){
            urgencyButton.classList.add('selected');
            urgencyButton.classList.add('semi-selected');
        } else if (urgencyButton.id == buttonId){
            urgencyButton.classList.remove('semi-selected');
            urgencyButton.classList.add('selected');
        } else {
            urgencyButton.classList.remove('selected');
            urgencyButton.classList.remove('semi-selected');
        }
    });
}

function urgencyLeaveEffect(event){
    let buttonArray = document.querySelectorAll('.urgency');
    buttonArray.forEach(urgencyButton => {
        urgencyButton.classList.remove('selected');
        urgencyButton.classList.remove('semi-selected');
    });
}

function createSelectOptions(taskTypes, task){
    let selectElt = document.querySelector('#type');
    taskTypes.forEach((type) => {
        let option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name;
        option.classList.add('option-selection');
        if (task.type === type.name){
            option.selected = true;
        }
        selectElt.appendChild(option);
    });
}

function checkFormStatus(){
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;
    let type = document.querySelector('#type').value;
    let urgency = document.querySelector('#urgency').value;
    let submit = document.querySelector('#submit');

    if (name != '' && description != '' && type != '' && urgency != '' && description.replace(/\s/g, '').length >= 20){
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }

    console.log(`Name: ${name}, Description: ${description}, Type: ${type}, Urgency: ${urgency}, Submit: ${submit.disabled}`);
}




window.onload = async function(){
    let taskTypes = await loadTaskTypes();
    let taskArray = await loadTasks();
    let task = taskArray.find(task => task.id == queryString('id'));
    if (!task){
        task = {
            id: taskArray.length + 1,
            name: '',
            description: '',
            type: '',
            urgency: 0
        };
    }
    createSelectOptions(taskTypes, task);

    let descriptionElt = document.querySelector('#description');
    descriptionElt.addEventListener('keyup', descriptionElt => {
        checkDescriptionLenght(descriptionElt);
        checkFormStatus();
    });

    let selectElt = document.querySelector('#type');
    let selectValue = selectElt.value;
    if (selectValue != ''){
        selectElt.classList.add('full');
    }
    selectElt.addEventListener('change', selectElt => {
        correctTypeStyle(selectElt);
        checkFormStatus();
    });

    let urgencyButtonsArray = document.querySelectorAll('.urgency');
    urgencyButtonsArray.forEach(urgencyButton => {
        urgencyButton.addEventListener('mouseover', urgencyHoverEffect);
        urgencyButton.addEventListener('click', function(){
            task.urgency = urgencyButton.id;
            loadUrgency(task.urgency);
            let urgency = document.querySelector('#urgency');
            urgency.value = task.urgency;
            checkFormStatus();
        });
        urgencyButton.addEventListener('mouseleave', function(){
            urgencyLeaveEffect();
            loadUrgency(task.urgency);
        });
    });

    let nameElt = document.querySelector('#name');
    nameElt.addEventListener('blur', function(){
        checkFormStatus();
    });

    loadUrgency(task.urgency);
    checkFormStatus();
}