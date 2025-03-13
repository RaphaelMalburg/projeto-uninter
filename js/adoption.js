// Sample animals data (in a real application, this would come from a backend)
const animalsData = [
  {
    id: 1,
    name: "Rex",
    type: "cachorro",
    age: "2 anos",
    size: "medio",
    image: "../assets/dog1.jpg",
    description: "Rex é um cachorro dócil e brincalhão que adora crianças.",
  },
  {
    id: 2,
    name: "Luna",
    type: "gato",
    age: "1 ano",
    size: "pequeno",
    image: "../assets/cat1.jpg",
    description: "Luna é uma gatinha carinhosa e muito esperta.",
  },
  // Add more animals here
];

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  initializeFilters();
  displayAnimals(animalsData);
  setupEventListeners();
});

// Initialize filter listeners
function initializeFilters() {
  const filters = ["animalType", "animalAge", "animalSize"];
  filters.forEach((filterId) => {
    document.getElementById(filterId).addEventListener("change", filterAnimals);
  });
}

// Display animals in the grid
function displayAnimals(animals) {
  const grid = document.getElementById("animalsGrid");
  grid.innerHTML = ""; // Clear existing content

  animals.forEach((animal) => {
    const card = createAnimalCard(animal);
    grid.appendChild(card);
  });

  if (animals.length === 0) {
    grid.innerHTML = `
            <div class="col-12 text-center">
                <p class="lead">Nenhum animal encontrado com os filtros selecionados.</p>
            </div>
        `;
  }
}

// Create animal card element
function createAnimalCard(animal) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4 fade-in";

  col.innerHTML = `
        <div class="card h-100">
            <img src="${animal.image}" class="card-img-top" alt="${animal.name}">
            <div class="card-body">
                <h5 class="card-title">${animal.name}</h5>
                <p class="card-text">
                    <i class="fas fa-paw"></i> ${capitalizeFirstLetter(animal.type)}<br>
                    <i class="fas fa-birthday-cake"></i> ${animal.age}<br>
                    <i class="fas fa-ruler"></i> Porte ${animal.size}
                </p>
                <button class="btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#adoptionModal"
                        data-animal-id="${animal.id}">
                    Quero Adotar
                </button>
            </div>
        </div>
    `;

  return col;
}

// Filter animals based on selected criteria
function filterAnimals() {
  const type = document.getElementById("animalType").value;
  const age = document.getElementById("animalAge").value;
  const size = document.getElementById("animalSize").value;

  const filteredAnimals = animalsData.filter((animal) => {
    const typeMatch = !type || animal.type === type;
    const ageMatch = !age || animal.age.includes(age);
    const sizeMatch = !size || animal.size === size;
    return typeMatch && ageMatch && sizeMatch;
  });

  displayAnimals(filteredAnimals);
}

// Setup event listeners
function setupEventListeners() {
  // Handle adoption form submission
  const adoptionForm = document.getElementById("adoptionForm");
  if (adoptionForm) {
    adoptionForm.addEventListener("submit", handleAdoptionSubmit);
  }

  // Handle modal opening
  const adoptionModal = document.getElementById("adoptionModal");
  if (adoptionModal) {
    adoptionModal.addEventListener("show.bs.modal", handleModalShow);
  }
}

// Handle adoption form submission
function handleAdoptionSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Add to local storage
  const adoptionRequests = JSON.parse(localStorage.getItem("adoption_requests") || "[]");
  adoptionRequests.push({
    ...data,
    timestamp: new Date().toISOString(),
    status: "pending",
  });
  localStorage.setItem("adoption_requests", JSON.stringify(adoptionRequests));

  // Show success message
  showAlert("Sua solicitação de adoção foi enviada com sucesso! Entraremos em contato em breve.", "success");

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(document.getElementById("adoptionModal"));
  modal.hide();
  form.reset();
}

// Handle modal show event
function handleModalShow(event) {
  const button = event.relatedTarget;
  const animalId = button.getAttribute("data-animal-id");
  const animal = animalsData.find((a) => a.id === parseInt(animalId));

  if (animal) {
    const modalTitle = event.target.querySelector(".modal-title");
    modalTitle.textContent = `Formulário de Adoção - ${animal.name}`;
  }
}

// Helper function to show alerts
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

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Form validation
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }
  });

  return isValid;
}
