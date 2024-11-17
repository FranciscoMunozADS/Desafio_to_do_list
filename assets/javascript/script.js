/* Tareas Iniciales */

let tasks = [
    { id: 1, description: 'Introducción al desarrollo web', completed: true },
    { id: 2, description: 'Css Avanzado', completed: true },
    { id: 3, description: 'JavaScript para la web', completed: false },
    { id: 4, description: 'React', completed: false }
  ];

/* declarar task +1 para asegurar que los ID sean consecutivos */

let taskId = tasks.length +1; 

/* Elementos del DOM */

const taskInput = document.getElementById("task_input");
const btnAddTask = document.getElementById("add_task_btn");
const taskList = document.getElementById("task_list");
const totalTasks = document.getElementById("task_total");
const completedTasks = document.getElementById("task_completed");

/* Función Renderizar */

const renderTasks = () => {
    taskList.innerHTML = ""; // Para limpiar la tabla y no sobreescribir o repetir tareas
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${task.id}</td>
        <td class= "${task.completed ? 'completed_task' : ""}">${task.description}</td>
        <td>
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})"
        </td>
        <td>
            <button class="btn_eliminar" onclick="deleteTask(${task.id})">Eliminar</button>
        </td>
        `;
        taskList.appendChild(row);
    });
    updateCounters();
};

/* Función para agregar nueva tarea */

const addTask = () => {
    const taskDescription = taskInput.value.trim(); // .trim para eliminar espacios en blanco (así no pueden haber tareas vacías)
    if (taskDescription !== '') {
        tasks.push({
            id: taskId++, //el ++ asegura un id consecutivo para cada tarea
            description: taskDescription,
            completed: false,
        });
        taskInput.value = ''; //vacia el input
        renderTasks();
    } else {
        alert('Escribe una tarea.')
    }
};

/* Función para eliminar una tarea */

const deleteTask = (id) => {
    tasks = tasks.filter (task => task.id !== id);
    renderTasks();
}


/* Función para cambiar el estado de una tarea (checkbox) */

const toggleTask = (taskId) => {
    const task = tasks.find(task => task.id === taskId); //.find para obtener el elemento que cumple la condición
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

/* Función para contadores de tareas */
const updateCounters = () => {
    totalTasks.textContent = tasks.length; //textContent para cambiar el texto mostrado | tasks.length número total de tareas en el arreglo
    completedTasks.textContent = tasks.filter(task => task.completed).length; //.filter para contar cuantas tareas tienen la propiedad completed como true
}

/* Eventos */

btnAddTask.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

/* Renderizar tareas iniciales */

renderTasks();