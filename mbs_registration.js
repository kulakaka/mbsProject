var data = [
    {
     "Tmno": "834532",
     "Name": "TAN WAN ZHEN ADELINE",
     "Department": "HUMAN RESOURCES",
     "Area": "COMPENSATION &amp; BENEFITS",
     "Position Title": "ASSISTANT MANAGER",
     "Status Description": "FULL TIME",
     "Email": "Adeline.WZTan@MarinaBaySands.com",
     "ContactNo": "93849984",
     "Hotstamp": "241162"
    },
    {
     "Tmno": "817246",
     "Name": "TAN XIANG TING",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "LEAD HR PARTNER",
     "Status Description": "FULL TIME",
     "Email": "XiangTing.Tan@MarinaBaySands.com",
     "ContactNo": "93850553",
     "Hotstamp": "348419"
    },
    {
     "Tmno": "839876",
     "Name": "ZHANG YAORONG",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "SENIOR HR PARTNER",
     "Status Description": "FULL TIME",
     "Email": "Jon.Zhang@marinabaysands.com",
     "ContactNo": "94555836",
     "Hotstamp": "348405"
    },
    {
     "Tmno": "841839",
     "Name": "YAP LIN YING FELICIA",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "HR PARTNER",
     "Status Description": "FULL TIME",
     "Email": "Felicia.Yap@marinabaysands.com",
     "ContactNo": "91052015",
     "Hotstamp": "348402"
    },
    {
     "Tmno": "842523",
     "Name": "SOH MEI YI",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "HR PARTNER",
     "Status Description": "FULL TIME",
     "Email": "MeiYi.Soh@marinabaysands.com",
     "ContactNo": "92484219",
     "Hotstamp": "346014"
    },
    {
     "Tmno": "836405",
     "Name": "TAN SI QI",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "SENIOR HR PARTNER",
     "Status Description": "FULL TIME",
     "Email": "Siqi.Tan@MarinaBaySands.com",
     "ContactNo": "81381415",
     "Hotstamp": "348408"
    },
    {
     "Tmno": "842074",
     "Name": "LEE TZU HSIEN",
     "Department": "HUMAN RESOURCES",
     "Area": "RECOGNITION &amp; TM EVENTS",
     "Position Title": "OFFICER",
     "Status Description": "FULL TIME",
     "Email": "Jorean.Lee@marinabaysands.com",
     "ContactNo": "83802973",
     "Hotstamp": "327515"
    },
    {
     "Tmno": "843005",
     "Name": "NG JIA JIN",
     "Department": "HUMAN RESOURCES",
     "Area": "RECOGNITION &amp; TM EVENTS",
     "Position Title": "OFFICER",
     "Status Description": "FULL TIME",
     "Email": "JiaJin.Ng@marinabaysands.com",
     "ContactNo": "94894420",
     "Hotstamp": "344899"
    },
    {
     "Tmno": "818035",
     "Name": "TAN GUAN SOON BERNIE ANGELA",
     "Department": "HUMAN RESOURCES",
     "Area": "RECOGNITION &amp; TM EVENTS",
     "Position Title": "SENIOR MANAGER",
     "Status Description": "FULL TIME",
     "Email": "bernie.tan@MarinaBaySands.com",
     "ContactNo": "91801262",
     "Hotstamp": "275524"
    },
    {
     "Tmno": "833285",
     "Name": "GOH MEI YIM EVON",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "MANAGER",
     "Status Description": "FULL TIME",
     "Email": "Evon.Goh@MarinaBaySands.com",
     "ContactNo": "91011813",
     "Hotstamp": "348410"
    },
    {
     "Tmno": "835941",
     "Name": "LAM YAN TING MANDY",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "SENIOR HR PARTNER",
     "Status Description": "FULL TIME",
     "Email": "MandyYT.Lam@MarinaBaySands.com",
     "ContactNo": "94554871",
     "Hotstamp": "348409"
    },
    {
     "Tmno": "835705",
     "Name": "LEE PERLINA",
     "Department": "HUMAN RESOURCES",
     "Area": "RECOGNITION &amp; TM EVENTS",
     "Position Title": "SENIOR OFFICER",
     "Status Description": "FULL TIME",
     "Email": "leeperlina@gmail.com",
     "ContactNo": "91050867",
     "Hotstamp": "242836"
    },
    {
     "Tmno": "842596",
     "Name": "SIT GERLINE",
     "Department": "HUMAN RESOURCES",
     "Area": "HR PARTNERING &amp; ENGAGEMENT",
     "Position Title": "HR PARTNER",
     "Status Description": "FULL TIME",
     "Email": "Gerline.Sit@marinabaysands.com",
     "ContactNo": "92484216",
     "Hotstamp": "346510"
    },
    {
     "Tmno": "826191",
     "Name": "TAN HUI SHIANG",
     "Department": "HUMAN RESOURCES",
     "Area": "ADMIN",
     "Position Title": "EXECUTIVE ASSISTANT",
     "Status Description": "FULL TIME",
     "Email": "Deine.Tan@MarinaBaySands.com",
     "ContactNo": "84682700",
     "Hotstamp": "139344"
    },
    {
        "Tmno": "123123",
        "Name": "FAN YUSEN",
        "Department": "TEST",
        "Area": "ADMIN",
        "Position Title": "EXECUTIVE ASSISTANT",
        "Status Description": "FULL TIME",
        "Email": "simonfans0928@gmail.com",
        "ContactNo": "84682700",
        "Hotstamp": "139344"
       }
   ]


 window.onload = function(){
    var tmno = localStorage.getItem("tm_number")
   searchinfo(tmno)
   
}

function searchinfo(nm)
{
var xhttp = new XMLHttpRequest();
xhttp.open("GET","getData.php?q="+nm,true);
xhttp.send();
xhttp.onreadystatechange = function()
{
    console.log("wait server..");
    if(xhttp.readyState==4)
    {
        if(xhttp.status ==200)
        {
            result= JSON.parse(xhttp.responseText);
        
        
        
        }
        else{
            console.log("Error on return data",xhttp.status,xhttp.statusText);
        }
    }
}

}


function search1(number){
    let tm_number = number
    
    for (i =0; i<data.length;i++)
    {
        if(tm_number==data[i].Tmno)
        {

            var name = data[i].Name;
            var Department = data[i].Department;
            var email = data[i].Email;
            var tm = data[i].Tmno;
            var contact = data[i].ContactNo;
    
            document.getElementById("name").setAttribute('value',name)
            document.getElementById('Department').setAttribute('value',Department)
            document.getElementById('email').setAttribute('value',email)
            document.getElementById('tm_numebr').setAttribute('value',tm)
            document.getElementById('contact_no').setAttribute('value',contact)
          
            break;
            
        }

    }}

function confrimReg(){

     var params = {
        stuff_name :document.getElementById("name").value,
        stuff_email:document.getElementById("email").value
     }
     emailjs.send("service_l5179en","template_qijjyoh",params).then(function (res){
        alert("Email has been Sent!")
        location.href = "final.html";
     })


    

}