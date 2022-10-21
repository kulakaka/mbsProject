function pass() {
    let tm_number = document.getElementById('tm_numebr').value;
    localStorage.setItem("tm_number", tm_number)
    check_tm_number(tm_number)
}
  

function check_tm_number(tm_number) {
    //check number if in the range

    let tmn = parseInt(tm_number);
    if(tmn>=810000 && tmn <=845000)
    {
        fetch(`https://onepartyonembs.com.sg/api/info/${tm_number}`,
        {
            method: "GET",
            header: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => {
                console.log(json)
                let tm = String(json.TeamMember);

                if (tm_number === tm) {
                    console.log("match")
                    window.location.href = "mbs_registration.html";
                } else {
                    console.log("not match")
                    window.location.href = "https://onepartyonembs.com.sg/";
                }
            }
        )
        .catch(
            (error) => {
                console.error('Error:', error);
                window.location.href = "https://onepartyonembs.com.sg/";
            });

    }
    else{
        console.log("not match 2")
        window.location.href = "https://onepartyonembs.com.sg/"
    }



}
