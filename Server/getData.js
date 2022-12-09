
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
const { jsonp, get } = require("express/lib/response");
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

// lucky draw api 
app.post("/api/luckydraw",  (req, res) => {

    try{
       
        draw(5).then(()=>
        {
            return res.json({status: 200, success: true});    
        })
        .catch(()=>
        {
            return res.json({
                status: 400,
                success: false,
            });
            
        })
        
    }
    catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

app.get("/api/checkattendance",  (req, res) => {
    
        axios({
            method: "GET",
            url: "https://api.baserow.io/api/database/rows/table/120390/?user_field_names=true", 
            headers: {
                Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
            }
            })
            .then(json=>{
            var totalnum = json.data.count;
            console.log('total: ',totalnum);
            return res.json({
                status:200,
                success:true,
                totalnum:totalnum
            })
                
            })
            .catch(err=>{
                return res.json({
                    status: 400,
                    success: false,
                });
            })      
      
})


// tm detection api use uploadfile function to use "tmcard" key value to recived 
app.put("/api/tmdetection", upload.single("tmcard"),uploadFiles);

app.put("/api/tmdetectionredemption", upload.single("tmcard"),uploadFilesRedemption);


app.post("/api/manualcheck/:tmnm",(req,res)=>{
   
        var nm = req.params.tmnm;
        try
        {   
            OnSitecheckin(nm).then((message)=>{
                console.log(message);
                return res.json({
                    status: 200,
                    success: true,
                    body:message
                });
            }).catch((message)=>{
                console.log(message);
                return res.json({
                    status: 400,
                    success: false,
                    body:message
                });
            })
        }
        catch{
            return res.json({
                status: 400,
                success: false,
                body:"Error Has Occur"
            });
        }
 
  
})

app.post("/api/tapcheck/:hotstamp",(req,res)=>{
   
    var hs = req.params.hotstamp;
    try
    {   
        OnSiteTapheckin(hs).then((message)=>{
            console.log(message);
            return res.json({
                status: 200,
                success: true,
                body:message
            });
        }).catch((message)=>{
            console.log(message);
            return res.json({
                status: 400,
                success: false,
                body:message
            });
        })
    }
    catch{
        return res.json({
            status: 400,
            success: false,
            body:"Error Has Occur"
        });
    }
})
app.post("/api/tapredmeption/:tmnm",(req,res)=>{
    var hs = req.params.tmnm;
    
    try{
        TapRedemptionCheck(hs).then((message)=>{
            console.log(message);
            return res.json({
                status: 200,
                success: true,
                body:message
            });
        }).catch((message)=>{
            return res.json({
                status: 400,
                success: false,
                body:message
            });
        })

    }
    catch{
        return res.json({
            status: 400,
            success: false
        });
    }
    }


)







app.post("/api/redmeption/:tmnm",(req,res)=>{
    var nm = req.params.tmnm;
    
    try{
        RedemptionCheck(nm).then((message)=>{
            console.log(message);
            return res.json({
                status: 200,
                success: true,
                body:message
            });
        }).catch((message)=>{
            return res.json({
                status: 400,
                success: false,
                body:message
            });
        })

    }
    catch{
        return res.json({
            status: 400,
            success: false
        });
    }
    }
)

function TapRedemptionCheck(hs)
{

    // use promise to force it run synchronise
    return new Promise(function (resolve,reject){

        // to check if user checked in 
        axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/120390/?user_field_names=true&filter__field_768928__contains=${hs}`,
            headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
            }
          })
          .then(getjson=>{
            // if user in the check in list.
            if(getjson.data.results.length)
            {
                var nmofdrink =  parseInt(getjson.data.results[0].NumberOfDrink);
                var rowid = getjson.data.results[0].id
                console.log("nmofdrink",nmofdrink);
                if (nmofdrink>0)
                {
                  var currentdrink = nmofdrink-1;
                  //update user drink 
                    axios({
                        method: "PATCH",
                        url: `https://api.baserow.io/api/database/rows/table/120390/${rowid}/?user_field_names=true`,
                        headers: {
                          Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
                          "Content-Type": "application/json"
                        },
                        data: {
                            
                          "NumberOfDrink": currentdrink
                        }
                      })
                      .then(()=>{
                        let output = {
                            "TeamMember":getjson.data.results[0].TeamMember,
                            "Name":getjson.data.results[0].Name,
                            "Department":getjson.data.results[0].Department,
                            "Drink":currentdrink+1,
                            "Done":false
                        }
                        resolve(output)
                    })
                }
                else
                {
                    let output = {
                    "TeamMember":getjson.data.results[0].TeamMember,
                    "Name":getjson.data.results[0].Name,
                    "Department":getjson.data.results[0].Department,
                    "Drink":"Fully Redeemed!",
                    "Done":true
                    }
                    resolve(output);
                  //console.log("run out of chances");
                }
          
            }
            else
            {   
    
                reject('TM records could not be found! Contact xxxxxxxx for assistance');
              //console.log('User not exist');
            }
          
          })
          .catch(err=>{
            //console.log('err:',err);
            reject('Error occur');
          })

    })

}
function RedemptionCheck(nm)
{

    // use promise to force it run synchronise
    return new Promise(function (resolve,reject){

        // to check if user checked in before
        axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/120390/?user_field_names=true&filter__field_768921__contains=${nm}`,
            headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
            }
          })
          .then(getjson=>{
            console.log("check1",getjson.data.results)
            // if user in the check in list.
            if(getjson.data.results.length)
            {
                var nmofdrink =  parseInt(getjson.data.results[0].NumberOfDrink);
                var rowid = getjson.data.results[0].id
                console.log("nmofdrink",nmofdrink);
                if (nmofdrink>0)
                {
                  var currentdrink = nmofdrink-1;
                  //update user drink 
                    axios({
                        method: "PATCH",
                        url: `https://api.baserow.io/api/database/rows/table/120390/${rowid}/?user_field_names=true`,
                        headers: {
                          Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
                          "Content-Type": "application/json"
                        },
                        data: {
                          "NumberOfDrink": currentdrink
                        }
                      })
                      .then(()=>{
                        let output = {
                            "TeamMember":getjson.data.results[0].TeamMember,
                            "Name":getjson.data.results[0].Name,
                            "Department":getjson.data.results[0].Department,
                            "Drink":currentdrink+1,
                            "Done":false
                        }
                        resolve(output)
                    })
                }
                else
                {
                    let output = {
                        "TeamMember":getjson.data.results[0].TeamMember,
                        "Name":getjson.data.results[0].Name,
                        "Department":getjson.data.results[0].Department,
                        "Drink":"FULLY REDEEMED!",
                        "Done":true
                        }
                        resolve(output);
                }
          
            }
            else
            {   
            
                reject('TM records could not be found! Contact xxxxxxxx for assistance');
              //console.log('User not exist');
            }
          
          })
          .catch(err=>{
            //console.log('err:',err);
            reject('Error occur');
          })

    })

}


