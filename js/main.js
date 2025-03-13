// Local Storage Keys
const STORAGE_KEYS = {
  NEWSLETTER_SUBSCRIBERS: "newsletter_subscribers",
  ADOPTION_REQUESTS: "adoption_requests",
  CONTACT_MESSAGES: "contact_messages",
};

// Initialize Local Storage
function initializeStorage() {
  for (const key of Object.values(STORAGE_KEYS)) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }
}

// Hero Carousel Data
const carouselData = [
  {
    image: "assets/hero1.jpg",
    title: "Faça a Diferença",
    description: "Ajude-nos a transformar a vida dos animais necessitados",
  },
  {
    image: "assets/hero2.jpg",
    title: "Adote um Amigo",
    description: "Diversos animais esperando por um lar amoroso",
  },
  {
    image: "assets/hero3.jpg",
    title: "Seja Voluntário",
    description: "Junte-se a nós nessa causa",
  },
];

// Statistics Data
const statsData = [
  { label: "Animais Resgatados", value: 1500 },
  { label: "Adoções Realizadas", value: 1200 },
  { label: "Castrações", value: 2000 },
  { label: "Voluntários Ativos", value: 50 },
];

// Initialize Hero Carousel
function initializeCarousel() {
  const carouselInner = document.querySelector(".carousel-inner");
  if (!carouselInner) return;

  carouselData.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = `carousel-item ${index === 0 ? "active" : ""}`;
    div.style.backgroundImage = `url(${item.image})`;

    div.innerHTML = `
            <div class="carousel-caption slide-in">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
            </div>
        `;

    carouselInner.appendChild(div);
  });
}

// Initialize Statistics
function initializeStats() {
  const statsContainer = document.querySelector(".stats-container");
  if (!statsContainer) return;

  statsData.forEach((stat) => {
    const div = document.createElement("div");
    div.className = "stat-item fade-in";
    div.innerHTML = `
            <div class="stat-number" data-value="${stat.value}">0</div>
            <div class="stat-label">${stat.label}</div>
        `;
    statsContainer.appendChild(div);
  });

  // Animate numbers when in viewport
  animateStats();
}

// Animate Statistics
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.getAttribute("data-value"));
          animateNumber(target, finalValue);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
}

// Number Animation Helper
function animateNumber(element, final, duration = 2000) {
  const start = 0;
  const increment = final / (duration / 16);
  let current = start;

  const animate = () => {
    current += increment;
    element.textContent = Math.floor(current);

    if (current < final) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = final;
    }
  };

  animate();
}

// Newsletter Subscription
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;

  if (!email) return;

  const subscribers = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWSLETTER_SUBSCRIBERS));
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem(STORAGE_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify(subscribers));
    showAlert("Obrigado por se inscrever em nossa newsletter!", "success");
  } else {
    showAlert("Este e-mail já está inscrito em nossa newsletter.", "info");
  }

  form.reset();
}

// Alert Helper
function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.insertBefore(alertDiv, document.body.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  initializeCarousel();
  initializeStats();

  // Event Listeners
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }

  // Enable all tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
