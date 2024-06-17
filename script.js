// script.js

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === "") return; // Ignore empty input

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.textContent = taskText;

    // Add a remove button to each task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks(); // Save after removal
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = ''; // Clear the input field

    saveTasks(); // Save after adding
}

// Function to clear all tasks
function clearTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    saveTasks(); // Save after clearing
}

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push(li.firstChild.textContent); // Save the text content of each task
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const taskList = document.getElementById('task-list');

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks(); // Save after removal
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listeners to buttons
document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('clear-tasks-btn').addEventListener('click', clearTasks);

// Add tasks with Enter key
document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
