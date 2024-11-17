const inputTask = document.querySelector('#input__task'),
      addTask = document.querySelector('.add__task'),
////      deleteTask = document.querySelector('.delete__task'),
      taskList = document.querySelector('.wrapper__tasks');

function monitoring() {
    document.querySelectorAll('.wrapper__delete').forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            btn.parentElement.remove();
        })
    })
}



addTask.addEventListener('click', (e) => {
    if(inputTask.value.length === 0) {
        alert('Не балуйся')
    } else {
        taskList.insertAdjacentHTML('beforeend', `<div class="wrapper__task">
                                                    <p>${inputTask.value}</p>
                                                    <div class="wrapper__delete">Удалить</div>
                                                  </div>`)
        inputTask.value = '';
    }
    monitoring()
})

//deleteTask.addEventListener('click', (e)=> {
//    taskList.lastElementChild.remove();
//})

