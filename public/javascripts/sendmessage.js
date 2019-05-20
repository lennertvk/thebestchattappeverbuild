class Clicknumber {
    constructor() {
        // set up some basic selectors we'll use often
        let that = this;
        this.btn1 = document.querySelector("#btn1");
        this.inputfield = document.getElementById('input');
        //this.inputfieldinput = document.getElementById('input').value;

        // primus web sockets
        this.primus = Primus.connect("/", {
            reconnect: {
                max: Infinity // Number: The max delay before we try to reconnect.
                    ,
                min: 500 // Number: The minimum delay before we try reconnect.
                    ,
                retries: 10 // Number: How many times we should try to reconnect.
            }
        });

        this.primus.on("data", function (data) {
            if (data.action === "clicked") {
                //that.enlarge();
                that.loginput(data.input);
                that.clearinput();
                //that.saveMessage();
            }
        });
        
         // allow for a click on our button
                this.inputfield.addEventListener('keypress', function (e) {
                    var key = e.which || e.keyCode;
                    if (key === 13) { // 13 is enter
                        let input = document.getElementById('input').value;
                        that.primus.write({
                            "action": "clicked",
                            "input" : input
                        });
                        e.preventDefault();
                    }
                });
                
    } //end constructor

    loginput(input){
        console.log(input);
        let placetexthere = document.getElementById('displaymessages');
        placetexthere.innerHTML  += input + "<br>";
    }

    clearinput(){
        document.getElementById('input').value = "";
    }

}



let p = new Clicknumber();
let token = localStorage.getItem('token');
//console.log(token);


document.getElementById('input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
    let gebruikersnaam = "test gebruikersnaam";
    let bericht = document.getElementById('input').value;
    fetch ('http://localhost:3000/messages/save',{
    method:"post",
    headers: 
        {'Content-Type':'application/json'},
        body:JSON.stringify({
            "username": token,
            "message": bericht,
            "token" : token
        })
    }).then(response => {
        return response.json();
 
    });
}

});
const userNameArray = [];
//console.log(userNameArray[0]);
window.onload= function(){
    console.log('het document is geladen'); 
    

    //console.log(userNameArray);
    fetch ('http://localhost:3000/messages/getusers')
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            let idthisuser = myJson.emailadres;

            for(let i = 0; i < myJson.data.length; i++){
                let keyArray = myJson.data[i]._id;
                let valueArray = myJson.data[i].username;
                if(idthisuser === myJson.data[i]._id){
                    let thisuseremail = myJson.data[i].username;
                    userNameArray.unshift({
                        emailthisuer: thisuseremail
                    })
                }
                userNameArray.push({
                    userid: keyArray,
                    username: valueArray
                })
            }
            console.log("einde for loop");
          //  console.log(userNameArray);

        });
            


    fetch ('http://localhost:3000/messages/get')
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            let messagesArray = myJson.data;
            //console.log(userNameArray[0].userid);

            for(let i = 0; i < messagesArray.length; i++){
                let html = "";
                for(let x=0; x < userNameArray['length']; x ++){
                    if(userNameArray[x].userid == messagesArray[i].username){
                        let nameofuser = userNameArray[x].username
                        //console.log(userNameArray[x]);
                        html += "<p>"+nameofuser+ " : "+messagesArray[i].message+"</p>";

                        document.getElementById("displaymessages").innerHTML += html;
                    }
                }
                
            }
        });
};
