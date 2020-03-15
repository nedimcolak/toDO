const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Remove all tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Load tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');

    li.className = 'collection-item';

    //create text node and append to li

    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    li.appendChild(link);

    taskList.appendChild(li);
    })
}

//Add task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }

    const li = document.createElement('li');

    li.className = 'collection-item';

    //create text node and append to li

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    li.appendChild(link);

    taskList.appendChild(li);

    //Store in local storage

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    console.log(li);

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}