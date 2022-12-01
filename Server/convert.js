const fs = require("fs");
const { parse } = require("csv-parse");

const axios = require('axios').default;
var list = []
let tmlist = []
fs.createReadStream("C:/Users/User/Desktop/Codesurance/mbsProject/mbsProject/utilit/pplcannotwincsv.csv")
.pipe(parse({ delimiter: ",", from_line: 1 }))
.on("data", function (row) {

  //console.log(row[0]);
    let tm = parseInt(row[0])     

    list.push(tm)
})
.on("error", function (error) {
  console.log(error.message);
})
.on("end", function () {
  
    //console.log(list)
    console.log("finished");
    
    axios.all(list.map((tm)=>{
        
        axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/112685/?user_field_names=true&filter__field_713185__contains=${tm}`,
            headers: {
              Authorization: "Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"
            }
          }).then(json=>{
            if(json.data.results[0]===undefined)
            {
                //console.log(json.data.results[0])
                //tmlist.push(json.data.results)
                //console.log("1")
            }
            else{
                //console.log('2')
                //console.log(json.data.results)
                //tmlist.push(json.data.results[0])
                console.log(json.data.results[0].id+",")
                //tmlist.push(json.data.results[0].id)
                //resolve("good")
            }
        
        })}))
        
  
});

