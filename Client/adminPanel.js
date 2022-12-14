
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
        document.getElementById('count1').innerText = "Session1 Attendance: "+json.s1num;
        document.getElementById('count2').innerText = "Session2 Attendance: "+json.s2num;
        document.getElementById('total').innerText = "Total Attendance: "+json.totalnum;

        
    })

    .catch(err=>{
        console.log(err);
        alert("Please inform web developer to check");
    });


}