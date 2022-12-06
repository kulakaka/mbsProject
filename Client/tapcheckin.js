
var input = [];
    document.getElementById('tm_numebr').addEventListener("input",(evt)=>{
        input.push(evt.data)
        // console.log(input);
        // console.log(input.length)
        if(input.length>5)
        {
            tapcheckin()

        }
        else{
            console.log("wait");
        }
    });


  
function tapcheckin(){


    var hotstamp = document.getElementById("tm_numebr").value;

    fetch(`https://onepartyonembs.com.sg/api/tapcheck/${hotstamp}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}

    })
    .then(response=>response.json())
    .then((result) => {
        console.log('Success:', result);
        if(result.success)
        {   
            if(result.body.Checked)
            {
                document.getElementById('header').innerText = "Staff Information Check ";
                document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
                document.getElementById('name').innerText = "Name: "+result.body.Name;
                document.getElementById('dep').innerText = "Department: "+result.body.Department;
                document.getElementById('checked').innerText = "Check-in Before: Yes";
                document.getElementById('callout').style.opacity=1;
                document.getElementById('callout').style.textAlign="left";
            }
            else
            {
                document.getElementById('header').innerText = "Staff Information Check ";
                document.getElementById('tm').innerText = "TM No. :"+result.body.TeamMember;
                document.getElementById('name').innerText = "Name :"+result.body.Name;
                document.getElementById('dep').innerText = "Department :"+result.body.Department;
                document.getElementById('checked').innerText = "Checked in before: No"; 
                document.getElementById('callout').style.opacity=1; 
                document.getElementById('callout').style.textAlign="left";

            }
        console.log(result.body.TeamMember);


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
        //alert("Please approch to helpdev for assistance!")
        document.getElementById('header').innerText = "Warning!";
        document.getElementById('dep').innerText = "Network Issue! ";
        document.getElementById('callout').style.opacity=1;
        document.getElementById('callout').style.textAlign="center";

        //window.location.href = "tapcheckin.html";



    });



}

function messagebtn()
{
    document.getElementById('callout').style.opacity=0;
    console.log("yes")
    window.location.href = "tapcheckin.html";
}



function gomanualcheckin(){
    window.location.href = "manualcheckin.html";
}


