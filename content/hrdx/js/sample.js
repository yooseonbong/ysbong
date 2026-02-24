//left menu
document.querySelector(".clickIcon").onclick = function () {
    var element = document.querySelector(".leftMenu");
    element.classList.toggle("openMenu");

    var clickIcon = document.querySelector(".clickIcon");
    clickIcon.classList.toggle("open");
}

//modal
function openModal(modalname){
    $(".modalBg").fadeIn(300);
    $("." + modalname).fadeIn(300);
    alert('성공');
}

    $(".modalBg, .close").on('click',function(){
    $(".modalBg").fadeOut(300);
    $(".modalContents").fadeOut(300);
});

