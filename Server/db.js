// const sqlite3 = require('sqlite3').verbose();


// const db = new sqlite3.Database('./Server/Database/mbsProjet.db', (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Connected to database.');
//   });


// // const sql = "INSERT INTO stuffs(tmid,name,department,email,contact) VALUES (?,?,?,?,?)";

// // db.run(sql,[10010,"Simon Fan","HUMAN RESOURCES","simonfans0928@gmail.com","84600021"],(err)=>
// // {
// //   if (err) return console.error(err.message);
// //   console.log("A new row has been created");
// // })


// const sql = "SELECT * FROM stuffs";
// //const sql = "UPDATE stuffs SET selection='1' WHERE tmid=10010;"
// db.all(sql,[],(err,row)=>{
//   if(err) return console.error(err.message);
//   row.forEach((row)=>{
//     console.log(row);  
//   });
// });

//   db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });


// axios({
//   method: "GET",
//   url: "https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true",
//   headers: {
//     Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//   }
// })

// axios({
//   method: "PATCH",
//   url: `https://api.baserow.io/api/database/rows/table/104714/10311/?user_field_names=true`,
//   headers: {
//     Authorization : "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
//     "Content-Type": "application/json"
//   },
//   data: {
//       "Selected Session": 1
//   }
// })



// axios({
//     method: "GET",
//     url: `https://api.baserow.io/api/database/rows/table/104714/${rowid}/?user_field_names=true`,
//     headers: {
//       Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
//     }
//   })
//   .then(response=>{
//     console.log(response.data)})

// fetch(`https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true&filter__field_656863__contains=${nm}`,
// {
//     method:"GET",
//     headers:{"Authorization":"Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"}
// })
//     .then(response=>response.json())
//     .then(json => {
//         console.log(json)
//         var results = json.results[0];
//         rowid = results.id;
//         console.log("this is id ",rowid);
//         return res.json({rowid:rowid});
        
//     })
//     .catch(err);


//var tm_nm = 10010;
// axios({
//     method: "GET",
//     url: `https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true&filter__field_656863__contains=10010`,
//     headers: {
//       Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//     }
//   })
 
//     //.then(response=>response.json())
//     .then(json => {
//         //console.log(json)
//         var results = json.results;
//         console.log(JSON.parse(JSON.stringify(results)))
//         // rowid = results.id;
//         // console.log("this is id ",rowid);
//         // return res.json({rowid:rowid});
        
//     });
// import fetch from 'node-fetch';
// var rowid = 10311


// fetch(`https://api.baserow.io/api/database/rows/table/104714/${rowid}/?user_field_names=true`,
// {
//     method:"GET",
//     headers:{"Authorization":"Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"}
// })
// .then(response=>response.json())
// .then(json =>{
//     console.log(json)
// });
//const axios = require('axios').default;

// var rowid = 10010;

// axios({
//     method: "GET",
//     url: `https://api.baserow.io/api/database/rows/table/104714/${rowid}/?user_field_names=true`,
//     headers: {
//       Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//     }
//   })
//   .then(response=>response.json())
//     .then(json => {
//         console.log(json.data)})