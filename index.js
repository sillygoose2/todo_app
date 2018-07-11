$(document).ready(function(){
    $("ui").on("click","input[type=checkbox]",function(){
        var index=$(this).attr("id").replace("c","").trim();
        console.log(index.toString()+", "+done[index]);
        if(done[index]=="false"){
            done[index]="true";
        }else{
            done[index]="false";
        }
        update();
    });
    $(".todos").click(function(){
        $(this).toggleClass("todos_sel");
    });
    $(".todos_sel").click(function(){
        $(this).toggleClass("todos");
});});
var todoDur=0;
const nothing=undefined;
var done;
var todoName;
var open=0;
var todoDurs;
var todos;
function Print(data){console.log(data);}
Print("Initiated");
$(document).ready(function(){
    console.log("ready");
    if (window.localStorage && 'todos' in window.localStorage) {
        todos = window.localStorage.todos;
    }else{console.log("storage error or no reminders made ever on local machine");}
    if (window.localStorage && 'done' in window.localStorage) {
        done = window.localStorage.done;
    }else{console.log("storage error or no reminders made ever on local machine");}
    if (window.localStorage && 'todoDurs' in window.localStorage) {
        todoDurs = window.localStorage.todoDurs;
    }else{console.log("storage error or no reminders made ever on local machine");}
    if (window.localStorage && 'show' in window.localStorage) {
        show = window.localStorage.show;
    }else{console.log("storage error or no reminders made ever on local machine");}
    if(window.location.pathname=="/show.html")
    {
        $("ui").append("<h1>"+todos[show]+"</h1>");
    }
    console.log(todos)
    console.log(todos.split(","));
    //storage converts into a string - splitting corrects issue
    todos=todos.split(",");
    todoDurs=todoDurs.split(",");
    done=done.split(",");
    for(var i=0;i<=todos.length-1;i++)
    {
        if(todos[i].trim()!=""){
            if(done[i]=="true"){
                $("ui").append("<li><p class='todos' id='"+i+"'><li><input type='checkbox' id='c"+i+"' checked/>"+todos[i]+" ("+todoDurs[i]+" units of time)</li></p>");
                $(done[i]).toggleClass("complete");
            }else
            {
                $("ui").append("<li><p class='todos' id='"+i+"'><li><input type='checkbox' id='c"+i+"'/>"+todos[i]+" ("+todoDurs[i]+" units of time)</li></p>");
            }
            console.log(done[i]);
        }
    }
    $("#next").click(function(){
    console.log("clicked");
    todoName=$("#rname").val();
    todoDur=$("#rdur").val();
    if(todoName.trim()==nothing)
    {
       alert("You must specify a name and completion time");
       window.location.reload();
    }else
    {
        todos=InsertIntoEmpty(todos,todoName);
        todoDurs=InsertIntoEmpty(todoDurs,todoDur);
        done=InsertIntoEmpty(done,false);
        update();
    }
    console.log(todoName);
});
    $("#delete_done").click(function(){
        for(var i=0;i<=done.length-1;i++)
        {
            console.log(done[i]);
            console.log(todos[i]);
            if(done[i]=="true")
            {
                todos[i]=nothing;
            }
        }
        update();
        $('.complete').remove();
    });
    $("#delete_sel").click(function(){
        $('.todos_sel').remove();
        todos[$(this).closest("li").id.replace("todo","").parseInt()]=nothing;
        done[$(this).closest("li").id.replace("todo","").parseInt()]=false;
        todoDurs[$(this).closest("li").id.replace("todo","").parseInt()]=0;
        update();
    });
    $("#show").click(function(){
        show($('.todos_sel').id.replace("todo","").parseInt());
    });
    $("#reset").click(function(){
        reset();
    });
});
var lastindex=0;
function InsertIntoEmpty(array,data)
{
    array[array.length]=data;
    return array;
}
function reset()
{
    done=undefined;
    todos=undefined;
    todoDurs=undefined;
    todos=["Reminder","Second Reminder"];
    console.log(todos)
    todoDurs=[1,4];
    done=[false,true];
    update();
}
function update()
{
    //$("ui").append("<img src='data:image/jpeg;base64,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'/>");
    window.localStorage && (window.localStorage.todoDurs = todoDurs);
    window.localStorage && (window.localStorage.todos = todos);
    window.localStorage && (window.localStorage.done = done);window.localStorage && (window.localStorage.show = show);
    if(window.location.pathname.indexOf("show.html",0)!=-1){
        window.location.pathname=window.location.pathname.replace("show","index");
    }else if(window.location.pathname.indexOf("index.html",0)!=-1){
        window.location.reload();
    }else if(window.location.pathname.indexOf("new.html",0)!=-1){window.location.href="../index.html";}
    else{window.location.href="../index.html";}
}
function show(index)
{
    show=index;
    update();
}