/*==================================================
CYFUTURE — Shared Nav & Footer
==================================================*/

function initSiteLayout(activePage) {

const navLinks = [
{ id: "home", label: "Home", href: "index.html" },
{ id: "about", label: "About", href: "about.html" },
{ id: "partner", label: "Partner With Us", href: "partner.html" },
{ id: "contact", label: "Contact", href: "contact.html" },
{ id: "faq", label: "FAQ", href: "faq.html" }
];

const navItems = navLinks.map(function (link) {
const cls = link.id === activePage ? ' class="active"' : "";
return '<li><a href="' + link.href + '"' + cls + ">" + link.label + "</a></li>";
}).join("");

const headerHTML =
'<header><nav class="navbar">' +
'<a href="index.html" class="logo"><span>CY</span>FUTURE</a>' +
'<ul class="nav-links">' + navItems + "</ul>" +
'<div class="nav-buttons">' +
'<a href="login.html" class="btn-login">Login</a>' +
'<a href="register.html" class="btn-register">Get Started</a>' +
"</div>" +
'<div class="hamburger"><span></span><span></span><span></span></div>' +
"</nav></header>";

const footerHTML =
'<footer><div class="footer-container">' +
'<div class="footer-column"><h2>CYFUTURE</h2>' +
"<p>Connecting students, institutions and companies through international virtual internships.</p></div>" +
'<div class="footer-column"><h3>Quick Links</h3><ul>' +
'<li><a href="index.html">Home</a></li>' +
'<li><a href="about.html">About</a></li>' +
'<li><a href="partner.html">Partner With Us</a></li>' +
'<li><a href="register.html">Register</a></li>' +
'<li><a href="login.html">Login</a></li>' +
'<li><a href="contact.html">Contact</a></li>' +
'<li><a href="faq.html">FAQ</a></li>' +
"</ul></div>" +
'<div class="footer-column"><h3>Contact</h3>' +
"<p>Maseru, Lesotho</p><p>info@cyfuture.co.ls</p><p>+266 XX XXX XXX</p></div>" +
'<div class="footer-column"><h3>Follow Us</h3><div class="social-icons">' +
'<a href="#"><i class="fab fa-facebook-f"></i></a>' +
'<a href="#"><i class="fab fa-instagram"></i></a>' +
'<a href="#"><i class="fab fa-linkedin-in"></i></a>' +
'<a href="#"><i class="fab fa-x-twitter"></i></a>' +
"</div></div></div>" +
'<div class="footer-bottom"><p>&copy; ' + new Date().getFullYear() +
" CYFUTURE PTY LTD. All Rights Reserved.</p></div></footer>" +
'<button id="topBtn"><i class="fa-solid fa-arrow-up"></i></button>';

const headerEl = document.getElementById("site-header");
const footerEl = document.getElementById("site-footer");

if (headerEl) headerEl.innerHTML = headerHTML;
if (footerEl) footerEl.innerHTML = footerHTML;

if (typeof initMobileNav === "function") initMobileNav();
if (typeof initTopButton === "function") initTopButton();
if (typeof initStickyHeader === "function") initStickyHeader();

}
