const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    console.log(username)
    console.log(password)
    if(username == 'paola' && password == '123'){
        window.location.href = 'home.html';
    }
}