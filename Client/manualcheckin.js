function manualcheckin(){

    var tm_nm = document.getElementById("tm_numebr").value;

    fetch(`http://localhost:3000/api/manualcheck/${tm_nm}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}

    })
    .then(response=>response.json())
    .then((result) => {
        console.log('Success:', result);
        if(result.success)
        {
        alert("User checkIn Confirmed");
        window.location.href = "manualcheckin.html";
        }
        else{
            alert("User Not Register! / User Has checked In!");
            window.location.href = "manualcheckin.html";
        }
    })
    .catch(err=>{
        console.log(err)
        alert("User not register!")
    });

}


function gobackscancheck(){
    window.location.href = "checkin.html";
}