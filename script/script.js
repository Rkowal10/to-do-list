{
    let tasks = [];

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
                <button class="list__button list__button--done js-done">
                    ${task.done ? "✔️" : ""}
                </button>
                <span class="list__task${task.done ? " list__task--done" : ""}">
                ${task.content}</span> 
                <button class="list__button list__button--remove js-remove">🗑️</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const clearInput = (taskContent) => {
        taskContent.value = "";
        taskContent.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasksLenght = tasks.length;
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1, tasksLenght),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasksLenght = tasks.length;
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1, tasksLenght),
        ];
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const taskContent = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            taskContent.focus();
            return;
        }

        addNewTask(newTaskContent);
        clearInput(taskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}