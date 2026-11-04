const headerParts=document.querySelectorAll(".header, .header>.logo, .header>.logo>.label, .header>.nav");
const sectionButtons=document.querySelectorAll(".header>.nav>button");
const portfolioPrevButton=document.querySelector(".portfolio>.card>.backward");
const portfolioNextButton=document.querySelector(".portfolio>.card>.forward");
const portfolioGallery=document.querySelector(".portfolio>.card>.gallery");
const copyrightLabel=document.querySelector(".copyright");
const upwardButton=document.querySelector(".upward");

const rootStyle=window.getComputedStyle(document.documentElement);
const scrollShrink=parseInt(rootStyle.getPropertyValue("--v-scroll-shrink").trim(), 10);
const scrollBehavior=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth";

window.addEventListener("load", shrinkHeader);
window.addEventListener("load", togglePortfolioButtons);
window.addEventListener("load", toggleUpwardButton);
window.addEventListener("resize", togglePortfolioButtons);
window.addEventListener("scroll",shrinkHeader);
window.addEventListener("scroll", toggleUpwardButton);
portfolioPrevButton.addEventListener("click", scrollThroughPortfolio(false));
portfolioNextButton.addEventListener("click", scrollThroughPortfolio(true));
portfolioGallery.addEventListener("scroll", togglePortfolioButtons);
upwardButton.addEventListener("click", jumpToTop);
copyrightLabel.setAttribute("data-year", getCurrentYear());
sectionButtons.forEach(e=>e.addEventListener("click", jumpToSection(e)));

function shrinkHeader()
{
    const shouldShrink=window.scrollY>scrollShrink;
    headerParts.forEach(e=>e.classList.toggle("shrunk", shouldShrink))
}

function jumpToTop()
{
    window.scrollTo({top: 0, behavior: scrollBehavior});
}

function jumpToSection(element)
{
    const targetId=element.getAttribute("data-target");
    const target=document.getElementById(targetId);
    return ()=>target.scrollIntoView({behavior: scrollBehavior})
}

function scrollThroughPortfolio(direction)
{
    const amount=portfolioGallery.clientWidth*(direction?1:-1);
    return ()=>portfolioGallery.scrollBy({left: amount, behavior: scrollBehavior});
}

function togglePortfolioButtons()
{
    const scrollAmount=portfolioGallery.scrollLeft;
    const scrollMax=portfolioGallery.scrollWidth-portfolioGallery.clientWidth;
    portfolioPrevButton.disabled=scrollAmount<=0;
    portfolioNextButton.disabled=scrollAmount>=scrollMax;
}

function toggleUpwardButton()
{
    upwardButton.disabled=window.scrollY<=scrollShrink*5;
}

function getCurrentYear()
{
    return new Date().getFullYear().toString();
}