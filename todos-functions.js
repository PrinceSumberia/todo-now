// Get Saved ToDos From the LocalStorage
const getSavedTodos = () => {
    const todosJson = localStorage.getItem('todos');
    if (todosJson != null) {
        return JSON.parse(todosJson);
    } else {
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
    const para = document.createElement('div');
    const textElement = document.createElement('span');
    const checkboxElement = document.createElement('input');
    const button = document.createElement('button');

    // Setting Elements Attributes and Text Content
    checkboxElement.setAttribute('type', 'checkbox');
    checkboxElement.checked = todo.completed;
    button.textContent = 'x';
    textElement.textContent = todo.text;

    // Appending Elements to Parent Div
    para.appendChild(checkboxElement);
    para.appendChild(textElement);
    para.appendChild(button);

    checkboxElement.addEventListener('change', (event) => {
        console.log(todo);
    });

    // Returing the Parent Div Element
    return para;
};

// Render ToDos
const renderToDo = (todos) => {
    todos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodosDOM(todo));
    });
};

// Render ToDos Summary
const todoSummary = (todos) => {
    const filterdTodos = todos.filter((todo) => !todo.completed);
    console.log(filterdTodos.length);
    document.querySelector('#summary').innerHTML = '';
    const filterdTodosParagraph = document.createElement('h2');
    filterdTodosParagraph.textContent = `You have ${filterdTodos.length} todos left.`;
    document.querySelector('#summary').appendChild(filterdTodosParagraph);
};