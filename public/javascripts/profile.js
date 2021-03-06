let token = localStorage.getItem('token');

let btnUpdateEmail = document
  .querySelector('.btn--profile')
  .addEventListener('click', click => {
    let username = document.getElementById('email').value;
    let skill = document.getElementById('skill').value;

    if (username == '' && skill == '') {
      let feedback = document.querySelector('.alert');
      feedback.textContent = 'Fill in the form';
      feedback.classList.remove('hidden');
    } else {
      fetch('https://thebestchatappever.herokuapp.com/users/profile', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          username: username,
          skill: skill,
          token: token
        })
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          if (json.status === 'succes') {
            console.log('succes');
            let feedback = document.querySelector('.alert');
            feedback.textContent = 'Updated';
            feedback.classList.remove('hidden');
          } else {
            let feedback = document.querySelector('.alert');
            feedback.textContent = 'Update failed';
            feedback.classList.remove('hidden');
          }
        });
    }
  });

window.onload= function(){
    
    fetch (`https://thebestchatappever.herokuapp.com/users/get/${token}`)
     
    .then(function(response){
      console.log(response);
      return response.json();
      
  })
  
  .then(function(myJson){
    let skillsArray = myJson.data[0].skills;
    console.log (myJson);
  
    let html = "";
    for(let i = 0; i < skillsArray.length; i++){

      html += '<li>'+skillsArray[i]+'</li>'

    document.querySelector(".display--skills").innerHTML = html;
    }
});
}
