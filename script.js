document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const highlightEvenBtn = document.getElementById('highlightEvenBtn');
    const highlightOddBtn = document.getElementById('highlightOddBtn');
    const deleteLastBtn = document.getElementById('deleteLastBtn');
    const deleteFirstBtn = document.getElementById('deleteFirstBtn');
    const completeBtn = document.getElementById('completeBtn');

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleListClick);
    highlightEvenBtn.addEventListener('click', highlightEven);
    highlightOddBtn.addEventListener('click', highlightOdd);
    deleteLastBtn.addEventListener('click', deleteLast);
    deleteFirstBtn.addEventListener('click', deleteFirst);
    completeBtn.addEventListener('click', completeTask);

    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            text: taskText,
            completed: false
        };

        appendTaskToList(task);
        saveTasks();
        taskInput.value = '';
    }

    function appendTaskToList(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete">Удалить</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    }

    function handleListClick(event) {
        if (event.target.classList.contains('delete')) {
            event.target.parentElement.remove();
            saveTasks();
        }
    }

    function highlightEven() {
        let listItems = taskList.querySelectorAll('li');
        listItems.forEach((item, index) => {
            if ((index + 1) % 2 === 0) {
                item.style.backgroundColor = "pink";
            }
        });
    }

    function highlightOdd() {
        const listItems = taskList.querySelectorAll('li');
        listItems.forEach((item, index) => {
            if ((index + 1) % 2 !== 0) {
                item.style.backgroundColor = "green";
            }
        });
    }

    function deleteLast() {
        const lastItem = taskList.lastElementChild;
        if (lastItem) {
            lastItem.remove();
            saveTasks();
        }
    }

    function deleteFirst() {
        const firstItem = taskList.firstElementChild;
        if (firstItem) {
            firstItem.remove();
            saveTasks();
        }
    }

    function completeTask() {
        const listItems = taskList.querySelectorAll('li');
        const taskNumber = parseInt(prompt('Введите номер задачи для завершения:')) - 1;
        if (isNaN(taskNumber) || taskNumber < 0 || taskNumber >= listItems.length) {
            alert('Неверный номер задачи. Пожалуйста, введите корректный номер.');
            return;
        }
        const selectedItem = listItems[taskNumber];
        if (!selectedItem.classList.contains('completed')) {
            selectedItem.classList.add('completed');
            selectedItem.querySelector('span').style.textDecoration = 'line-through';
            taskList.appendChild(selectedItem);
            saveTasks();
        }
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => appendTaskToList(task));
    }

    function saveTasks() {
        const listItems = taskList.querySelectorAll('li');
        const tasks = [];
        listItems.forEach(item => {
            const text = item.querySelector('span').textContent;
            const completed = item.classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});