var totalnum;
let winnerindex;
function draw(drwatime)
{ 
    let tempwinlist = [];
    let tempwinertmlist = [];
    return new Promise(function (resolve,reject){

//get total number of row in check-in table for lucky draw (now using staffRegTest table)
    axios({
  method: "GET",
  url: "https://api.baserow.io/api/database/rows/table/112685/?user_field_names=true", 
  headers: {
      Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
  }
  })
  .then(json=>{
  console.log(json.data.count)
  totalnum = json.data.count;

  //check if ramdom number are same in tempwinlist 
  let count =0
    while(true)
    {
    if(count<drwatime)
    {
      winnerindex = Math.floor(Math.random()*totalnum-1) + 1;
      tempwinlist.push(winnerindex);
      
      if (tempwinlist.length == new Set(tempwinlist).size) {
            count++;
      }
      else{
        console.log('same in ramdom generator');

        tempwinlist.pop();
      }
    }
    else
    {
      break
    }
    }

    console.log(tempwinlist);

  
    var valicount=0;
     // update winner infomation
    axios.all(tempwinlist.map((winnerindex)=>
    {
      //get tm number from checkin table
      axios({
        method: "GET",
        url: `https://api.baserow.io/api/database/rows/table/112685/${winnerindex}/?user_field_names=true`,
        headers: {
          Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
        }
      }).then(checkinjson=>{
        var winnerTM = checkinjson.data.TeamMember;
        //check winner validation
        axios({
          method: "GET",
          url: `https://api.baserow.io/api/database/rows/table/119254/?user_field_names=true&filter__field_759615__contains=${winnerTM}`,
          headers: {
          Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
          }
      }).then(validationjson=>{
          if(!validationjson.data.results.length)
          {
            //check winner has won before
            axios({
              method: "GET",
              url: `https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true&filter__field_713214__contains=${winnerTM}`,
              headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
              }
          }).then(winbeforejson=>{
            if(!winbeforejson.data.results.length)
            {
              //GET WINNER INFO 
              axios({
                method: "GET",
                url: `https://api.baserow.io/api/database/rows/table/120410/?user_field_names=true&filter__field_769032__contains=${winnerTM}`,
                headers: {
                Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
                }
            }).then(
                json =>{
                    //console.log(json.data);
                    var winnername = json.data.results[0].Name;
                    var winnerDep = json.data.results[0].DepartmentName;
                    axios({
                      method: "POST",
                      url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
                      headers: {
                      Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                      "Content-Type": "application/json"
                      },
                      data: { 
                      "TeamMember": winnerTM,
                      "Name": winnername,
                      "Department": winnerDep
                      }
                  })
                  .then(resolve("Good"))
                  .catch(err=>{
                      console.log(err);
                      reject("Bad")
                  })  
                })
  
            }
            else{
              console.log("User won before");
              valicount+=1;
  
            }
          })
  
          }
          else{
            console.log("cannot win staff win ");
            valicount+=1;
          }
      })

      })

    }))
    
    if(!valicount==0)
    {
      console.log("Draw again");
      draw(valicount)
    }
})
.catch(err=>{

console.log(err);
reject("Bad")
})        
})

}


  function uploadFiles(req,res)
  {
    
  
    //use promise to run synchronisely 
    //use scan funciton to get output 
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

  function uploadFilesRedemption(req,res)
  {
    
    scan(req.file.path).then((message)=>
    {
        try{
            RedemptionCheck(message).then((message)=>{
                console.log(message);
                return res.json({
                    status: 200,
                    success: true,
                    body:message
                });
            }).catch((message)=>{
                return res.json({
                    status: 400,
                    success: false,
                    body:message
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
    let RegShow;

    return new Promise(function (resolve,reject){
        
        axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/120410/?user_field_names=true&filter__field_769032__contains=${output}`,
            headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
            }
          }).then(dbjson => {          
            // if results is empty
            if(!dbjson.data.results.length)
            {
                reject("TM records could not be found! Please proceed to the helpdesk for assistance");
            }
            else{

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
                    RegShow = false;
                }
                else{
                    RegShow = true;
                }
                //check if in the checkin table
                axios({
                    method: "GET",
                    url: `https://api.baserow.io/api/database/rows/table/120390/?user_field_names=true&filter__field_768921__contains=${output}`,
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
                            url: "https://api.baserow.io/api/database/rows/table/120390/?user_field_names=true",
                            headers: {
                            Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
                            "Content-Type": "application/json"
                            },
                            data: {
                            "TeamMember": dbjson.data.results[0].TeamMember,
                            "Name": dbjson.data.results[0].Name,
                             "PhoneNo": "",
                             "Email": "",
                            "Department": dbjson.data.results[0].DepartmentName,
                            "Hotstamp":dbjson.data.results[0].Hotstamp,
                            "RegAndShow":RegShow                      
                            }
                        })
                        .then(()=>{
                            let output = 
                                    {
                                        "TeamMember":dbjson.data.results[0].TeamMember,
                                        "Name":dbjson.data.results[0].Name,
                                        "Department":dbjson.data.results[0].DepartmentName,
                                        "Checked":false
                                    }
                                //resolve("User Check In Comfirmed!");
                                resolve(output)
                        })
                    }
                    else{
                        let badoutput = {
                            "TeamMember":dbjson.data.results[0].TeamMember,
                            "Name":dbjson.data.results[0].Name,
                            "Department":dbjson.data.results[0].DepartmentName,
                            "Checked":true
                        }
                        resolve(badoutput);
                    }
                    }
                )
            
        })
            }


        })
    })
}


