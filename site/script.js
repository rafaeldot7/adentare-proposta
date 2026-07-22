document.getElementById("ano").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Rede de segurança: garante que nenhum elemento fique invisível para sempre
  // caso o IntersectionObserver não dispare a tempo (conexão lenta, aba em segundo plano, etc.)
  window.addEventListener("load", () => {
    setTimeout(() => {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }, 1500);
  });
}

// Depoimentos em vídeo — carrega o embed oficial do Instagram só quando a seção entra na tela
const videoTestimonials = document.querySelector(".video-testimonials");
if (videoTestimonials) {
  const loadInstagramEmbed = () => {
    if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => window.instgrm && window.instgrm.Embeds.process();
    document.body.appendChild(script);
  };

  if ("IntersectionObserver" in window) {
    const igObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadInstagramEmbed();
            igObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px 0px" }
    );
    igObserver.observe(videoTestimonials);
  } else {
    loadInstagramEmbed();
  }
}
