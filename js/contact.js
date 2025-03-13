// Contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  // Initialize form validation
  initializeFormValidation();
});

// Handle contact form submission
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!validateForm(form)) {
    return;
  }

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    timestamp: new Date().toISOString(),
  };

  // Store in local storage
  saveContactMessage(formData);

  // Show success message
  showAlert("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");

  // Reset form
  form.reset();
  form.classList.remove("was-validated");
}

// Save contact message to local storage
function saveContactMessage(message) {
  const messages = JSON.parse(localStorage.getItem("contact_messages") || "[]");
  messages.push(message);
  localStorage.setItem("contact_messages", JSON.stringify(messages));
}

// Form validation
function validateForm(form) {
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return false;
  }
  return true;
}

// Initialize Bootstrap form validation
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

// Phone number mask
document.getElementById("phone")?.addEventListener("input", function (e) {
  let x = e.target.value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
});

// Show alert message
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

// Newsletter form handling (shared across pages)
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", handleNewsletterSubmit);
}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;

  if (!email) return;

  const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
    showAlert("Obrigado por se inscrever em nossa newsletter!", "success");
  } else {
    showAlert("Este e-mail já está inscrito em nossa newsletter.", "info");
  }

  form.reset();
}
