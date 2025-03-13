// Local Storage Keys
const STORAGE_KEYS = {
  EVENT_REGISTRATIONS: "event_registrations",
  NEWSLETTER_SUBSCRIBERS: "newsletter_subscribers",
};

// Sample Events Data (in a real application, this would come from a backend)
const eventsData = [
  {
    id: 1,
    title: "Feira de Adoção - Praça Central",
    type: "feira",
    date: "2024-04-15",
    time: "10:00",
    location: "Praça Central",
    description: "Venha conhecer nossos animais disponíveis para adoção!",
    image: "../assets/events/adoption-fair.jpg",
    capacity: 100,
    registrations: 45,
  },
  {
    id: 2,
    title: "Campanha de Castração",
    type: "castracao",
    date: "2024-04-20",
    time: "08:00",
    location: "Clínica Veterinária Parceira",
    description: "Campanha de castração a preços acessíveis.",
    image: "../assets/events/spay-neuter.jpg",
    capacity: 30,
    registrations: 25,
  },
  {
    id: 3,
    title: "Bazar Beneficente",
    type: "arrecadacao",
    date: "2024-04-25",
    time: "09:00",
    location: "Sede da ONG",
    description: "Bazar com produtos novos e usados. Toda renda será revertida para os animais.",
    image: "../assets/events/bazaar.jpg",
    capacity: 0, // Unlimited
    registrations: 0,
  },
];

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  initializeEventListeners();
  displayEvents();
  initializeCalendar();
});

// Initialize Local Storage
function initializeStorage() {
  for (const key of Object.values(STORAGE_KEYS)) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }
}

// Initialize Event Listeners
function initializeEventListeners() {
  // Event Category Filters
  const filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", handleFilterClick);
  });

  // Load More Events
  const loadMoreBtn = document.getElementById("loadMoreEvents");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreEvents);
  }

  // Calendar Navigation
  document.getElementById("prevMonth").addEventListener("click", () => navigateMonth(-1));
  document.getElementById("nextMonth").addEventListener("click", () => navigateMonth(1));

  // Event Registration Form
  const registrationForm = document.getElementById("eventRegistrationForm");
  if (registrationForm) {
    registrationForm.addEventListener("submit", handleEventRegistration);
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

// Display Events
function displayEvents(filter = "all") {
  const upcomingEvents = document.getElementById("upcomingEvents");
  const pastEvents = document.getElementById("pastEvents");
  const currentDate = new Date();

  // Clear existing content
  upcomingEvents.innerHTML = "";
  pastEvents.innerHTML = "";

  // Filter and sort events
  const filteredEvents = eventsData.filter((event) => filter === "all" || event.type === filter).sort((a, b) => new Date(a.date) - new Date(b.date));

  filteredEvents.forEach((event) => {
    const eventDate = new Date(event.date);
    const eventCard = createEventCard(event);

    if (eventDate >= currentDate) {
      upcomingEvents.appendChild(eventCard);
    } else {
      pastEvents.appendChild(eventCard);
    }
  });

  // Show/hide "Load More" button based on past events count
  const loadMoreBtn = document.getElementById("loadMoreEvents");
  if (loadMoreBtn) {
    loadMoreBtn.style.display = pastEvents.children.length > 6 ? "block" : "none";
  }
}

// Create Event Card
function createEventCard(event) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  const card = document.createElement("div");
  card.className = "card h-100";
  card.innerHTML = `
        <img src="${event.image}" class="card-img-top" alt="${event.title}">
        <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
            <p class="card-text">
                <i class="far fa-calendar"></i> ${formatDate(event.date)}<br>
                <i class="far fa-clock"></i> ${event.time}<br>
                <i class="fas fa-map-marker-alt"></i> ${event.location}
            </p>
            <button class="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#eventDetailsModal"
                    data-event-id="${event.id}">
                Ver Detalhes
            </button>
        </div>
    `;

  // Add event listener for the details button
  const detailsBtn = card.querySelector("button");
  detailsBtn.addEventListener("click", () => showEventDetails(event));

  return col;
}

