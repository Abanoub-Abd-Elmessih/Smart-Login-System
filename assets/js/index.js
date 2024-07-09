// Sign Up ID
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPass = document.getElementById('signupPass');

// Sign in ID
const loginEmail = document.getElementById('loginEmail');
const loginPass = document.getElementById('loginPass');

//Home Pasge
const homeContent = document.getElementById('homeContent');


let userslist = [];

// Initialize userslist with data from localStorage if it exists
$(document).ready(function() {
    if (localStorage.getItem('UserData')) {
        userslist = JSON.parse(localStorage.getItem('UserData'));
    }
});

// Validation signUp Functions
function checkTitle(name) {
    let validateName = /^[a-zA-Z][a-zA-Z0-9 ]{2,30}$/;
    if (validateName.test(name)) {
        signupName.classList.add('is-valid');
        signupName.classList.remove('is-invalid');
        return true;
    } else {
        signupName.classList.add('is-invalid');
        signupName.classList.remove('is-valid');
        return false;
    }
}

function checkEmail(email) {
    let validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (validateEmail.test(email)) {
        signupEmail.classList.add('is-valid');
        signupEmail.classList.remove('is-invalid');
        return true;
    } else {
        signupEmail.classList.add('is-invalid');
        signupEmail.classList.remove('is-valid');
        return false;
    }
}

function checkPassword(password) {
    let validatePassword = /^.{6,}$/;
    if (validatePassword.test(password)) {
        signupPass.classList.add('is-valid');
        signupPass.classList.remove('is-invalid');
        return true;
    } else {
        signupPass.classList.add('is-invalid');
        signupPass.classList.remove('is-valid');
        return false;
    }
}

// Sign Up functionality
function signUp() {
    if (!checkTitle(signupName.value) || !checkEmail(signupEmail.value) || !checkPassword(signupPass.value)) {
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        $('.modal-body').html('<span class="text-dark fw-bold fs-3">Please fill out all fields correctly.</span>');
        return false;
    }

    // Check if email already exists
    for (let i = 0; i < userslist.length; i++) {
        if (userslist[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show();
            $('.modal-body').html('<p class="fs-3 fw-bold text-secondary">This email already exists.</p> <span class="text-danger fs-5 fw-bold">Please choose another Email</span>');
            return false;
        }
    }

    // If email doesn't exist, save user data
    getUserData();
}

$('.signUpBtn').on('click', signUp);

// Getting user data functionality
function getUserData() {
    let user = {
        name: signupName.value,
        email: signupEmail.value,
        key: signupPass.value,
    };

    userslist.push(user);
    localStorage.setItem('UserData', JSON.stringify(userslist));

    // Display success message
    $('.infoText').html('<span class="text-success fs-4 fw-bold">Success <i class="fa-solid fa-check"></i></span>');

    // Redirect to index.html after 1.5 seconds
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1500);
}

// Attach validation functions to input fields
$('#signupName').on('keyup', function() {
    checkTitle(this.value);
});
$('#signupEmail').on('keyup', function() {
    checkEmail(this.value);
});
$('#signupPass').on('keyup', function() {
    checkPassword(this.value);
});

// Sign In functionality
function signIn() {
    if (loginEmail.value == '' && loginPass.value == '') {
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        $('.modal-body').html('<span class="text-secondary fw-bold fs-4">Please Sign Up First.</span>');
        return false;
    } else {
        let userFound ;
        for (let i = 0; i < userslist.length; i++) {
            if (loginEmail.value.toLowerCase() == userslist[i].email.toLowerCase() && loginPass.value == userslist[i].key) {
                $('.infoText').html('<span class="text-success fs-4 fw-bold">Success <i class="fa-solid fa-check"></i></span>');
                localStorage.setItem('userName', JSON.stringify(userslist[i].name));
                setTimeout(function() {
                    window.location.href = 'home.html';
                }, 1500);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            errorModal.show();
            $('.modal-body').html('<span class="text-dark fw-bold fs-3">Invalid User Name or Password.</span>');
            return false;
        }
    }
}

// Sign In Btn
$('.signInBtn').on('click', signIn);



//Home Page
let loggedUser = localStorage.getItem('userName');
$(document).ready(function() {
    $('#homeContent').html(`<h2 class="text-dark fs-1 fw-bolder">Welcome ${loggedUser}</h2>`);
});

//Logout
$('#logOut').on('click', function() {
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
});