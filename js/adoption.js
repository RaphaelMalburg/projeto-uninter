// Sample animals data (in a real application, this would come from a backend)
const animalsData = [
  {
    id: 1,
    name: "Rex",
    type: "cachorro",
    age: "2 anos",
    size: "medio",
    image: "../assets/dog1.jpg",
    images: ["../assets/dog1.jpg", "../assets/hero1.jpg", "../assets/hero2.jpg"],
    description: "Rex é um cachorro dócil e brincalhão que adora crianças.",
    personality: "Brincalhão, carinhoso, ótimo com crianças",
    health: "Vacinado, castrado, vermifugado"
  },
  {
    id: 2,
    name: "Luna",
    type: "gato",
    age: "1 ano",
    size: "pequeno",
    image: "../assets/cat1.jpg",
    images: ["../assets/cat1.jpg", "../assets/hero3.jpg"],
    description: "Luna é uma gatinha carinhosa e muito esperta.",
    personality: "Independente, carinhosa, curiosa",
    health: "Vacinada, castrada, vermifugada"
  },
  {
    id: 3,
    name: "Buddy",
    type: "cachorro",
    age: "3 anos",
    size: "grande",
    image: "../assets/hero1.jpg",
    images: ["../assets/hero1.jpg", "../assets/dog1.jpg"],
    description: "Buddy é um cão leal e protetor, ideal para famílias.",
    personality: "Leal, protetor, calmo",
    health: "Vacinado, castrado, vermifugado"
  },
  {
    id: 4,
    name: "Mimi",
    type: "gato",
    age: "6 meses",
    size: "pequeno",
    image: "../assets/hero2.jpg",
    images: ["../assets/hero2.jpg", "../assets/cat1.jpg"],
    description: "Mimi é uma gatinha jovem e muito ativa.",
    personality: "Ativa, brincalhona, sociável",
    health: "Vacinada, aguardando castração"
  }
];

// Local Storage Keys
const STORAGE_KEYS = {
  NEWSLETTER_SUBSCRIBERS: "newsletter_subscribers",
  ADOPTION_REQUESTS: "adoption_requests",
  CONTACT_MESSAGES: "contact_messages",
  FAVORITES: "favorite_animals"
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  initializeFavorites();
  initializeFilters();
  displayAnimals(animalsData);
  setupEventListeners();
  setupGalleryModal();
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
  const isFavorite = isAnimalFavorite(animal.id);

  col.innerHTML = `
        <div class="card h-100">
            <div class="position-relative">
                <img src="${animal.image}" class="card-img-top animal-image" alt="${animal.name}" 
                     style="cursor: pointer; height: 250px; object-fit: cover;"
                     onclick="openGallery(${animal.id})">
                <button class="btn btn-link position-absolute top-0 end-0 m-2 favorite-btn" 
                        onclick="toggleFavorite(${animal.id})" 
                        data-animal-id="${animal.id}">
                    <i class="fas fa-heart ${isFavorite ? 'text-danger' : 'text-white'}" style="font-size: 1.5rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);"></i>
                </button>
                <div class="position-absolute bottom-0 start-0 m-2">
                    <small class="badge bg-primary">${animal.images.length} fotos</small>
                </div>
            </div>
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
  const inputs = formElement.querySelectorAll("input[required], select[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });

  return isValid;
}

// Favorites System Functions
function initializeFavorites() {
  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
}

function isAnimalFavorite(animalId) {
  const favorites = getFavorites();
  return favorites.includes(animalId);
}

function toggleFavorite(animalId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(animalId);
  
  if (index > -1) {
    favorites.splice(index, 1);
    showAlert('Animal removido dos favoritos!', 'info');
  } else {
    favorites.push(animalId);
    showAlert('Animal adicionado aos favoritos!', 'success');
  }
  
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  
  // Update heart icon
  const heartIcon = document.querySelector(`[data-animal-id="${animalId}"] i`);
  if (heartIcon) {
    heartIcon.className = `fas fa-heart ${isAnimalFavorite(animalId) ? 'text-danger' : 'text-white'}`;
  }
}

// Gallery Functions
let currentGalleryIndex = 0;
let currentGalleryImages = [];

function setupGalleryModal() {
  // Create gallery modal if it doesn't exist
  if (!document.getElementById('galleryModal')) {
    const modalHTML = `
      <div class="modal fade" id="galleryModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="galleryModalTitle">Galeria de Fotos</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center">
              <div class="position-relative">
                <img id="galleryImage" class="img-fluid" style="max-height: 500px;">
                <button class="btn btn-primary position-absolute top-50 start-0 translate-middle-y" 
                        onclick="previousImage()" id="prevBtn">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button class="btn btn-primary position-absolute top-50 end-0 translate-middle-y" 
                        onclick="nextImage()" id="nextBtn">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
              <div class="mt-3">
                <span id="imageCounter"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
}

function openGallery(animalId) {
  const animal = animalsData.find(a => a.id === animalId);
  if (!animal) return;
  
  currentGalleryImages = animal.images;
  currentGalleryIndex = 0;
  
  document.getElementById('galleryModalTitle').textContent = `Fotos de ${animal.name}`;
  updateGalleryImage();
  
  const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
  modal.show();
}

function updateGalleryImage() {
  const img = document.getElementById('galleryImage');
  const counter = document.getElementById('imageCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  img.src = currentGalleryImages[currentGalleryIndex];
  counter.textContent = `${currentGalleryIndex + 1} de ${currentGalleryImages.length}`;
  
  prevBtn.style.display = currentGalleryIndex === 0 ? 'none' : 'block';
  nextBtn.style.display = currentGalleryIndex === currentGalleryImages.length - 1 ? 'none' : 'block';
}

function previousImage() {
  if (currentGalleryIndex > 0) {
    currentGalleryIndex--;
    updateGalleryImage();
  }
}

function nextImage() {
  if (currentGalleryIndex < currentGalleryImages.length - 1) {
    currentGalleryIndex++;
    updateGalleryImage();
  }
}
