
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
            fetch('http://localhost:3000/api/tmdetection',{
                method:"PUT",
                body:formData
            })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                if(result.status == 200)
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
