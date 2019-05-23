void 0;
let btnUpdateEmail = document
  .querySelector('.form--btn--update')
  .addEventListener('click', click => {
    let username = document.getElementById('email').value;
    let token = localStorage.getItem('token');
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
            void 0;
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
