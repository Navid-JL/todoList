const form = document.querySelector('form')
const input = document.getElementById('input')
const todoList = document.getElementById('todoList')
const deleteBtn = document.getElementById('deleteBtn')
const removeBtn = document.getElementById('removeBtn')
const saveBtn = document.getElementById('saveBtn')

loadEventListeners()

function loadEventListeners() {
  // Add New Task To The todoList
  form.addEventListener('click', addTask)
  // Remove All Tasks From todoList
  deleteBtn.addEventListener('click', removeTasks)
  // Change Delete Button's Background Colour to Red On MouseOver
  deleteBtn.addEventListener('mouseover', changeDeleteBtnBGColourOver)
  // Bring Delete Button's Default Background Back On MouseOut
  deleteBtn.addEventListener('mouseout', changeDeleteBtnBGColourLeave)
  // Show modal form
  todoList.addEventListener('click', showModal)
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks)
}

// Get Tasks from LS
function getTasks() {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li')
    // Add class
    li.setAttribute(
      'class',
      'list-group-item bg-muted text-dark rounded mb-2 d-flex justify-content-between'
    )

    li.setAttribute('data-toggle', 'modal')
    li.setAttribute('data-target', '#exampleModalCenter')

    // Create text node and append to li
    li.appendChild(document.createTextNode(task))
    // Append li to ul
    todoList.appendChild(li)
  })
}

function changeDeleteBtnBGColourOver() {
  deleteBtn.classList.replace('bg-light', 'bg-danger')
}

function changeDeleteBtnBGColourLeave() {
  deleteBtn.classList.replace('bg-danger', 'bg-light')
}

function addTask(e) {
  if (e.target.id === 'addBtn') {
    if (input.value === '') {
      alert('Add a task')
    }

    // Create li element
    const li = document.createElement('li')
    // Add class
    li.setAttribute(
      'class',
      'list-group-item bg-muted text-dark rounded mb-2 d-flex justify-content-between'
    )

    li.setAttribute('data-toggle', 'modal')
    li.setAttribute('data-target', '#exampleModalCenter')

    // Create text node and append to li
    li.appendChild(document.createTextNode(input.value))
    // Append li to ul
    todoList.appendChild(li)

    // Store in LS
    storeTaskInLocalStorage(input.value)

    // Clear input
    input.value = ''
    input.focus()
  }

  e.preventDefault()
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTasks(e) {
  if (e.target.id === 'deleteBtn') {
    // todoList.innerHTML = '';

    // Faster Method
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild)
    }

    clearTasksFromLocalStorage()
  }
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear()
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//  let todoListChildren = Array.from(todoList.children);

function showModal(e) {
  if (e.target.classList.contains('list-group-item')) {
    let modalTxt = document.getElementById('modalTxt')
    modalTxt.value = e.target.innerText.trim()
  }
  setTimeout(() => {
    modalTxt.focus()
  }, 500)
  removeBtn.onclick = () => {
    todoList.removeChild(e.target)
    let task = e.target
    // Remove From LS
    removeTaskFromLocalStorage(task)
  }

  saveBtn.onclick = () => {
    let oldVal = e.target.textContent
    e.target.textContent = modalTxt.value
    let newVal = e.target.textContent
    let task = e.target

    let tasks
    if (localStorage.getItem('tasks') === null) {
      tasks = []
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
      // console.log(tasks);

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === oldVal) {
          tasks[i] = newVal
          break
        }
      }
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }
}
