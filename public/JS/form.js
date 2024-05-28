// form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100);
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

// form validation

const register = document.querySelector('.submit-btn-register');
const login = document.querySelector('.submit-btn-login');

if(login){ // means login page is open
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');
    login.addEventListener('click', () => {
        fetch('/login-user',{
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => {
            console.log(res)
        })
        .then(data => {
            // validateData(data);
        })
    })
} else{ // means the register page is open
    const firstname = document.querySelector('.firstname');
    const lastname = document.querySelector('.lastname');
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');
    register.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                firstname: firstname.value,
                lastname : lastname.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => {
            console.log(res.json())
        })
        .then(data => {
            //validateData(data);
        })
    })

}

// const validateData = (data) => {
//     if(!data.name){
//         alertBox(data);
//     } else{
//         sessionStorage.name = data.name;
//         sessionStorage.email = data.email;
//         location.href = '/';
//     }
//}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}