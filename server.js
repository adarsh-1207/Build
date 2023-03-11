const http = require("http");

const port = 8081;  //Local Port number

const toDoList = ["learn", "apply things", "succeed"];

http
    .createServer((req, res) => {        //req = required , res = response   // call back function
        // res.writeHead(200, { "Content-Type": "text/html" });   //200 means ok , like 404 means not found^
        // res.write("<h2>Hey Server Started and It won't close without my permission:-) <h2>");
        // res.end();

        const {method, url} = req;            // console.log(method, url);

        if(url === "/todos"){
                if(method === "GET"){
                   res.writeHead(200);
                   res.write(toDoList.toString());
                }
                else if (method === "POST") {
                    let body = "";
                    req
                       .on("error", (err) => {
                          console.log(err);
                       })

                       .on("data", (chunk) => {
                          body += chunk;
                        //   console.log(chunk);
                       })

                       .on("end", () => {
                          body = JSON.parse(body);
                        //   console.log("data: ", body);

                         let newToDo = toDoList;
                         newToDo.push(body.item);
                         console.log(newToDo);

                         
                       });
                }
                else if (method==="DELETE"){
                  let body = "";
                  req
                     .on("error", (err) => {
                        console.log(err);
                     })

                     .on("data", (chunk) => {
                        body += chunk;
                      //   console.log(chunk);
                     })

                     .on("end", () => {
                        body = JSON.parse(body);

                        let deleteThisItem = body.item;
                        for(i=0; i<toDoList.length; i++){
                          if (toDoList[i] === deleteThisItem){
                            toDoList.splice(i, 1);
                            break;
                          }else{
                            console.error("Error: Match not found!!");
                          } 
                        }
                      });
              }
                else {
                  res.writeHead(501);
                }
        }
        else{
            res.writeHead(404);
        }
        res.end();
    })
    .listen(port, () => {         // call back function
        console.log(`NodeJs Server Started Running on Port ${port}`);
    });