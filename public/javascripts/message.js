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
    if(data.action == "clicked"){
        //console.log(data.input);
        let usernamethisuser = localStorage.getItem('email');
        console.log(usernamethisuser);
        let placetexthere = document.getElementById('displaymessages');
        let html = "";
        html += "<p>" +usernamethisuser + " : "+ data.input + "</p>";


        placetexthere.innerHTML  += html;

    }
});

document.getElementById('input').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        let input = document.getElementById('input').value;
        primus.write({
            "action": "clicked",
            "input" : input
        });
        document.getElementById('input').value = "";
        e.preventDefault();
    }
});