
// define package
const express = require("express");
const bodyParser = require("body-parser");
//const sqlite = require("sqlite3").verbose();
const app = express();
const res = require("express/lib/response");
const axios = require('axios').default;
app.use(bodyParser.json());
const cors = require("cors");
const { response } = require("express");
const { AppPage } = require("twilio/lib/rest/microvisor/v1/app");
const { jsonp } = require("express/lib/response");
const multer = require("multer");
const upload = multer({dest:"uploads/"});
var fs = require('fs');
const { checkServerIdentity } = require("tls");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json());


// API post with phone number
app.post("/api/update/:id/:selection/:phno/:dep/:email/:name", (req, res) => {

        var id = parseInt(req.params.id);
        var selection = req.params.selection;
        var phno = req.params.phno;
        var dep = req.params.dep;
        var email = req.params.email;
        var name = req.params.name;
        // console.log(id);
        // console.log(selection);
        
        try {
            //check if StaffReg table contain exsiting user
            axios({
                method: "GET",
                url: `https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true&filter__field_699773__contains=${id}`,
                headers: {
                  Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
                }
              })
                .then(json => {
                    //console.log(json)
                    var rowid = json.data.results[0].id
                    // if has existing user then update info to baserow
                         axios({
                             method: "PATCH",
                             url: `https://api.baserow.io/api/database/rows/table/110728/${rowid}/?user_field_names=true`,
             
                             headers: {
                             Authorization : "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                             "Content-Type": "application/json"
                             },
                             data: {
                                 "SelectedSession": selection,
                                 "Email":email,
                                 "PhoneNo":phno,
                                 "Name":name,
                                 "Department":dep,
                                 
                             }
                         })
                
                     }
                
                
                )
                .catch(err=>{                  
                    // if StaffReg table cannot find the user then create a new row for it. 
                    axios({
                        method: "POST",
                        url: "https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true",
                        headers: {
                          Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                          "Content-Type": "application/json"
                        },
                        data: {
                          "TeamMember": id,
                          "Name": name,
                          "Department": dep,
                          "Email": email,
                          "PhoneNo": phno,
                          "SelectedSession": selection
                        }
                      })
});

        } catch (error) {
            return res.json({
                status: 400,
                success: false,
            });
        }
        
    }
)



//API post request without phone number
app.post("/api/updatenopho/:id/:selection/:dep/:email/:name", (req, res) => {

    var id = parseInt(req.params.id);
    var selection = req.params.selection;
    var dep = req.params.dep;
    var email = req.params.email;
    var name = req.params.name;
    // console.log(id);
    // console.log(selection);
    
    try {
        //check if StaffReg table contain exsiting user
        axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true&filter__field_699773__contains=${id}`,
            headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
            }
          })
            .then(json => {
                //console.log(json)
                var rowid = json.data.results[0].id
                    // if has existing user then update info to baserow
                    axios({
                         method: "PATCH",
                         url: `https://api.baserow.io/api/database/rows/table/110728/${rowid}/?user_field_names=true`,
         
                         headers: {
                         Authorization : "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                         "Content-Type": "application/json"
                         },
                         data: {
                             "SelectedSession": selection,
                             "Email":email,
                             "Name":name,
                             "Department":dep,
                             
                         }
                     })
            
                 }
    
            )
            .catch(err=>{                  
                // if StaffReg table cannot find the user then create a new row for it. 
                axios({
                    method: "POST",
                    url: "https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true",
                    headers: {
                      Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                      "Content-Type": "application/json"
                    },
                    data: {
                      "TeamMember": id,
                      "Name": name,
                      "Department": dep,
                      "Email": email,
                      "SelectedSession": selection,
                      "PhoneNo":""
                    }
                  })
});



    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
    
}
)


//sms function api
app.get("/api/sms/:phno/:name/:val", (req, res) => {

        const accountSid = 'AC5903079836c0d20ab145562b6b5a0b41';
        const authToken = 'fa8a59146c92a9f3251c2a67399ffa36';
        const client = require('twilio')(accountSid, authToken);
        var phno = req.params.phno;
        var name = req.params.name;
        var val = req.params.val;

        if (val == "1") {
            session_timeslot = "(11:00am to 4:00pm)";
        }
        if (val == "2") {
            session_timeslot = "(6:00pm to 12:00am)";
        }

        // sms text
        var text = "Dear " + name + "\n" + "Your RSVP for One Party, One MBS – Endless Possibilities Session " + val +
            " is confirmed." + "\n" + "Date: 15 December 2022\n" + "Time: Session " + val + " " + session_timeslot +
            "\n" + "Venue: Sands Expo and Convention Centre, Level 5, Sands Grand Ballroom\n" +"\n"+"\n"+"GREATEST PARTY OF THE YEAR! "+" Gear up for One Party, One MBS – Endless Possibilities, a day filled with ENDLESS food, entertainment, fun & laughter" +"\n" +"\n"+
            "See you on 15 December 2022! \n" + "-------" +"\n"+
            "If you wish to amend the session you have selected, please click on the link below \n" +
            "https://onepartyonembs.com.sg"


        try {

            client.messages.create({
                body: text,
                messagingServiceSid: 'MG216d22c854ec229d65cd09060464e761',
                to: '+65' + phno
            })

                .then(message => console.log(message.sid))
                .done();
            return res.json({status: 200, success: true});

        } catch (error) {
            return res.json({
                status: 400,
                success: false,

            });
        }

    }
)