function OnSiteTapheckin(hs)
{
    let regshow;
    return new Promise(function (resolve,reject){
    

        axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/120410/?user_field_names=true&filter__field_769037__contains=${hs}`,
            headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
            }
          }).then(dbjson => {          
            // if results is empty
            if(!dbjson.data.results.length)
            {
                reject("TM records could not be found! Please proceed to the helpdesk for assistance");
            }
            else{
                //console.log(dbjson.data.results[0].TeamMember)
                //check register list  
                axios({
                    method: "GET",
                    url: `https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true&filter__field_699773__contains=${dbjson.data.results[0].TeamMember}`,
                    headers: {
                    Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
                    }
                }).then(regjson=>{
                    if(!regjson.data.results.length)
                    {
                       regshow = false;
                    }
                    else
                    {
                        regshow = true;
                    }
                        
                    // check checkin table
                    let tnm = regjson.data.results[0].TeamMember;
                    axios({
                      method: "GET",
                      url: `https://api.baserow.io/api/database/rows/table/120390/?user_field_names=true&filter__field_768921__contains=${tnm}`,
                      headers: {
                      Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
                      }
                  })
                  .then(json=>{
                    //console.log(json.data.results.length)
                        //if checkin table dont have
                      if(!json.data.results.length)
                      {
                          axios({
                              method: "POST",
                              url: "https://api.baserow.io/api/database/rows/table/120390/?user_field_names=true",
                              headers: {
                                Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
                                "Content-Type": "application/json"
                              },
                              data: {
                                "TeamMember": dbjson.data.results[0].TeamMember,
                                "Name": dbjson.data.results[0].Name,
                                "PhoneNo": "",
                                "Email": "",
                                "Department": dbjson.data.results[0].DepartmentName,
                                "Hotstamp":dbjson.data.results[0].Hotstamp,
                                "RegAndShow": regshow
                              }
                            })
                            .then(()=>{
                                let output = 
                                {
                                    "TeamMember":dbjson.data.results[0].TeamMember,
                                    "Name":dbjson.data.results[0].Name,
                                    "Department":dbjson.data.results[0].DepartmentName,
                                    "Checked":false
                                }
                              resolve(output)
                          })
                      }
                      else{
                        let badoutput = {
                            "TeamMember":dbjson.data.results[0].TeamMember,
                            "Name":dbjson.data.results[0].Name,
                            "Department":dbjson.data.results[0].DepartmentName,
                            "Checked":true
                        }
                        resolve(badoutput);
                      }
          
                    
                  })
                    

                })


          
          
                }
            })    
    
    })



}



app.listen(3000);


