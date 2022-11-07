const { json } = require('body-parser');

const axios = require('axios').default;


var totalnum;
let winnerindex;
function draw()
{
  

  axios({
    method: "GET",
    url: "https://api.baserow.io/api/database/rows/table/112685/?user_field_names=true",
    headers: {
      Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
    }
  }).then(json=>{
    console.log(json.data.count)

    totalnum = json.data.count;

    winnerindex = Math.floor(Math.random()*totalnum-1) + 1;
    
    console.log("This is the winner",winnerindex);
                
axios({
    method: "GET",
    url: `https://api.baserow.io/api/database/rows/table/112685/${winnerindex}/?user_field_names=true`,
    headers: {
      Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
    }
  }).then(
    json =>{
        //console.log(json.data);
        winnername = json.data.Name;
        winnertm = json.data.TeamMember;
        winnerDep = json.data.Department;
        winnerEmail = json.data.Email;

        validationcheck(winnertm)

        if (winnerDep == "Human Resource" || winnerDep =="HR")
        {
            draw()
        } 
        else{
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

        }


        
 
    }
  )
})  
  }


function validationcheck(tm){
  var tmn = tm;
  axios({
    method: "GET",
    url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
    headers: {
      Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
    }
  }).then(
    json=>{
      //console.log(json.data.results)

      winnerlist = json.data.results
    
      for (var i =0; i<winnerlist.length;i++)
      {
        if (tmn == winnerlist[i].TeamMember)
        {
          draw();
          break;
        }
      } 


    }
  )

}

draw()

