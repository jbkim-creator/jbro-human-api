const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname,'index.html'));
http.createServer((req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Referrer-Policy','no-referrer');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
 const route=req.url.split('?')[0];
 if(route==='/health'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(req.method==='HEAD'?undefined:JSON.stringify({status:'ok',mode:'pilot'}));}
 if(route==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(req.method==='HEAD'?undefined:page);}
 res.writeHead(404);res.end('Not found');
}).listen(process.env.PORT || 10000,'0.0.0.0');