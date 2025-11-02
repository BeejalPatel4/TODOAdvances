//local storage to display the task on the page after refresh
document.addEventListener("DOMContentLoaded", () => {
  const storageTasks =JSON.parse( localStorage.getItem('tasks'));
  if (storageTasks) {
    storageTasks.forEach(task => tasks.push(task));
    updateTaskList();
    // updateStats();
  }
});

let currentPage = 1;
const tasksPerPage = 3;

let tasks = [];//callecting the task in array
//load tasks on local storage
const saveTasks = () => {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//add new task function
const addTask = () => {
  const taskInput = document.getElementById('taskInput');
    const errorMsg = document.getElementById('errorMagess');//error message
  const text = taskInput.value.trim();
  if (!text) {

    errorMsg.textContent = " Please enter a task";
    setTimeout(() => errorMsg.textContent = "", 2000); // clear after 2s
    return;
  }

    errorMsg.textContent = "";//text is added
    tasks.push({ text: text, completed: false });
     taskInput.value = ''; // clear input
    updateTaskList(); // update UI
    saveTasks();
  }


const toggleTaskCompletion =(index) =>{
  tasks[index].completed=!tasks[index].completed;
  updateTaskList();
  // console.log(tasks)
      saveTasks();

}

//delete function

const deleted = (index) => {
  tasks.splice(index, 1); 
  updateTaskList(); // Update the task list display
  saveTasks();
}

//edite function
const edit = (index) => {
  const taskInput = document.getElementById('taskInput');
  taskInput.value = tasks[index].text; // Set the input field with the current task text
  tasks.splice(index, 1); // Remove the task from the list
  updateTaskList(); 
      saveTasks();

}

  //chechbox 
  const updateTaskList = () => {
    const taskList = document.getElementById('taskList');
    
      const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

    taskList.innerHTML = '';//if in the anything in task list that clear

const start = (currentPage - 1) * tasksPerPage;
  const end = start + tasksPerPage;
  const paginatedTasks = tasks.slice(start, end);

    paginatedTasks.forEach((task ,index) => {

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
          <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="./img/edit-246.png" alt="Edit" class="editIcon" onclick="edit(${index})" />
         <img src="./img/6861362.png" alt="Delete" class="deleteIcon" onclick="deleted(${index})" />
          
        </div>
      </div>
    `;
      listItem.addEventListener('change',()=>toggleTaskCompletion(index));
      taskList.append(listItem);
      //  const checkbox = listItem.querySelector('.checkbox');
      //    checkbox.addEventListener('change', () => toggleTaskCompletion(index));
      //          taskList.append(listItem);  //using queryselector
    });
  

 const totalPages = Math.ceil(tasks.length / tasksPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = (i === currentPage) ? 'active' : '';
    btn.addEventListener('click', () => {
      currentPage = i;
      updateTaskList();
    });
    pagination.appendChild(btn);
  }

  }

document.getElementById('newTask').addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});

