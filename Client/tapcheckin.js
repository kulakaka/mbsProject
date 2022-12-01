

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
        //alert(result.body);
        //var tmn  =result.body.
        console.log(result.body);
        document.getElementById('tm').innerText = result.body.TeamMember;
        document.getElementById('name').innerText = result.body.Name;
        document.getElementById('dep').innerText = result.body.Department;
        }
        else{
            alert(result.body);
            window.location.href = "tapcheckin.html";
        }
    })
    .catch(err=>{
        console.log(err)
        alert("User not register!")
        window.location.href = "tapcheckin.html";

    });

    document.getElementById('callout').style.opacity=1;


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