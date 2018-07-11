$(document).ready(function(){
    $("ui").on("click","input[type=checkbox]",function(){
        $(this).closest("li").toggleClass("complete");
        if(done[$(this).closest("li").id.replace("todo","")]==true)
        {
            done[$(this).closest("li").id.replace("todo","")]=false;
        }else{done[$(this).closest("li").id.replace("todo","")]=true;}
        update();
    });
    $(".todos").click(function(){
        $(e).toggleClass("todos_sel");
    });

}
);
var todoDur=0;
const nothing=undefined;
var done=[false];
var todoName=nothing;
var open=0;
var todoDurs=[""];
var todos=["Reminder"];
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
        if(todos[i]!=nothing){
            if(done[i]==true)
            {
                $("ui").append("<li><p class='complete' id='todo"+i+"'><li><input type='checkbox' id='c"+i+"'/>"+todos[i]+" ("+todoDurs[i]+" pomodoros)</li></p>");
            }
            else{
                $("ui").append("<p class='todos' id='todo"+i+"'><li><input type='checkbox' id='c"+i+"'/>"+todos[i]+" ("+todoDurs[i]+" pomodoros)</li></p>");
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
        $('.complete').each( function(i,e) {
            /* you can use e.id instead of $(e).id */
            delete todos[$(e).id.replace("complete","").parseInt()];
            done[$(e).id.replace("complete","").parseInt()]=false;
            todoDurs[$(e).id.replace("complete","").parseInt()]=0;
        });
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
    todos=["Reminder","Second Remnder"];
    console.log(todos)
    todoDurs=[1,4];
    done=[false,true];
    update();
}
function update()
{
    window.localStorage && (window.localStorage.todoDurs = todoDurs);
    window.localStorage && (window.localStorage.todos = todos);
    window.localStorage && (window.localStorage.done = done);window.localStorage && (window.localStorage.show = show);
    if(window.location.pathname.indexOf("show.html",0)!=-1){
        window.location.pathname=window.location.pathname.replace("show","index");
    }else if(window.location.pathname.indexOf("index.html",0)!=-1){
        window.location.reload();
    }else{window.open("../index","_self");}
}
function show(index)
{
    show=index;
    update();
}