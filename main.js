import data from "/data.json" assert {type:"json"};



const commentaries = document.getElementById("commentaries");
const userName = data.currentUser.username;



function markup(isComment, pic, name, time, text, score,isCurrentUser) {
    return` 
    ${isComment ? "" : "<div class='hr-and-reply' >"}
    ${isComment ? "" : "<div class='vl'> </div>"}
    <div class="${isComment ? "comment-box":"reply-box"}">
     <div class="first-line">
    <img class="img" src="${pic}">
    <p class="name">${name}</p>
    ${isCurrentUser ? "<div class='you'> You </div>": ""}
    <span class="time">${time}</span>
   </div>
   <p class="text" >${text}<p>
   <div class="footer">
     <div class="score">
     <img class="plus-icon" src="/images/icon-plus.svg">
     <span class="score-num">${score}</span>
     <img class="minus-icon" src="/images/icon-minus.svg">
   </div>
  ${isCurrentUser ? `<div class="delete-edit">
  <img class="icon-img" src="/images/icon-delete.svg" alt="del btn">
<div id="delete"> Delete</div>
<img class="icon-img" src="/images/icon-edit.svg">
<div id="edit">Edit</div>
</div>` : `<div class="reply">
  <img src="/images/icon-reply.svg">
  <span> Reply</span>
</div>` }
  
   </div>
   </div>
   </div>
    
    ${isComment ? "" : "</div>"}
    `
}

// document.body.innerHTML = markup();



for (let i = 0; i < data.comments.length; i++){ 
    
    const name = data.comments[i].user.username;
    const pic = data.comments[i].user.image.png;
    const score = data.comments[i].score;
    const time = data.comments[i].createdAt;
    const text = data.comments[i].content;
    const isCurrentUser = name === userName;
    
    commentaries.innerHTML += markup(true, pic, name, time, text, score, isCurrentUser);

    const replies = data.comments[i].replies
   
   for (let i = 0; i < replies.length; i++){
    const name = replies[i].user.username;
      const pic = replies[i].user.image.png;
      const score = replies[i].score;
      const time = replies[i].createdAt;
      const text = replies[i].content;
      const isCurrentUserReply = name === userName;
      
      commentaries.innerHTML+= markup(false, pic, name, time, text, score, isCurrentUserReply);
    
  }

  
}


const plusIcon = document.querySelectorAll(".plus-icon");

plusIcon.forEach(e =>  {
  e.addEventListener("click", (event)=>{

    
    const valueCount = e.nextElementSibling.innerHTML 

    
    const addOne = Number(valueCount) + 1 ;

    e.nextElementSibling.innerHTML  = addOne;

  })
});

const minusIcon = document.querySelectorAll(".minus-icon");

minusIcon.forEach(e =>  {
  e.addEventListener("click", (event)=>{

    
    const valueCount = e.previousElementSibling.innerHTML 
    
    
    const minusOne = Number(valueCount) - 1 ;

    e.previousElementSibling.innerHTML  = minusOne;

  })
});



const edit_button = document.getElementById("edit");
const paragraph = document.querySelector(".text");



edit_button.addEventListener("click", function(event) {
  const p = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling;
  const footer = event.target.parentElement.parentElement;
  const footerParent = footer.parentElement;
  footer.style.display = "none";
  const update = document.createElement("button");
  update.classList.add("update");
  update.innerHTML = "UPDATE";
  update.addEventListener("click",updateReply)
  footerParent.append(update);

  
  const pText = p.textContent;
  const textArea = document.createElement("textarea");;
  textArea.classList.add("edit-area");
  p.replaceWith(textArea);


  
 
} )

function updateReply (event) {
    const textArea = event.target.previousElementSibling.previousElementSibling.previousElementSibling
    const p = document.createElement("p");
    p.classList.add("text");
    p.innerHTML = textArea.value;
    textArea.replaceWith(p);
}




const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", ()=>{
      const parentDiv = deleteButton.parentElement.parentElement.parentElement;
     


      const bgdDiv = document.querySelector(".background");
      console.log(bgdDiv);
      bgdDiv.style.display = "flex"
      const yesDelete = document.querySelector(".yes-delete");
   
      yesDelete.addEventListener("click",()=>{
        console.log(parentDiv);
        parentDiv.remove();

        yesDelete.parentElement.parentElement.parentElement.style.display = "none";

      })

      const noCancel = document.querySelector(".no-cancel")
      noCancel.addEventListener("click", ()=>{
          noCancel.parentElement.parentElement.parentElement.style.display = "none";

      })
})


const replyBtn = document.querySelectorAll(".reply");
replyBtn.forEach(e =>  {
  e.addEventListener("click", (event)=>{
      const replyDiv = document.createElement("div");
      const commentBox = event.target.parentElement.parentElement.parentElement;
      commentBox.append(replyDiv);
      replyDiv.classList.add("reply-div");
      const replyInput = document.createElement("input")
      replyInput.classList.add("reply-input");
      replyDiv.append(replyInput);

      const replyBtn = document.createElement("div");
      replyBtn.classList.add("reply-btn");
      replyInput.appendChild(replyBtn);

      

     
      // replyDiv.style.display = "block"
  })
})












 const valueCount = document.querySelectorAll(".score-num").innerHTML;
    
    const addOne = Number(valueCount) + 1 ;
    
    // document.querySelectorAll(".score-num").innerHTML[i] = addOne;
  