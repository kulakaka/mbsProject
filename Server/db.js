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

function one(a,b){
  c = a+b;
  return two(c);
  
}

function two(a)
{
  d = c+1;
  return d;

}


function good(status)
{
  return !status
}
//console.log(one(1,2))
console.log(good(false))