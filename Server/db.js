// // API documentation

const res = require('express/lib/response');

const axios = require('axios').default;


// // API Registeration
// // GET USER INFO 

// app.get("/api/info/:nm", (req, res) => {

//     var nm = parseInt(req.params.nm);
//     var rowid;
//     console.log("getinfo api")
//     try {
      
//         //get rowid from baserow
//         axios({
//             method: "GET",
//             //use staffinfo table for retreive data.
//             url: `https://api.baserow.io/api/database/rows/table/108961/?user_field_names=true&filter__field_687023__contains=${nm}`,
//             headers: {
//               Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//             }
//           })
//             .then(json => {
//                   return res.json(json.data.results[0])
      
//             })
//             .catch(err=>{
//                 console.log('Request Failed',err)
//                 return res.json("Not Match from server")
        
//         }); 

// }

//     catch (error) {
//         return res.json({
//             status: 400,
//             success: false,
//         });
//     }
// })



// //post request with phno 
// app.post("/api/update/:id/:selection/:phno/:dep/:email/:name", (req, res) => {

//         var id = parseInt(req.params.id);
//         var selection = req.params.selection;
//         var phno = req.params.phno;
//         var dep = req.params.dep;
//         var email = req.params.email;
//         var name = req.params.name;
//         var rowid;
//         console.log(id);
//         console.log(selection);
        
//         try {

//             axios({
//                 method: "GET",
//                 url: `https://api.baserow.io/api/database/rows/table/109032/?user_field_names=true&filter__field_687456__contains=${id}`,
//                 headers: {
//                   Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//                 }
//               })
//                 .then(json => {
//                     //console.log(json)
//                     var rowid = json.data.results[0].id
//                     // update selection baserow for admin panel 
//                          axios({
//                              method: "PATCH",
//                              url: `https://api.baserow.io/api/database/rows/table/109032/${rowid}/?user_field_names=true`,
             
//                              headers: {
//                              Authorization : "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
//                              "Content-Type": "application/json"
//                              },
//                              data: {
//                                  "SelectedSession": selection,
//                                  "Email":email,
//                                  "PhoneNo":phno,
//                                  "Name":name,
//                                  "Department":dep,
//                                  "TeamMember":id
                                 
//                              }
//                          })
                
//                      }
                
                
//                 )
//                 .catch(err=>{                  
//                     axios({
//                         method: "POST",
//                         url: "https://api.baserow.io/api/database/rows/table/109032/?user_field_names=true",
//                         headers: {
//                           Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
//                           "Content-Type": "application/json"
//                         },
//                         data: {
//                           "TeamMember": id,
//                           "Name": name,
//                           "Department": dep,
//                           "Email": email,
//                           "PhoneNo": phno,
//                           "SelectedSession": selection
//                         }
//                       })
// });

//         } catch (error) {
//             return res.json({
//                 status: 400,
//                 success: false,
//             });
//         }
        
//     }
// )


// // check if is valid user from register

// app.get("/api/info/:nm", (req, res) => {

//     var nm = parseInt(req.params.nm);
//     var rowid;
//     console.log("getinfo api")
//     try {
      
//         //get rowid from baserow
//         axios({
//             method: "GET",
//             //use staffinfo table for retreive data.
//             url: `https://api.baserow.io/api/database/rows/table/108961/?user_field_names=true&filter__field_687023__contains=${nm}`,
//             headers: {
//               Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//             }
//           })
//             .then(json => {
//                   return res.json(json.data.results[0])
      
//             })
//             .catch(err=>{
//                 console.log('Request Failed',err)
//                 return res.json("Not Match from server")
        
//         }); 

// }

//     catch (error) {
//         return res.json({
//             status: 400,
//             success: false,
//         });
//     }
// })



// // API for check in 
// var nm = 844000;
// axios({
//     method: "GET",
//     //use staffinfo table for retreive data.
//     url: `https://api.baserow.io/api/database/rows/table/110074/?user_field_names=true&filter__field_695169__contains=${nm}`,
//     headers: {
//         Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//     }
//     })
//     .then(json => {
//            //console.log(json.data.results[0])
//         let output = json.data.results[0]
//         let tm = output.TeamMember;
//         let name = output.Name;
//         let dep = output.Department;
//         let phno = output.PhoneNo;
//         let email = output.Email;

