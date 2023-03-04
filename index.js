const state= {
    tasklist: [],
};

// DOM Operation
const taskContents = document.querySelector(".task_contents");
const taskModal = document.querySelector(".task_modal_body");

// console.log(taskContents);
// console.log(taskModal);

// Template for the card on the screen 

            // we write ${} this to access id of js in html content   
             //we are using `` this because we are writing html codes in js file , we can also use { } as used in html , no worries
            // we can use' ' or '' '' no issues for writing attributes

const htmlTaskContent = ({id, title , type , discription , url}) =>`
  <div class='col-md-6 col-lg-4 mt-3' id=${id}>
    <div class='card shadow-sm task_card'>

      <div class='card-header d-flex justify-content-end task_card_header'>
         <button type='button' class='btn btn-info' name=${id}> 
           <i class='fas fa-pencil-alt name=${id}'>
           </i>
         </button>
         <button type='button' class='btn btn-danger' name=${id}>  
           <i class='fas fa-trash-alt name=${id}'>
           </i>
         </button>
      </div>
          
      <div class='card-body'>
        ${
            url &&
            `<img with='100%' src=${url} alt='card Image' class='card-img-top md-3 rounded-lg'/>`
        }
        <h4 class='card-title task_card_title'> ${title} </h4>
        <p class='description trim-3-lines'> ${discription}</p>
        <div class='tags text-white d-flex flex-wrap'>
        <span> class='badge bg-secondary mg-1' ${type} </span>
        </div>
      </div>
      
      <div class='card-footer'>
        <button type='button' class='btn btn-primary'  data-bs-toggle="modal" data-bs-target="#showTask" > Open Task </button>
      </div>
    </div>
  </div>

const htmlTaskContent = ({id, title , type , discription , url}) =>`
  const date= new Date(parseInt(id));
   return`
    <div id=${id} >
    ${
      url &&
      `<img with='100%' src=${url} alt='card Image' class='img-fluid placeholder-image mb-3'/>`
  }
     <strong class='text-muted text-sm'> Created on: ${date.toDateString()}</strong>
     <h2 class='my-3'> $
    </div>
   `
    
  
  
  `