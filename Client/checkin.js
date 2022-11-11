

// let camera_button = document.querySelector("#start-camera");
// let video = document.querySelector("#video");
// let click_button = document.querySelector("#click-photo");
// let canvas = document.querySelector("#canvas");
// let dataurl = document.querySelector("#dataurl");
// let dataurl_container = document.querySelector("#dataurl-container");





// camera_button.addEventListener('click', async function() {
//    	let stream = null;

//     try {
//     	stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     }
//     catch(error) {
//     	alert(error.message);
//     	return;
//     }

//     video.srcObject = stream;

//     video.style.display = 'block';
//     camera_button.style.display = 'none';
//     click_button.style.display = 'block';
// });

// click_button.addEventListener('click', function() {
//     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//    	let image_data_url = canvas.toDataURL('image/jpeg');


//     // fetch(`http://localhost:3000/api/tmdetction`,{
//     //     method:"POST",
//     //     body:image_data_url,
//     //     headers: {"Content-type": "application/json; charset=UTF-8"}
        
//     // })
//     // .then(response=>response.json())
//     // .catch(err=>console.log(err));

//     console.log(image_data_url)

// });


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
                alert("User Has now checked In");
                window.location.href = "checkin.html";
              })
              .catch((error) => {
                console.error('Error:', error);
                alert("User need to Register!");
                window.location.href = "checkin.html";
        
        });
        
        
    })
    
})

