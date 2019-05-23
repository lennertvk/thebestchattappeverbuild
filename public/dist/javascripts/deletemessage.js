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
        void 0;
        void 0;
        document.getElementById('pid' + data.buttonid).innerHTML = "";
    }
});

let deletethismessage = (button) => {
    let input = button.id;
    void 0;
    
    fetch (`https://thebestchatappever.herokuapp.com/messages/delete/${input}`,{method:"delete"})
    .then(function(response){
        void 0;
        return response.json();
    })
    .then(function(myJson){
        primus.write({
            "action": "delete",
            "input" : myJson,
            "buttonid": button.id
        });
        void 0;
    });
}