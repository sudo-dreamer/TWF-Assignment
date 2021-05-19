// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp() {
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    // var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    // var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if (checkUserEmailValid == null) {
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                logged: false,
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created', 'Your account was created successfully, you can log in now.', ).then((value) => {
                setTimeout(function() {
                    window.location.replace("../index.html");
                }, 500)
            });
        }).catch((error) => {
            // Handle Errors here.
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail() {
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIEmailError").style.display = "block";
    } else {
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword() {
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIPasswordError").style.display = "block";
    } else {
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx    
function signIn() {
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    console.log(userSIEmail)
    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            let uid = success.user.uid
            swal({
                type: 'successfull',
                title: 'Succesfully signed in',
            }).then((value) => {

                let firebaseRefKey = firebase.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    if (dataSnapShot.val().logged) {
                        setTimeout(function() {
                            window.location.replace("./pages/profile.html");
                        }, 1000)
                    } else {
                        firebaseRefKey.update({ 'logged': true });
                        setTimeout(function() {
                            window.location.replace("./pages/first.html");
                        }, 1000)
                    }
                })
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if (user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot) => {
            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().name;
        })
    } else {
        //   No user is signed in.
        console.log(window.location.pathname)
        if (window.location.pathname === '/pages/profile.html' || window.location.pathname === '/pages/first.html')
            window.location.replace("../index.html");
    }
});

function postData() {
    let user = firebase.auth().currentUser;
    console.log(user)
    var uid = user.uid;

    let firebaseRefKey = firebase.database().ref().child(uid);
    var userData = {
        name: document.getElementById("userName").value
    }
    firebaseRefKey.update(userData);
    swal('Data updated', 'Data for the account updated', ).then((value) => {
        setTimeout(function() {
            window.location.replace("../pages/profile.html");
        }, 500)
    });
}

// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function() {
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}