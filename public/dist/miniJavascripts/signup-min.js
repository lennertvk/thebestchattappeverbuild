let btnSignup=document.querySelector(".form--btn").addEventListener("click",e=>{let t=document.getElementById("email").value,o=document.getElementById("password").value;fetch("https://thebestchatappever.herokuapp.com/users/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,password:o})}).then(e=>e.json()).then(e=>{if("succes"===e.status){let o=document.querySelector(".alert");o.textContent="sign up complete",o.classList.remove("hidden");let n=e.data.token;localStorage.setItem("token",n),localStorage.setItem("email",t),window.location.href="/"}})});