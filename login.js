var email=document.getElementById("email");
var password=document.getElementById("userpassword");
var login=document.getElementById("login");

login.addEventListener("click",function()
{
    console.log("a");
    if(email.value && password.value)
    {
        var check = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        if(check.test(email.value) === true)
        {
            var request=new XMLHttpRequest();
            request.open("post","/login");
            request.setRequestHeader("Content-type","application/json");
            
            request.send(JSON.stringify({email:email.value,password:password.value}));

            request.addEventListener("load",function()
            {
                if(request.status === 200)
                {
                    window.location.href="/";
                }
                else
                {
                    console.log("login err",request.responseText)
                }
            })
        }
        else
        {
            alert("invalid Email-id! @domain.com is missing!")
        }

    }
    else
    {
        console.log("kuch nhi h");
    }
})

