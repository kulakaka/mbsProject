const axios = require('axios').default;


function draw()
{

    axios({
        method: "GET",
        url: "https://api.baserow.io/api/database/rows/table/110728/?user_field_names=true",
        headers: {
          Authorization: "Token pJUmXlCIRJaP618ys13YJDdrvi3DUAGq"
        }
      })
      .then(json => {
        //console.log(json.data.results)
        var checkedin = json.data.results;
        console.log(checkedin.length)
        })
    .catch(err=>{
        console.log('Request Failed',err)
        
    })
}


draw()