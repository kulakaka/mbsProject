

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
            document.getElementById('drink').innerText = result.body; 
            //alert(`Number Of Drinks Can be Reedemed : ${result.body}`);
            //window.location.href = "tapredemption.html";

            
        }
        else{
            document.getElementById('drink').innerText = '\nFully Redeemed!';
            document.getElementById('drink').style.color = 'red';
            //alert(result.body);
            //window.location.href = "tapredemption.html";

        }
    })  
    .catch(err=>{
        console.log(err)
        //alert("User Cannot Redeem Drink");
        document.getElementById('drink').innerText = "NOT VALID USER!";
        //window.location.href = "tapredemption.html";

    });

    document.getElementById('callout').style.opacity=1;


}

function messagebtn()
{
    document.getElementById('callout').style.opacity=0;
    
    window.location.href = "tapredemption.html";

}


function gomanualRedemption(){
    window.location.href = "manualredemption.html";
}