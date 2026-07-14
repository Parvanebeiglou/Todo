let todos = [];

function addTodo() {
  let input = document.getElementById('todo-input');
  let todo = input.value.trim();

  if (todo === '') {
    alert('Please enter a todo.');
    return;
  }
  todos.push(todo);
  displayTodos();
  input.value = '';
}

function displayTodos() {
  let list = document.getElementById('todoList');
  list.innerHTML = '';
  for (let i = 0; i < todos.length; i++) {
    let item = document.createElement('li');
    item.textContent = todos[i];
    list.appendChild(item);
  }
}
