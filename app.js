const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#tasks');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //Add task event
    form.addEventListener('submit', addTask);
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

    taskInput.value = '';

    console.log(li);

    e.preventDefault();
}