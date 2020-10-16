dragContents = function(wrap,set){
	var self = this;
	this.wrap = wrap;
	this.dragItems = set;  // set은 dragObj 생성시 필요한 연관배열(객체)(drag, drop이 키값으로 존재한다.)
	this.dragArea,this.dropArea,this.txtArea,this.dragItem,this.dropItem,this.ans;
	this.dragObj = set.drag;
	this.dropObj = set.drop;

	this.init = function(){
		console.log(self.wrap.hasClass('dragContents'))   // 콘솔에서 .dragContents있는지 확인
        
        // .dragContents있으면 초기 설정값 지우기
		if(self.wrap.hasClass('dragContents')){
			self.wrap.removeClass('dragContents');
			self.wrap.find('.dragArea').remove();
			self.wrap.find('.dropArea').remove();
			self.wrap.find('.ansbtn').remove();
		}

        // makeArea, makeObj, addDrag, addDrop, makeBtn
		self.makeArea();
		self.makeObj();
		self.addDrag();
		self.addDrop();
		self.makeBtn()

		this.ansbtn.on('click',function(){
			if($(this).hasClass('re')){
				effectAdo('click');
				self.init();
			}else{
				$(this).addClass('re')
				effectAdo('anschk_o');
				self.dropArea.each(function(i){
					$(this).find('.dropCode').html(self.dropObj[i]);
					$(this).find('.dropCode').addClass('ans');
					self.dragItem.each(function(j){

						if($(this).html() == self.dropObj[j]){
							$(this).css('visibility','hidden');
						}
					});
				})
			};
		});
	}

    // dropArea 생성 
	this.makeArea = function(){
		var html = ''+
		'<div class="dropArea">' +
            '<div class="conObj"></div>' +
            '<div class="txtArea"></div>' +
            '<div class="dropObj"></div>' +
        '</div>' +
        '<div class="dragArea"></div>';
        
        
        self.wrap.addClass('dragContents'); // .dragContents 추가
        self.wrap.append(html); // 위에서 선언한 html코드 추가
        
        // drageArea, dropArea, txtArea 정의
        self.dragArea = self.wrap.find('.dragArea');    
        self.dropArea = self.wrap.find('.dropObj');
        self.txtArea = self.wrap.find('.txtArea');
	}
    
    // dragItem 생성
	this.makeObj = function(){
        // 전달받은 dragObj만큼 .dragItem 코드 생성(드래그 가능한 객체)
		for(var a = 0; a < self.dragObj.length; a++){
            var dragDiv = '<div class="dragItem">' + self.dragObj[a] + '</div>'
            self.dragArea.append(dragDiv);
        }

        // 전달받은 dropObj만큼 .dropCode 코드 생성(드랍 가능한 개체)
        for(var b = 0; b < self.dropObj.length; b++){
            var dropDiv = '<div class="dropCode"></div>'
            self.dropArea.append(dropDiv);
        }
	}

    // addDrag 생성
	this.addDrag = function(){
        // drageItem은 위에서 생성한 dragItem
		self.dragItem = self.dragArea.find('.dragItem');

        // drag는 clone(복사)생성 없이 이동만 하는 것, drop은 기존 element를 두고 clone을 생성해서 이동하는 것
        // 이동 후 붙이기 하려면 sortable지정해야 한다.
        // draggable()
        // 기본
        // cursor, oppacity, scroll, handler, ...
        // 리스너
        // -start : 드래그 시작
        // -drag : 드래그 시 호출
        // -stop : 드래그 종료 시
        // draggable() -> jQuery UI 기능
        // 지정된 요소를 드래그 가능하도록 함
		self.dragItem.draggable({

			cursor: 'pointer',   // 커서 속성은 pointer
			revert: 'invalid',   // 드래그 속성을 되돌리지 않는다
            // 드래그 시작할 때
			start: function(e, obj){
			    var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
			    obj.position.top = Math.round(obj.position.top / factor);
			    obj.position.left = Math.round(obj.position.left / factor);
			    isRec = $(this); // 현재 요소
			},
            // 드래그가 실행되는 동안 계속 발생하는 event
			drag: function(e, obj){
			    var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
                // obj의 위치 선정
			    obj.position.top = Math.round(obj.position.top / factor);
			    obj.position.left = Math.round(obj.position.left / factor);
			},
            // 드래그 중단됐을 때
			stop: function(e, obj){

			}

		});
	}

	this.addDrop = function(){
        // dropItem 위에서 생성한 dropCode
		self.dropItem = self.dropArea.find('.dropCode');

        // dropable()   =>  draggable 객체의 목표지점 설정
        // 기본
        // -accept: 드롭 가능한 요소
        // 리스너
        // -active : 드래그 시작 시
        // -over : Triggered when an accepted draggable is dragged over the droppable (based on thetolerance option).
        //          드롭 가능한 객체가 드롭 가능한 항목 위로 드래그 될 때 발생한다.
        // -out : 드롭 시
        // -drop: 드롭 완료된 뒤 발생하는 event(drag sopt 이벤트 뒤에 발생)
		self.dropItem.droppable({
            // accept 드롭 가능한 요소
            accept: self.dragItem,
            // over : 드롭 가능한 객체가 드롭 가능한 항목 위로 드래그 될 때 발생한다.
            over: function(e, obj) {
                var $item = $(obj); // item은 전달받은 obj
                var $this = $(this); // this는 현재 요소
            },
            // drop: 드롭 완료 됐을 때
            drop: function(e, obj) {
                var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
                obj.position.top = Math.round(obj.position.top / factor);
                obj.position.left = Math.round(obj.position.left / factor);
                var $item = $(obj);
                var $this = $(this);
                var drag_ans = isRec.html();
                var drop_ans = self.dropObj[$this.index()];
                
                if(drop_ans == drag_ans){
                    $this.html(drag_ans);
                    $this.addClass('ans');
                    isRec.css('visibility','hidden');
                    effectAdo('anschk_o');
                    if(self.dropItem.length == self.dropArea.find('.ans').length) {
                    	self.dragItem.draggable('destroy')
                    	self.ansbtn.addClass('re');
                    }
                }else{
                    isRec.draggable({revert:true})
                    effectAdo('anschk_x')
                }
                
            }
        });
	}

	this.makeBtn = function(){
		var html = '<div class="ansbtn"></div>'
		self.wrap.append(html);

		self.ansbtn = this.wrap.find('.ansbtn');
	};
}