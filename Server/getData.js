// import fetch from 'node-fetch';
// import axios from 'axios';
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import AppPage from 'twilio';

const express = require("express");
const bodyParser = require("body-parser");

const sqlite = require("sqlite3").verbose();
const app = express();
const res = require("express/lib/response");
const axios = require('axios').default;




app.use(bodyParser.json());
const cors = require("cors");
const { response } = require("express");
const { AppPage } = require("twilio/lib/rest/microvisor/v1/app");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//post request
app.post("/api/update/:id/:selection", (req, res) => {

        var id = parseInt(req.params.id);
        var selection = req.params.selection;
        var rowid;
        console.log(id);
        console.log(selection);
        
        try {
            // // Open Database
            // const db = new sqlite.Database("./Database/mbsStuff.db", sqlite.OPEN_READWRITE, (err) => {
            //     if (err) return console.error(err);
            //     console.log('Connected to database.');
            // });
            // // Execute query
            // const sql = `UPDATE stuff
            //              SET SelectedSession= ?
            //              WHERE TeamMember = ?`;
            // db.all(sql, [selection, id], (err, data) => {

            //     if (err) return res.json({status: 300, success: false, error: err});

            //     return res.json({status: 200, success: "Success input"});

            // });
            // // Close database
            // db.close((err) => {
            //     if (err)
            //         console.log(err.message);
            //     else
            //         console.log('Close the database connection.')
            // });

            axios({
                method: "GET",
                url: `https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true&filter__field_656863__contains=${id}`,
                headers: {
                  Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
                }
              })
                .then(json => {
                    //console.log(json)
                    var rowid = json.data.results[0].id
                    //console.log("this is id from update api",rowid)
    
                   // update selection baserow for admin panel 
                        axios({
                            method: "PATCH",
                            url: `https://api.baserow.io/api/database/rows/table/104714/${rowid}/?user_field_names=true`,
            
                            headers: {
                            Authorization : "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                            "Content-Type": "application/json"
                            },
                            data: {
                                "SelectedSession": selection
                            }
                        })

    
                })
                .catch(err=>console.log('Request Failed',err));



        } catch (error) {
            return res.json({
                status: 400,
                success: false,
            });
        }
        
    }
)

//get request

app.get("/api/info/:nm", (req, res) => {

    var nm = parseInt(req.params.nm);
    var rowid;

    try {
        // // Open Database
        // const db = new sqlite.Database("./Database/mbsStuff.db", sqlite.OPEN_READWRITE, (err) => {
        //     if (err) return console.error(err);
        //     console.log('Connected to database.');
        // });

        // // Execute query
        // sql = `SELECT *
        //        FROM stuff
        //        WHERE TeamMember = ${id}`;
        // db.all(sql, [], (err, rows) => {
        //     if (err) return res.json({status: 300, success: false, error: err});

        //     if (rows.length < 1)
        //         return res.json({status: 300, success: false, error: "no match"});

        //     //return res.json({status:200,data:rows,success:true});
        //     return res.json(rows);
        //)}

        //get rowid from baserow
        axios({
            method: "GET",
            //use staffinfo table for retreive data.
            url: `https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true&filter__field_656863__contains=${nm}`,
            //url: `https://api.baserow.io/api/database/rows/table/108961/?user_field_names=true&filter__field_687023__contains=${nm}`,
            headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
            }
          })
            .then(json => {
                       //console.log(json.data.results[0])
                  return res.json(json.data.results[0])
                //console.log(json)
                //var rowid = json.data.results[0].id
                //console.log("this is id from update api",rowid)
                
                //        // get user info from baserow
                // axios({
                //     method: "GET",
                //     //url: `https://api.baserow.io/api/database/rows/table/104714/${rowid}/?user_field_names=true`,
                //     //url: `https://api.baserow.io/api/database/rows/table/108961/${rowid}/?user_field_names=true`,
                //     headers: {
                //         Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
                //     }
                //     })
                // //.then(response=>response.json())
                // .then(json =>{
                //     console.log("return json from api getinfo")
                //     //console.log(json)
                //     return res.json(json.data)
                // });

            })
            .catch(err=>{
                console.log('Request Failed',err)
                return res.json("Not Match from server")
        
        }); 

}

    catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})


        // Close database
    //     db.close((err) => {
    //         if (err)
    //             console.log(err.message);
    //         else
    //             console.log('Close the database connection.')
    //     });
    // } catch (error) {
    //     return res.json({
    //         status: 400,
    //         success: false,
    //     });
    // }
// })


//sms function
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



app.listen(3000);
    