// Show Event Details
function showEventDetails(event) {
  const modal = document.getElementById("eventDetailsModal");
  const content = modal.querySelector(".event-details-content");
  const registerBtn = modal.querySelector(".register-event-btn");

  content.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${event.image}" class="img-fluid rounded" alt="${event.title}">
            </div>
            <div class="col-md-6">
                <h4>${event.title}</h4>
                <p>${event.description}</p>
                <p>
                    <strong>Data:</strong> ${formatDate(event.date)}<br>
                    <strong>Horário:</strong> ${event.time}<br>
                    <strong>Local:</strong> ${event.location}<br>
                    ${event.capacity ? `<strong>Vagas disponíveis:</strong> ${event.capacity - event.registrations}` : ""}
                </p>
            </div>
        </div>
    `;

  // Update register button state
  if (event.capacity && event.registrations >= event.capacity) {
    registerBtn.disabled = true;
    registerBtn.textContent = "Vagas Esgotadas";
  } else {
    registerBtn.disabled = false;
    registerBtn.textContent = "Inscrever-se";
    registerBtn.onclick = () => openRegistrationModal(event);
  }
}

// Open Registration Modal
function openRegistrationModal(event) {
  const modal = document.getElementById("eventRegistrationModal");
  const eventIdInput = modal.querySelector("#eventId");
  eventIdInput.value = event.id;

  // Close details modal and open registration modal
  bootstrap.Modal.getInstance(document.getElementById("eventDetailsModal")).hide();
  new bootstrap.Modal(modal).show();
}

// Handle Event Registration
function handleEventRegistration(event) {
  event.preventDefault();
  const form = event.target;

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const formData = {
    eventId: form.querySelector("#eventId").value,
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    phone: form.querySelector('input[type="tel"]').value,
    people: form.querySelector("select").value,
    timestamp: new Date().toISOString(),
  };

  // Save to local storage
  const registrations = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENT_REGISTRATIONS));
  registrations.push(formData);
  localStorage.setItem(STORAGE_KEYS.EVENT_REGISTRATIONS, JSON.stringify(registrations));

  // Show success message
  showAlert("Sua inscrição foi realizada com sucesso! Enviaremos mais informações por e-mail.", "success");

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById("eventRegistrationModal"));
  modal.hide();
  form.reset();
  form.classList.remove("was-validated");

  // Update events display
  displayEvents();
}

// Calendar Functions
let currentDate = new Date();

function initializeCalendar() {
  updateCalendar();
}

function updateCalendar() {
  const calendarDiv = document.getElementById("calendar");
  const currentMonthElement = document.getElementById("currentMonth");

  // Update month display
  currentMonthElement.textContent = currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  // Clear existing calendar
  calendarDiv.innerHTML = "";

  // Create calendar grid
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Create weekday headers
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  weekdays.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-header";
    dayElement.textContent = day;
    calendarDiv.appendChild(dayElement);
  });

  // Add empty cells for days before first of month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarDiv.appendChild(emptyDay);
  }

  // Add days of month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    // Check if there are events on this day
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = eventsData.filter((event) => event.date === dateString);

    if (dayEvents.length > 0) {
      dayElement.classList.add("has-events");
      dayElement.addEventListener("click", () => showDateEvents(dayEvents));
    }

    calendarDiv.appendChild(dayElement);
  }
}

function navigateMonth(delta) {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1);
  updateCalendar();
}

function showDateEvents(events) {
  const container = document.getElementById("selectedDateEvents");
  container.innerHTML = "";

  events.forEach((event) => {
    const eventElement = document.createElement("div");
    eventElement.className = "list-group-item";
    eventElement.innerHTML = `
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${event.title}</h6>
                <small>${event.time}</small>
            </div>
            <p class="mb-1">${event.location}</p>
            <button class="btn btn-sm btn-primary mt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#eventDetailsModal"
                    data-event-id="${event.id}">
                Ver Detalhes
            </button>
        `;

    eventElement.querySelector("button").addEventListener("click", () => showEventDetails(event));
    container.appendChild(eventElement);
  });

  if (events.length === 0) {
    container.innerHTML = '<p class="text-center">Nenhum evento neste dia.</p>';
  }
}

// Handle Filter Click
function handleFilterClick(event) {
  // Remove active class from all buttons
  document.querySelectorAll("[data-filter]").forEach((btn) => btn.classList.remove("active"));

  // Add active class to clicked button
  event.target.classList.add("active");

  // Display filtered events
  displayEvents(event.target.dataset.filter);
}

// Load More Events
function loadMoreEvents() {
  const pastEvents = document.getElementById("pastEvents");
  const hiddenEvents = Array.from(pastEvents.children).filter((child) => child.style.display === "none");

  // Show next 6 events
  hiddenEvents.slice(0, 6).forEach((event) => (event.style.display = ""));

  // Hide button if no more events to show
  if (hiddenEvents.length <= 6) {
    document.getElementById("loadMoreEvents").style.display = "none";
  }
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

// Format Date Helper
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("pt-BR");
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
