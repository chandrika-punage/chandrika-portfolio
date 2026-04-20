// ========================================
// DOM Elements
// ========================================
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");
const hamburger = document.querySelector(".hamburger");
const navLinksItems = document.querySelectorAll(".nav-links li a");
const contactForm = document.getElementById("contactForm");

// ========================================
// Navbar Scroll Effect
// ========================================
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ========================================
// Mobile Navigation Toggle
// ========================================
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking a link
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// Scroll Reveal Animation
// ========================================
const revealElements = document.querySelectorAll(
  ".info-card, .skill-category, .project-card, .certification-card, .contact-item",
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  revealElements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - elementVisible) {
      // Add staggered delay for better visual effect
      setTimeout(() => {
        element.classList.add("reveal");
        element.classList.add("active");
      }, index * 100);
    }
  });
};

// Initial check
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ========================================
// Progress Bar Animation
// ========================================
const progressBars = document.querySelectorAll(".progress");

const animateProgressBars = () => {
  progressBars.forEach((bar) => {
    // Skip if already animated
    if (bar.classList.contains("animated")) return;

    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (barTop < windowHeight - 100) {
      // Get the target width from the style attribute
      const targetWidth = bar.getAttribute("style").match(/width:\s*(\d+%)/);

      if (targetWidth) {
        bar.classList.add("animated");
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = targetWidth[1];
        }, 100);
      }
    }
  });
};

// Initial check on load
window.addEventListener("load", () => {
  setTimeout(animateProgressBars, 500);
});

window.addEventListener("scroll", animateProgressBars);

// ========================================
// Contact Form Handling
// ========================================
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simple validation
  if (name && email && message) {
    // Show success message (in production, you'd send to a backend)
    alert(
      `Thank you, ${name}! Your message has been sent successfully.\n\nI'll get back to you at ${email} soon.`,
    );

    // Reset form
    contactForm.reset();
  }
});

// ========================================
// Add Hover Effects to Cards
// ========================================
const cards = document.querySelectorAll(
  ".info-card, .skill-card, .project-card, .certification-card, .contact-item",
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// ========================================
// Button Ripple Effect
// ========================================
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation keyframes dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Preloader (Optional)
// ========================================
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// Set initial opacity for smooth load
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";

// ========================================
// Keyboard Navigation Support
// ========================================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

// ========================================
// Smooth Page Load Animation
// ========================================
window.addEventListener("load", () => {
  // Add loaded class to body for any additional animations
  document.body.classList.add("loaded");

  // Trigger initial animations
  revealOnScroll();
  animateProgressBars();
});

console.log("Portfolio website loaded successfully!");
