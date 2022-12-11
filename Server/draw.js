const { default: axios } = require("axios");
var totalnum ;
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
        console.log('same in ramdom generator');

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
        var winnerTM = checkinjson.data.TeamMember;
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
          
                    var winnername = checkinjson.data.Name;
                    var winnerDep = checkinjson.data.Department;
                    axios({
                      method: "POST",
                      url: "https://api.baserow.io/api/database/rows/table/112691/?user_field_names=true",
                      headers: {
                      Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq",
                      "Content-Type": "application/json"
                      },
                      data: { 
                      "TeamMember": winnerTM,
                      "Name": winnername,
                      "Department": winnerDep
                      }
                  })
                  .then(resolve("Good"))
                  .catch(err=>{
                      console.log(err);
                      reject("Bad")
                  })  
             
  
            }
            else{
              console.log("User won before");
              //valicount+=1;
              draw(1);
  
            }
          })
  
          }
          else{
            console.log("cannot win staff win ");
            //valicount+=1;
            draw(1);
          }
      })

      })

    }))
    
    
})
.catch(err=>{

console.log(err);
reject("Bad")
})        
})

}




draw(5);