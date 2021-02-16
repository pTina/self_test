
$(window).on('load', function () {

	if($('.objWrap').length == 0){
        makeObj(49, $('.contents'));
        makeObj(49, $('.contents'));
    }

});

// 모눈종이 칸 클릭
$(document).on('click', '.obj', function(){
    if($(this).hasClass('on')){
        $(this).removeClass('on');

    }else{
        $(this).addClass('on');
    }
})

// 다시하기 클릭
$(document).on('click', '.rebtn', function(){
    $('.obj').removeClass('on');
})

function makeObj(num, wrap){
    var html1 = '<div class="objWrap"></div>';
    wrap.append(html1);
    
    var html2 = '';
    for(i = 0; i<num; i++){
        html2 += '<div class="obj obj'+(i+1)+'"></div>';
    }
    
    wrap.find('.objWrap').each(function(){
        if($(this).find('.obj').length == 0){
            $(this).append(html2);
        }
    })
    
    
}