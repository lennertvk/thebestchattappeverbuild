let btnLogin=document.querySelector(".form--btn").addEventListener("click",e=>{let t=document.getElementById("email").value,o=document.getElementById("password").value;fetch("https://thebestchatappever.herokuapp.com/users/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:o})}).then(e=>e.json()).then(e=>{if("Succes"===e.status){let t=e.data.token,o=document.getElementById("email").value;localStorage.setItem("token",t),localStorage.setItem("email",o),window.location.href="/"}else{let e=document.querySelector(".alert");e.textContent="Login failed",e.classList.remove("hidden")}})});