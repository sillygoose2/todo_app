$(document).ready(function(){
    $("ui").on("click","input[type=checkbox]",function(){
        $(this).closest("li").toggleClass("complete");
        done[$(this).closest("li").attr("id").replace("todo","")]=true;
    });
    $(".todos").click(function(){
        $(this).toggleClass("todos_sel");
    });
    $(".todos_sel").click(function(){
        $(this).toggleClass("todos");
    });
}
);
var todoDur=0;
const nothing="";
var done=[false];
var todoName=nothing;
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
    for(var i=0;i<=todos.length-1;i++)
    {
        if(todos[i]!=nothing){
            if(done[i]==true)
            {
                $("ui").append("<p class='complete' id='todo"+todos[i]+" pomodoros)</li></p>");
            }
            else{
                $("ui").append("<p class='todos' id='todo"+todos[i]+" pomodoros)</li></p>");
            }
            console.log("<p class='todos' id='todo"+todos[i]+" pomodoros)</li></p>");
        }
    }
    $("#next").click(function(){
    console.log("clicked");
    todoName=$("#rname").val();
    todoDur=$("#rdur").val();
    if(todoName==nothing||todoName.trim()==nothing)
    {
       window.close();
       window.open("new.html");
    }else
    {
        todos=InsertIntoEmpty(todos,lastindex.toString()+"'><li><input type='checkbox'/>"+todoName+" ("+todoDur);
        window.localStorage && (window.localStorage.todos = todos);
        window.open("../index.html","_self");
    }
    console.log(todoName);
});
    $("#delete_done").click(function(){
        $('.complete').remove();
    });
    $("#delete_sel").click(function(){
        $('.todos_sel').remove();
        todos[$(this).attr("id").replace("todo","")]=nothing;
        done[$(this).closest("li").attr("id").replace("todo","").parseInt()]=false;
        window.localStorage && (window.localStorage.todos = todos);
        window.localStorage && (window.localStorage.done = done);
        window.open("../index.html","_self");
    });
    $("#reset").click(function(){
        reset();
    });
});
var lastindex=0;
function InsertIntoEmpty(array,data)
{
    var i=0;
    while(array[i]!=nothing||i<array.length)
    {
        i++;
    }
    lastindex=i;
    array[i]=data;
    return array;
}
function reset()
{
    done=[false];
    todos=["0'><li><input type='checkbox'/>Reminder (1"];
    window.localStorage && (window.localStorage.todos = todos);
    window.localStorage && (window.localStorage.done = done);
    window.open("index.html","_self");
}