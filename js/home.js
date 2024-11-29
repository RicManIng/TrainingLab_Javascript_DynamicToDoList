async function loadTasks() {
    // Load tasks from local storage
    let menuUrl = './resources/database/task.json';
    let response = await fetch(menuUrl);
    let tasks = await response.json();
    return tasks;
}

function sortByDeletedAt(array) {
    return array.sort((a, b) => {
        const dateA = new Date(a.deleted_at);
        const dateB = new Date(b.deleted_at);
        return dateA - dateB; // Ordine crescente: dal più vecchio al più recente
    });
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
            } else if (containerClass == 'completed') {
                for (let task of completeds) {
                    if(counter == 5){
                        break;
                    }
                    createTask(task);
                    counter++;
                }
            } else if (containerClass == 'cancelled') {
                for (let task of cancelleds) {
                    if(counter == 5){
                        break;
                    }
                    createTask(task);
                    counter++;
                }
            }
        }
    }

}

function addTasksToMenu(menuType, taskArray) {
    let taskList = document.querySelector('ul#taskList');
    taskList.innerHTML = '';
    if(menuType == 'standard') {
        createStandardView(taskArray);
    } else {
        createStandardView(taskArray);
    }
}

function filterTasks(taskArray, filter) {
    let filteredArray = taskArray.filter(task => task.name.includes(filter));
    return filteredArray;
}


window.onload = function() {
    let taskArray = loadTasks();
    createStandardView(taskArray);
}