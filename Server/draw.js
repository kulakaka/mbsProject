const { default: axios } = require("axios");
const fs = require("fs");
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
        var winnerTM = checkinjson.data.results.TeamMember;
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
                    var winnername = json.data.Name;
                    var winnertm = json.data.TeamMember;
                    var winnerDep = json.data.Department;
                    var winnerEmail = json.data.Email;
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
                  .then(resolve("Good"))
                  .catch(err=>{
                      console.log(err);
                      reject("Bad")
                  })  
                      })
  
            }
            else{
              valicount+=1;
  
            }
          })
  
          }
          else{
            valicount+=1;
          }
      })

      })

    }))
    
    if(!valicount==0)
    {
      draw(valicount)
    }
})
.catch(err=>{

console.log(err);
reject("Bad")
})        

})

}

