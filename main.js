import data from "/data.json" assert {type:"json"};


const commentaries = document.getElementById("commentaries");
const userName = data.currentUser.username;
console.log(userName);


function markup(isComment, pic, name, time, text, score,isCurrentUser) {
    return` 
    ${isComment ? "" : "<div class='hr-and-reply' >"}
    ${isComment ? "" : "<div class='vl'> </div>"}
    <div class="${isComment ? "comment-box":"reply-box"}">
     <div class="first-line">
    <img class="img" src="${pic}">
    <p class="name">${name}</p>
    <span class="time">${time}</span>
   </div>
   <p class="text">${text}<p>
   <div class="footer">
     <div class="score">
     <img class="plus-icon" src="/images/icon-plus.svg">
     <span class="score-num">${score}</span>
     <img class="minus-icon" src="/images/icon-minus.svg">
   </div>
  ${isCurrentUser ? "delete btn" : `<div class="reply">
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






