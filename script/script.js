{
    const tasks = [
        {
            content: "zjeść śnaidanie",
            done: true,
        },
        {
            content: "umyć naczynia",
            done: false,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
               ${task.content} 
            </li>
            `;
        }

        document.querySelector("js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}