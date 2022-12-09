
function Refreshbtn()
{
    //window.location.href = "adminPanel.html"
    fetch(`https://onepartyonembs.com.sg/api/checkattendance/`,{
        method:"GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response=>
        response.json()
    )
    .then(json=>{
        //console.log(json)
        document.getElementById('dep').innerText = "Current Attendance: "+json.totalnum;
        
    })

    .catch(err=>{
        console.log(err);
        alert("Please inform web developer to check");
    });


}