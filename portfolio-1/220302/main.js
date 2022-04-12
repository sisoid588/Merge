$(function(){
   $("#courseTable").append("<tr><th>時間</th><th>主題</th><th>場次</th></tr>");

   var topicCount=topic.length;
   //debugger;

    let millisecsPerDay=24*60*60*1000;

   for(var x=0;x<topicCount;x++)
   {
       //debugger;
       $("#courseTable").append(
           "<tr>"+
           `<td>${x+1}</td>`+
           `<td>${new Date(startDate.getTime()+7*x*millisecsPerDay).toLocaleDateString().slice(5)}</td>`+
           `<td>${topic[x]}</td>`+
           "</tr>"
       ); //append:插入 //slice(5):從第五位的字開始顯示
   }
});

