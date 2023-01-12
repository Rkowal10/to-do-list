{
    let tasks = [];
    let hideDoneTasks = false;

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
        const tasksToString = task => `
            <li class=
                "list__item${ task.done && hideDoneTasks ? " list__item--hidden" : ""}
             ">
                <button class="list__button list__button--done js-done">
                    ${task.done ? "✔️" : ""}
                </button>
                <span class="list__task${task.done ? " list__task--done" : ""}">
                ${task.content}</span> 
                <button class="list__button list__button--remove js-remove">🗑️</button>
            </li>
            `;
        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(tasksToString).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} zakończone
        </button>
        <button class="buttons__button js-doneAllTasks"
            ${ tasks.every(({done}) => done) ? "disabled" : ""}
            >Ukończ wszystkie
        </button>
        `
    };

    const buttonsEvents = () => {
        const markAllTasksDoneButton = document.querySelector(".js-doneAllTasks");

        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", markAllTasksDone)
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindtoggleDoneEvents();
        buttonsEvents();
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

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
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