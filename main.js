import data from "/data.json" assert {type:"json"};




function markup (pic, name, time, text, score){
    return`  <div class="full-box">
    <div class="message-box">
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
   <div class="reply">
     <img src="/images/icon-reply.svg">
     <span> Reply</span>
   
   </div>
   </div>
   </div>
   </div>
    `
}

// document.body.innerHTML = markup();


for (let i = 0; i < data.comments.length; i++){
    
    const name = data.comments[i].user.username;
    const pic = data.comments[i].user.image.png;
    const score = data.comments[i].score;
    const time = data.comments[i].createdAt;
    const text = data.comments[i].content;
    
   document.body.innerHTML += markup(pic, name, time, text,score);
}






