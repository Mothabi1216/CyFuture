/*==================================================

CYFUTURE PTY LTD
JavaScript
Version 1.0

==================================================*/


/*=========================
LOADER
=========================*/

window.addEventListener("load",function(){

const loader=document.getElementById("loader");

loader.style.opacity="0";

setTimeout(function(){

loader.style.display="none";

},700);

});



/*=========================
STICKY NAVBAR
=========================*/

const header=document.querySelector("header");

const hamburger=document.querySelector(".hamburger");
const mobileNav=document.querySelector(".nav-links");
if(hamburger && mobileNav){
  hamburger.addEventListener("click",function(){
    const open=mobileNav.classList.toggle("active");
    hamburger.setAttribute("aria-expanded",String(open));
  });
  mobileNav.addEventListener("click",function(event){
    if(event.target.closest("a")){
      mobileNav.classList.remove("active");
      hamburger.setAttribute("aria-expanded","false");
    }
  });
}

window.addEventListener("scroll",function(){

if(window.scrollY>60){

header.style.background="rgba(6,18,33,.96)";

header.style.boxShadow="0 10px 35px rgba(0,0,0,.35)";

}

else{

header.style.background="rgba(5,15,30,.45)";

header.style.boxShadow="none";

}

});



/*=========================
COUNTER
=========================*/

const counters=document.querySelectorAll(".counter");

const speed=200;

counters.forEach(counter=>{

const updateCounter=()=>{

const target=+counter.getAttribute("data-target");

const count=+counter.innerText;

const increment=target/speed;

if(count<target){

counter.innerText=Math.ceil(count+increment);

setTimeout(updateCounter,15);

}

else{

counter.innerText=target;

}

}

updateCounter();

});



/*=========================
BACK TO TOP BUTTON
=========================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",function(){

if(window.scrollY>500){

topBtn.style.display="block";

}

else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

});



/*=========================
FAQ
=========================*/

const questions=document.querySelectorAll(".faq-question");

questions.forEach(button=>{

button.addEventListener("click",function(){

const answer=this.nextElementSibling;

if(answer.style.display==="block"){

answer.style.display="none";

this.querySelector("i").classList.remove("fa-minus");

this.querySelector("i").classList.add("fa-plus");

}

else{

answer.style.display="block";

this.querySelector("i").classList.remove("fa-plus");

this.querySelector("i").classList.add("fa-minus");

}

});

});



/*=========================
SCROLL REVEAL
=========================*/

const reveals=document.querySelectorAll(

".about-card,.glass-card,.partner-card,.journey-box,.feature,.step,.stat-box,.testimonial-card"

);

function revealElements(){

const trigger=window.innerHeight*0.85;

reveals.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<trigger){

item.classList.add("fade-up");

item.classList.add("show");

}

});

}

window.addEventListener("scroll",revealElements);

window.addEventListener("load",revealElements);



/*=========================
SMOOTH LINKS
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});



/*=========================
ACTIVE NAVIGATION
=========================*/

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop;

const sectionHeight=section.clientHeight;

if(pageYOffset>=sectionTop-150){

current=section.getAttribute("class");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.href.includes(current)){

link.classList.add("active");

}

});

});



/*=========================
HERO BUTTON RIPPLE
=========================*/

const buttons=document.querySelectorAll(

".primary-btn,.secondary-btn,.btn-register,.btn-login"

);

buttons.forEach(button=>{

button.addEventListener("click",function(e){

let circle=document.createElement("span");

circle.classList.add("ripple");

this.appendChild(circle);

let x=e.clientX-this.offsetLeft;

let y=e.clientY-this.offsetTop;

circle.style.left=x+"px";

circle.style.top=y+"px";

setTimeout(()=>{

circle.remove();

},600);

});

});


/*==================================================

SCRIPT.JS PART 2

==================================================*/


/*=========================
PARALLAX HERO
=========================*/

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".hero");

if(hero){

hero.style.backgroundPositionY=window.pageYOffset*0.35+"px";

}

});



/*=========================
FLOATING CARDS
=========================*/

const cards=document.querySelectorAll(

".glass-card,.about-card,.partner-card,.feature,.journey-box,.testimonial-card"

);

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*14;

const rotateX=((rect.height/2-y)/rect.height)*14;

card.style.transform=

`perspective(1000px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg)";

});

});



/*=========================
TYPING EFFECT
=========================*/

const heroTitle=document.querySelector(".hero-left h1");

if(heroTitle){

const text=heroTitle.innerText;

heroTitle.innerHTML="";

let index=0;

function typeWriter(){

if(index<text.length){

heroTitle.innerHTML+=text.charAt(index);

index++;

setTimeout(typeWriter,35);

}

}

typeWriter();

}



/*=========================
NUMBER COUNT ANIMATION
=========================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(

".stat-box,.feature,.about-card,.partner-card"

).forEach(el=>{

observer.observe(el);

});



/*=========================
MOUSE GLOW
=========================*/

const glow=document.createElement("div");

glow.id="mouseGlow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});



/*=========================
SECTION FADE
=========================*/

const sectionsFade=document.querySelectorAll("section");

const fadeObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0px)";

}

});

});

sectionsFade.forEach(section=>{

section.style.opacity=0;

section.style.transform="translateY(60px)";

section.style.transition="1s";

fadeObserver.observe(section);

});



/*=========================
COPYRIGHT YEAR
=========================*/

const year=document.getElementById("year");

if(year){

year.innerHTML=new Date().getFullYear();

}



/*=========================
PREVENT DOUBLE FORM SUBMIT
=========================*/

document.querySelectorAll("form").forEach(form=>{

form.addEventListener("submit",()=>{

const btn=form.querySelector("button");

if(btn){

btn.disabled=true;

btn.innerHTML="Please wait...";

}

});

});
