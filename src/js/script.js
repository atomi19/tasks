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
    let tasks = getTask();

    const container = document.getElementById("task-main");

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.id = task.id;

        taskItem.innerHTML = `
        <p>${task.content}</p>
        <button class="delete-btn" onclick="deleteTask(event)">
            <img src="src/img/delete.svg" alt="delete_icon">
        </button>`;

        if(container.firstChild) {
            container.insertBefore(taskItem, container.firstChild);
        } else {
            container.appendChild(taskItem);
        }
    });
}

function addTask() {
    const taskTitleValue = document.getElementById("taskTitle").value;

    if(taskTitleValue) {
        const taskItem = document.createElement("div");
        
        taskItem.className = "task-item";
        
        let tasks = getTask();

        const newTask = {
            id: Date.now(),
            content: taskTitleValue
        }

        taskItem.id = Date.now();

        tasks.push(newTask);

        saveTasks(tasks)

        taskItem.innerHTML = `
        <p>${taskTitleValue}</p>
        <button class="delete-btn" onclick="deleteTask(event)">
            <img src="src/img/delete.svg" alt="delete_icon">
        </button>`;

        const container = document.getElementById("task-main");

        // insert a new task at the top or append it if no tasks exist
        if(container.firstChild) {
            container.insertBefore(taskItem, container.firstChild);
        } else {
            container.appendChild(taskItem);
        }

        document.getElementById("taskTitle").value = "";
    }
}

function deleteTask(event) {
    const taskItemElement = event.target.closest(".task-item");

    const taskItemId = taskItemElement.id;
    const taskIdToRemove = parseInt(taskItemId, 10);

    let tasks = getTask();

    tasks = tasks.filter(task => task.id !== taskIdToRemove);

    saveTasks(tasks);

    taskItemElement.remove();
}

function getTask() {
    let tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
