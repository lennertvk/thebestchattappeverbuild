var primus = Primus.connect("/", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});
primus.on("data", function (data) {
    if(data.action == "update"){
        console.log('hieronder komt de code');
        console.log(data.newmessage);
        console.log(data.input.data.id);
        document.getElementById('spanmessage' + data.input.data.id).innerHTML = data.newmessage;
    }
});

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
        primus.write({
            "action": "update",
            "input" : myJson,
            "buttonid": input,
            "newmessage": updatemessa
        });
        console.log(myJson);
    });


}