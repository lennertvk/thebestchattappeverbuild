// SERVER

let go = function (server) {
    const Primus = require("primus");
    let primus = new Primus(server, {});

    primus.on("error", function error(err){
        console.error('shit: ' , err.stack);
    });

    primus.on("connection", function (spark) {
        console.log("connected over primus");
        spark.on("data", function (data) {
            console.log("socket data received");
            primus.write(data);
        });
    });

}

module.exports.go = go;