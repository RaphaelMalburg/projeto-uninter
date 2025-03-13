// Local Storage Keys
const STORAGE_KEYS = {
  NEWSLETTER_SUBSCRIBERS: "newsletter_subscribers",
  POST_VIEWS: "post_views",
  POST_LIKES: "post_likes",
};

// Sample Blog Posts Data (in a real application, this would come from a backend)
const blogPosts = [
  {
    id: 1,
    title: "Nova Campanha de Castração em Andamento",
    category: "noticias",
    excerpt: "Iniciamos uma nova campanha de castração em parceria com clínicas veterinárias locais...",
    content: `
      <p>A ONG Viva Bicho tem o prazer de anunciar nossa mais nova campanha de castração, em parceria com diversas clínicas veterinárias da região. Esta iniciativa visa promover o controle populacional de animais de rua e conscientizar sobre a importância da castração.</p>
      <h3>Detalhes da Campanha</h3>
      <ul>
        <li>Período: 01/05/2024 a 30/05/2024</li>
        <li>Valor acessível</li>
        <li>Inclui pré e pós-operatório</li>
        <li>Atendimento prioritário para famílias de baixa renda</li>
      </ul>
      <p>Para participar, entre em contato através de nossos canais de atendimento.</p>
    `,
    image: "../assets/blog/castracao.jpg",
    author: "Equipe Viva Bicho",
    date: "2024-04-01",
    tags: ["castração", "saúde animal", "campanha"],
    featured: true,
  },
  {
    id: 2,
    title: "História de Sucesso: Luna Encontrou um Lar",
    category: "historias",
    excerpt: "Depois de 2 anos no abrigo, Luna finalmente encontrou sua família para sempre...",
    content: `
      <p>Luna chegou até nós em 2022, após ser resgatada das ruas em condições precárias. Após muitos cuidados, tratamento e amor, ela se transformou em uma cachorra dócil e amorosa.</p>
      <p>Hoje, temos a alegria de compartilhar que Luna encontrou seu lar definitivo com a família Silva, que se apaixonou por ela em uma de nossas feiras de adoção.</p>
      <h3>A Transformação</h3>
      <p>De um animal assustado e desconfiado, Luna se transformou em uma companheira alegre e brincalhona. Sua nova família relata que ela se adaptou perfeitamente e já conquistou seu espaço no sofá!</p>
    `,
    image: "../assets/blog/luna.jpg",
    author: "Maria Santos",
    date: "2024-03-28",
    tags: ["adoção", "história de sucesso", "cães"],
    featured: false,
  },
  {
    id: 3,
    title: "5 Dicas para Cuidar de Filhotes",
    category: "dicas",
    excerpt: "Aprenda como cuidar adequadamente de filhotes de cães e gatos...",
    content: `
      <p>Cuidar de filhotes requer atenção especial e dedicação. Confira nossas principais dicas:</p>
      <h3>1. Alimentação Adequada</h3>
      <p>Filhotes precisam de alimentação específica para sua idade e tamanho...</p>
      <h3>2. Vacinação em Dia</h3>
      <p>Mantenha o calendário de vacinação atualizado...</p>
      <h3>3. Ambiente Seguro</h3>
      <p>Prepare sua casa para receber o filhote...</p>
      <h3>4. Socialização</h3>
      <p>Exponha o filhote a diferentes experiências...</p>
      <h3>5. Cuidados Veterinários</h3>
      <p>Consultas regulares são essenciais...</p>
    `,
    image: "../assets/blog/filhotes.jpg",
    author: "Dr. Carlos Veterinário",
    date: "2024-03-25",
    tags: ["dicas", "filhotes", "cuidados"],
    featured: false,
  },
];

// Initialize when document is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  initializeEventListeners();
  displayFeaturedPost();
  displayPosts();
  updateSidebar();
});

// Initialize Local Storage
function initializeStorage() {
  for (const key of Object.values(STORAGE_KEYS)) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify({}));
    }
  }
}

