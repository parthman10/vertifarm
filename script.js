document.addEventListener("DOMContentLoaded", function () {

  // ================= SCROLL ANIMATION =================
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  });
  document.querySelectorAll(".hidden").forEach(el=>observer.observe(el));


  // ================= RATING =================
  let ratingValue = 0;

  window.setRating = function(val){
    ratingValue = val;
    const emojis = document.querySelectorAll(".rating span");

    emojis.forEach((emoji, index)=>{
      emoji.classList.remove("active");
      if(index === val - 1){
        emoji.classList.add("active");
      }
    });
  }


  // ================= NAVBAR =================
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if(menuToggle && navLinks){
    menuToggle.addEventListener("click", ()=>{
      navLinks.classList.toggle("active");
    });
  }


  // ================= FLIP CARDS (MOBILE) =================
  const cards = document.querySelectorAll(".flip-card");

  function isMobile(){
    return window.innerWidth <= 768;
  }

  cards.forEach(card=>{
    card.addEventListener("click", ()=>{
      if(!isMobile()) return;

      if(card.classList.contains("active")){
        card.classList.remove("active");
      } else {
        cards.forEach(c=>c.classList.remove("active"));
        card.classList.add("active");
      }
    });
  });


  // ================= FORM RESET =================
  const form = document.getElementById("form");

  if(form){
    form.addEventListener("submit", ()=>{
      setTimeout(()=>{
        form.reset();

        ratingValue = 0;
        document.querySelectorAll(".rating span").forEach(el=>{
          el.classList.remove("active");
        });

      },500);
    });
  }


  // ================= TOGGLES =================
  const pumpToggle = document.getElementById("pumpToggle");
  const lightToggle = document.getElementById("lightToggle");

  if(pumpToggle){
    pumpToggle.addEventListener("change", function(){
      document.getElementById("pumpStatus").innerText =
        "Pump: " + (this.checked ? "ON 💧" : "OFF");
    });
  }

  if(lightToggle){
    lightToggle.addEventListener("change", function(){
      document.getElementById("lightStatus").innerText =
        "Light: " + (this.checked ? "ON 💡" : "OFF");
    });
  }


  // ================= SYSTEM STATUS =================
  const statusEl = document.getElementById("systemStatus");

  if(statusEl){
    setInterval(()=>{
      statusEl.innerText =
        Math.random()>0.2 ? "🟢 Running" : "🔴 Alert!";
    },3000);
  }


  // ================= LIVE SENSOR DATA =================
  const moistureEl = document.getElementById("moisture");
  const tempEl = document.getElementById("temp");
  const humidityEl = document.getElementById("humidity");

  if(moistureEl && tempEl && humidityEl){
    setInterval(()=>{
      moistureEl.innerText = Math.floor(Math.random()*50+30)+"%";
      tempEl.innerText = Math.floor(Math.random()*10+25)+"°C";
      humidityEl.innerText = Math.floor(Math.random()*20+50)+"%";
    },2000);
  }


  // ================= CHART =================
  const chartCanvas = document.getElementById("chart");

  if(chartCanvas){
    const chart = new Chart(chartCanvas, {
      type:'line',
      data:{
        labels:["1","2","3"],
        datasets:[{
          label:'Moisture',
          data:[40,50,45]
        }]
      }
    });

    setInterval(()=>{
      chart.data.datasets[0].data.push(Math.random()*50+30);
      chart.data.labels.push("");

      // LIMIT DATA (smooth)
      if(chart.data.datasets[0].data.length > 10){
        chart.data.datasets[0].data.shift();
        chart.data.labels.shift();
      }

      chart.update();
    },2000);
  }


  // ================= GAME =================
  window.checkAnswer = function(ans){
    const result = document.getElementById("gameResult");
    if(result){
      result.innerText =
        ans==="nutrient" ? "✅ Correct!" : "❌ Try again!";
    }
  }


  // ================= IMAGE UPLOAD =================
  const upload = document.getElementById("upload");

  if(upload){
    upload.addEventListener("change", function(e){
      const img = document.getElementById("preview");

      if(img && e.target.files[0]){
        img.src = URL.createObjectURL(e.target.files[0]);
      }

      const analysis = document.getElementById("analysis");

      if(analysis){
        let health = ["Healthy 🌿","Needs Water 💧","Low Nutrients ⚠️"];
        analysis.innerText =
          health[Math.floor(Math.random()*health.length)];
      }
    });
  }

});

function togglePump(el){
  document.getElementById("pumpStatus").innerText =
    "Pump: " + (el.checked ? "ON 💧" : "OFF");
}

function toggleLight(el){
  document.getElementById("lightStatus").innerText =
    "Light: " + (el.checked ? "ON 💡" : "OFF");
}

setInterval(()=>{
  document.getElementById("systemStatus").innerText =
    Math.random()>0.2 ? "🟢 Running" : "🔴 Alert!";
},3000);

setInterval(()=>{
  document.getElementById("moisture").innerText=Math.floor(Math.random()*50+30)+"%";
  document.getElementById("temp").innerText=Math.floor(Math.random()*10+25)+"°C";
  document.getElementById("humidity").innerText=Math.floor(Math.random()*20+50)+"%";
},2000);

const chart = new Chart(document.getElementById('chart'), {
  type:'line',
  data:{labels:["1","2","3"],datasets:[{label:'Moisture',data:[40,50,45]}]}
});

setInterval(()=>{
  chart.data.datasets[0].data.push(Math.random()*50+30);
  chart.data.labels.push("");
  chart.update();
},2000);

function checkAnswer(ans){
  document.getElementById("gameResult").innerText =
    ans==="nutrient" ? "✅ Correct!" : "❌ Try again!";
}

function previewImage(e){
  const img=document.getElementById("preview");
  img.src=URL.createObjectURL(e.target.files[0]);

  let health=["Healthy 🌿","Needs Water 💧","Low Nutrients ⚠️"];
  document.getElementById("analysis").innerText =
    health[Math.floor(Math.random()*health.length)];
}

window.quiz1 = function(ans){
  document.getElementById("quiz1Result").innerText =
    ans === "correct" ? "✅ Correct!" : "❌ Try again!";
}

window.quiz2 = function(ans){
  document.getElementById("quiz2Result").innerText =
    ans === "correct" ? "✅ Correct!" : "❌ Wrong!";
}

window.quiz3 = function(ans){
  document.getElementById("quiz3Result").innerText =
    ans === "correct" ? "✅ Correct!" : "❌ Try again!";
}