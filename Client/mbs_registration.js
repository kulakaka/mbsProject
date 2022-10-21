

 window.onload = function(){
    var tmno = localStorage.getItem("tm_number")
   searchinfo(tmno)

}
// http://localhost:3000/
// https://onepartyonembs.com.sg/
function searchinfo(nm)
{

    //Get data from local server database

    // fetch(`https://onepartyonembs.com.sg/api/info/${nm}`,
    // {
    //     method:"GET",
    //     header:{"Content-type": "application/json;charset=UTF-8"}
    // })
    //     .then(response=>response.json())
    //     .then(json => {
    //         console.log(json)
    //         var name = json[0].Name;
    //         var Department = json[0].DepartmentName;
    //         var email = json[0].Email;
    //         var tm = json[0].TeamMember;
    //         var contact = json[0].PhoneNo;
    //         var selection = json[0].SelectedSession;

    //         document.getElementById("name").setAttribute('value',name)
    //         document.getElementById('Department').setAttribute('value',Department)
    //         document.getElementById('email').setAttribute('value',email)
    //         document.getElementById('tm_numebr').setAttribute('value',tm)
    //         document.getElementById('contact_no').setAttribute('value',contact)
    //         radiobtn1 = document.getElementById("session1");
    //         radiobtn2 = document.getElementById("session2");

    //         if (selection == "1"){

    //             radiobtn1.checked = true;


    //         }
    //         if (selection == "2"){
    //             radiobtn2.checked = true;


    //         }

    //     })
    //     .catch(err=>console.log('Request Failed',err));

        

            fetch(`https://onepartyonembs.com.sg/api/info/${nm}`,
            {
                method:"GET",
                header:{"Content-type": "application/json;charset=UTF-8"}
            })
            .then(response=>response.json())
            .then(json=>{
            
                //console.log(json)
                // var name = json.Name;
                var Department = json.DepartmentName;
                // var email = json.Email;
                var tm = json.TeamMember;
                // var contact = json.PhoneNo;
                // var selection = json.SelectedSession;

                //document.getElementById("name").setAttribute('value',name)
                document.getElementById('Department').setAttribute('value',Department)
                //document.getElementById('email').setAttribute('value',email)
                document.getElementById('tm_numebr').setAttribute('value',tm)
                //document.getElementById('contact_no').setAttribute('value',contact)
                //radiobtn1 = document.getElementById("session1");
                //radiobtn2 = document.getElementById("session2");

                // if (selection == "1"){

                //     radiobtn1.checked = true;
                // }
                // if (selection == "2"){
                //     radiobtn2.checked = true;
                // }     
            })
            .catch(err=>console.log(err));
}

        

function confrimReg(){
    var val;
    var tm_nm = document.getElementById("tm_numebr").value;

    val =document.querySelector('input[name="session"]:checked').value;


    //console.log(val);

    //console.log("seletion:"+val);

    //update admin panel api
    //get rowid
    

    // fetch(`https://api.baserow.io/api/database/rows/table/104714/?user_field_names=true&filter__field_656863__contains=${tm_nm}`,
    // {
    //     method:"GET",
    //     headers:{"Authorization":"Token GJTONGLhbwvH8cxVXGrcY5PVM323aZua"}
    // })
    //     .then(response=>response.json())
    //     .then(json => {
    //         console.log(json)
    //         var results = json.results[0];
    //         rowid = results.id
    //         console.log("this is id ",rowid)

                //calling update api
            fetch(`https://onepartyonembs.com.sg/api/update/${tm_nm}/${val}`,{
                method:"POST",
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response=>response.json())
            //.then(json=>console.log(json))
            .catch(err=>console.log(err));

        // })
        // .catch(err=>console.log('Request Failed',err));



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
     emailjs.send("service_b6rb00e","template_r8kfpav",params).then(function (res){
        alert("Email has been Sent!")
        location.href = "final.html";
     })





}



