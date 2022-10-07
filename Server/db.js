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

//const axios = require('axios').default;

// axios({
//   method: "GET",
//   url: "https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true",
//   headers: {
//     Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
//   }
// })

