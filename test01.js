// request => 원하는 웹사이트의 html을 불러와주는 도구
// cheerio => 원하는 요소에 쉽게 접근할 수 있도록 도와주는 도구
// 즉, request통해 html가져오고 cheerio 활용하여 데이터 가공
var request = require('request'),
    cheerio = require('cheerio');

var url = "https://www.naver.com/";


// url로 부터 가져온 페이지 소스가 html이란 변수에 담긴다.
request(url, function(err,res,html){
    if(!err){
        var $ = cheerio.load(html); // 네이버 html을 변수  $에 cheerio를 이용하여 담았음

        $(".nav_item > a > i").each(function(){
            var result = $(this).text();
            console(result);
        })
    }
})

