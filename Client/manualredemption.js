
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
            alert(`Number Of Drinks Can be Reedemed : ${result.body}`);
            window.location.href = "manualredemption.html";

            
        }
        else{
            alert(result.body);
            window.location.href = "manualredemption.html";

        }
    })
    .catch(err=>{
        console.log(err)
        alert("User Cannot Redeem Drink");
        window.location.href = "manualredemption.html";

    });

}


function ScanToRedeem(){

    window.location.href="scanredemption.html";
}