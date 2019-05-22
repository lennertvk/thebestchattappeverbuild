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
    if(data.action == "delete"){
        console.log("hieronder komt de data");
        console.log(data.buttonid);
        document.getElementById('pid' + data.buttonid).innerHTML = "";
    }
});

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
            "input" : myJson,
            "buttonid": button.id
        });
        console.log(myJson);
    });
}