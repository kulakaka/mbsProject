function draw()
{

    fetch(`http://localhost:3000/api/luckydraw/`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response=>{
        
        response.json()
    
    })
    .then(
        alert("Winner has been update into database please refer from there!")
    )
    .catch(err=>{
        console.log(err);
        alert("Please info web developer to check");
        window.location.href = "luckydraw.html";
    });

    

}