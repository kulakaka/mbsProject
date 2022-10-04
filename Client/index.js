function pass() {
    let tm_number = document.getElementById('tm_numebr').value;
    localStorage.setItem("tm_number", tm_number)
    window.location.href = "mbs_registration.html";
}
