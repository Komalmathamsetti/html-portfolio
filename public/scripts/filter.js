document.addEventListener("DOMContentLoaded", ()=>{
  const filterOverlay = document.getElementById("filterOverlay");
  const openBtn = document.getElementById("openFilter");
  const closeBtn = document.getElementById("closeFilter");
  openBtn.addEventListener("click",()=>{
    filterOverlay.classList.remove("hidden");
  });
  closeBtn.addEventListener("click",()=>{
    filterOverlay.classList.add("hidden");
  });
  document.querySelectorAll(".counter").forEach(counter=>{
    const decrement = counter.querySelector(".decrement");
    const increment = counter.querySelector(".increment");
    const valueSpan = counter.querySelector(".value");
    decrement.addEventListener("click", () => {
      let val = parseInt(valueSpan.textContent);
      if (val > 0) valueSpan.textContent = val - 1;
    });

    increment.addEventListener("click", () => {
      let val = parseInt(valueSpan.textContent);
      valueSpan.textContent = val + 1;
    });
  });
  document.querySelectorAll(".room-type, .amneties, .locations").forEach(group=>{
    group.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click",()=>{
        if(btn.parentElement.classList.contains("room-type")){
          btn.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
          btn.classList.add("active");
        }else{
          btn.classList.toggle("active");
        }
      });
    });
  });
});