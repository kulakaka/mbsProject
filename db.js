const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./Server/Database/mbsProjet.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to database.');
  });


// const sql = "INSERT INTO stuffs(tmid,name,department,email,contact) VALUES (?,?,?,?,?)";

// db.run(sql,[10010,"Simon Fan","HUMAN RESOURCES","simonfans0928@gmail.com","84600021"],(err)=>
// {
//   if (err) return console.error(err.message);
//   console.log("A new row has been created");
// })


const sql = "SELECT * FROM stuffs";
db.all(sql,[],(err,row)=>{
  if(err) return console.error(err.message);
  row.forEach((row)=>{
    console.log(row);  
  });
});

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });


  