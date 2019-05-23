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
        void 0;
        let usernamethisuser = localStorage.getItem('email');
        void 0;
        let placetexthere = document.getElementById('displaymessages');
        placetexthere.innerHTML  += "<p>" +usernamethisuser + " : "+ input + "</p>";
    }
});

document.getElementById('input').addEventListener('keypress', function (e) {
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