let todoList = [

];
const todoListElm = document.getElementById("todoList");
const inputTodoElm = document.getElementById("inputTodo");
const addBtn = document.getElementById("add-btn");

const handleDeleteTodo = (deleteId) => {
  const deleteIndex = todoList.findIndex((todo) => todo.id === deleteId);
  todoList.splice(deleteIndex, 1);
  renderTodoList();
  saveLocalStorage();
}

const handleChangeStatus = (id) => {
  const index = todoList.findIndex((todo) => todo.id === id);
  todoList[index].completed = !todoList[index].completed;
  saveLocalStorage();
}

const renderTodoList = () => {
  todoListElm.innerHTML = "";
  todoList.forEach((todo) => {
    const todoElm = document.createElement("li");
    todoElm.classList.add("todo");
  
    const inputElm = document.createElement("input");
    inputElm.setAttribute("type", "checkbox");
    inputElm.checked = todo.completed;
    inputElm.addEventListener('change', () => handleChangeStatus(todo.id));
  
    const spanElm = document.createElement("span");
    spanElm.textContent = todo.title;
  
    const iconElm = document.createElement("button");
    iconElm.classList.add("btn" ,"btn-sm","btn-link");
    iconElm.innerHTML="delete";
    iconElm.addEventListener('click', () => handleDeleteTodo(todo.id));
  
    todoElm.appendChild(inputElm);
    todoElm.appendChild(spanElm);
    todoElm.appendChild(iconElm);
    todoListElm.appendChild(todoElm);
  });
}

const handleAddTodo = () => {
  if (inputTodoElm.value === '') {
    alert('You need to type something to add');
  } else {
    todoList.unshift({
      id: Math.floor(Math.random() * 10000),
      title: inputTodoElm.value,
      completed: false,
    })
    renderTodoList();
    inputTodoElm.value = "";
    saveLocalStorage();
  } 
}

const saveLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

const getLocalStorage = () => {
  const todoListLocal = JSON.parse(localStorage.getItem('todos'));
  if(todoListLocal) {
    todoList = todoListLocal;
  }
  renderTodoList();
}
getLocalStorage()

addBtn.addEventListener('click', handleAddTodo);