//     axios({
//         method: "POST",
//         url: "https://api.baserow.io/api/database/rows/table/109802/?user_field_names=true",
//         headers: {
//           Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
//           "Content-Type": "application/json"
//         },
//         data: {
//           "TeamMember": tm,
//           "Name": name,
//           "Department": dep,
//           "Email": email,
//           "PhoneNo":phno,
//         }
//       })

//     })
//     .catch(err=>{
//         console.log('Unfind in database',err)
//         //return res.json("Not Match from server")
//     })



// API for Redemption
//check vaild user from checked in

// axios({
//     method: "GET",
//     url: `https://api.baserow.io/api/database/rows/table/109032/?user_field_names=true&filter__field_687456__contains=${nm}`,
//     headers: {
//         Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//     }
//     })
//     .then(json => {
//         const date = new Date();

//         // check if is exising user in redemption table
//         axios({
//             method: "GET",
//             url: `https://api.baserow.io/api/database/rows/table/109803/?user_field_names=true&filter__field_692441__contains=${nm}`,
//             headers: {
//             Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//             }
//         })
//         .then(json=>{
//             if (json.data.results[0].FristDrink==true &&json.data.results[0].SecondDrink==true )
//             {
//                 return res.json("Your have been fully redeemed")
//             }
//             else{

//             axios({
//                 method: "PATCH",
//                 url: `https://api.baserow.io/api/database/rows/table/109803/?user_field_names=true&filter__field_692441__contains=${nm}`,
//                 headers: {
//                   Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
//                   "Content-Type": "application/json"
//                 },
//                 data: {
//                   "TeamMember": nm,
//                   "Name": name,
//                   "SecondDrink": true,
//                   "SecondDrinkTime": date
            
//                 }
//               })
//             }


//         })
//         .catch(err=>{
//             axios({
//                 method: "POST",
//                 url: "https://api.baserow.io/api/database/rows/table/109803/?user_field_names=true",
//                 headers: {
//                   Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
//                   "Content-Type": "application/json"
//                 },
//                 data: {
//                   "TeamMember": nm,
//                   "Name": name,
//                   "FristDrink":true,
//                   "FirstDrinkTime":date
                  
//                 }
//               })

//         })

 

//     })
//     .catch(err=>{
//         console.log('Request Failed',err)
//         return res.json("Not Match from server")

// }); 

// var output = 845000;
// axios({
//     method: "GET",
//     url: `https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true&filter__field_699773__contains=${output}`,
//     headers: {
//       Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//     }
//   })
//     .then(json => {
//         //console.log(json.data)
     
//         axios({
//             method: "POST",
//             url: "https://api.baserow.io/api/database/rows/table/109802/?user_field_names=true",
//             headers: {
//               Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
//               "Content-Type": "application/json"
//             },
//             data: {
//               "TeamMember": output,
//               "Name": json.data.results[0].Name,
//               "PhoneNo": json.data.results[0].PhoneNo,
//               "Email": json.data.results[0].Email,
//               "Department": json.data.results[0].Department
//             }
//           })    
//          }
//     )
//     .catch(err=>{                  
//        console.log(err)
//         return res.json({
//             status:400,
//             success:false,
//             body: "User not register!"
//         })
  

// })


//       //GET TOTAL COUNT OF USERS FROM CEHCKIN TABLE AND GET RAMDOM INDEX NUMBER
//       axios({
//         method: "GET",
//         url: "https://api.baserow.io/api/database/rows/table/109802/?user_field_names=true",
//         headers: {
//             Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
//         }
//         }).then(json=>{
//         console.log(json.data.count)

//         totalnum = json.data.count;

//         winnerindex = Math.floor(Math.random()*totalnum-1) + 1;

//         console.log("This is the winner",winnerindex);
//         //GET WINNER INFO 
//         axios({
//             method: "GET",
//             url: `https://api.baserow.io/api/database/rows/table/109802/${winnerindex}/?user_field_names=true`,
//             headers: {
//             Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
//             }
//         }).then(
//             json =>{
//                 //console.log(json.data);
//                 winnername = json.data.Name;
//                 winnertm = json.data.TeamMember;
//                 winnerDep = json.data.Department;
//                 winnerEmail = json.data.Email;
//                 luckydrawvalidationcheck(winnertm)
//                 //Check user if they are belong to hr department
//                 if (winnerDep == "Human Resources" || winnerDep =="HR" || winnerDep =="Human Resource")
//                 {
//                     draw()
//                 } 
//                 else{
//                     axios({
//                         method: "POST",
//                         url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
//                         headers: {
//                         Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
//                         "Content-Type": "application/json"
//                         },
//                         data: { 
//                         "TeamMember": winnertm,
//                         "Name": winnername,
//                         "Department": winnerDep,
//                         "Email": winnerEmail
//                         }
//                     })
//                     .catch(err=>{
//                         console.log(err);
//                     })   
//                 }
//             }
//         )
//         .catch(err=>{
//             console.log(err);
//         })   
//     }
//   )
//   .catch(err=>{
//       console.log(err);
//   })        



