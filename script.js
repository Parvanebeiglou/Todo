let todos = [];
let currentFilter = 'all';
let editingTodoId = null;

function addTodo() {
  const input = document.getElementById('todo-input');
  const title = input.value.trim();

  if (title === '') {
    alert('Please enter a todo.');
    return;
  }

  todos.push({
    id: Date.now(),
    title,
    completed: false
  });
  displayTodos();
  input.value = '';
}

function displayTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === 'active') {
      return !todo.completed;
    }
    if (currentFilter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  visibleTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = todo.completed ? 'completed' : '';

    if (todo.id === editingTodoId) {
      const input = document.createElement('input');
      input.className = 'edit-input';
      input.type = 'text';
      input.value = todo.title;
      item.appendChild(input);
    } else {
      const title = document.createElement('span');
      title.className = 'todo-title';
      title.textContent = todo.title;
      item.appendChild(title);
    }

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    if (todo.id === editingTodoId) {
      actions.append(
        createTodoButton('Save', () => saveTodo(todo.id)),
        createTodoButton('Cancel', cancelEdit)
      );
    } else {
      actions.append(
        createTodoButton(todo.completed ? 'Undo' : 'Complete', () => toggleTodo(todo.id)),
        createTodoButton('Edit', () => editTodo(todo.id)),
        createTodoButton('Remove', () => removeTodo(todo.id))
      );
    }
    item.appendChild(actions);
    list.appendChild(item);
  });
}

function createTodoButton(label, action) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.className = `todo-button ${label.toLowerCase()}`;
  button.addEventListener('click', action);
  return button;
}

function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);
  if (!todo) {
    return;
  }

  todo.completed = !todo.completed;
  displayTodos();
}

function editTodo(id) {
  const todo = todos.find((item) => item.id === id);
  if (!todo) {
    return;
  }

  editingTodoId = id;
  displayTodos();
  document.querySelector('.edit-input').focus();
}

function saveTodo(id) {
  const todo = todos.find((item) => item.id === id);
  const input = document.querySelector('.edit-input');
  if (!todo || !input) {
    return;
  }

  const title = input.value.trim();
  if (title === '') {
    alert('Todo title cannot be empty.');
    return;
  }

  todo.title = title;
  editingTodoId = null;
  displayTodos();
}

function cancelEdit() {
  editingTodoId = null;
  displayTodos();
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  if (editingTodoId === id) {
    editingTodoId = null;
  }
  displayTodos();
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-button').forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
  displayTodos();
}
