var input = [];
    document.getElementById('tm_numebr').addEventListener("input",(evt)=>{
        input.push(evt.data)
        // console.log(input);
        // console.log(input.length)
        if(input.length>5)
        {
            tapredemption()

        }
        else{
            console.log("wait");
        }
    });

function tapredemption(){


    var tm_nm = document.getElementById("tm_numebr").value;

    fetch(`https://onepartyonembs.com.sg/api/tapredmeption/${tm_nm}`,{
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
            document.getElementById('header').innerText = "TM Alcohol Redemption"
            document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
            document.getElementById('name').innerText = "Name: "+result.body.Name;
            document.getElementById('dep').innerText = "Department: "+result.body.Department;
            document.getElementById('drink').innerText = "Available Beer/Wine Redemption: ";
            document.getElementById('drinkcheck').innerText = result.body.Drink;
            document.getElementById('drinkcheck').style.color = "red";
            document.getElementById('callout').style.opacity=1;         
            document.getElementById('callout').style.textAlign="left";



            }
            else
            {
            document.getElementById('header').innerText = "TM Alcohol Redemption"
            document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
            document.getElementById('name').innerText = "Name: "+result.body.Name;
            document.getElementById('dep').innerText = "Department: "+result.body.Department;
            document.getElementById('drink').innerText = "Available Beer/Wine Redemption: "+result.body.Drink;  

            document.getElementById('callout').style.opacity=1;    
            document.getElementById('callout').style.textAlign="left";
     

            }
            
        }
        else{
            document.getElementById('header').innerText = "Warning!";
            document.getElementById('dep').innerText = result.body;
            document.getElementById('callout').style.opacity=1;         
            document.getElementById('callout').style.textAlign="center";


        }
    })  
    .catch(err=>{
        console.log(err)
        document.getElementById('header').innerText = "Warning!";
        document.getElementById('dep').innerText = "Network Issue! ";
        document.getElementById('callout').style.opacity=1;
        document.getElementById('callout').style.textAlign="center";


    });



}

function messagebtn()
{
    document.getElementById('callout').style.opacity=0;
    
    window.location.href = "tapredemption.html";

}


function gomanualRedemption(){
    window.location.href = "manualredemption.html";
}