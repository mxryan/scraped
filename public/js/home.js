function setSaveBtns() {
  const saveBtns = document.querySelectorAll(".save-button");
  for (let i = 0; i < saveBtns.length; i++) {
    saveBtns[i].addEventListener("click", function () {
      let id = this.value;
      fetch("/api/save/" + id, {
        method:"PUT",
      }).then(r => {
        console.log(r);
        location.reload();
      }).catch(e => {
        console.log(e);
      });
    });
  }
}

function setUnsaveBtns() {
  const unsaveBtns = document.querySelectorAll(".unsave-button");
  for (let i = 0; i < unsaveBtns.length; i++) {
    unsaveBtns[i].addEventListener("click", function() {
      console.log("unsave btn clicked");
      let id = this.value;
      
      fetch("/api/unsave/" + id, {
        method:"PUT",
      }).then(r => {
        console.log(r);
        location.reload();
      }).catch(e => {
        console.log(e);
      });
    });
  }
}

function setClearBtn() {
  const clearBtn = document.querySelector("#clear-btn");
  clearBtn.addEventListener("click", function(){
    // wipe the db except for all the saved guys and reload page
    fetch("/api/delete").then(d=>{
      console.log(d);
      location.reload();
    })
  })
}

function setScrapeBtn() {
  const scrapeBtn = document.querySelector("#scrape-btn");
  scrapeBtn.addEventListener("click", function(){
    fetch("/api/scrape").then(d => {
      console.log(d);
      location.reload();
    }).catch(e => console.log(e));
  })
}
setSaveBtns();
setUnsaveBtns();
setClearBtn();
setScrapeBtn();