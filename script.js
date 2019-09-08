'use strict'

const todos = getSavedTodos();

document.querySelector('#create-todo').addEventListener('submit', (event) => {
    event.preventDefault();
    const todo = event.target.elements.createToDo.value;
    const newtodo = {
        id: uuidv4(),
        text: todo,
        completed: false
    };
    todos.push(newtodo);
    document.querySelector('#todos').appendChild(generateTodosDOM(newtodo));
    saveTodos(todos);
    todoSummary(todos);
    event.target.elements.createToDo.value = '';
});

document.querySelector('#hide-completed').addEventListener('change', (event) => {
    document.querySelector('#todos').innerHTML = '';
    if (event.target.checked) {
        const filteredToDos = todos.filter((todo) => {
            return !todo.completed;
        });
        renderToDo(filteredToDos);
    } else {
        renderToDo(todos);
    }
});

renderToDo(todos);