import data from "/data.json" assert {type:"json"};



let commentaries = document.getElementById("commentaries");
const userName = data.currentUser.username;



function markup(isComment, pic, name, time, text, score,isCurrentUser,className) {
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
     <img  onclick="plus(this)" class="plus-icon" src="/images/icon-plus.svg">
     <span class="score-num">${score}</span>
     <img onclick="minus(this)" class="minus-icon" src="/images/icon-minus.svg">
   </div>
  ${isCurrentUser ? `<div class="delete-edit">
  <img class="icon-img" src="/images/icon-delete.svg" alt="del btn">
<div onclick ="deleteCom(this)" id="delete"> Delete</div>
<img class="icon-img" src="/images/icon-edit.svg">
<div onclick="editCom (event)"id="edit">Edit</div>
</div>` : `<div  class="${className}">
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
    
    commentaries.innerHTML += markup(true, pic, name, time, text, score, isCurrentUser,"reply reply1");

    const replies = data.comments[i].replies
   
   for (let i = 0; i < replies.length; i++){
    const name = replies[i].user.username;
      const pic = replies[i].user.image.png;
      const score = replies[i].score;
      const time = replies[i].createdAt;
      const text = replies[i].content;
      const isCurrentUserReply = name === userName;
      
      
      commentaries.innerHTML+= markup(false, pic, name, time, text, score, isCurrentUserReply,"reply reply2");
    
  }

  
}






  
 

function updateReply (event) {
    const textArea = event.target.parentElement.querySelector("textarea");
    console.log(textArea);
    const p = document.createElement("p");
    p.classList.add("text");
    p.innerHTML = textArea.value;
    textArea.replaceWith(p);
   
    



    const footer = document.createElement("div")
    footer.classList.add("footer");
    
    const footerTemplate = `  
    <div class="score">
    <img onclick="plus(this)" class="plus-icon" src="/images/icon-plus.svg">
    <span class="score-num">0</span>
    <img onclick="minus(this)" class="minus-icon" src="/images/icon-minus.svg">
  </div>
 <div  class="delete-edit">
 <img class="icon-img" src="/images/icon-delete.svg" alt="del btn">
 <div onclick ="deleteCom(this)" id="delete"> Delete</div>
 <img class="icon-img" src="/images/icon-edit.svg">
 <div onclick="editCom(event)" id="edit">Edit</div>
 </div>
 `
footer.innerHTML = footerTemplate;

event.target.replaceWith(footer);

}

window.editCom = (event)=>{
  const editArea = event.target.parentElement.parentElement.parentElement.querySelector(".edit-area");
  let commentBox ;
  if (event.target.parentElement.closest(".comment-box") ) {
    commentBox = event.target.parentElement.closest(".comment-box");
    
  }else{
    commentBox =  event.target.parentElement.closest(".reply-box");
    
    
  }
  const p = commentBox.querySelector(".text");

  const footer = event.target.parentElement.parentElement;
  const footerParent = footer.parentElement;
  footer.style.display = "none";
  const update = document.createElement("button");
  update.classList.add("update");
  update.innerHTML = "UPDATE";


  update.addEventListener("click",updateReply)
  footerParent.append(update);
  

  
  const pText = p.textContent;
  
    const textArea = document.createElement("textarea");
    textArea.classList.add("edit-area");
    textArea.value = p.textContent;
    p.replaceWith(textArea);
    
 
 
  




  
}



const replyBtn = document.querySelectorAll(".reply1");
replyBtn.forEach(e =>  {
  e.addEventListener("click", (event)=>{

      
      
      let commentBox ;
      if (event.target.parentElement.closest(".comment-box") ) {
        commentBox = event.target.parentElement.closest(".comment-box");
        
      }else{
       commentBox =  event.target.parentElement.closest(".reply-box");
        console.log(commentBox);

      }
     
      let replyDiv  = document.createElement("div");
      commentaries.insertBefore(replyDiv , commentBox.nextElementSibling);
      replyDiv.classList.add("reply-div");

   

      const replyInput = document.createElement("textarea")
      replyInput.classList.add("reply-input");
      replyDiv.append(replyInput);


      // const manPic = document.createElement("img")
    // manPic.classList.add("img");
    // manPic.src = "/images/avatars/image-juliusomo.png";
    // replyDiv.append(manPic);



      const replyBtn = document.createElement("button");
      replyBtn.classList.add("reply-btn");
      replyDiv.appendChild(replyBtn);
      replyBtn.textContent = "REPLY"

      
    replyBtn.addEventListener("click", ()=>{
      const replyText = document.createElement("p");
      replyText.classList.add("text")
      replyText.textContent = replyInput.value ;
     

      const commentBoxContent = document.createElement("div")
      replyDiv.replaceWith(commentBoxContent);
 
      commentBoxContent.classList.add("comment-box")
  const commentBox = `  
  <div class="first-line">
    <img class="img" src="${data.currentUser.image.png}">
    <p class="name">${data.currentUser.username}</p>
   <div class='you'> You </div>
    <span class="time">Now</span>
   </div>
   <p class="text" >${replyInput.value}<p>
   <div class="footer">
     <div class="score">
     <img onclick="plus(this)" class="plus-icon" src="/images/icon-plus.svg">
     <span class="score-num">0</span>
     <img onclick="minus(this)" class="minus-icon" src="/images/icon-minus.svg">
   </div>
  <div  class="delete-edit">
  <img class="icon-img" src="/images/icon-delete.svg" alt="del btn">
  <div onclick ="deleteCom(this)" id="delete"> Delete</div>
  <img class="icon-img" src="/images/icon-edit.svg">
  <div onclick="editCom(event)" id="edit">Edit</div>
  </div>
  </div>
  
`
commentBoxContent.innerHTML = commentBox;

    })
    
      

  })
})

const addComment = document.getElementById("send");
addComment.addEventListener("click", ()=>{
  const commentText = document.querySelector(".add-comment");
  
  const commentBoxContent = document.createElement("div")
  commentBoxContent.classList.add("comment-box")
  const commentBox = `  
  <div class="first-line">
    <img class="img" src="${data.currentUser.image.png}">
    <p class="name">${data.currentUser.username}</p>
   <div class='you'> You </div>
    <span class="time">Now</span>
   </div>
   <p class="text" >${commentText.value}<p>
   <div class="footer">
     <div class="score">
     <img onclick="plus(this)" class="plus-icon" src="/images/icon-plus.svg">
     <span class="score-num">0</span>
     <img onclick="minus(this)" class="minus-icon" src="/images/icon-minus.svg">
   </div>
  <div  class="delete-edit">
  <img class="icon-img" src="/images/icon-delete.svg" alt="del btn">
  <div onclick ="deleteCom(this)" id="delete"> Delete</div>
  <img class="icon-img" src="/images/icon-edit.svg">
  <div onclick="editCom(event)" id="edit">Edit</div>
  </div>
  </div>
  
`
commentBoxContent.innerHTML = commentBox;

commentaries.append(commentBoxContent);
commentText.value= "";


})






window.plus = (e)=>{

 
    
  const valueCount = e.nextElementSibling.innerHTML 

  
  const addOne = Number(valueCount) + 1 ;

  e.nextElementSibling.innerHTML  = addOne;

}



window.minus = (e) =>{
  
  const valueCount = e.previousElementSibling.innerHTML 
    
    
  const minusOne = Number(valueCount) - 1 ;

  e.previousElementSibling.innerHTML  = minusOne;
}



window.deleteCom = (element)=>{
  
  const parentDiv = element.parentElement.parentElement.parentElement;
  console.log(parentDiv);
 
     
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
}


const replyBtn1 = document.querySelectorAll(".reply2");
replyBtn1.forEach(e =>  {
  e.addEventListener("click", (event)=>{
         
    // let commentBox ;
    // if (event.target.parentElement.closest(".comment-box") ) {
    //   commentBox = event.target.parentElement.closest(".comment-box");
      
    // }else{
    //  commentBox =  event.target.parentElement.closest(".reply-box");
    //   console.log(commentBox);

    // }

    let replyBox = document.querySelector(".reply-box");
   
    let replyDiv  = document.createElement("div");
    // replyBox.append (replyDiv );
    
    commentaries.insertBefore(replyDiv , replyBox.parentElement.nextElementSibling);
    // replyBox.insertAdjacentElement ("afterend",replyDiv);
    replyDiv.classList.add("reply-div1");


    const replyInput = document.createElement("textarea")
    replyInput.classList.add("reply-input1");
    replyDiv.append(replyInput);

    // const manPic = document.createElement("img")
    // manPic.classList.add("img");
    // manPic.src = "/images/avatars/image-juliusomo.png";
    // replyDiv.append(manPic);

    const replyBtn = document.createElement("button");
    replyBtn.classList.add("reply-btn");
    replyDiv.appendChild(replyBtn);
    replyBtn.textContent = "REPLY"

    
  replyBtn.addEventListener("click", ()=>{
    const replyText = document.createElement("p");
    replyText.classList.add("text")
    replyText.textContent = replyInput.value ;
   

    const commentBoxContent = document.createElement("div")
    replyDiv.replaceWith(commentBoxContent);

    commentBoxContent.classList.add("comment-box1")
const commentBox = `  
<div class="first-line">
  <img class="img" src="${data.currentUser.image.png}">
  <p class="name">${data.currentUser.username}</p>
 <div class='you'> You </div>
  <span class="time">Now</span>
 </div>
 <p class="text" >${replyInput.value}<p>
 <div class="footer">
   <div class="score">
   <img onclick="plus(this)" class="plus-icon" src="/images/icon-plus.svg">
   <span class="score-num">0</span>
   <img onclick="minus(this)" class="minus-icon" src="/images/icon-minus.svg">
 </div>
<div  class="delete-edit">
<img class="icon-img" src="/images/icon-delete.svg" alt="del btn">
<div onclick ="deleteCom(this)" id="delete"> Delete</div>
<img class="icon-img" src="/images/icon-edit.svg">
<div onclick="editCom(event)" id="edit">Edit</div>
</div>
</div>

`
commentBoxContent.innerHTML = commentBox;

  })

  })
})