// Favorites page functionality
document.addEventListener('DOMContentLoaded', () => {
  displayFavorites();
});

function displayFavorites() {
  const favorites = getFavorites();
  const favoritesGrid = document.getElementById('favoritesGrid');
  const emptyState = document.getElementById('emptyState');
  
  if (favorites.length === 0) {
    favoritesGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  favoritesGrid.style.display = 'flex';
  emptyState.style.display = 'none';
  favoritesGrid.innerHTML = '';
  
  favorites.forEach(animalId => {
    const animal = animalsData.find(a => a.id === animalId);
    if (animal) {
      const card = createFavoriteCard(animal);
      favoritesGrid.appendChild(card);
    }
  });
}

function createFavoriteCard(animal) {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4 fade-in';
  
  col.innerHTML = `
    <div class="card h-100">
      <div class="position-relative">
        <img src="${animal.image}" class="card-img-top animal-image" alt="${animal.name}" 
             style="cursor: pointer; height: 250px; object-fit: cover;"
             onclick="openGallery(${animal.id})">
        <button class="btn btn-link position-absolute top-0 end-0 m-2 favorite-btn" 
                onclick="removeFavorite(${animal.id})">
          <i class="fas fa-times text-danger" style="font-size: 1.5rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);"></i>
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
          <i class="fas fa-ruler"></i> Porte ${animal.size}<br>
          <i class="fas fa-heart"></i> ${animal.personality}<br>
          <i class="fas fa-medical-bag"></i> ${animal.health}
        </p>
        <p class="card-text"><small class="text-muted">${animal.description}</small></p>
        <div class="d-grid gap-2">
          <button class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#adoptionModal"
                  data-animal-id="${animal.id}">
            <i class="fas fa-heart"></i> Quero Adotar
          </button>
          <a href="adocao.html" class="btn btn-outline-secondary">
            <i class="fas fa-search"></i> Ver Mais Animais
          </a>
        </div>
      </div>
    </div>
  `;
  
  return col;
}

function removeFavorite(animalId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(animalId);
  
  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorite_animals', JSON.stringify(favorites));
    showAlert('Animal removido dos favoritos!', 'info');
    displayFavorites(); // Refresh the display
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorite_animals') || '[]');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showAlert(message, type = 'success') {
  // Remove existing alerts
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
  alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  document.body.appendChild(alertDiv);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (alertDiv && alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 3000);
}