{
    let tasks = [];

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindtoggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let tasksToString = "";

        for (const task of tasks) {
            tasksToString += `
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
        document.querySelector(".js-tasks").innerHTML = tasksToString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="container__buttons">Ukryj zaznaczone</button>
        <button class="container__buttons">Zaznacz wszystkie</button>
        `
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindtoggleDoneEvents();
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