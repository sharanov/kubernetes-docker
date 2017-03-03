'use strict';

const restify  = require('restify');

//create restify server
let server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.bodyParser());
server.use(restify.fullResponse());
server.opts(/\.*/, function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, date, authorization, Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Content-Disposition, Access-Control-Request-Method, Access-Control-Request-Headers, X-UI-Language");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE, PATCH');
    res.send(200);
    next();
});
//expose headers in all response
server.use(
    function exposeHeaders(req,res,next){
        res.header('Access-Control-Expose-Headers', 'Api-Version, Request-Id, Response-Time, Date');
        return next();
    }
);
//catch generic errors
server.on('uncaughtException',function(request, response, route, error){
    console.log('Uncaught Exception:');
    console.log(error.stack);
});
//monitor endpoint
server.get('/ready', (req, res) => {
    return res.send(500);
});

server.listen(process.env.SERVER_PORT, function () {
    console.log(`Server started on host: localhost:${process.env.SERVER_PORT}`);
});



//
// var http = require('http');
// var requests=0;
// var podname= process.env.HOSTNAME;
// var startTime;
// var host;
//
// var handleRequest = function(request, response) {
//     response.writeHead(500);
//   // response.setHeader('Content-Type', 'text/plain');
//   // response.writeHead(200);
//   // response.write("Hello Kubernetes bootcamp! | Hostname: ");
//   // response.write(host);
//   // response.end(" | v=1\n");
//   // console.log("Hostname:" ,host, "| Total Requests:", ++requests,"| App Uptime:", (new Date() - startTime)/1000 , "seconds", "| Log Time:",new Date());
// }
//
// // server.get('/ready', (req, res) => {
// //     return res.send(200);
// // });
// // server.listen(process.env.SERVER_PORT, function () {
// //     console.log(`Server started on host: localhost:${process.env.SERVER_PORT}`);
// // });
//
// var www = http.createServer(handleRequest);
// www.listen(3000,function () {
//     startTime = new Date();
//     host = process.env.HOSTNAME;
//     console.log ("Kubernetes Bootcamp App Started At:",startTime, "| Running On: " ,host, "\n" );
// });
