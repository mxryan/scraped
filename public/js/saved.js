// element.dataset.val for the id

function setSubmitCommentBtn() {
  const formGroups = document.querySelectorAll(".comment-form");
  for (let i = 0; i < formGroups.length; i++){
    // this feels super hacky... 
    const titleInput = formGroups[i].children[0].children[1];
    const msgInput = formGroups[i].children[1].children[1];
    const subBtn = formGroups[i].children[3]
    subBtn.addEventListener("click", ()=>{
      const out = {}
      out.title = titleInput.value;
      out.body = msgInput.value;
      fetch("/api/comment/" + subBtn.dataset.val, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(out)
      }).then(d => {
        console.log(d);
      }).catch(e => {
        console.log(e);
      });
    })
  }
}

function populateComments(){
  const titles = document.querySelectorAll(".article-title-link");
  for (let i = 0; i < titles.length; i++) {
    fetch("/api/comment/" + titles[i].dataset.id).then(res=>{
      return res.json();
    }).then(d => {
      const comments = d.comment;
      for (let j = 0; j < comments.length; j++) {
        console.log(comments[j].title);
        console.log(comments[j].body);
        const wrapper = document.createElement("div");
        const titleDisplay = document.createElement("h5");
        const bodyDisplay = document.createElement("p");
        titleDisplay.textContent = comments[j].title;
        bodyDisplay.textContent = comments[j].body;
        wrapper.appendChild(titleDisplay);
        wrapper.appendChild(bodyDisplay);
        
      }
    }).catch(e => {
      console.log(e);
    })
  }
}
populateComments();
setSubmitCommentBtn();