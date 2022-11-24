// global event lisenter
document.addEventListener('DOMContentLoaded', (ev)=>{
    const formData = new FormData();
    let form = document.getElementById('form');
    //get the captured media file
    let input = document.getElementById('capture');
    
    // listen input tab event
    input.addEventListener('change', (ev)=>{
       // console.dir( input.files[0] );
            formData.append("name","tmid")
            formData.append('tmcard',input.files[0])
            // call fetch put api to transfer image file
            fetch('https://onepartyonembs.com.sg/api/tmdetection',{
                method:"PUT",
                body:formData
            })
            // cannot use response.json will has unexpected string error
            .then((response) => response.text())
            .then((result) => {
                // after recieved from server as text convert to json again.
                const res = JSON.parse(result);
                // check result status to determine if work
                if(res.status == 200)
                {
                alert("User checkIn Confirmed");
                window.location.href = "checkin.html";
                }
                else{
                    alert("User Not Register! / User Has checked In!");
                    window.location.href = "checkin.html";
                }

})
              .catch((error) => {
                console.error('Error:', error);
                alert("User Not Register! / User Has checked In!");
                window.location.href = "checkin.html";
        
        });
        
        
    })
    
})


function manualcheck()
{

    window.location.href = "manualcheckin.html";
}
