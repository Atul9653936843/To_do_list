var username=document.getElementById("signupusername");
var emails=document.getElementById("signupemail");
var password=document.getElementById("signuppassword");
var cpassword=document.getElementById("signupcpassword");
var signup=document.getElementById("signup");

signup.addEventListener("click",function()
{
    console.log(username.value);
    console.log(password.value);
    if(username.value && emails.value && password.value && cpassword.value);
    {
        var check = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        if(check.test(emails.value) === true)
        {
            if(password.value === cpassword.value)
            {
                var request=new XMLHttpRequest();
                request.open("post","/signup");
                request.setRequestHeader("Content-type","application/json");
                
                request.send(JSON.stringify({username:username.value,email:emails.value,password:password.value}));

                request.addEventListener("load",function()
                {
                    if(request.status === 200)
                    {
                        window.location.href="/";
                    }
                    else
                    {
                        console.log("signup err",request.responseText)
                    }
                })
            }
            else
            {
                alert("password doesn't match!");
            }
        }
        else
        {
            alert("invalid Email-id! @domain.com is missing!")
        }
       // console.log(username.value);
        //console.log(username.value);
       
    }
})

