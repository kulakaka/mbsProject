function manualcheckin(){

    var tm_nm = document.getElementById("tm_numebr").value;

    fetch(`https://onepartyonembs.com.sg/api/manualcheck/${tm_nm}`,{
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
        }
        else{
            document.getElementById('tm').innerText = "TM No.: "+result.body.TeamMember;
            document.getElementById('name').innerText = "Name: "+result.body.Name;
            document.getElementById('dep').innerText = "Department: "+result.body.Department;
            document.getElementById('checked').innerText = "Check-in Before: No"; 
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
    console.log("yes")
    window.location.href = "manualcheckin.html";
}


function gobacktapcheck(){
    window.location.href = "tapcheckin.html";
}