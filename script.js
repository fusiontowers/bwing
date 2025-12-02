// Smooth scroll for internal links
document.addEventListener("click", function (e) {
  const target = e.target.closest('a[href^="#"]');
  if (!target) return;

  const href = target.getAttribute("href");
  if (!href || href === "#") return;

  const el = document.querySelector(href);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// Header glass behavior on scroll + scroll-to-top button
const siteHeader = document.getElementById("siteHeader");
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  const y = window.scrollY || window.pageYOffset;

  if (y > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }

  if (y > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("open");
    }
  });
}

// Announcements filter
const filterContainer = document.getElementById("announcementFilters");
const announcementCards = document.querySelectorAll(".announcement-card");

if (filterContainer) {
  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;

    const filter = btn.getAttribute("data-filter");
    if (!filter) return;

    // update active chip
    filterContainer.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");

    // filter cards
    announcementCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const show = filter === "all" || category === filter;
      card.style.display = show ? "block" : "none";
    });
  });
}

// Reveal on scroll using IntersectionObserver
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: show all
  revealEls.forEach((el) => el.classList.add("visible"));
}
