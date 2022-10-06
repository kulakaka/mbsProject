function pass() {
    let tm_number = document.getElementById('tm_numebr').value;
    localStorage.setItem("tm_number", tm_number)
    check_tm_number(tm_number)
}

function check_tm_number(tm_number) {
    fetch(`https://onepartyonembs.com.sg/api/info/${tm_number}`,
        {
            method: "GET",
            header: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => {
                console.log(json)
                let tm = String(json[0].TeamMember);

                if (tm_number === tm) {
                    window.location.href = "mbs_registration.html";
                } else {
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
