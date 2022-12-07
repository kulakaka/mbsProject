
function RedemptionCheck(){

    var tm_nm = document.getElementById("tm_numebr").value;

    fetch(`http://localhost:3000/api/redmeption/${tm_nm}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}

    })
    .then(response=>response.json())
    .then((result) => {
        console.log('Success:', result);
        if(result.success)
        {   
            if(result.body.Done)
            {
            document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
            document.getElementById('name').innerText = "Name: "+result.body.Name;
            document.getElementById('dep').innerText = "Department: "+result.body.Department;
            document.getElementById('drink').innerText = "Available Beer/Wine: ";
            document.getElementById('drinkcheck').innerText = result.body.Drink;
            document.getElementById('drinkcheck').style.color = "red";
            document.getElementById('callout').style.opacity=1;         



            }
            else
            {
            document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
            document.getElementById('name').innerText = "Name: "+result.body.Name;
            document.getElementById('dep').innerText = "Department: "+result.body.Department;
            document.getElementById('drink').innerText = "Available Beer/Wine: "+result.body.Drink;  
            document.getElementById('callout').style.opacity=1;    
     
            }        

        }
        else{
            document.getElementById('dep').innerText = result.body;
            document.getElementById('callout').style.opacity=1;         
            document.getElementById('callout').style.textAlign="center";      
            document.getElementById('dep').style.fontSize='20px';

        }
    })  
    .catch(err=>{
        console.log(err)
        document.getElementById('dep').innerText = "Network Issue! ";
        document.getElementById('callout').style.opacity=1;
        document.getElementById('callout').style.textAlign="center";
        document.getElementById('dep').style.fontSize='20px';

    });
}


function messagebtn()
{
    document.getElementById('callout').style.opacity=0;
    
    window.location.href = "manualredemption.html";

}



function TapToRedeem(){

    window.location.href="tapredemption.html";
}