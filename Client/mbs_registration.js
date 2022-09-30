

 window.onload = function(){
    var tmno = localStorage.getItem("tm_number")
   searchinfo(tmno)
   
}

function searchinfo(nm)
{

    fetch(`http://localhost:3000/info/${nm}`,
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
     fetch(`http://localhost:3000/update/${tm_nm}/${val}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
     })
     .then(response=>response.json())
     .then(json=>console.log(json))
     .catch(err=>console.log(err));


     var params = {
        stuff_name :document.getElementById("name").value,
        stuff_email:document.getElementById("email").value
     }
     emailjs.send("service_l5179en","template_qijjyoh",params).then(function (res){
        alert("Email has been Sent!")
        location.href = "final.html";
     })

    

}