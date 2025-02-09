'use strict'


const inputTask = document.querySelector('.input__task'),
      addTask = document.querySelector('.add__task'),
      tasks = document.querySelector('.tasks'),
      successTask = document.querySelector('.success__task');

// Перед началом работы, проверяю есть в хранилище данные, и добавляю их на сайт
renderTask();


function renderTask() {
    if(localStorage.length > 0) {
        tasks.innerHTML = ''; // Очистка задач
        successTask.innerHTML = ''; // Очистка выполненных задач
    
        let array = [] // Получаю из localStorage массив объектов
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            array.push(JSON.parse(localStorage.getItem(key)))
        };

        array.sort((a,b) => b.priority - a.priority) // Сортирую задачи по приоритету

        array.forEach(task => {
            if(task.completed) {
                task.priority = 0;
                successTask.insertAdjacentHTML('beforeend', `<div data-id=${task.id}  class="task">
                                                                <p class="task__descr">${task.desc}</p>
                                                                <button class='delete__btn'>Delete</button>
                                                            </div>`)
            } else if(task.priority === 0) {
                addNewTask(task);
    
            } else if(task.priority === 1) {
                addNewTask(task);
                let insertedTask = document.querySelector(`.task[data-id="${task.id}"]`)
                let priorityBtn = insertedTask.children[1].children[0];

                priorityBtn.style.background = 'yellow';
                insertedTask.style.background = 'yellow';

            } else if(task.priority === 2){
                addNewTask(task);
                let insertedTask = document.querySelector(`.task[data-id="${task.id}"]`);
                let priorityBtn = insertedTask.children[1].children[0];

                priorityBtn.style.display = 'none'
                insertedTask.style.background = 'red'
            }
        })
    }
}

// Функция добавления задачи в DOM и localStorage
function addNewTask(task) {
    tasks.insertAdjacentHTML('beforeend', `<div data-id=${task.id}  class="task">
                                                <p class="task__descr">${task.desc}</p>
                                                <div class='task__btns'>
                                                    <button class='priority__btn'>↑</button>
                                                    <button class='delete__btn'>Delete</button>
                                                    <input class='checkbox__task' type="checkbox">
                                                </div>
                                            </div>`)

    localStorage.setItem(task.id, JSON.stringify(task));
}

// Функция создания объекта задачи
class Task {
    constructor(task) {
        this.desc = task,
        this.id = Date.now(),
        this.completed = false,
        this.priority = 0
    }
}

// Добавление задачи
addTask.addEventListener('click', (e) => {
    // Проверка данных на пустую строку
    if (inputTask.value.trim() === '') {
        alert('Пожалуйста, введите данные');
    } else {
        addNewTask(new Task(inputTask.value)); // Cоздаю при вызове функции новый объект, передавая туда значение input
        inputTask.value = '';
    }
});


tasks.addEventListener('click', (e) => {
    // Удаление задачи
    if(e.target.classList.contains('delete__btn')) {
        const taskElement = e.target.closest('.task');
        const taskId = taskElement.dataset.id;

        taskElement.remove(); // Удаляем задачу из DOM
        localStorage.removeItem(taskId); // Удаляем из localStorage
    }  

    // Выполение задачи
    if(e.target.classList.contains('checkbox__task')) {
        const taskElement = e.target.closest('.task');
        const taskId = taskElement.dataset.id;
        const priorityBtn = taskElement.children[1].children[0]; // Получаю кнопку приоритета
        
        const completedTask = JSON.parse(localStorage.getItem(taskId)); // Перезаписываю задачу в localStorage, помечая ее выполненной
        completedTask.completed = true
        completedTask.priority = 0
        localStorage.setItem(taskId, JSON.stringify(completedTask));

        taskElement.style.background = 'white'; // Сбрасываю цвет приоритетов
        priorityBtn.style.display = 'none'; // Скрываю кнопку приоритета
        e.target.style.display = 'none'; // Скрываю чекбокс
        successTask.prepend(taskElement);
    }

    // Повышение приоритета задачи
    if(e.target.classList.contains('priority__btn')) {
        const taskElement = e.target.closest('.task')
        const priorityBtn = taskElement.children[1].children[0];
        const taskId = taskElement.dataset.id

        if(taskElement.style.background === 'yellow') {
            taskElement.style.background = 'red' // Изменяю стили
            priorityBtn.style.background = 'red';
            priorityBtn.style.display = 'none'

            let priorityTask = JSON.parse(localStorage.getItem(taskId)); // Перезаписываю в localStorage задачу с новым приоритетом
            priorityTask.priority = 2;
            localStorage.setItem(taskId, JSON.stringify(priorityTask))
            renderTask()

        } else {
            taskElement.style.background = 'yellow'; // Изменяю стили
            priorityBtn.style.background = 'yellow';

            let priorityTask = JSON.parse(localStorage.getItem(taskId)); // Перезаписываю в localStorage задачу с новым приоритетом
            priorityTask.priority = 1;
            localStorage.setItem(taskId, JSON.stringify(priorityTask))
            renderTask()

        }
    }
})

successTask.addEventListener('click', (e) => {
        // Удаление выполненной задачи
        if(e.target.classList.contains('delete__btn')) {
            const taskElement = e.target.closest('.task');
            const taskId = taskElement.dataset.id;
    
            taskElement.remove(); // Удаляем задачу из DOM
            localStorage.removeItem(taskId); // Удаляем из localStorage
        }  
})