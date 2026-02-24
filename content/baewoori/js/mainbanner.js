$(document).ready(function() {
	var mainRollingData = {
		container:$(".rolling"),
		imgcontainer:$(".rolling>ul"),
		item:$(".rolling>ul>li"),
		playBtn:$(".bannerplay"),
		stopBtn:$(".bannerstop"),
		bannerprev:$(".rolling>h1>span>a.bannerprev"),
		bannernext:$(".rolling>h1>span>a.bannernext"),
		dotBtn:$(".rolling>ul>li>a.btnroll"),
		isPlay:true,
		delay:10000,
		speed:1000};    
    var initMainBanner = new RollingBannerFade(mainRollingData);
});

/* 롤링배너  스크립트 
 * param : {container:전체배너컨테이너, imgcontainer:배너ul컨테이너,
 item:배너아이템, bannerprev:이전버튼, bannernext:다음버튼, stopBtn:멈춤버튼,
 dotBtn:리스트버튼, delay:딜레이, speed:스피드, isPlay:자동플레이}
 * */
var RollingBannerFade = function(data){
    var $bannerContainer = $(data.container);
    if($bannerContainer.length < 1){ return;}
    var $bannerImgContainer = $(data.imgcontainer);
    var $bannerItem = $(data.item);
    var bannerWidth = $(data.item).width();
    var bannerLen =  $(data.item).length;
    var $bannerprev = $(data.bannerprev);
    var $bannernext = $(data.bannernext);
    var $stopBtn = $(data.stopBtn);
    var $playBtn = $(data.playBtn);
    var $dotBtn = $(data.dotBtn);          
    var isPlay = (data.isPlay !== undefined) ? data.isPlay : true;    
    var bdelay = data.delay || 5000, bspeed = data.speed || 700;
    var isTweening = false , isMouseEnter=false, bannerIdx = 0, bannerInterval;
    
    bannerInit();
   
    function bannerInit(){
		
        if(bannerLen < 2){
            $bannerprev.hide();
            $bannernext.hide();
            $stopBtn.hide();
            $playBtn.hide();
            $dotBtn.hide();
            return;
        }
        
        bannerMove(0);
		
		$bannerprev.on("click", function(e){
            e.stopPropagation();
            e.preventDefault();
            if(isTweening)return false;
            var idx = --bannerIdx;        
				bannerMove(idx);			
			
			if(bannerIdx == (bannerLen*-1)-1)
				bannerMove(bannerLen-1);
        });
        
        $bannernext.on("click", function(e){
            e.stopPropagation();
            e.preventDefault();          
            if(isTweening)return false;  
            var idx = ++bannerIdx;        
            bannerMove(idx);
			if(bannerIdx >= bannerLen) bannerIdx=0;
			bannerMove(bannerIdx);
        });
        
        $stopBtn.on("click", function(e){
            e.stopPropagation();
            e.preventDefault();           
            bannerStop();            
        });
		
        $playBtn.on("click", function(e){
            e.stopPropagation();
            e.preventDefault();           
            bannerPlay();            
        });
        
        $dotBtn.on("click focusin", function(e){
            e.stopPropagation();
            e.preventDefault();                      
            if(isTweening)return false;  
            var idx = $(this).parent().index();                
            bannerMove(idx);         
        });
        /*
        $bannerContainer.on("mouseenter focusin", function(e){      
            isMouseEnter  = true;
            if(bannerInterval)clearInterval(bannerInterval);
            bannerInterval = null;                 
        });
        
        $bannerContainer.on("mouseleave", function(e){        
            isMouseEnter =false;   
            if(isPlay){
                if(bannerInterval)clearInterval(bannerInterval);
                bannerInterval = setInterval(bannerInter,bdelay);   
            }
        });
        
         if(isPlay){
            if(bannerInterval)clearInterval(bannerInterval);
            bannerInterval = setInterval(bannerInter,bdelay);    
        }
		*/
        
    }
    
    function bannerInter(){
        bannerIdx++;
        if(bannerIdx >= bannerLen) bannerIdx=0;
        bannerMove(bannerIdx);
    }
    
    function bannerMove(_idx){
        isTweening = true;
         if($dotBtn){
           $dotBtn.parent().removeClass("on");
           $dotBtn.eq(_idx).parent().addClass("on");
        }
        $bannerItem.css({"opacity":0.5,"display":"none"});
        $bannerItem.eq(_idx).stop().css({"display":"block"}).animate({"opacity":1},bspeed , function(){
            motionComplete(_idx);
        });                
        
        
        bannerIdx = _idx;
		
		if(bannerIdx >= 0){
			document.getElementById("bannercount").innerHTML= (bannerIdx+1) + "/" + bannerLen;
		}
		else{
			document.getElementById("bannercount").innerHTML= (bannerIdx+bannerLen+1) + "/" + bannerLen;
		}
    }
    
   function motionComplete(_idx){
        isTweening =false;       
        if(!isMouseEnter){
            if(isPlay){
                if(bannerInterval)clearInterval(bannerInterval);
                bannerInterval = setInterval(bannerInter,bdelay);   
            }    
        }
   }
   
	function bannerStop(){
		isPlay = false;
		if(bannerInterval)clearInterval(bannerInterval);
    }
	function bannerPlay(){
		isPlay = true;            
		if(bannerInterval)clearInterval(bannerInterval);
		bannerInterval = setInterval(bannerInter,bdelay);
    }
};