// Initialize Event Listeners
function initializeEventListeners() {
  // Search
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");

  searchButton.addEventListener("click", () => handleSearch());
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Category Filter
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.addEventListener("change", () => {
    displayPosts(categoryFilter.value);
  });

  // Load More Posts
  const loadMoreBtn = document.getElementById("loadMorePosts");
  loadMoreBtn.addEventListener("click", loadMorePosts);

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  newsletterForm.addEventListener("submit", handleNewsletterSubmit);

  // Share Button
  const shareButton = document.querySelector(".share-post-btn");
  shareButton.addEventListener("click", handleShare);
}

// Display Featured Post
function displayFeaturedPost() {
  const featuredPost = blogPosts.find((post) => post.featured);
  if (!featuredPost) return;

  const featuredSection = document.getElementById("featuredPost");
  featuredSection.innerHTML = `
    <div class="card">
      <div class="row g-0">
        <div class="col-md-6">
          <img src="${featuredPost.image}" class="img-fluid rounded-start" alt="${featuredPost.title}" style="height: 100%; object-fit: cover;">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <span class="badge bg-primary mb-2">${featuredPost.category}</span>
            <h2 class="card-title">${featuredPost.title}</h2>
            <p class="card-text">${featuredPost.excerpt}</p>
            <p class="card-text">
              <small class="text-muted">
                <i class="fas fa-user"></i> ${featuredPost.author} |
                <i class="far fa-calendar"></i> ${formatDate(featuredPost.date)}
              </small>
            </p>
            <button class="btn btn-primary" onclick="showPost(${featuredPost.id})">
              Ler Mais
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Display Posts
function displayPosts(category = "") {
  const postsContainer = document.getElementById("blogPosts");
  postsContainer.innerHTML = "";

  const filteredPosts = blogPosts.filter((post) => !post.featured).filter((post) => !category || post.category === category);

  filteredPosts.forEach((post) => {
    const postElement = createPostCard(post);
    postsContainer.appendChild(postElement);
  });

  // Show/hide load more button
  const loadMoreBtn = document.getElementById("loadMorePosts");
  loadMoreBtn.style.display = filteredPosts.length > 6 ? "block" : "none";
}

// Create Post Card
function createPostCard(post) {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";

  const card = document.createElement("div");
  card.className = "card h-100 hover-grow";
  card.innerHTML = `
    <img src="${post.image}" class="card-img-top" alt="${post.title}" style="height: 200px; object-fit: cover;">
    <div class="card-body">
      <span class="badge bg-primary mb-2">${post.category}</span>
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${post.excerpt}</p>
    </div>
    <div class="card-footer bg-transparent">
      <small class="text-muted">
        <i class="fas fa-user"></i> ${post.author} |
        <i class="far fa-calendar"></i> ${formatDate(post.date)}
      </small>
      <button class="btn btn-primary btn-sm float-end" onclick="showPost(${post.id})">
        Ler Mais
      </button>
    </div>
  `;

  return col;
}

// Show Post
function showPost(postId) {
  const post = blogPosts.find((p) => p.id === postId);
  if (!post) return;

  // Update view count
  updatePostViews(postId);

  const modal = document.getElementById("postModal");
  const modalTitle = modal.querySelector(".modal-title");
  const modalBody = modal.querySelector(".modal-body");

  modalTitle.textContent = post.title;
  modalBody.innerHTML = `
    <img src="${post.image}" class="img-fluid mb-3 rounded" alt="${post.title}">
    <div class="post-meta mb-3">
      <span class="badge bg-primary">${post.category}</span>
      <small class="text-muted ms-2">
        <i class="fas fa-user"></i> ${post.author} |
        <i class="far fa-calendar"></i> ${formatDate(post.date)} |
        <i class="far fa-eye"></i> ${getPostViews(postId)} visualizações
      </small>
    </div>
    <div class="post-content">
      ${post.content}
    </div>
    <div class="post-tags mt-3">
      ${post.tags.map((tag) => `<span class="badge bg-secondary me-1">#${tag}</span>`).join("")}
    </div>
  `;

  new bootstrap.Modal(modal).show();
}

// Handle Search
function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const postsContainer = document.getElementById("blogPosts");
  postsContainer.innerHTML = "";

  const filteredPosts = blogPosts.filter(
    (post) => post.title.toLowerCase().includes(searchTerm) || post.content.toLowerCase().includes(searchTerm) || post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );

  filteredPosts.forEach((post) => {
    const postElement = createPostCard(post);
    postsContainer.appendChild(postElement);
  });

  // Show/hide load more button
  const loadMoreBtn = document.getElementById("loadMorePosts");
  loadMoreBtn.style.display = "none";
}

// Update Sidebar
function updateSidebar() {
  // Update Categories List
  const categoriesList = document.getElementById("categoriesList");
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  categoriesList.innerHTML = categories
    .map(
      (category) => `
    <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
       onclick="displayPosts('${category}'); return false;">
      ${category}
      <span class="badge bg-primary rounded-pill">
        ${blogPosts.filter((post) => post.category === category).length}
      </span>
    </a>
  `
    )
    .join("");

  // Update Popular Posts
  const popularPosts = document.getElementById("popularPosts");
  const sortedPosts = [...blogPosts].sort((a, b) => getPostViews(b.id) - getPostViews(a.id));

  popularPosts.innerHTML = sortedPosts
    .slice(0, 5)
    .map(
      (post) => `
    <a href="#" class="list-group-item list-group-item-action" onclick="showPost(${post.id}); return false;">
      <div class="d-flex w-100 justify-content-between">
        <h6 class="mb-1">${post.title}</h6>
        <small><i class="far fa-eye"></i> ${getPostViews(post.id)}</small>
      </div>
      <small class="text-muted">${formatDate(post.date)}</small>
    </a>
  `
    )
    .join("");

  // Update Tags Cloud
  const tagsCloud = document.getElementById("tagsCloud");
  const allTags = blogPosts.reduce((tags, post) => [...tags, ...post.tags], []);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  tagsCloud.innerHTML = Object.entries(tagCounts)
    .map(
      ([tag, count]) => `
    <a href="#" class="badge bg-secondary me-1 mb-1"
       style="font-size: ${Math.max(1, Math.min(2, 1 + count / 5))}em"
       onclick="handleTagClick('${tag}'); return false;">
      #${tag}
    </a>
  `
    )
    .join("");
}

// Handle Tag Click
function handleTagClick(tag) {
  const searchInput = document.getElementById("searchInput");
  searchInput.value = tag;
  handleSearch();
}

// Load More Posts
function loadMorePosts() {
  const postsContainer = document.getElementById("blogPosts");
  const visiblePosts = postsContainer.children.length;
  const category = document.getElementById("categoryFilter").value;

  const filteredPosts = blogPosts
    .filter((post) => !post.featured)
    .filter((post) => !category || post.category === category)
    .slice(visiblePosts, visiblePosts + 6);

  filteredPosts.forEach((post) => {
    const postElement = createPostCard(post);
    postsContainer.appendChild(postElement);
  });

  // Hide load more button if no more posts
  const loadMoreBtn = document.getElementById("loadMorePosts");
  if (visiblePosts + 6 >= blogPosts.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Handle Newsletter Submit
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;

  if (!email) return;

  const subscribers = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWSLETTER_SUBSCRIBERS));
  if (!subscribers[email]) {
    subscribers[email] = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.NEWSLETTER_SUBSCRIBERS, JSON.stringify(subscribers));
    showAlert("Obrigado por se inscrever em nossa newsletter!", "success");
  } else {
    showAlert("Este e-mail já está inscrito em nossa newsletter.", "info");
  }

  form.reset();
}

// Handle Share
function handleShare() {
  const modal = document.getElementById("postModal");
  const postTitle = modal.querySelector(".modal-title").textContent;
  const shareUrl = window.location.href;

  if (navigator.share) {
    navigator
      .share({
        title: postTitle,
        text: "Confira este post interessante da ONG Viva Bicho!",
        url: shareUrl,
      })
      .catch(console.error);
  } else {
    // Fallback to copying to clipboard
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => showAlert("Link copiado para a área de transferência!", "success"))
      .catch(() => showAlert("Não foi possível copiar o link.", "error"));
  }
}

// Post Views Helpers
function updatePostViews(postId) {
  const views = JSON.parse(localStorage.getItem(STORAGE_KEYS.POST_VIEWS));
  views[postId] = (views[postId] || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.POST_VIEWS, JSON.stringify(views));
  updateSidebar();
}

function getPostViews(postId) {
  const views = JSON.parse(localStorage.getItem(STORAGE_KEYS.POST_VIEWS));
  return views[postId] || 0;
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
