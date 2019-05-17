let btnSignup = document.querySelector('.form--btn').addEventListener('click', click =>{

    let username= document.getElementById('email').value;
    let password=document.getElementById('password').value;
    
    fetch ('http://localhost:3000/users/login',{
        
        method:"post",
        headers: 
            {'Content-Type':'application/json'},
            body:JSON.stringify({
                "username":username,
                "password":password
               
            })
        }).then(response => {
            return response.json();
            console.log("succes");
        }).then (json => {
            if (json.status==="succes"){
                 //token aanmaken
                let token=json.data.token;
                //opslagen in local storage
                localStorage.setItem("token",token);
                // redirecten
                window.location.href="index.ejs"
            }else {
                let feedback= document.querySelector('.alert');
                feedback.textContent="Login failed";
                feedback.classList.remove('hidden');
            }
        });



});
