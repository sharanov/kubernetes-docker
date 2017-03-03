
var http = require('http');
var requests=0;
var podname= process.env.HOSTNAME;
var startTime;
var host;

var handleRequest = function(request, response) {
    response.send(500);
  // response.setHeader('Content-Type', 'text/plain');
  // response.writeHead(200);
  // response.write("Hello Kubernetes bootcamp! | Hostname: ");
  // response.write(host);
  // response.end(" | v=1\n");
  // console.log("Hostname:" ,host, "| Total Requests:", ++requests,"| App Uptime:", (new Date() - startTime)/1000 , "seconds", "| Log Time:",new Date());
}

// server.get('/ready', (req, res) => {
//     return res.send(200);
// });
// server.listen(process.env.SERVER_PORT, function () {
//     console.log(`Server started on host: localhost:${process.env.SERVER_PORT}`);
// });

var www = http.createServer(handleRequest);
www.listen(3000,function () {
    startTime = new Date();
    host = process.env.HOSTNAME;
    console.log ("Kubernetes Bootcamp App Started At:",startTime, "| Running On: " ,host, "\n" );
});
