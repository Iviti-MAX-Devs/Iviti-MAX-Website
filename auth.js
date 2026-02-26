function register() {

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if(!username || !password){
alert("Remplis tous les champs !");
return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

if(users.find(u => u.username === username)){
alert("Utilisateur déjà existant !");
return;
}

users.push({ username, password });

localStorage.setItem("users", JSON.stringify(users));

alert("Compte créé !");
}

function login() {

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(
u => u.username === username && u.password === password
);

if(!user){
alert("Identifiants incorrects !");
return;
}

localStorage.setItem("loggedUser", username);

alert("Connexion réussie !");
window.location.href = "index.html";
}
