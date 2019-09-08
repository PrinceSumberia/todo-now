const todos = getSavedTodos();

document.querySelector('#create-todo').addEventListener('submit', (event) => {
    event.preventDefault();
    const newtodo = document.createElement('p');
    const todo = event.target.elements.createToDo.value;
    newtodo.textContent = todo;
    todos.push({
        text: todo,
        completed: false
    });
    document.querySelector('#todos').appendChild(newtodo);
    saveTodos(todos);
    todoSummary(todos);
    event.target.elements.createToDo.value = '';
});

document.querySelector('#hide-completed').addEventListener('change', (event) => {
    document.querySelector('#todos').innerHTML = '';
    if (event.target.checked) {
        todos.forEach((todo) => {
            if (!todo.completed) {
                const para = document.createElement('p');
                para.textContent = todo.text;
                document.querySelector('#todos').appendChild(para);
            }
        });
    } else {
        renderToDo(todos);
    }
});

todoSummary(todos);
renderToDo(todos);