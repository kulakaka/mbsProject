
// get tm number from local storage
 window.onload = function(){
    var tmno = localStorage.getItem("tm_number")
   searchinfo(tmno)
}
// http://localhost:3000/
// https://onepartyonembs.com.sg/


// set tm number input value from the parameter
function searchinfo(nm)
{
    var tm = nm;

    document.getElementById('tm_numebr').setAttribute('value',tm)
}

        

// pass input values to server
function confrimReg(){
   
    var tm_nm = document.getElementById("tm_numebr").value;
    var val =document.querySelector('input[name="session"]:checked').value;
    var dep = document.getElementById("Department").value;
    var email = document.getElementById("email").value;
    var phno = document.getElementById("contact_no").value
    var name = document.getElementById("name").value

  
if(email.length==0 || tm_nm.length==0 || dep.length==0 || name.length==0)
{

    alert("Please fill up your infomation")
    
}

else{

//phone number is optional 
    if(phno.length==0)
    {
        console.log("Without phonenumber");
        //calling nophno api
          fetch(`https://onepartyonembs.com.sg/api/updatenopho/${tm_nm}/${val}/${dep}/${email}/${name}`,{
            method:"POST",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response=>response.json())
        .catch(err=>console.log(err));



        if(val == "1")
        {
            session_timeslot = "(11:00am to 4:00pm)";
        }
        if(val == "2")
        {
            session_timeslot = "(6:00pm to 12:00am)";
        }

    // send email function   
        var params = {
            stuff_name :document.getElementById("name").value,
            stuff_email:document.getElementById("email").value,
            session:val,
            session_timeslot:session_timeslot,
            url:"https://www.onepartyonembs.com.sg/index"
        }
        emailjs.send("service_b6rb00e","template_r8kfpav",params).then(function (res){
            alert("Email has been Sent!")
            location.href = "final.html";
        })

    }
    else{
        console.log(" with phonenumber");
         //calling withphno api
         fetch(`https://onepartyonembs.com.sg/api/update/${tm_nm}/${val}/${phno}/${dep}/${email}/${name}`,{
            method:"POST",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response=>response.json())
        //.then(json=>console.log(json))
        .catch(err=>console.log(err));
        

     // call sms api
    if(val == "1")
    {
        session_timeslot = "(11:00am to 4:00pm)";
    }
    if(val == "2")
    {
        session_timeslot = "(6:00pm to 12:00am)";
    }

    var phno = document.getElementById("contact_no").value
    var name = document.getElementById("name").value

    fetch(`https://onepartyonembs.com.sg/api/sms/${phno}/${name}/${val}`,{
        method:"GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
     })
     .then(response=>response.json())
     .then(json=>console.log(json))
     .catch(err=>console.log(err));


    // send email function
     var params = {
        stuff_name :document.getElementById("name").value,
        stuff_email:document.getElementById("email").value,
        session:val,
        session_timeslot:session_timeslot,
        url:"https://www.onepartyonembs.com.sg/index"
     }
     emailjs.send("service_b6rb00e","template_r8kfpav",params)
        .then(function (res){
        alert("Email has been Sent!")
        location.href = "final.html";
     })

    }
    

}

}