//   //CHECK USER IF WIN BEFORE
// function luckydrawvalidationcheck(tm){
//   var tmn = tm;
//   axios({
//     method: "GET",
//     url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
//     headers: {
//       Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
//     }
//   }).then(
//     json=>{
//       //console.log(json.data.results)

//       winnerlist = json.data.results
    
//       for (var i =0; i<winnerlist.length;i++)
//       {
//         if (tmn == winnerlist[i].TeamMember)
//         {
//           draw();
//           break;
//         }
//       } 


//     }
//   )

// }

// var nm = 845000;
// axios({
//   method: "GET",
//   url: `https://api.baserow.io/api/database/rows/table/109802/?user_field_names=true&filter__field_692434__contains=${nm}`,
//   headers: {
//     Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//   }
// })
// .then(getjson=>{
//   if(getjson.data.results.length)
//   {
//       var nmofdrink =  parseInt(getjson.data.results[0].NumberOfDrink);
//       var rowid = getjson.data.results[0].id
//       console.log("nmofdrink",nmofdrink);
//       if (nmofdrink>0)
//       {
//         var currentdrink = nmofdrink-1;
//           axios({
//               method: "PATCH",
//               url: `https://api.baserow.io/api/database/rows/table/109802/${rowid}/?user_field_names=true`,
//               headers: {
//                 Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
//                 "Content-Type": "application/json"
//               },
//               data: {
//                 "NumberOfDrink": currentdrink
//               }
//             })
//       }
//       else
//       {
//         console.log("run out of chances");
//       }

//   }
//   else
//   {   
//     console.log('User not exist');
//   }

// })
// .catch(err=>{
//   console.log('err:',err);
// })

// var hs = 231348;

// axios({
//   method: "GET",
//   url: `https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true&filter__field_656871__contains=${hs}`,
//   headers: {
//     Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//   }
// }).then(regjson => {          
//   // if results is empty
//   if(!regjson.data.results.length)
//   {
//       reject("Cannot find user in reg list");
//   }
//   else{
//           console.log(regjson.data.results);

//           let tnm = regjson.data.results.TeamMember;
//           axios({
//             method: "GET",
//             url: `https://api.baserow.io/api/database/rows/table/110076/?user_field_names=true&filter__field_695204__contains=${tnm}`,
//             headers: {
//             Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//             }
//         })
//         .then(json=>{
//             if(!json.data.results.length)
//             {
//                 axios({
//                     method: "POST",
//                     url: "https://api.baserow.io/api/database/rows/table/110076/?user_field_names=true",
//                     headers: {
//                       Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua",
//                       "Content-Type": "application/json"
//                     },
//                     data: {
//                       "TeamMember": regjson.data.results[0].TeamMember,
//                       "Name": regjson.data.results[0].Name,
//                       "PhoneNo": regjson.data.results[0].PhoneNo,
//                       "Email": regjson.data.results[0].Email,
//                       "Department": regjson.data.results[0].DepartmentName,
//                       "Hotstamp":regjson.data.results[0].Hotstamp
//                     }
//                   })
//                   .then(()=>{
//                     console.log("successfully checked in");
//                     //resolve("User Check In Comfirmed!");
//                 })
//             }
//             else{
//                 console.log("check in failed");
//                 //reject("Multiple Checked In");
//             }

          
//         })


//       }
//   })





// var tempwinlist = [];
// var winnerlist =[];

// axios({
//   method: "GET",
//   //url: "https://api.baserow.io/api/database/rows/table/110076/?user_field_names=true",
//   url: "https://api.baserow.io/api/database/rows/table/112685/?user_field_names=true", //get data from regtest
//   headers: {
//       Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
//   }
//   })
//   .then(json=>{
//   console.log(json.data.count)

//   totalnum = json.data.count;

//   let count =0
//     while(true)
//     {
//     if(count<5)
//     {
//       winnerindex = Math.floor(Math.random()*totalnum-1) + 1;
//       tempwinlist.push(winnerindex);
      
