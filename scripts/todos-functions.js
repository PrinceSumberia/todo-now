'use strict'

// Get Saved ToDos From the LocalStorage
const getSavedTodos = () => {
    const todosJson = localStorage.getItem('todos');
    try {
        return todosJson ? JSON.parse(todosJson) : []
    } catch (error) {
        return [];
    }
};

// Save ToDos to LocalStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Generate TodosDOM
const generateTodosDOM = (todo) => {
    // Create Elements
    const para = document.createElement('label');
    const containerEl = document.createElement('div');
    const textElement = document.createElement('span');
    const checkboxElement = document.createElement('input');
    const removeButton = document.createElement('button');

    // Setting Elements Attributes and Text Content
    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.checked = todo.completed;
    para.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    para.appendChild(containerEl);
    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text')
    textElement.textContent = todo.text;

    // Appending Elements to Parent Div
    containerEl.appendChild(checkboxElement);
    containerEl.appendChild(textElement);
    para.appendChild(removeButton);

    removeButton.addEventListener('click', (event) => {
        removeToDo(todo.id);
        saveTodos(todos);
        renderToDo(todos);
    });

    checkboxElement.addEventListener('change', (event) => {
        if (event.target.checked) {
            checkTodoStatus(todo.id, true);
            saveTodos(todos);
            renderToDo(todos);
        } else {
            checkTodoStatus(todo.id, false);
            saveTodos(todos);
            renderToDo(todos);
        }
    });

    // Returing the Parent Div Element
    return para;
};

// Render ToDos
const renderToDo = (todos) => {
    document.querySelector('#todos').innerHTML = ''
    todoSummary(todos);
    if (todos.length > 0) {
        todos.forEach((todo) => {
            document.querySelector('#todos').appendChild(generateTodosDOM(todo));
        });
    } else {
        const messageEl = document.createElement('p');
        messageEl.classList.add('empty-message');
        messageEl.textContent = "No to-dos to show";
        document.querySelector('#todos').appendChild(messageEl)
    }
};

// Render ToDos Summary
const todoSummary = (todos) => {
    const filterdTodos = todos.filter((todo) => !todo.completed);
    document.querySelector('#summary').innerHTML = '';
    const filterdTodosParagraph = document.createElement('h2');
    filterdTodosParagraph.classList.add('list-title');
    const plural = filterdTodos.length === 1 ? '' : 's';
    filterdTodosParagraph.textContent = `You have ${filterdTodos.length} todo${plural} left.`;
    document.querySelector('#summary').appendChild(filterdTodosParagraph);
};

// Remove ToDo from the array
const removeToDo = (id) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id
    });
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

// Mark or Unmark Todo as completed
const checkTodoStatus = (id, status) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id
    });

    if (todoIndex > -1) {
        todos[todoIndex].completed = status;
    }
}
