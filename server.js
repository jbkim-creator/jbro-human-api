const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const page = fs.readFileSync(path.join(__dirname,'index.html'));
const korean = fs.readFileSync(path.join(__dirname,'ko.html'));
http.createServer((req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Referrer-Policy','no-referrer');
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});return res.end();}
 const url=new URL(req.url,'http://localhost');
 const route=url.pathname;
 if(route==='/health'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(req.method==='HEAD'?undefined:JSON.stringify({status:'ok',mode:'pilot'}));}
 if(route==='/' || route==='/ko' || route==='/ko/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(req.method==='HEAD'?undefined:((route.startsWith('/ko') || url.searchParams.get('lang')==='ko')?korean:page));}
 res.writeHead(404);res.end('Not found');
}).listen(process.env.PORT || 10000,'0.0.0.0');