//       if (tempwinlist.length == new Set(tempwinlist).size) {
//         count++;
//       }
//     }
//     else
//     {
//       break
//     }
//     }
//     console.log(tempwinlist);

//     for(let i=0;i<tempwinlist.length;i++)
//     {
//       while(true)
//       {
//       if(winnerlist.includes(tempwinlist[i]))
//       { 
//         console.log("same");
//         // if has the same value as winnerlist
//         let tempindex = Math.floor(Math.random()*totalnum-1) + 1; //gen a new num
//         //check if the new number if same
//         tempwinlist[i] = tempindex; // replace the number
//       }
//       else
//       {  
//         winnerlist.push(tempwinlist[i]);
//         break;
//       }
//       }
//     }
//     //draw10(tempwinlist)
//     console.log(tempwinlist);
//     //draw10(tempwinlist)
//     //var tmpli = [123,321,33,20];
//     axios.all(tempwinlist.map((winnerindex)=>
//     {
//     //GET WINNER INFO 
//     axios({
//       method: "GET",
//       //url: `https://api.baserow.io/api/database/rows/table/110076/${winnerindex}/?user_field_names=true`,
//       url: `https://api.baserow.io/api/database/rows/table/112685/${winnerindex}/?user_field_names=true`,
//       headers: {
//       Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
//       }
//   }).then(
//       json =>{
//           //console.log(json.data);
//           var winnername = json.data.Name;
//           var winnertm = json.data.TeamMember;
//           var winnerDep = json.data.Department;
//           var winnerEmail = json.data.Email;
//           axios({
//             method: "POST",
//             url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
//             headers: {
//             Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
//             "Content-Type": "application/json"
//             },
//             data: { 
//             "TeamMember": winnertm,
//             "Name": winnername,
//             "Department": winnerDep,
//             "Email": winnerEmail
//             }
//         })
//         .catch(err=>{
//             console.log(err);
//         })  
//             })
//           }))
   

// })
// .catch(err=>{

// console.log(err);

// })        


// function draw10(tmpli)
// {
// let tempwinlist = tmpli;
// axios.all(tempwinlist.map((winnerindex)=>
// {
//     //GET WINNER INFO 
//     axios({
//       method: "GET",
//       //url: `https://api.baserow.io/api/database/rows/table/110076/${winnerindex}/?user_field_names=true`,
//       url: `https://api.baserow.io/api/database/rows/table/112685/${winnerindex}/?user_field_names=true`,
//       headers: {
//       Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
//       }
//   }).then(
//       json =>{
//           //console.log(json.data);
//           var winnername = json.data.Name;
//           var winnertm = json.data.TeamMember;
//           var winnerDep = json.data.Department;
//           var winnerEmail = json.data.Email;
//           axios({
//             method: "POST",
//             url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
//             headers: {
//             Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
//             "Content-Type": "application/json"
//             },
//             data: { 
//             "TeamMember": winnertm,
//             "Name": winnername,
//             "Department": winnerDep,
//             "Email": winnerEmail
//             }
//         })
//         .catch(err=>{
//             console.log(err);
            
//         })  
        
//             })
          
//           }))
// };

// let output = 123123;
// axios({
//   method: "GET",
//   url: `https://api.baserow.io/api/database/rows/table/120410/?user_field_names=true&filter__field_769032__contains=${output}`,
//   headers: {
//     Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//   }
// }).then(dbjson => { console.log(dbjson.data.results)})
// let tempwinlist=[];
// var drwatime = 8;
// let count =0;
// var totalnum = 100;
// while(true)
// {
// if(count<drwatime)
// {
//   let winnerindex = Math.floor(Math.random()*totalnum-1) + 1;
//   tempwinlist.push(winnerindex);
  
//   if (tempwinlist.length == new Set(tempwinlist).size) {
//         count++;
//   }
//   else{
//     console.log('same')
//     tempwinlist.pop();
//   }
// }
// else
// {
//   break
// }
// }

var tnm= 
// console.log(tempwinlist);
axios({
    method: "GET",
    url: `https://api.baserow.io/api/database/rows/table/115452/?user_field_names=true&filter__field_768912__contains=${tnm}`,
    headers: {
    Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
    }
})
.then(json=>{
  //console.log(json.data.results.length)
      //if checkin table dont have
    //if(!json.data.results.length)
    console.log(json.data.results.length);
})