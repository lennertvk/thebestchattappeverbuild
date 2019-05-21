let btnSignup = document
  .querySelector('.form--btn')
  .addEventListener('click', click => {
    let username = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('http://localhost:3000/users/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.status === 'succes') {
          let feedback = document.querySelector('.alert');
          feedback.textContent = 'sign up complete';
          feedback.classList.remove('hidden');
          //token aanmaken
          let token = json.data.token;
          //opslagen in local storage
          localStorage.setItem('token', token);
          // redirecten
          window.location.href = '/';
        }
      });
  });