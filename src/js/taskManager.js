document.getElementById("taskTitle").addEventListener("keydown", handleSubmit);
document.addEventListener("DOMContentLoaded", loadTasks);

// handle submit on enter click or submit on phone keyboard
function handleSubmit(event) {
    if(event.key === "Enter" || event.type === "submit" ) {
        addTask();
    }
}

// load existing tasks from local storage and display them 
function loadTasks() {
    let tasks = getTasks();
    const taskContainer = document.getElementById("task-main");

    tasks.forEach(task => {
        const taskItem = createTaskElement(task);

        if(taskContainer.firstChild) {
            taskContainer.insertBefore(taskItem, taskContainer.firstChild);
        } else {
            taskContainer.appendChild(taskItem);
        }
    });
}

// add task to the task list and local storage
function addTask() {
    const taskTitleValue = document.getElementById("taskTitle").value;

    // add the task only if input field is not empty
    if(taskTitleValue) {
        const tasks = getTasks(); // get existing tasks from local storage

        // create a new task object with unique id which is based on timestamp and entered content
        const newTask = {
            id: Date.now(),
            content: taskTitleValue
        }

        tasks.push(newTask);
        saveTasks(tasks); // save updated task list to local storage

        const taskContainer = document.getElementById("task-main");
        const taskItem = createTaskElement(newTask);

        // insert a new task at the top or append it if no tasks exist
        if(taskContainer.firstChild) {
            taskContainer.insertBefore(taskItem, taskContainer.firstChild);
        } else {
            taskContainer.appendChild(taskItem);
        }

        // clear the task title input field
        document.getElementById("taskTitle").value = "";
    }
}

function deleteTask(event) {
    const taskItemElement = event.target.closest(".task-item");

    const taskItemId = taskItemElement.id;
    const taskIdToRemove = parseInt(taskItemId, 10);

    let tasks = getTasks();

    tasks = tasks.filter(task => task.id !== taskIdToRemove);

    saveTasks(tasks);

    taskItemElement.remove();
}

function createTaskElement(task) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.id = task.id;

    taskItem.innerHTML = `
        <p>${task.content}</p>
        <button class="delete-btn" onclick="deleteTask(event)">
            <img src="src/img/delete.svg" alt="delete_icon">
        </button>`;

    return taskItem;
}

// get tasks from local storage
function getTasks() {
    let tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// save list of tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
