function addSaveAction() {
  const saveBtns = document.querySelectorAll(".save-button");
  for (let i = 0; i < saveBtns.length; i++) {
    saveBtns[i].addEventListener("click", function () {
      let id = this.value;
      fetch("/api/save/" + id).then(r => {
        console.log(r);
      }).catch(e => {
        console.log(e);
      });
    });
  }
}
addSaveAction();