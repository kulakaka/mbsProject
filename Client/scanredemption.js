// http://localhost:3000/
// https://onepartyonembs.com.sg/
document.addEventListener('DOMContentLoaded', (ev)=>{
    const formData = new FormData();
    let form = document.getElementById('form');
    //get the captured media file
    let input = document.getElementById('capture');
    
    input.addEventListener('change', (ev)=>{
       // console.dir( input.files[0] );
            formData.append("name","tmid")
            formData.append('tmcard',input.files[0])
            console.log(formData);
            //console.log(window.URL.createObjectURL(input.files[0]))
            fetch('https://onepartyonembs.com.sg/api/tmdetectionredemption',{
                method:"PUT",
                body:formData
                
            })
            .then((response) =>response.text())
            .then((result) => {
                console.log("this is result",result);
                var res = JSON.parse(result);
                console.log(res);
                console.log("status:",res.success)
                if(res.success)
                {
                    alert(`Number Of Drinks Can be Reedemed : ${res.body}`);
                    window.location.href = "scanredemption.html";

                    
                }   
                else{
                    alert(res.body);
                    window.location.href = "scanredemption.html";

                }

            })
              .catch((error) => {
                console.error('Error:', error);
                alert("User Cannot Redeem Drink");
                window.location.href = "scanredemption.html";

        
        }
        
        );
        
        
    })
    
})

function manualredemption()
{

    window.location.href = "manualredemption.html";
}
