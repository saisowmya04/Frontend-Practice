let firstnameTextBox=document.getElementById("fname");
let lastnameTextBox=document.getElementById("lname");
let emailTextBox=document.getElementById("email");
let passwordTextBox=document.getElementById("password");
let cpasswordTextBox=document.getElementById("cPassword");
let contactTextBox=document.getElementById("number");



function register(e){
    e.preventDefault();

    
    let fname=firstnameTextBox.value;
    let lname=lastnameTextBox.value;
    let email=emailTextBox.value;
    let password=passwordTextBox.value;
    let cpassword=cpasswordTextBox.value;
    let contact=contactTextBox.value;

    

    // validation using regular expressions
    if(fname=="" || lname=="" || email=="" || password=="" || cpassword=="" || contact==""){
        alert("Please fill all the details");
        return; //if we use if condition use return stmt
    }

    //regular expression for email
    let emailRegex=/^[a-z][a-z0-9.]{0,19}@gmail.com$/
    let emailResult=emailRegex.test(email);
    if(emailResult==false){
        alert("Please enter valid email");
        return;
    }

    //regular expression for password
    let passwordRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/
    let passwordResult=passwordRegex.test(password);
    if(passwordResult==false){
        alert("Please enter valid password");
        return;
    }

    //checking the confirm password to password
    if(cpassword!=password){
        alert("password is not matching");
        return;
    }

    //regular expression for contact
    let numberRegex=/^[6789][0-9]{9}$/
    let numberResult=numberRegex.test(contact);
    if(numberResult==false){
        alert("Please enter valid phone number");
        return;
    }

    let obj={
        fname:fname,
        lname:lname,
        email:email,
        password:password,
        contact:contact
    }

    alert("Registration Successfull!")
    


}