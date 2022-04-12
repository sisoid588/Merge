$(function(){
    $("input").on("click",function(){
    //   debugger;
    //    alert("yo");
        var numberOfListItem=$("li").length;
        var randomChildNumber=Math.floor(Math.random()*numberOfListItem);
     //   console.log(randomChildNumber);
        $("h1").text($("li").eq(randomChildNumber).text());
        
    });
});