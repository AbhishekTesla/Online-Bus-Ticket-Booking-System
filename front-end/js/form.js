// const { load } = require("nodemon/lib/config");

// window.onload=()=>{
//     if(sessionStorage.user){
//         user=JSON.parse(sessionStorage.user);      //check user exist or not

//         if(compareToken(user.authToken,user.email)){  //if exist redirect to homepage
//             location.replace('/');
//         }
//     }
// }


const submitBtn = document.querySelector('.submit-btn');
const naam = document.querySelector('#name') || null;     // if name is not than add null
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const number = document.querySelector('#number') || null;  // '||' ==> add operator for String 

const loader = document.querySelector(".loader");
// const path =require('path')
submitBtn.addEventListener('click', () => {
    if (naam != null) {    //sign up page
        if (naam.value.length < 3) {
            showAlert('name must be 3 letters long');
        }
        else if (!email.value.length) {             // ! is boolean which means having value true or false
            showAlert('Enter your email');
        }
        else if (password.value.length < 8) {
            showAlert('Password should be 8 letter long')

        }
        else if (!Number(number.value) || number.value.length < 10) {
            showAlert('invalid number , please enter valid one');
        }

        else {
            //submit Form
            loader.style.display = 'block';
            sendData('/signup', {
                naam: naam.value,
                email: email.value,
                password: password.value,
                number: number.value

            })
        }
    }

    else {
        //login page
        if (!email.value.length || !password.value.length) {
            showAlert('Fill all the inputs');
        }
        else {
            loader.style.display = 'block';
            sendData('/login', {
                email: email.value,
                password: password.value
            })

        }
    }
})

//send data function 
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)

    })
        .then((res) => res.json())
        .then(response => {
            processData(response);   //processData is Function
        })
}


const processData = (data) => {
    loader.style.display = null;  // hide the loader
    if (data.alert) {
        showAlert(data.alert);
    }
    //create authToken
    else{
    sessionStorage.user = JSON.stringify(data);
    location.replace('/');
    }

}


//alert Function
const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box')
    let alertMsg = document.querySelector('.alert-msg')
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show')
    setTimeout(() => {
        alertBox.classList.remove('show')

    }, 2000);
}