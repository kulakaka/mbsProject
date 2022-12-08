
// var input = [];
//     document.getElementById('tm_numebr').addEventListener("input",(evt)=>{
//         input.push(evt.data)
//         // console.log(input);
//         // console.log(input.length)
//         if(input.length>5)
//         {
//             tapcheckin()
//         }
//         else{
//             console.log("wait");
//         }
//     });

document.getElementById('tm_numebr').addEventListener('keypress',function(event)
{
    if (event.key === "Enter")
    {
        //tapcheckin()
        //console.log(document.getElementById("tm_numebr").value)
        var nm = document.getElementById("tm_numebr").value

        tapcheckin(nm)
        event.preventDefault()
    }
})
  
function tapcheckin(nm){


    //var hotstamp = document.getElementById("tm_numebr").value;
    var hotstamp = nm;
    
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
                document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
                document.getElementById('name').innerText = "Name: "+result.body.Name;
                document.getElementById('dep').innerText = "Department: "+result.body.Department;
                document.getElementById('checked').innerText = "Check-in Before: Yes";
                document.getElementById('callout').style.opacity=1;
                document.getElementById('callout').style.textAlign="center";
            }
            else
            {
                document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
                document.getElementById('name').innerText = "Name: "+result.body.Name;
                document.getElementById('dep').innerText = "Department: "+result.body.Department;
                document.getElementById('checked').innerText = "Check-in before: No"; 
                document.getElementById('callout').style.opacity=1; 
                document.getElementById('callout').style.textAlign="center";

            }
        console.log(result.body.TeamMember);


        }
        else{
            document.getElementById('dep').innerText = 'TM records could not be found!\nPlease proceed to the helpdesk for assistance';
            document.getElementById('callout').style.opacity=1;
            document.getElementById('outputtext').style.textAlign="center";
            document.getElementById('dep').style.fontSize='31px';




        }
    })
    .catch(err=>{
        console.log(err)
        document.getElementById('dep').innerText = "Network Issue! ";
        document.getElementById('callout').style.opacity=1;
        document.getElementById('outputtext').style.textAlign="center";
        document.getElementById('dep').style.fontSize='31px';
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


