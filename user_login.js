
 function login(){
    fetch('https://protected-lake-94601.herokuapp.com/auth', {
    method: "POST",
    body: JSON.stringify({
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value,
    }),
    headers: {
        'Content-type': 'application/json',
        'mode': 'no-cors',
    }
    }).then(response => response.json()).then(data => {
        console.log(data)
        if (data['description'] == "Invalid credentials"){
            alert("Username or password is incorrect. Please enter correct details")
        }else{
            console.log(data['access_token'])
            mystorage.setItem('jwt-token', data['access_token'])
            mystorage.setItem('username', document.getElementById('username').value)
            window.location.href = "./products.html"
        }
    });
}