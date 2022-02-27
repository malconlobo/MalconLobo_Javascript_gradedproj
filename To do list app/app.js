
let list = document.getElementsByClassName("list");

function addToList(action,taskToAdd,oldContent) {
    let taskNode = document.createElement("div");
    taskNode.className = "content";
    let taskName = document.createElement("div");
    taskName.className = "task";
    taskName.innerText = taskToAdd;
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "editButton";
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "deleteButton";
    taskNode.append(taskName, editButton, deleteButton);
    if(action === "add"){
        list[0].appendChild(taskNode);
    }else if(action === "replace"){
        list[0].replaceChild(taskNode,oldContent); 
    }
}

let enterTask = document.getElementById("enterTask");
enterTask.addEventListener("keyup",function(event){
    if(event.key === "Enter"){
        let addTask = document.getElementById("enterTask");
        addToList("add",addTask.value);
        addTask.value = "";
    }
});

let addButton = document.getElementById("addButton");
addButton.addEventListener("click",function(){
    let addTask = document.getElementById("enterTask");
    addToList("add",addTask.value);
    addTask.value = "";    
});

let containerDiv = document.querySelector(".list");
containerDiv.addEventListener("click",function(event){

    if(event.target.classList.contains("deleteButton")){
        if(confirm("Are you sure you want to delete this task?")){
            event.target.parentElement.remove();
        }
    }

    if(event.target.classList.contains("editButton")){
        let oldContent = event.target.parentElement;
        let taskNode = document.createElement("div");
        taskNode.className = "content";
        let taskName = document.createElement("input");
        taskName.className = "task";
        taskName.type = "text";
        let previousText = oldContent.firstChild.innerText;
        taskName.setAttribute("previousText",previousText);
        taskName.value = previousText;
        let saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.className = "saveButton";
        let cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.className = "cancelButton";
        taskNode.append(taskName, saveButton, cancelButton);
        list[0].replaceChild(taskNode,oldContent);        
    }

    if(event.target.classList.contains("saveButton")){
        let oldContent = event.target.parentElement;
        addToList("replace",oldContent.firstChild.value,oldContent); 
    }

    if(event.target.classList.contains("cancelButton")){
        let oldContent = event.target.parentElement;
        addToList("replace",oldContent.firstChild.getAttribute("previousText"),oldContent);   
    }
});

containerDiv.addEventListener("keyup",function(event){
    if(event.key === "Enter" && event.target.classList.contains("task")){
        console.log("Event registered");
        let oldContent = event.target.parentElement;
        addToList("replace",oldContent.firstChild.value,oldContent); 
    }
});

