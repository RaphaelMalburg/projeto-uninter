// Local Storage Keys
const STORAGE_KEYS = {
  VOLUNTEER_REQUESTS: "volunteer_requests",
  NEWSLETTER_SUBSCRIBERS: "newsletter_subscribers",
};

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  initializeFormValidation();
  setupEventListeners();
  initializeImpactStats();
});

// Initialize Local Storage
function initializeStorage() {
  for (const key of Object.values(STORAGE_KEYS)) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }
}

// Initialize Form Validation
function initializeFormValidation() {
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Volunteer Form
  const volunteerForm = document.getElementById("volunteerForm");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", handleVolunteerSubmit);
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }

  // Phone Input Mask
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener("input", handlePhoneInput);
  });
}

// Handle Volunteer Form Submission
function handleVolunteerSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!form.checkValidity()) {
    return;
  }

  const formData = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    phone: form.querySelector('input[type="tel"]').value,
    area: form.querySelector("select").value,
    availability: form.querySelectorAll("textarea")[0].value,
    motivation: form.querySelectorAll("textarea")[1].value,
    timestamp: new Date().toISOString(),
    status: "pending",
  };

  // Save to local storage
  const volunteers = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOLUNTEER_REQUESTS));
  volunteers.push(formData);
  localStorage.setItem(STORAGE_KEYS.VOLUNTEER_REQUESTS, JSON.stringify(volunteers));

  // Show success message
  showAlert("Sua inscrição para voluntariado foi enviada com sucesso! Entraremos em contato em breve.", "success");

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById("volunteerModal"));
  modal.hide();
  form.reset();
  form.classList.remove("was-validated");
}

// Handle Newsletter Submission
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

// Phone Input Mask
function handlePhoneInput(event) {
  let input = event.target;
  let value = input.value.replace(/\D/g, "");
  let formattedValue = "";

  if (value.length <= 11) {
    if (value.length > 2) {
      formattedValue += `(${value.substring(0, 2)}) `;
      if (value.length > 7) {
        formattedValue += `${value.substring(2, 7)}-${value.substring(7)}`;
      } else {
        formattedValue += value.substring(2);
      }
    } else {
      formattedValue = value;
    }
  }

  input.value = formattedValue;
}

// Initialize Impact Stats
function initializeImpactStats() {
  const stats = document.querySelectorAll(".impact-number");
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

// Animate Numbers
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

// Show Alert Helper
function showAlert(message, type = "success") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`;
  alertDiv.style.zIndex = "1050";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}
