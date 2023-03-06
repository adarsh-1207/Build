// var state ={
//   taskList: [
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//   ]
// }

// Backup Storage
const state= {
    taskList: [],
};

// DOM Operation
const taskModal = document.querySelector(".task_modal_body");
const taskContents = document.querySelector(".task_contents");


// console.log(taskContents);
// console.log(taskModal);

// Template for the card on the screen 

            // we write ${} this to access id of js in html content   
             //we are using `` this because we are writing html codes in js file , we can also use { } as used in html , no worries
            // we can use' ' or '' '' no issues for writing attributes

const htmlTaskContent = ({id, title , type , description , url}) =>`
  <div class='col-md-6 col-lg-4 mt-3' id=${id}>
    <div class='card shadow-sm task_card'>

      <div class='card-header d-flex justify-content-end task_card_header'>
         <button type='button' class='btn btn-info' name=${id}> 
           <i class='fas fa-pencil-alt name=${id}'>
           </i>
         </button>
         <button type='button' class='btn btn-danger' name=${id} onclick="deleteTask.apply(this, arguments)">  
           <i class='fas fa-trash-alt name=${id}')">
           </i>
         </button>
      </div>
          
      <div class='card-body'>
        ${
            url ?
            `<img with='100%' src=${url} alt='card Image' class='card-img-top md-3 rounded-lg'/>`
            : `<img with='100%' src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt='card Image' class='card-img-top md-3 rounded-lg'/>`
        }
        <h4 class='card-title task_card_title'> ${title} </h4>
        <p class='description trim-3-lines'> ${description}</p>
        <div class='tags text-white d-flex flex-wrap'>
        <span class='badge bg-secondary m-1'> ${type} </span>
        </div>
      </div>
      
      <div class='card-footer'>
        <button type='button' class='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask.apply(this, arguments)' id=${id}> Open Task </button>
      </div>
    </div>
  </div>
`
// Modal body on >> click on open Task
 
const htmlModalContent = ({id, title , description , url}) =>{
  const date = new Date(parseInt(id));
   return`
    <div id=${id}>
    ${
      url 
            ? `<img with='100%' src=${url} alt='card Image' class='card-img-top md-3 rounded-lg'/>`
            : `<img with='100%' src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" alt='card Image' class='card-img-top md-3 rounded-lg'/>`
        }
     <strong class='text-muted text-sm'> Created on: ${date.toDateString()}</strong>
     <h2 class='my-3'> ${title} </h2>
     <p class='text-muted'> ${description} </p>
    </div>
    `;
};

 // JSON stands for Java Script Object notation , here object is state and arraylist is taskList
 // Here we convert JSON into string (i.e for local storage)
 const updateLocalStorage = () => {
  localStorage.setItem(
    "task",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

// // Here we convert string into JSON (i.e for rendering the cards on the screen)

const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

// When we update or when we edit then we need to save ..
const handleSubmit = (event) => {
  // console.log("event triggerd");
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("tags").value,
    description: document.getElementById("taskDescription").value,
  };
  if (input.title === "" || input.type === "" || input.description === "") {
    return alert("Please fill all the necessary fiels :-)");
  }

  // taskContents.innerAdjacentHTML(
  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({ ...input, id })
  );
  state.taskList.push({ ...input, id });

  updateLocalStorage();
};

//open task
const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

// Delete task
const deleteTask = (e) => {
  if (!e) e = window.event;

  const targetId = e.target.getAttribute("name");
  // console.log(targetId);

  const type = e.target.tagName;
  // console.log(type);

  const removeTask = state.taskList.filter(({ id }) => id !== targetId);

  updateLocalStorage();

  if (type == "BUTTON"){
    // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
      return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
      );
  }else if (type === "I") {
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode.parentNode
      );
  }
};