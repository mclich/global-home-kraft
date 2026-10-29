const header=document.getElementById("header");
const headerLogo=document.getElementById("header-logo");
const headerLabel=document.getElementById("header-label");
const currentYear=document.getElementById("current-year");

window.addEventListener("scroll",()=>
{
    if(window.scrollY>50)
    {
        header.classList.add("shrunk");
        headerLogo.classList.add("shrunk");
        headerLabel.classList.add("shrunk");
    }
    else
    {
        header.classList.remove("shrunk");
        headerLogo.classList.remove("shrunk");
        headerLabel.classList.remove("shrunk");
    }
})
currentYear.textContent=new Date().getFullYear().toString();