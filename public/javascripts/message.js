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
        let userid = localStorage.getItem('userid');
        console.log(usernamethisuser);
        //let placetexthere = document.getElementById('displaymessages');
        let html = "";
/*
        html += "<div class='messagewrapper'>";
        html += "<p id='pid"+data.messageid+"'>" +usernamethisuser + " : <span id='spanmessage"+data.messageid+"'>"+ data.input + "</p>";
        html += "<button id ='"+data.messageid+"' onclick='deletethismessage(this)' class='btn btn--delete'>DEL</button>";
        html += "<button id ='"+data.messageid+"' onclick='showUpdate(this)' class='btn btn--showupdate show"+data.messageid+"'>UPD</button>";
        html += "</div>";
        html += "<br>";
        html += "<input class='input hide' type='text' id='updateinput"+ +data.messageid +"' value='"+ data.input +"'>";
        html += "<button class='btn btn--update hide "+data.messageid+"' id ='"+data.messageid+"' onclick='updatethismessage(this);hidebtns(this)'>UPD</button>";
        html += "</p>"; 
*/
        html += "<div class='messagewrapper'>";
        html += "<p id='pid"+data.messageid+"'>"+usernamethisuser+ " : <span id='spanmessage"+data.messageid+"'>"+data.input + "</span>";
            html += "<button id ='"+data.messageid+"' onclick='deletethismessage(this)' class='btn btn--delete'>DEL</button>";
            html += "<button id ='"+data.messageid+"' onclick='showUpdate(this)' class='btn btn--showupdate show"+data.messageid+"'>UPD</button>";
        html += "</div>";
        html += "<br>";
        html += "<input class='input hide' type='text' id='updateinput"+ data.messageid +"' value='"+ data.input +"'>";
        html += "<button class='btn btn--update hide "+data.messageid+"' id ='"+data.messageid+"' onclick='updatethismessage(this);hidebtns(this)'>UPD</button>";
        html += "</p>";  


        document.getElementById("displaymessages").innerHTML += html;
        $(".displaymessages").stop().animate({ scrollTop: $(".displaymessages")[0].scrollHeight}, 1000);

    }
});
/*
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
*/