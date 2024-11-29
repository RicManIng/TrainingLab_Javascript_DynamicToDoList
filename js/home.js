async function loadTasks() {
    // Load tasks from local storage
    let menuUrl = './resources/database/task.json';
    let response = await fetch(menuUrl);
    let tasks = await response.json();
    return tasks;
}

async function loadTaskTypes() {
    // Load tasks from local storage
    let menuUrl = './resources/database/taskTypes.json';
    let response = await fetch(menuUrl);
    let taskTypes = await response.json();
    return taskTypes;
}

function sortByDeletedAt(array) {
    return array.sort((a, b) => {
        const dateA = new Date(a.deleted_at);
        const dateB = new Date(b.deleted_at);
        return dateA - dateB; // Ordine crescente: dal più vecchio al più recente
    });
}

function clearTasks() {
    let taskContainers = document.getElementsByClassName('taskContainer');
    for (let taskContainer of taskContainers) {
        let tasks = taskContainer.getElementsByClassName('task');
        while (tasks.length > 0) {
            tasks[0].parentNode.removeChild(tasks[0]);
        }
    }
}

function createTask(task) {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.textContent = task.name;
    div.appendChild(h2);
    let p1 = document.createElement('p');
    p1.textContent = 'Description : ' + task.description;
    div.appendChild(p1);
    let p4 = document.createElement('p');
    p4.textContent = 'Type : ' + task.type;
    div.appendChild(p4);
    let p2 = document.createElement('p');
    p2.textContent = 'Creation Date : ' + task.created_at;
    div.appendChild(p2);
    let p3 = document.createElement('p');
    p3.textContent = 'Update Date : ' + task.updated_at;
    div.appendChild(p3);
    if (task.deleted_at != null) {
        let p5 = document.createElement('p');
        p5.textContent = 'Deleted Date : ' + task.deleted_at;
        div.appendChild(p5);
    }
    if (task.status == 'pending'){
        let UrgencyContainer = document.createElement('div');
        UrgencyContainer.classList.add('urgencyContainer');
        let p6 = document.createElement('p');
        p6.textContent = 'Urgency : ';
        UrgencyContainer.appendChild(p6);
        for (let i = 0; i < task.urgency; i++) {
            let divUrgency = document.createElement('div');
            divUrgency.classList.add('urgency');
            UrgencyContainer.appendChild(divUrgency);
        }
    }

    let iconContainer = document.createElement('div');
    iconContainer.classList.add('iconContainer');
    let i1 = document.createElement('i');
    i1.classList.add('fas');
    i1.classList.add('fa-edit');
    i1.addEventListener('click', function() {
        const editUrl = `addItem.php?id=${task.id}&state=edit`;
        window.location.href=editUrl;
    });
    iconContainer.appendChild(i1);

    let i2 = document.createElement('i');
    i2.classList.add('fas');
    i2.classList.add('fa-trash');
    i2.addEventListener('click', function() {
        const editUrl = `addItem.php?id=${task.id}&state=delete`;
        window.location.href=editUrl;
    });
    iconContainer.appendChild(i2);
    div.appendChild(iconContainer);
    div.classList.add('task');

    if(task.status == 'pending'){
        let section = document.querySelector('section#pending-task');
        section.appendChild(div);
    } else if (task.status == 'completed'){
        let section = document.querySelector('section#completed-task');
        section.appendChild(div);
    } else {
        let section = document.querySelector('section#cancelled-task');
        section.appendChild(div);
    }
}

function createStandardView(taskArray) {
    let taskContainers = document.getElementsByClassName('taskContainer');
    let pendings = taskArray.filter(task => task.status == 'pending');
    pendings.sort((a, b) => b.urgency - a.urgency);
    let completeds = taskArray.filter(task => task.status == 'completed');
    let cancelleds = taskArray.filter(task => task.status == 'cancelled');
    completeds = sortByDeletedAt(completeds);
    cancelleds = sortByDeletedAt(cancelleds);

    for (let taskContainer of taskContainers) {
        let counter = 0;
        const containerClasses = taskContainer.classList;
        for (let containerClass of containerClasses) {
            if (containerClass == 'pending') {
                for (let task of pendings) {
                    if(counter == 5){
                        break;
                    }
                    createTask(task);
                    counter++;
                }
                let button = document.createElement('button');
                button.textContent = 'Show More';
                button.id = 'showMorePengins';
                button.addEventListener('click', function() {
                    /* clearTasks();
                    createStandardView(pendings); */
                });
            } else if (containerClass == 'completed') {
                for (let task of completeds) {
                    if(counter == 5){
                        break;
                    }
                    createTask(task);
                    counter++;
                }
                let button1 = document.createElement('button');
                button1.textContent = 'Show More';
                button1.id = 'showMoreCompleted';
                button1.addEventListener('click', function() {
                    /* clearTasks();
                    createStandardView(pendings); */
                });
            } else if (containerClass == 'cancelled') {
                for (let task of cancelleds) {
                    if(counter == 5){
                        break;
                    }
                    createTask(task);
                    counter++;
                }
                let button2 = document.createElement('button');
                button2.textContent = 'Show More';
                button2.id = 'showMoreCancelled';
                button2.addEventListener('click', function() {
                    /* clearTasks();
                    createStandardView(pendings); */
                });
            }
        }
    }
}

function createSearchMenuSelect(taskTypes) {
    let select = document.querySelector('select#select');
    for (let taskType of taskTypes) {
        let option = document.createElement('option');
        option.value = taskType.name;
        option.textContent = taskType.name;
        select.appendChild(option);
    }
}

/* function addTasksToMenu(menuType, taskArray) {
    let taskList = document.querySelector('ul#taskList');
    taskList.innerHTML = '';
    if(menuType == 'standard') {
        createStandardView(taskArray);
    } else {
        createStandardView(taskArray);
    }
} */

function filterTasks(taskArray, filters) {
    if(filters.type != '') {
        taskArray = taskArray.filter(task => task.type == filters.type);
    }
    if(filters.search != '') {
        taskArray = taskArray.filter(task => task.name.toLowerCase().includes(filters.search.toLowerCase()));
    }
    return taskArray;
}


window.onload = async function() {
    let taskArray = await loadTasks();
    let taskTypes = await loadTaskTypes();
    let button = document.getElementById('searchButton');
    createStandardView(taskArray);
    createSearchMenuSelect(taskTypes);
    button.onclick = function() {
        let select = document.querySelector('select#select');
        let taskTypeId = select.value;
        console.log(taskTypeId);
        let searchString = document.querySelector('input#search').value;
        let filteredArray = filterTasks(taskArray, {type : taskTypeId, search : searchString});
        clearTasks();
        createStandardView(filteredArray);
    }
}