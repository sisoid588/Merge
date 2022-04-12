$(function(){

    var currentQuiz=null; //儲存目前到第幾題

    $("#startButton").on("click",function(){ //按鈕按下後

        if(currentQuiz==null){ //還沒開始作答
            currentQuiz=0;
            $("#question").text(questions[0].question);
            $("#options").empty();
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
            });
            $("#startButton").attr("value","Next");
        }else{ //已開始作答
            $.each($(":radio"),function(i,val){
                if(val.checked){
                    if(isNaN(questions[currentQuiz].answers[i][1])){

                        var finalResult=questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                        $("#options").empty();
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");
                    }else{
                        currentQuiz=questions[currentQuiz].answers[i][1]-1; //因為原本從1開始
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='option' type='radio' value='${index
                            }'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;
                }
            });
        }

    });
  
});

