document.addEventListener('DOMContentLoaded', function() {
    const taskTitleInput = document.getElementById('task-title');
    const taskCategoryInput = document.getElementById('task-category');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const taskContainer = document.getElementById('task-container');
    const addTaskButton = document.getElementById('add-task');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function renderTasks() {
      taskContainer.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.className = task.completed ? 'task-completed' : '';
        taskElement.innerHTML = `
          <span>${task.title} - ${task.category} (Due: ${task.deadline})</span>
          <div>
            <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskContainer.appendChild(taskElement);
      });
    }
  
    addTaskButton.addEventListener('click', () => {
      const title = taskTitleInput.value;
      const category = taskCategoryInput.value;
      const deadline = taskDeadlineInput.value;
  
      if (title && deadline) {
        tasks.push({ title, category, deadline, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskTitleInput.value = '';
        taskDeadlineInput.value = '';
      }
    });
  
    window.toggleComplete = function(index) {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
  
    window.deleteTask = function(index) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
  
    renderTasks();
  });  