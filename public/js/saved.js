// element.dataset.val for the id

function submitComment() {
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
submitComment();