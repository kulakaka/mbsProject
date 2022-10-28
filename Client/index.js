function pass() {
    let tm_number = document.getElementById('tm_numebr').value;
    localStorage.setItem("tm_number", tm_number)
    check_tm_number(tm_number)
}
  

//check number if within the range from 810000 to 845000
function check_tm_number(tm_number) {
    
    let tmn = parseInt(tm_number);
    if(tmn>=810000 && tmn <=845000)
    {

        window.location.href = "mbs_registration.html";
        // fetch(`https://onepartyonembs.com.sg/api/info/${tmn}`,
        // {
        //     method: "GET",
        //     header: {"Content-type": "application/json;charset=UTF-8"}
        // })
        // .then(response => response.json())
        // .then(json => {
        //         console.log(json)
        //         let tm = String(json.TeamMember);

        //         if (tm_number === tm) {
        //             console.log("match")
        //             window.location.href = "mbs_registration.html";
        //         } else {
        //             console.log("not match")
        //             window.location.href = "https://onepartyonembs.com.sg";
        //         }
        //     }
        // )
        // .catch(err=>{
        //     console.log(err)
        //     window.location.href = "https://onepartyonembs.com.sg";
        // });


    }
    else{
        console.log("not match")
        window.location.href = "https://onepartyonembs.com.sg"
    }



}
