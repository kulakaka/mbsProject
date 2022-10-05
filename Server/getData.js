const express = require ("express");
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
const bodyParser = require("body-parser");

const sqlite = require("sqlite3").verbose();
const app = express();
const res = require("express/lib/response");

app.use(bodyParser.json());
const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

Sentry.init({
  dsn: "https://e38bdea921b04ee2b0a1d107bee4aeb0@o1208814.ingest.sentry.io/4503929787056128",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

//post request
app.post("/api/update/:id/:selection",(req,res)=>
{
    var id = parseInt(req.params.id);
    var selection = req.params.selection;
    console.log(id);
    console.log(selection);
    try{
        // Open Database
        const db = new sqlite.Database("./Database/mbsStuff.db" ,sqlite.OPEN_READWRITE,(err)=>{
            if(err) return console.error(err);
            console.log('Connected to database.');
        });
        // Execute query
        const sql = `UPDATE stuff SET SelectedSession= ? WHERE TeamMember=?`;
        db.all(sql,[selection,id],(err,data)=>{

          if(err) return res.json({status:300,success:false,error:err});

          return res.json({status:200,success:"Success input"});

        });
        // Close database
        db.close((err) => {
            if (err)
              console.log(err.message);
            else
              console.log('Close the database connection.')
          });

    }

    catch(error){
        return res.json({
            status:400,
            success:false,
        });
    }

    // axios({
    //     method: "PATCH",
    //     url: `https://api.baserow.io/api/database/rows/table/104714/${id}/?user_field_names=true`,
    //     headers: {
    //       Authorization: "3glrmUodv0seXwUsYZKrYRqaNA68jGtc",
    //       "Content-Type": "application/json"
    //     },
    //     data: {
    //         "Selected Session":selection
    //     }
    //   })


}
)


//get request

app.get("/api/info/:id",(req,res)=>{

    var id = parseInt(req.params.id);

    try{
       // Open Database
       const db = new sqlite.Database("./Database/mbsStuff.db" ,sqlite.OPEN_READWRITE,(err)=>{
        if(err) return console.error(err);
        console.log('Connected to database.');
        });

        // Execute query
        sql = `SELECT * FROM stuff WHERE TeamMember=${id}`;
        db.all(sql,[],(err,rows)=>{
            if(err) return res.json({status:300,success:false,error:err});

            if(rows.length<1)
            return res.json({status:300,success:false,error:"no match"});

            //return res.json({status:200,data:rows,success:true});
            return res.json(rows);

        })

    // Close database
        db.close((err) => {
            if (err)
              console.log(err.message);
            else
              console.log('Close the database connection.')
          });
    }

    catch(error){
        return res.json({
            status:400,
            success:false,
        });
    }
})


//sms function
app.get("/api/sms/:phno/:name/:val",(req,res)=>
{

    const accountSid = 'AC5903079836c0d20ab145562b6b5a0b41';
    const authToken = 'fa8a59146c92a9f3251c2a67399ffa36';
    const client = require('twilio')(accountSid, authToken);
    var phno = req.params.phno;
    var name = req.params.name;
    var val = req.params.val;

    if(val == "1")
    {
        session_timeslot = " From 10:00am to 4:00pm";
    }
    if(val == "2")
    {
        session_timeslot = "From 6:00pm to 12:00am";
    }

    var text = "Dear "+name+"\n"+"Your RSVP for One Party, One MBS – Endless Possibilities Session " +val+"is confirmed."+"\n"+
    "Date: 15 December 2022\n"+
    "Time: Session "+val+" "+session_timeslot+"\n"+
    "Venue: Sands Expo and Convention Centre, Level 5, Sands Grand Ballroom\n"+
    "\n"+
    "See you on 15 December 2022! \n" +"-------"+
    "If you wish to amend the session you have selected, please click on the link below \n"+
    "https://onepartyonembs.com.sg"


    try{

        client.messages.create({
         body: text,
         messagingServiceSid: 'MG216d22c854ec229d65cd09060464e761',
         to: '+65'+phno
       })

      .then(message => console.log(message.sid))
      .done();
      return res.json({status:200,success:true});

    }
    catch(error){
        return res.json({
            status:400,
            success:false,

        });
    }

}
)

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 404 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(3000);
