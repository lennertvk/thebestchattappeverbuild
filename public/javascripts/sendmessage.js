class Clicknumber {
    constructor() {
        // set up some basic selectors we'll use often
        let that = this;
        this.btn1 = document.querySelector("#btn1");
        this.inputfield = document.getElementById('input');
        //this.inputfieldinput = document.getElementById('input').value;
        //this.deletebutton = document.getElementById('updateinput5ce46bcdffb5a8237c112300');

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
        
            // click on update button
                //this.
                
    } //end constructor

    loginput(input){
        
    fetch ('http://localhost:3000/messages/getusers')
        .then(function(response){
            return response.json();
        })
        .then(function(myJson){
            let idthisuser = myJson.emailadres;
            console.log('id this user = ' + idthisuser);
            
            for(let i = 0; i < myJson.data.length; i++){
               // console.log(myJson.data[i]);
                if(myJson.data[i]._id === idthisuser){
                    let usernamethisuser = localStorage.getItem('email');
                    console.log(usernamethisuser);
                    let placetexthere = document.getElementById('displaymessages');
                    placetexthere.innerHTML  += "<p>" +usernamethisuser + " : "+ input + "</p>";
                }
            }
        });
    }

    clearinput(){
        document.getElementById('input').value = "";
    }

    testfunction(){
        console.log("the test function is being logged");
    }

}


let p = new Clicknumber();
/*
let deletethismessage = (button) => {
    let input = button.id;
    console.log(input);
    
    fetch (`http://localhost:3000/messages/delete/${input}`,{method:"delete"})
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(myJson){
        primus.write({
            "action": "delete",
            "input" : myJson
        });
        console.log(myJson);
    });
    
}
*/
let token = localStorage.getItem('token');
//console.log(token);


document.getElementById('input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
    let gebruikersnaam = "test gebruikersnaam";
    let bericht = document.getElementById('input').value;
    let to = localStorage.getItem('messageto');
    fetch ('http://localhost:3000/messages/save',{
    method:"post",
    headers: 
        {'Content-Type':'application/json'},
        body:JSON.stringify({
            "username": token,
            "message": bericht,
            "token" : token,
            "messageto": to
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
            //console.log(myJson);
            for(let i = 0; i < myJson.data.length; i++){
                let keyArray = myJson.data[i]._id;
                let valueArray = myJson.data[i].username;
                if(idthisuser === myJson.data[i]._id){
                    let thisuseremail = localStorage.getItem('email');
                    document.getElementById('loggedin').innerHTML = thisuseremail;
                }
                userNameArray.push({
                    userid: keyArray,
                    username: valueArray
                })
                
               // document.getElementById('allusers').innerHTML += "<p><button onclick='messagespecperson(this)'>" + myJson.data[i].username + "</button></p>"; 
            }
            //console.log("einde for loop");
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
                        let nameofuser = userNameArray[x].username;
                        //console.log(messagesArray[i]);
                        html += "<div class='messagewrapper'>";
                        html += "<p id='pid"+messagesArray[i]._id+"'>"+nameofuser+ " : <span id='spanmessage"+messagesArray[i]._id+"'>"+messagesArray[i].message + "</span>";
                        html += "<button id ='"+messagesArray[i]._id+"' onclick='deletethismessage(this)' class='updbutton'>DEL</button>";
                        html += "<button id ='"+messagesArray[i]._id+"' onclick='showUpdate(this)' class='showupdatebtn show"+messagesArray[i]._id+"'>UPD</button>";
                        html += "</div>";
                        html += "<br>";
                        html += "<input class='hide' type='text' id='updateinput"+ messagesArray[i]._id +"' value='"+ messagesArray[i].message +"'>";
                        html += "<button class='btnforupdate hide "+messagesArray[i]._id+"' id ='"+messagesArray[i]._id+"' onclick='updatethismessage(this);hidebtns(this)'>UPD</button>";
                        html += "</p>";                        

                        document.getElementById("displaymessages").innerHTML += html;
                    }
                }
                
            }
        });

};

