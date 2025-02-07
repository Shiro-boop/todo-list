'use strict'

let deleteTask,
    checkboxTask;
const inputTask = document.querySelector('.input__task'),
      addTask = document.querySelector('.add__task'),
      tasks = document.querySelector('.tasks'),
      successTask = document.querySelector('.success__task');

// Перед началом работы, проверяю есть в хранилище данные, и добавляю их на сайт
if (localStorage.length > 0) {
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if(JSON.parse(localStorage.getItem(key)).completed) {
            successTask.insertAdjacentHTML('beforeend', `<div data-id=${key}  class="task">
                                                        <p class="task__descr">${JSON.parse(localStorage.getItem(key)).desc}</p>
                                                        <button class='delete__btn'>Delete</button>
                                                    </div>`)
        } else {
            addNewTask(JSON.parse(localStorage.getItem(key)));
        }
    }
}



// Функция создания объекта задачи
class Task {
    constructor(task) {
        this.desc = task
        this.id = Date.now()
        this.completed = false
    }
}

// Функция добавления задачи в DOM и localStorage
function addNewTask(task) {
    tasks.insertAdjacentHTML('beforeend', `<div data-id=${task.id}  class="task">
                                                <p class="task__descr">${task.desc}</p>
                                                <button class='delete__btn'>Delete</button>
                                                <input class='checkbox__task' type="checkbox">
                                            </div>`)

    localStorage.setItem(task.id, JSON.stringify(task));
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

    // Удаление задачи
    // Каждый раз при добавлении задачи на коллекцию вешается forEach, который вешает событие на каждую кнопку
    // deleteTask.forEach(button => {
    //     button.addEventListener('click', e => {
    //         button.parentElement.remove(); // Удаляет задачу полностью
    //     })
    // })


    // Выполнение задачи и ее перемещение в список выполненных задач
    // checkboxTask.forEach(item => {
    //     item.addEventListener('click', e => {
    //         item.parentElement.lastElementChild.style.display = 'none' // Перемещаюсь к родителю, после к чекбоксу и убираю его
    //         successTask.prepend(item.parentElement);
    //     })
    // })

});

// То же самое добавление и удаление задачи
// // Дублирую код, но для возможности отправки задачи по нажатию клавиши Enter
// inputTask.addEventListener('keyup', e => {
//     if (e.keyCode === 13) {
//         // Проверка данных на пустую строку
//         if (inputTask.value === '') {
//             alert('Пожалуйста, введите данные')
//         } else {
//             tasks.insertAdjacentHTML('beforeend', `<div class="task">
//                                                     <p>${inputTask.value}</p>
//                                                     <button class='delete__btn'>Delete</button>
//                                                     <input class='checkbox__task' type="checkbox">
//                                                    </div>`)
//             inputTask.value = ''; // Очищаю значение инпута после добавления задачи
//             deleteTask = document.querySelectorAll('.delete__btn'); // Обновляю коллекцию, чтобы события корректно привязывались к каждой кнопке
//             checkboxTask = document.querySelectorAll('.checkbox__task');
//         }



//             // Удаление задачи
//             // Каждый раз при добавлении задачи на коллекцию вешается forEach, который вешает событие на каждую кнопку
//             deleteTask.forEach(button => {
//                 button.addEventListener('click', e => {
//                     button.parentElement.remove(); // Удаляет задачу полностью
//                 })
//             })

            
//             // Выполнение задачи и ее перемещение в список выполненных задач
//             checkboxTask.forEach(item => {
//                 item.addEventListener('click', e => {
//                     item.parentElement.lastElementChild.style.display = 'none' // Перемещаюсь к родителю, после к чекбоксу и убираю его
//                     successTask.prepend(item.parentElement);
//                 })
//             })
//     }
// })



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
        const taskElement = e.target.closest('.task')
        const taskId = taskElement.dataset.id;
        const completedTask = JSON.parse(localStorage.getItem(taskId));

        completedTask.completed = true
        localStorage.setItem(taskId, JSON.stringify(completedTask));

        e.target.style.display = 'none'; // Скрываем чекбокс
        successTask.prepend(taskElement);
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