let btnSignup = document.querySelector('.form--btn').addEventListener('click', click =>{
   
   let username= document.getElementById('email').value;
   /*  let newPassword=document.getElementById('newPassword').value;
    let oldPassword=document.getElementById('oldPassword').value;
    let skill=document.getElementById('skill').value;*/
    
    fetch ('http://localhost:3000/users/profile',{
    
        method:"put",
        headers: 
            {'Content-Type':'application/json',
            'Authorization': "Bearer" + localStorage.getItem('token')
            },
            body:JSON.stringify({
                "username":username,
            })
        }).then(response => {
            return response.json();
        }).then (json => {
            if (json.status==="succes"){
                    console.log("succes");
                    let feedback= document.querySelector('.alert');
                    feedback.textContent="Updated";
                    feedback.classList.remove('hidden');
            }else {
                let feedback= document.querySelector('.alert');
                feedback.textContent="Update failed";
                feedback.classList.remove('hidden');
            }
        });



});
