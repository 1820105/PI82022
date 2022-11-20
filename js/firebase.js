var firebaseConfig = {
  apiKey: "AIzaSyANavD14HjT6uZbdhHPhbuR5WNLyLm2zqk",
  authDomain: "zonariscodengue.firebaseapp.com",
  databaseURL: "https://zonariscodengue-default-rtdb.firebaseio.com",
  projectId: "zonariscodengue",
  storageBucket: "zonariscodengue.appspot.com",
  messagingSenderId: "761579377792",
  appId: "1:761579377792:web:fe7f50090ddd1a1c8e0265"
};

firebase.initializeApp(firebaseConfig);

var var_lista = document.getElementById("div_lista");

var dados = ""

var db = firebaseRef = firebase.database().ref().child("lista");
db.on('child_added', function(snapshot){
  var adicionado = snapshot.val();

  dados ="<table>" + "<tr><td>" + adicionado + "</td></tr>" + dados;

  var_lista.innerHTML = dados;
})