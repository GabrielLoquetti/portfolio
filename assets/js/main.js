
import { projetos } from "./projetos.js";

const navigation = document.querySelector("#navigation");
const backToTopButton = document.querySelector("#backToTopButton");
const bb8Checkbox = document.querySelector(".bb8-toggle__checkbox");
const projectsSection = document.querySelector("#projects .wrapper");

// Imagens antigas removidas - agora usando terminal de código

// Seções para navegação
const about = document.querySelector("#about");
const projects = document.querySelector("#projects");
const knowledge = document.querySelector("#knowledge");
const contact = document.querySelector("#contact");

window.addEventListener("load", function begin() {
  projetos(projectsSection);
  

  
});

window.addEventListener("scroll", onScroll);
onScroll();

// Animação antiga removida - agora usando terminal de código

function onScroll() {
  showNavOnScroll();
  showBackToTopButtonOnScroll();

  activateMenuAtCurrentSection(about);
  activateMenuAtCurrentSection(projects);
  activateMenuAtCurrentSection(knowledge);
  activateMenuAtCurrentSection(contact);
}

function activateMenuAtCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`);

  menuElement.classList.remove("active");

  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add("scroll");
  } else {
    navigation.classList.remove("scroll");
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 550) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}

openMenu();
function openMenu() {
  const openBtns = document.querySelectorAll(".open");
  openBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.add("menu-expanded");
    });
  });
}

closeMenu();
function closeMenu() {
  const closeBtns = document.querySelectorAll(".close");
  closeBtns.forEach((e) => {
    e.addEventListener("click", () => {
      document.body.classList.remove("menu-expanded");
    });
  });
}

ScrollReveal({
  origin: "bottom",
  distance: "50px",
  duration: 1000,
}).reveal(
  `#home, 
  #home img, 
  #about, 
  #about header, 
  #about p,
  #about img,
  #projects,
  #projects header,
  #projects .card,
  #knowledge,
  #knowledg header,
  #knowledg .card,
  #contact,
  #contact header`
);

// Tema inicial salvo no localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
  if (savedTheme === "light-mode") bb8Checkbox.checked = true;
}

// Alterna tema ao clicar no BB-8
bb8Checkbox.addEventListener("change", () => {
  if (bb8Checkbox.checked) {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");
  } else {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark-mode");
  }
});