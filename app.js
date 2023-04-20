const TASK_INPUT = document.querySelector(".todo__input-text_new-task");
const BUTTON_ADD = document.querySelector(".todo__button_add-task");
const INCOMPLETED_TASK_HOLDER = document.querySelector(".todo__list_opened-task");
const COMPLETED_TASK_HOLDER = document.querySelector(".todo__list_completed-task");

//New task list item
let createNewTaskElement = function(taskString){

  let listItem = document.createElement("li");
  listItem.className = "todo__task"

  let checkBox=document.createElement("input");// input checkbx
  checkBox.type = "checkbox";
  checkBox.className="todo__input-checkbox";

  let label = document.createElement("label");//label
  label.innerText = taskString;
  label.className = "todo__input-label";

  let editInput = document.createElement("input");//input (text)
  editInput.type = "text";
  editInput.className = "todo__input-text  todo__input-text_hidden";

  let editButton = document.createElement("button");//edit button
  editButton.innerText = "Edit";
  editButton.className = "todo__button todo__button_edit";

  let deleteButton = document.createElement("button");//delete button
  deleteButton.className = "todo__button todo__button_delete";
  let deleteButtonImg = document.createElement("img");//delete button image
  deleteButton.appendChild(deleteButtonImg);
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "todo__delete-img";
  deleteButtonImg.alt = "remove task icon";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

let addTask = function(){
  //Create a new list item with the text from the TASK_INPUT
  if (!TASK_INPUT.value) return;
  let listItem = createNewTaskElement(TASK_INPUT.value);

  //Append listItem to INCOMPLETED_TASK_HOLDER
  INCOMPLETED_TASK_HOLDER.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  TASK_INPUT.value = "";
}

//Edit an existing task.
let editTask = function(){
  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".todo__input-text");
  let label = listItem.querySelector(".todo__input-label");
  let editBtn = listItem.querySelector(".todo__button_edit");

  if (editBtn.innerText === "Save") {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
    console.log('change to Edit')
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    console.log('change to Save')
  }

  editInput.classList.toggle("todo__input-text_hidden")
  label.classList.toggle("todo__input-label_hidden")
};


//Delete task.
let deleteTask = function(){
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}


//Mark task completed
let taskCompleted = function(){
  let listItem = this.parentNode;
  COMPLETED_TASK_HOLDER.appendChild(listItem);
  let label = listItem.querySelector(".todo__input-label");
  label.classList.add("todo__input-label_completed-task")
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete.
let taskIncomplete = function(){
  let listItem = this.parentNode;
  INCOMPLETED_TASK_HOLDER.appendChild(listItem);
  let label = listItem.querySelector(".todo__input-label");
  label.classList.remove("todo__input-label_completed-task")
  bindTaskEvents(listItem,taskCompleted);
}

BUTTON_ADD.addEventListener("click", addTask);

let bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  let checkBox = taskListItem.querySelector(".todo__input-checkbox");
  let editButton = taskListItem.querySelector(".todo__button");
  let deleteButton = taskListItem.querySelector(".todo__button_delete");

  //Bind editButton to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over INCOMPLETED_TASK_HOLDER ul list items
for (var i = 0; i<INCOMPLETED_TASK_HOLDER.children.length;i++){
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(INCOMPLETED_TASK_HOLDER.children[i],taskCompleted);
}

//cycle over COMPLETED_TASK_HOLDER ul list items
for (var i = 0; i<COMPLETED_TASK_HOLDER.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(COMPLETED_TASK_HOLDER.children[i],taskIncomplete);
}