let showUpdate = (button) =>{
    let id = button.id;
    //console.log(this.button);
    document.getElementById('updateinput' + id).classList.remove("hide");
    document.getElementById('updateinput' + id).classList.add("show");  

    //button voor het uploaden nog tonen!!!!!!!!
    let btnupd = document.getElementsByClassName(""+id+"")[0];
    btnupd.classList.remove("hide");
    btnupd.classList.add("show");

    button.classList.add("hide");
}

let hidebtns = (button) =>{
    let id = button.id;

    //console.log(this.button);
    document.getElementById('updateinput' + id).classList.remove("show");
    document.getElementById('updateinput' + id).classList.add("hide");  
    
    let btnupd = document.getElementsByClassName(""+id+"")[0];
    btnupd.classList.remove("show");
    btnupd.classList.add("hide");

    document.getElementsByClassName(`show${id}`)[0].classList.remove("hide");
    document.getElementsByClassName(`show${id}`)[0].classList.add("show");

}

let findById = ()=>{
    let input = document.getElementById('inputgetbyid').value;
    console.log(input);
    fetch (`http://localhost:3000/messages/get/${input}`)
    .then(function(response){
        return response.json();
    })
    .then(function(myJson){
        let message = myJson.data.docs[0].message;
        return message;
    })
    .then(function(message){
        document.getElementById('showbyid').innerHTML = "Message: " + message;
    });
    document.getElementById('inputgetbyid').value = "";
}


/*
let updatethismessage = (button) => { //update zoals post doen met headers,... doc input get by id voor waar ze de message in willen veranderen
    let input = button.id;
    console.log(input);
    let updatemessa = document.getElementById('updateinput' + input).value;
    console.log(updatemessa);
    fetch (`http://localhost:3000/messages/update/${input}`,{
        method:"put",
        headers: 
            {'Content-Type':'application/json'},
            body:JSON.stringify({
                "updatedmessage": updatemessa
            })
        })
        .then(function(response){
        //console.log(response);
        return response.json();
    })
    .then(function(myJson){
        console.log(myJson);
    });


}
*/



/*
let messagespecperson = (button) => {
    let usernamee = button.innerHTML;
    localStorage.setItem('messageto', usernamee);
    let displaythemessages = document.getElementById('displaymessages');
    displaythemessages.innerHTML = "";
    let myUsername = localStorage.getItem('email');
    //console.log(username);
    fetch ('http://localhost:3000/messages/get')
    .then(function(response){
        return response.json();
    })
    .then(function(myJsonMessages){
        //console.log(myJsonMessages.data);
        fetch ('http://localhost:3000/messages/getusers')
        .then(function(response){
            return response.json();
        })
        .then(function(myJsonUsers){
            console.log(myJsonUsers.data);
            for(let i = 0; i < myJsonUsers.data.length; i++){
                //console.log(myJsonUsers.data[i].username);
                if(myJsonUsers.data[i].username === myUsername){
                    let iduser = myJsonUsers.data[i]._id;

                    //console.log(iduser);
                    console.log(myJsonMessages.data);
                    
                    for(let e = 0; e < myJsonMessages.data.length; e++){
                        // hierna maak je de chat leeg en geef je alle messages weer
                        // die die jij ooit naar die persoon gestuurd hebt door
                        // bij messages bij het veld to(id) te kijken
                        //en je geeft alle messages weer die van, naar zijn van
                        // de geklikte zijn standpunt
                         if(myJsonMessages.data[e].messageto == usernamee && myJsonMessages.data[e].username == iduser){
                        displaythemessages.innerHTML += "<p>"+ myUsername + " : " +myJsonMessages.data[e].message +"</p>";
                        }
                
                    }
                    
                
                }
                
            }
        });
    });
}
*/