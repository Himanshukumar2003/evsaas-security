// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
});

// Sticky Navbar Functionality
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNavbar");
  const topBar = document.querySelector(".top-bar");
  const topBarHeight = topBar ? topBar.offsetHeight : 0;

  if (window.scrollY > topBarHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Close mobile menu when clicking on nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

// Add active class to current nav item on scroll (optional enhancement)
window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY;

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
});

// --------------------------------------------------- COUNTER SECTION

// Counter Animation
const counters = document.querySelectorAll(".counter");
const speed = 200;

const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const count = +counter.innerText;
  const increment = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => animateCounter(counter), 10);
  } else {
    counter.innerText = target;
  }
};

// Intersection Observer for triggering animation when in view
const observerOptions = {
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      counters.forEach((counter) => {
        animateCounter(counter);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

observer.observe(document.querySelector(".about-section"));

// Add scroll reveal animation
const revealElements = document.querySelectorAll(".stat-card, .feature-item");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.5s ease";
  revealObserver.observe(el);
});

// ----------------------------------------------------------- SWIPER SCRIPT

new Swiper(".services-slider", {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

// ------------------------------------------------------------ TESTIMONIALS SECTION

let index = 0;
const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".testimonial-card");

function updateSlider() {
  track.style.transform = `translateX(-${
    index * (cards[0].offsetWidth + 30)
  }px)`;
}

document.getElementById("nextBtn").onclick = () => {
  index = (index + 1) % cards.length;
  updateSlider();
};

document.getElementById("prevBtn").onclick = () => {
  index = index === 0 ? cards.length - 1 : index - 1;
  updateSlider();
};
