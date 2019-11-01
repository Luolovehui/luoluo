window.onload=function(){
    var oDiv=document.getElementById('teacher2').getElementsByTagName('div');
    var oImg=document.getElementById('teacher2').getElementsByTagName('img');
    for(var i=0;i<oDiv.length;i++){
        oDiv[i].index=i
        oDiv[i].onmouseover=function(){
            oImg[this.index].style.display="block";
        }
        oDiv[i].onmouseout=function(){
            oImg[this.index].style.display="none";
        }
    }


}