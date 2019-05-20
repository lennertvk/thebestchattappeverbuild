class Clicknumber {
  constructor() {
    // set up some basic selectors we'll use often
    let that = this;
    this.btn1 = document.querySelector('#btn1');
    this.inputfield = document.getElementById('input');
    //this.inputfieldinput = document.getElementById('input').value;

    // primus web sockets
    this.primus = Primus.connect('/', {
      reconnect: {
        max: Infinity, // Number: The max delay before we try to reconnect.
        min: 500, // Number: The minimum delay before we try reconnect.
        retries: 10 // Number: How many times we should try to reconnect.
      }
    });

    this.primus.on('data', function(data) {
      if (data.action === 'clicked') {
        //that.enlarge();
        that.loginput(data.input);
        that.clearinput();
      }
    });

    // allow for a click on our button
    this.inputfield.addEventListener('keypress', function(e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        // 13 is enter
        let input = document.getElementById('input').value;
        that.primus.write({
          action: 'clicked',
          input: input
        });
        e.preventDefault();
      }
    });
  } //end constructor

  loginput(input) {
    void 0;
    let placetexthere = document.getElementById('displaymessages');
    placetexthere.innerHTML += input + '<br>';
  }

  clearinput() {
    document.getElementById('input').value = '';
  }
}

let p = new Clicknumber();
