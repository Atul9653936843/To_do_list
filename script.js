todos=[]
var selectedtodo=null;
var texture=null;
function init()
{
     var leftdiv=document.getElementById("div1");
     var righttdiv=document.getElementById("div2");
     var textbox=document.getElementById("textarea");
     textbox.addEventListener("keydown",eventhandler);
}

function eventhandler(event)
{
     var keyCode=event.code;
     var textbox=document.getElementById("textarea");
     var value=textarea.value;
     var lenth=textbox.value.trim ().length ;
     if(keyCode==="Enter" && lenth>0)
     {
          event.preventDefault();
          createRow(value);
          saveLocalStorage();
     }
     
}

function createRow(value)
{
     var container=document.createElement("div");
     var newheading=document.createElement("h5");
     newheading.setAttribute("id","newheading");
     var editbutton=document.createElement("button");
     var deletebutton=document.createElement("button");

     editbutton.innerHTML="EDIT";
     deletebutton.innerHTML="DELETE";

     container.setAttribute("class","todocontainer");

     
     newheading.innerHTML=value;

     container.appendChild(newheading);
     container.appendChild(editbutton);
     container.appendChild(deletebutton);

     editbutton.addEventListener("click",editTheTask);
    

     deletebutton.addEventListener("click",deleteTheTask)
        
     var leftdiv=document.getElementById("div1");
     leftdiv.appendChild(container);
}

function createRow2(value)
{
     var container=document.createElement("div");
     var newheading=document.createElement("h5");
     newheading.setAttribute("id","newheading");
     var editbutton=document.createElement("button");
     var deletebutton=document.createElement("button");

     editbutton.innerHTML="EDIT";
     deletebutton.innerHTML="DELETE";

     container.setAttribute("class","todocontainer");

     
     newheading.innerHTML=value.todo;

     container.appendChild(newheading);
     container.appendChild(editbutton);
     container.appendChild(deletebutton);

     editbutton.addEventListener("click",editTheTask);
    

     deletebutton.addEventListener("click",deleteTheTask)
        
     var leftdiv=document.getElementById("div1");
     leftdiv.appendChild(container);
}

function editTheTask(event)
{
     
     var parent= event.target.parentNode;
     textarea.value=parent.children[0].innerHTML;
     selectedtodo=parent.children[0];
     texture=parent.children[0].innerHTML;
}

function deleteTheTask(event)
{
     var parent= event.target.parentNode;
     var firstChild = parent.firstChild;
     var str=firstChild.innerHTML;

     console.log(str);

      var request=new XMLHttpRequest();
      request.open("post","/deletethetask");
      request.setRequestHeader("Content-type","application/json");
      request.send(JSON.stringify({todo:str}));

      request.addEventListener("load",function()
      {

      })

     var anotherparent=parent.parentNode;
              // console.log(anotherparent);
     anotherparent.removeChild(parent);
              // console.log(parent)
}
function saveLocalStorage()
{
     var textbox=document.getElementById("textarea");
     var value=textbox.value;
     

     var request=new XMLHttpRequest();
     request.open("post","/save");
     request.setRequestHeader("Content-type","application/json");
     request.send(JSON.stringify({todo:value}));

     request.addEventListener("load",function()
     {

     })

     textbox.value="";
}
init();

function onload()
{
    var request=new XMLHttpRequest();
    request.open("GET","/getdata");
    request.send();

    request.addEventListener("load",function()
    {
        var storedtodos=JSON.parse(request.responseText);

        storedtodos.forEach(createRow2);
        
    })
}

onload();

savetodo=document.getElementById("savetodo");
savetodo.addEventListener("click",function()
{

     console.log(selectedtodo.innerHTML);
     var textbox=document.getElementById("textarea");
     
     var request=new XMLHttpRequest();
      request.open("post","/Editthetask");
      request.setRequestHeader("Content-type","application/json");
      request.send(JSON.stringify({todo:textbox.value,m:selectedtodo.innerHTML}));

      request.addEventListener("load",function()
      {

      })
       selectedtodo.innerHTML=textbox.value;
      selectedtodo=null;
      texture=null;
     textbox.value="";
})

logout=document.getElementById("logout");
logout.addEventListener("click",function()
{
    var request=new XMLHttpRequest();
    request.open("get","/logout");
    request.send();
    request.addEventListener("load",function()
    {
        if(request.status === 200)
        {
          window.location.href = "/";
        }
        else
        {
          console.log("error occurred!",request.responseText);
        }
    })

});