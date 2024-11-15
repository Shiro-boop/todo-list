const inputTask = document.querySelector('#input__task'),
      addTask = document.querySelector('.add__task'),
      deleteTask = document.querySelector('.delete__task'),
      taskList = document.querySelector('.wrapper__tasks');







addTask.addEventListener('click', (e) => {
    if(inputTask.value.length === 0) {
        alert('Не балуйся')
    } else {
        taskList.insertAdjacentHTML('beforeend', `<p>${inputTask.value}</p>`)
        inputTask.value = '';
    }

})

deleteTask.addEventListener('click', (e)=> {
    taskList.lastElementChild.remove();
})