const http = require('http');
const fs = require('fs');
const url = require('url');

function templateHTML(title, list, body) {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FSFB - ${title}</title>
    </head>
    <body>
      <div class="title">
        <h1><a href="/">FSFB</a></h1>
      </div>
      <div class="list">
        ${list}
      </div>
      <div class="contents">
        ${body}
      </div>
    </body>
    </html>
    `
}
function templateList(filelist) {
  let list = '<ul>';
  let i = 0;
  while(i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

let app = http.createServer(function(request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  // <ul>
  //   <li><a href="/?id=lookmyself">LookMyself </a></li>
  //   <li><a href="/?id=planmywork">PlanMyWork </a></li>
  //   <li><a href="/?id=preventaddicted">PreventAddicted</a></li>
  // </ul>

  if(pathname === '/') {
    if(queryData.id === undefined) {
      fs.readdir('./data', (error, filelist)=>{
        let title = 'Welcome';
        let description = 'Here is the Main Web Page';

        let list = templateList(filelist);
        let template = templateHTML(title, list, `
          <h2>${title}</h2><p>${description}</p>
        `);

        response.writeHead(200);
        response.end(template);
      })
    } else {
      fs.readdir('./data', (error, filelist)=>{
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
          let title = queryData.id;

          let list = templateList(filelist);
          let template = templateHTML(title, list, `
            <h2>${title}</h2><p>${description}</p>
            <input type="text" placeholder="Write Something.." />
            <input type="submit" onclick="alert('Hello')">
          `)
          
          response.writeHead(200);
          response.end(template);
        })      
      })
    } 
  } else {
    response.writeHead(404);
    response.end('404 Not Found');
  }
});

app.listen(3000);