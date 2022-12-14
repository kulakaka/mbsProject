function draw5()
{
    
    fetch(`https://onepartyonembs.com.sg/api/luckydraw/${5}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response=>{
        
        response.json()
    
    })
    .then(
        alert("Winners have been generated in the database. Please refer to the details there!")

    )
    .catch(err=>{
        console.log(err);
        alert("Please inform web developer to check");
        window.location.href = "luckydraw.html";
    });
}

function draw1()
{
    
    fetch(`https://onepartyonembs.com.sg/api/luckydraw/${1}`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response=>{
        
        response.json()
    
    })
    .then(
        alert("Winners have been generated in the database. Please refer to the details there!")

    )
    .catch(err=>{
        console.log(err);
        alert("Please inform web developer to check");
        window.location.href = "luckydraw.html";
    });
}



