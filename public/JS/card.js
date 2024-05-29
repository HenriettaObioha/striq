function submitted() {
    // let strText = document.getElementById("nameofservice").value;
    // let strText1 = document.getElementById("email").value;
    // let strText2 = document.getElementById("address").value;
    // let strText3 = document.getElementById("telephone").value;
    fetch('https://striq-1.onrender.com/dashboard-user',{
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(res => {
        console.log(res)
        window.location.href = "https://striq-1.onrender.com/display"
    })
    .then(data => {
        // validateData(data);
    })
    document.getElementById("display_name").innerHTML = strText;
    document.getElementById("dislay_email").innerHTML = strText1;
    document.getElementById("display_address").innerHTML = strText2;
    document.getElementById("display_telephone").innerHTML = strText3;



}