app.post("/api/luckydraw",  (req, res) => {

    try{
        draw()
        return res.json({status: 200, success: true});
    }
    catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})


app.put("/api/tmdetection", upload.single("tmcard"),uploadFiles);



app.post("/api/manualcheck/:tmnm",(req,res)=>{
   
        var nm = req.params.tmnm;
        try
        {   
            OnSitecheckin(nm).then((message)=>{
                console.log(message);
                return res.json({
                    status: 200,
                    success: true
                });
            }).catch((message)=>{
                console.log(message);
                return res.json({
                    status: 400,
                    success: false
                });
            })
        }
        catch{
            return res.json({
                status: 400,
                success: false
            });
        }
 
  
})



var totalnum;
let winnerindex;
function draw()
{ 
 
            //GET TOTAL COUNT OF USERS FROM CEHCKIN TABLE AND GET RAMDOM INDEX NUMBER
            axios({
            method: "GET",
            url: "https://api.baserow.io/api/database/rows/table/109802/?user_field_names=true",
            headers: {
                Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
            }
            }).then(json=>{
            console.log(json.data.count)

            totalnum = json.data.count;

            winnerindex = Math.floor(Math.random()*totalnum-1) + 1;

            console.log("This is the winner",winnerindex);
            //GET WINNER INFO 
            axios({
                method: "GET",
                url: `https://api.baserow.io/api/database/rows/table/109802/${winnerindex}/?user_field_names=true`,
                headers: {
                Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
                }
            }).then(
                json =>{
                    //console.log(json.data);
                    winnername = json.data.Name;
                    winnertm = json.data.TeamMember;
                    winnerDep = json.data.Department;
                    winnerEmail = json.data.Email;
                    luckydrawvalidationcheck(winnertm)
                    //Check user if they are belong to hr department
                    if (winnerDep == "Human Resources" || winnerDep =="HR" || winnerDep =="Human Resource")
                    {
                        draw()
                    } 
                    else{
                        axios({
                            method: "POST",
                            url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
                            headers: {
                            Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                            "Content-Type": "application/json"
                            },
                            data: { 
                            "TeamMember": winnertm,
                            "Name": winnername,
                            "Department": winnerDep,
                            "Email": winnerEmail
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                        })   
                    }
                }
            )
            .catch(err=>{
                console.log(err);
            })   
        }
    )
    .catch(err=>{
        console.log(err);
    })        
}

//CHECK USER IF WIN BEFORE
function luckydrawvalidationcheck(tm){
    var tmn = tm;
    axios({
      method: "GET",
      url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
      headers: {
        Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
      }
    }).then(
      json=>{
        //console.log(json.data.results)
  
        winnerlist = json.data.results
      
        for (var i =0; i<winnerlist.length;i++)
        {
          if (tmn == winnerlist[i].TeamMember)
          {
            draw();
            break;
          }
        } 
  
  
      }
    )
  
  }

  function uploadFiles(req,res)
  {
    
    // var output = scan(req.file.path);
    // console.log(output);

    scan(req.file.path).then((message)=>
    {
        //console.log(message);
        try
        {   
          OnSitecheckin(message).then((message)=>{
                console.log(message);
                return res.json({
                    status: 200,
                    success: true
                });
            }).catch((message)=>{
                console.log(message);
                return res.json({
                    status: 400,
                    success: false
                });
            })
        }
        catch{
            return res.json({
                status: 400,
                success: false
            });
        }

    })
  

    
  }
  
  
async function scan(dataurl) {
   
    
    
        
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.textDetection(dataurl);
    return new Promise(function (resolve,reject){

    const detection = result.textAnnotations;
    //console.log('Text:');
    //detection.forEach(text => console.log(text.description));
    //console.log(detection[0].description)
    var output = detection[0].description;
    var cleanoutput = output.replace(output[0],"");
    console.log("cleanedoutput",cleanoutput);
    //OnSitecheckin(cleanoutput);

    //delete image data file
    try {
        fs.unlinkSync(dataurl);
            } 
    catch (error) {
        console.log(error);
        
      }
    resolve(cleanoutput);


    })
  
}
  


  function OnSitecheckin(output)
  {
    var status;

    return new Promise(function (resolve,reject){
        
    //get info from regsiter list
    axios({
        method: "GET",
        url: `https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true&filter__field_699773__contains=${output}`,
        headers: {
          Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
        }
      })
        .then(regjson => {          
            // if results is empty
            if(!regjson.data.results.length)
            {
                reject("cannot find in reg list");
            }
            else{
                
            //check if in the checkin table
            axios({
                method: "GET",
                url: `https://api.baserow.io/api/database/rows/table/109802/?user_field_names=true&filter__field_692434__contains=${output}`,
                headers: {
                Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
                }
            })
            .then(json=>{
                // if result is empty
                if(!json.data.results.length)
                {
                    axios({
                        method: "POST",
                        url: "https://api.baserow.io/api/database/rows/table/109802/?user_field_names=true",
                        headers: {
                          Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
                          "Content-Type": "application/json"
                        },
                        data: {
                          "TeamMember": output,
                          "Name": regjson.data.results[0].Name,
                          "PhoneNo": regjson.data.results[0].PhoneNo,
                          "Email": regjson.data.results[0].Email,
                          "Department": regjson.data.results[0].Department
                        }
                      })
                      .then((response)=>{
                
                        resolve("User checked in");
                    })
                }
                else{

                    reject("multiple checked in");
                }
                }
            )
            }


        })
    })
}




app.listen(3000);
    