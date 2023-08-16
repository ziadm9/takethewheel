const firebaseConfig = {
    apiKey: "AIzaSyCrPYEicW9JpKivNcsbjo1_Io6TbhHbBUw",
    authDomain: "wheel-8bdcf.firebaseapp.com",
    projectId: "wheel-8bdcf",
    storageBucket: "wheel-8bdcf.appspot.com",
    messagingSenderId: "331276226263",
    appId: "1:331276226263:web:8e390f06d773a071552a92"
  };

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database()

function check(){
    if(localStorage.getItem("loggedIn")==null || localStorage.getItem("loggedIn")=="null"){
        window.location.href = "index.html";
    }
}

function checkHome(){
    if(localStorage.getItem("loggedIn")==null || localStorage.getItem("loggedIn")=="null"){
        window.location.href = "index.html";
    }
    user = localStorage.getItem("username")
    database.ref(user+'/status').once('value').then((snapshot)=>{ 
        if(snapshot.val().surveyed==false){
            window.location.href= "survey.html"
        }
    })
}

function checkIndex(){
    if(localStorage.getItem("loggedIn")=="yes"){
        window.location.href = "home.html";
    }
}

function checkSurvey(){
    if(localStorage.getItem("loggedIn")==null || localStorage.getItem("loggedIn")=="null"){
        window.location.href = "index.html";
    }
    user = localStorage.getItem("username")
    database.ref(user+'/status').once('value').then((snapshot)=>{ 
        if(snapshot.val().surveyed==true){
            window.location.href= "home.html"
        }
    })
}