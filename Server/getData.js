const express = require ("express");
const bodyParser = require("body-parser");

const sqlite = require("sqlite3").verbose();
const app = express();
const res = require("express/lib/response");
const db = new sqlite.Database("./Database/mbsProjet.db" ,sqlite.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err);
    console.log('Connected to database.');
});

app.use(bodyParser.json());
const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//post request
app.post("/api/update/:id/:selection",(req,res)=>
{
    var id = parseInt(req.params.id);
    var selection = req.params.selection;
    // console.log(id);
    // console.log(selection);
    try{
        const sql = `UPDATE stuffs SET selection= ? WHERE tmid=?`;
        db.all(sql,[selection,id],(err,data)=>{

          if(err) return res.json({status:300,success:false,error:err});

          return res.json({status:200,success:"Success input"});

        });

    }
    catch(error){
        return res.json({
            status:400,
            success:false,
        });
    }

}
)


//get request

app.get("/api/info/:id",(req,res)=>{

    var id = parseInt(req.params.id);

    try{
        sql = `SELECT * FROM stuffs WHERE tmid=${id}`;
        db.all(sql,[],(err,rows)=>{
            if(err) return res.json({status:300,success:false,error:err});

            if(rows.length<1)
            return res.json({status:300,success:false,error:"no match"});

            //return res.json({status:200,data:rows,success:true});
            return res.json(rows);

        })
    }
    catch(error){
        return res.json({
            status:400,
            success:false,
        });
    }
})


app.listen(3000);
