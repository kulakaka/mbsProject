
function RedemptionCheck(){

    var tm_nm = document.getElementById("tm_numebr").value;

    fetch(`https://onepartyonembs.com.sg/api/redmeption/${tm_nm}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}

    })
    .then(response=>response.json())
    .then((result) => {
        console.log('Success:', result);
        if(result.success)
        {   
            document.getElementById('header').innerText = "TM Alcohol Redemption"
            document.getElementById('tm').innerText = "TM No. : "+result.body.TeamMember;
            document.getElementById('name').innerText = "Name: "+result.body.Name;
            document.getElementById('dep').innerText = "Department: "+result.body.Department;
            document.getElementById('drink').innerText = "Drink status: "+result.body.Drink;       
            document.getElementById('callout').style.opacity=1;         

        }
        else{
            document.getElementById('header').innerText = "Warning!";
            document.getElementById('dep').innerText = result.body;
            document.getElementById('callout').style.opacity=1;         

        }
    })  
    .catch(err=>{
        console.log(err)
        alert("Please Approch to Devdesk for assistance!");
        //document.getElementById('drink').innerText = "NOT VALID USER!";
        window.location.href = "manualredemption.html";
    });


}


function messagebtn()
{
    document.getElementById('callout').style.opacity=0;
    
    window.location.href = "tapredemption.html";

}



function TapToRedeem(){

    window.location.href="tapredemption.html";
}