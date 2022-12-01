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
        alert(result.body);
        window.location.href = "manualcheckin.html";
        }
        else{
            alert(result.body);
            window.location.href = "manualcheckin.html";
        }
    })
    .catch(err=>{
        console.log(err)
        alert("User not register!")
        window.location.href = "manualcheckin.html";

    });

}


function gobacktapcheck(){
    window.location.href = "tapcheckin.html";
}