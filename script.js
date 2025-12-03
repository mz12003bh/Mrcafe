// فتح القائمة
function openPopup(el){
 const popup = document.getElementById("productPopup");
 popup.style.display = "flex";

 const title = el.querySelector("h4")?.innerText || "";
 const desc  = el.querySelector("p")?.innerText || "";
 const img   = el.querySelector("img")?.src || "";

 document.getElementById("popupTitle").innerText = title;
 document.getElementById("popupDesc").innerText  = desc;
 document.getElementById("popupImg").src         = img;
}

// إغلاق القائمة
document.querySelector(".popup-close").addEventListener("click", ()=>{
 document.getElementById("productPopup").style.display = "none";
});

// إغلاق إذا تم الضغط خارج البوكس
document.getElementById("productPopup").addEventListener("click",(e)=>{
 if(e.target.id === "productPopup"){
   document.getElementById("productPopup").style.display = "none";
 }
});
