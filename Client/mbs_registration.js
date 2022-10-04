

 window.onload = function(){
    var tmno = localStorage.getItem("tm_number")
   searchinfo(tmno)

}

function searchinfo(nm)
{

    fetch(`https://onepartyonembs.com.sg/api/info/${nm}`,
    {
        method:"GET",
        header:{"Content-type": "application/json;charset=UTF-8"}
    })
        .then(response=>response.json())
        .then(json => {
            console.log(json)
            var name = json[0].name;
            var Department = json[0].department;
            var email = json[0].email;
            var tm = json[0].tmid;
            var contact = json[0].contact;
            var selection = json[0].selection;

            document.getElementById("name").setAttribute('value',name)
            document.getElementById('Department').setAttribute('value',Department)
            document.getElementById('email').setAttribute('value',email)
            document.getElementById('tm_numebr').setAttribute('value',tm)
            document.getElementById('contact_no').setAttribute('value',contact)
            radiobtn1 = document.getElementById("session1");
            radiobtn2 = document.getElementById("session2");

            if (selection == "1"){

                radiobtn1.checked = true;


            }
            if (selection == "2"){
                radiobtn2.checked = true;


            }

        })
        .catch(err=>console.log('Request Failed',err));
}


function confrimReg(){
    var val;
    var tm_nm = document.getElementById("tm_numebr").value;

    val =document.querySelector('input[name="session"]:checked').value;
    //console.log(val);

    console.log("seletion:"+val);
     fetch(`https://onepartyonembs.com.sg/api/update/${tm_nm}/${val}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
     })
     .then(response=>response.json())
     .then(json=>console.log(json))
     .catch(err=>console.log(err));

    if(val == "1")
    {
        session_timeslot = " From 10:00am to 4:00pm";
    }
    if(val == "2")
    {
        session_timeslot = "From 6:00pm to 12:00am";
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
 // works on localhost