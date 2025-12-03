function openPopup(el){
 document.getElementById("productPopup").style.display="flex";
 const title=el.querySelector("h4").innerText;
 const desc=el.querySelector("p").innerText;
 const img=el.querySelector("img").src;
 document.getElementById("popupTitle").innerText=title;
 document.getElementById("popupDesc").innerText=desc;
 document.getElementById("popupImg").src=img;
}
document.querySelector(".popup-close").onclick=function(){
 document.getElementById("productPopup").style.display="none";
};
