// Dados das perguntas do quiz
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Qual é o seu tipo de moradia?",
    answers: [
      { text: "Apartamento pequeno", points: { gato: 3, cachorro_pequeno: 2, cachorro_medio: 1, cachorro_grande: 0 } },
      { text: "Apartamento grande", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 2, cachorro_grande: 1 } },
      { text: "Casa com quintal pequeno", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 2 } },
      { text: "Casa com quintal grande", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  },
  {
    id: 2,
    question: "Quanto tempo você tem disponível por dia para cuidar do pet?",
    answers: [
      { text: "Menos de 1 hora", points: { gato: 3, cachorro_pequeno: 1, cachorro_medio: 0, cachorro_grande: 0 } },
      { text: "1-2 horas", points: { gato: 3, cachorro_pequeno: 2, cachorro_medio: 1, cachorro_grande: 1 } },
      { text: "2-4 horas", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 2 } },
      { text: "Mais de 4 horas", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  },
  {
    id: 3,
    question: "Qual é o seu nível de experiência com pets?",
    answers: [
      { text: "Nunca tive um pet", points: { gato: 2, cachorro_pequeno: 2, cachorro_medio: 1, cachorro_grande: 0 } },
      { text: "Pouca experiência", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 2, cachorro_grande: 1 } },
      { text: "Experiência moderada", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 2 } },
      { text: "Muita experiência", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  },
  {
    id: 4,
    question: "Quanto você está disposto(a) a gastar mensalmente com o pet?",
    answers: [
      { text: "Até R$ 150", points: { gato: 3, cachorro_pequeno: 2, cachorro_medio: 1, cachorro_grande: 0 } },
      { text: "R$ 150 - R$ 300", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 2, cachorro_grande: 1 } },
      { text: "R$ 300 - R$ 500", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 2 } },
      { text: "Mais de R$ 500", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  },
  {
    id: 5,
    question: "Você tem preferência por atividades?",
    answers: [
      { text: "Prefiro atividades calmas em casa", points: { gato: 3, cachorro_pequeno: 2, cachorro_medio: 1, cachorro_grande: 0 } },
      { text: "Gosto de caminhadas leves", points: { gato: 1, cachorro_pequeno: 3, cachorro_medio: 2, cachorro_grande: 1 } },
      { text: "Adoro exercícios e atividades ao ar livre", points: { gato: 0, cachorro_pequeno: 2, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Sou muito ativo(a) e gosto de aventuras", points: { gato: 0, cachorro_pequeno: 1, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  },
  {
    id: 6,
    question: "Como você lida com pelos e limpeza?",
    answers: [
      { text: "Não me importo com pelos", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Aceito, mas prefiro menos pelos", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 2, cachorro_grande: 2 } },
      { text: "Prefiro animais que soltam poucos pelos", points: { gato: 1, cachorro_pequeno: 2, cachorro_medio: 1, cachorro_grande: 1 } },
      { text: "Tenho alergia ou não gosto de pelos", points: { gato: 0, cachorro_pequeno: 1, cachorro_medio: 0, cachorro_grande: 0 } }
    ]
  },
  {
    id: 7,
    question: "Qual é a sua rotina de trabalho?",
    answers: [
      { text: "Trabalho em casa", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Trabalho meio período", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 2, cachorro_grande: 2 } },
      { text: "Trabalho período integral", points: { gato: 3, cachorro_pequeno: 2, cachorro_medio: 1, cachorro_grande: 1 } },
      { text: "Viajo muito a trabalho", points: { gato: 2, cachorro_pequeno: 1, cachorro_medio: 0, cachorro_grande: 0 } }
    ]
  },
  {
    id: 8,
    question: "Você tem crianças em casa?",
    answers: [
      { text: "Não tenho crianças", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Tenho crianças pequenas (0-5 anos)", points: { gato: 1, cachorro_pequeno: 2, cachorro_medio: 3, cachorro_grande: 2 } },
      { text: "Tenho crianças maiores (6-12 anos)", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Tenho adolescentes", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  },
  {
    id: 9,
    question: "Que tipo de personalidade você procura em um pet?",
    answers: [
      { text: "Independente e calmo", points: { gato: 3, cachorro_pequeno: 1, cachorro_medio: 1, cachorro_grande: 1 } },
      { text: "Carinhoso mas não muito dependente", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 2, cachorro_grande: 2 } },
      { text: "Muito carinhoso e companheiro", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Brincalhão e cheio de energia", points: { gato: 1, cachorro_pequeno: 2, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  },
  {
    id: 10,
    question: "Qual é a sua principal motivação para adotar?",
    answers: [
      { text: "Quero companhia e carinho", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Quero ensinar responsabilidade às crianças", points: { gato: 2, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 2 } },
      { text: "Quero um companheiro para exercícios", points: { gato: 0, cachorro_pequeno: 1, cachorro_medio: 3, cachorro_grande: 3 } },
      { text: "Quero ajudar um animal necessitado", points: { gato: 3, cachorro_pequeno: 3, cachorro_medio: 3, cachorro_grande: 3 } }
    ]
  }
];

// Resultados possíveis do quiz
const QUIZ_RESULTS = {
  gato: {
    title: "Gato é perfeito para você!",
    subtitle: "Independente e carinhoso",
    icon: "fas fa-cat",
    description: [
      "Gatos são ideais para pessoas que valorizam independência e carinho na medida certa.",
      "Eles se adaptam bem a apartamentos e não precisam de passeios diários.",
      "São companheiros leais que respeitam seu espaço pessoal."
    ],
    characteristics: [
      "Independentes e autossuficientes",
      "Ideais para apartamentos",
      "Baixa manutenção",
      "Carinhosos quando querem",
      "Ótimos para pessoas ocupadas"
    ],
    tips: [
      "Providencie arranhadores para manter as unhas saudáveis",
      "Mantenha a caixa de areia sempre limpa",
      "Ofereça brinquedos para estimular o instinto de caça",
      "Considere adotar dois gatos para que façam companhia um ao outro"
    ]
  },
  cachorro_pequeno: {
    title: "Cachorro Pequeno é ideal!",
    subtitle: "Companheiro perfeito para apartamentos",
    icon: "fas fa-dog",
    description: [
      "Cães pequenos são perfeitos para quem quer toda a lealdade canina em um pacote compacto.",
      "Eles se adaptam bem a espaços menores mas ainda precisam de atenção e carinho.",
      "São ótimos companheiros e geralmente se dão bem com crianças."
    ],
    characteristics: [
      "Tamanho ideal para apartamentos",
      "Leais e carinhosos",
      "Fáceis de transportar",
      "Menos exercício que cães grandes",
      "Ótimos cães de companhia"
    ],
    tips: [
      "Mesmo sendo pequenos, precisam de passeios diários",
      "Socialize desde cedo para evitar comportamentos agressivos",
      "Cuidado com a síndrome do cão pequeno - estabeleça limites",
      "Proteja-os de temperaturas extremas"
    ]
  },
  cachorro_medio: {
    title: "Cachorro Médio é perfeito!",
    subtitle: "Equilíbrio ideal entre tamanho e energia",
    icon: "fas fa-dog",
    description: [
      "Cães de porte médio oferecem o melhor dos dois mundos: não são muito grandes nem muito pequenos.",
      "Eles têm energia para atividades mas também sabem relaxar em casa.",
      "São excelentes para famílias ativas que querem um companheiro versátil."
    ],
    characteristics: [
      "Tamanho equilibrado",
      "Energia moderada",
      "Versáteis para diferentes atividades",
      "Ótimos para famílias",
      "Fáceis de treinar"
    ],
    tips: [
      "Precisam de pelo menos 1 hora de exercício por dia",
      "Invista em treinamento básico de obediência",
      "Ofereça brinquedos para gastar energia mental",
      "Mantenha uma rotina consistente de passeios"
    ]
  },
  cachorro_grande: {
    title: "Cachorro Grande é ideal!",
    subtitle: "Companheiro leal para pessoas ativas",
    icon: "fas fa-dog",
    description: [
      "Cães grandes são para pessoas que querem um verdadeiro companheiro de aventuras.",
      "Eles precisam de espaço, exercício e muito amor, mas retribuem com lealdade infinita.",
      "São excelentes para famílias ativas e pessoas que gostam de atividades ao ar livre."
    ],
    characteristics: [
      "Lealdade extrema",
      "Ótimos guardiões",
      "Companheiros para exercícios",
      "Ideais para casas com quintal",
      "Muito carinhosos com a família"
    ],
    tips: [
      "Precisam de muito exercício diário (2+ horas)",
      "Treinamento é essencial desde filhotes",
      "Considere os custos maiores de alimentação e veterinário",
      "Socialize bem para evitar problemas comportamentais"
    ]
  }
};

// Variáveis do quiz
let currentQuestion = 0;
let userAnswers = [];
let quizScores = {
  gato: 0,
  cachorro_pequeno: 0,
  cachorro_medio: 0,
  cachorro_grande: 0
};

// Chaves para localStorage
const STORAGE_KEYS = {
  QUIZ_RESULTS: 'viva_bicho_quiz_results'
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  initializeQuiz();
});

function initializeQuiz() {
  // Inicializar localStorage se necessário
  if (!localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS)) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify([]));
  }
}

function startQuiz() {
  // Resetar variáveis
  currentQuestion = 0;
  userAnswers = [];
  quizScores = {
    gato: 0,
    cachorro_pequeno: 0,
    cachorro_medio: 0,
    cachorro_grande: 0
  };
  
  // Mostrar container do quiz
  document.getElementById('quizHeader').style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('resultsContainer').style.display = 'none';
  
  // Mostrar primeira pergunta
  showQuestion();
}

function showQuestion() {
  const question = QUIZ_QUESTIONS[currentQuestion];
  
  // Atualizar progress bar
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
  document.getElementById('progressText').textContent = `${currentQuestion + 1} de ${QUIZ_QUESTIONS.length}`;
  
  // Atualizar título e texto da pergunta
  document.getElementById('questionTitle').textContent = `Pergunta ${currentQuestion + 1}`;
  document.getElementById('questionText').textContent = question.question;
  
  // Criar opções de resposta
  const answersContainer = document.getElementById('answersContainer');
  answersContainer.innerHTML = '';
  
  question.answers.forEach((answer, index) => {
    const answerDiv = document.createElement('div');
    answerDiv.className = 'form-check mb-3';
    answerDiv.innerHTML = `
      <input class="form-check-input" type="radio" name="question${question.id}" id="answer${index}" value="${index}">
      <label class="form-check-label" for="answer${index}">
        ${answer.text}
      </label>
    `;
    answersContainer.appendChild(answerDiv);
  });
  
  // Adicionar event listeners para as respostas
  const radioButtons = answersContainer.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
      document.getElementById('nextBtn').disabled = false;
    });
  });
  
  // Atualizar botões
  document.getElementById('prevBtn').disabled = currentQuestion === 0;
  document.getElementById('nextBtn').disabled = true;
  
  // Se há resposta salva, marcar
  if (userAnswers[currentQuestion] !== undefined) {
    const savedAnswer = userAnswers[currentQuestion];
    document.getElementById(`answer${savedAnswer}`).checked = true;
    document.getElementById('nextBtn').disabled = false;
  }
  
  // Atualizar texto do botão next
  const nextBtn = document.getElementById('nextBtn');
  if (currentQuestion === QUIZ_QUESTIONS.length - 1) {
    nextBtn.innerHTML = 'Ver Resultado <i class="fas fa-flag-checkered"></i>';
  } else {
    nextBtn.innerHTML = 'Próxima <i class="fas fa-arrow-right"></i>';
  }
}

function nextQuestion() {
  // Salvar resposta atual
  const selectedAnswer = document.querySelector('input[name="question' + QUIZ_QUESTIONS[currentQuestion].id + '"]:checked');
  if (!selectedAnswer) {
    showAlert('Por favor, selecione uma resposta.', 'warning');
    return;
  }
  
  const answerIndex = parseInt(selectedAnswer.value);
  userAnswers[currentQuestion] = answerIndex;
  
  // Adicionar pontos ao score
  const question = QUIZ_QUESTIONS[currentQuestion];
  const answer = question.answers[answerIndex];
  
  Object.keys(answer.points).forEach(petType => {
    quizScores[petType] += answer.points[petType];
  });
  
  // Próxima pergunta ou resultado
  if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function showResults() {
  // Determinar o tipo de pet recomendado
  const recommendedPet = Object.keys(quizScores).reduce((a, b) => 
    quizScores[a] > quizScores[b] ? a : b
  );
  
  const result = QUIZ_RESULTS[recommendedPet];
  
  // Salvar resultado
  saveQuizResult({
    recommendedPet,
    scores: quizScores,
    answers: userAnswers,
    date: new Date().toISOString()
  });
  
  // Mostrar container de resultados
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('resultsContainer').style.display = 'block';
  
  // Preencher resultado
  document.getElementById('resultImage').innerHTML = `<i class="${result.icon} fa-5x text-success mb-3"></i>`;
  document.getElementById('resultTitle').textContent = result.title;
  document.getElementById('resultSubtitle').textContent = result.subtitle;
  
  // Descrição
  const descriptionContainer = document.getElementById('resultDescription');
  descriptionContainer.innerHTML = '';
  result.description.forEach(desc => {
    const p = document.createElement('p');
    p.textContent = desc;
    descriptionContainer.appendChild(p);
  });
  
  // Características
  const characteristicsContainer = document.getElementById('resultCharacteristics');
  characteristicsContainer.innerHTML = '<ul class="list-unstyled"></ul>';
  const ul = characteristicsContainer.querySelector('ul');
  result.characteristics.forEach(char => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-check text-success me-2"></i>${char}`;
    ul.appendChild(li);
  });
  
  // Dicas
  const tipsContainer = document.getElementById('resultTips');
  tipsContainer.innerHTML = '<ul class="list-unstyled"></ul>';
  const tipsUl = tipsContainer.querySelector('ul');
  result.tips.forEach(tip => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-lightbulb text-warning me-2"></i>${tip}`;
    tipsUl.appendChild(li);
  });
  
  // Mostrar animais recomendados
  showRecommendedAnimals(recommendedPet);
  
  // Scroll para o resultado
  document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
}

function showRecommendedAnimals(recommendedPetType) {
  const container = document.getElementById('recommendedAnimals');
  container.innerHTML = '';
  
  // Verificar se animalsData está disponível (do adoption.js)
  if (typeof animalsData === 'undefined') {
    container.innerHTML = '<p class="text-muted">Carregando animais disponíveis...</p>';
    return;
  }
  
  // Filtrar animais baseado no tipo recomendado
  let filteredAnimals = [];
  
  switch (recommendedPetType) {
    case 'gato':
      filteredAnimals = animalsData.filter(animal => animal.type === 'Gato');
      break;
    case 'cachorro_pequeno':
      filteredAnimals = animalsData.filter(animal => 
        animal.type === 'Cachorro' && animal.size === 'Pequeno'
      );
      break;
    case 'cachorro_medio':
      filteredAnimals = animalsData.filter(animal => 
        animal.type === 'Cachorro' && animal.size === 'Médio'
      );
      break;
    case 'cachorro_grande':
      filteredAnimals = animalsData.filter(animal => 
        animal.type === 'Cachorro' && animal.size === 'Grande'
      );
      break;
  }
  
  // Mostrar até 3 animais
  const animalsToShow = filteredAnimals.slice(0, 3);
  
  if (animalsToShow.length === 0) {
    container.innerHTML = '<p class="text-muted">No momento não temos animais deste tipo disponíveis, mas continue acompanhando!</p>';
    return;
  }
  
  animalsToShow.forEach(animal => {
    const animalCard = document.createElement('div');
    animalCard.className = 'col-md-4 mb-3';
    animalCard.innerHTML = `
      <div class="card h-100">
        <img src="${animal.images[0]}" class="card-img-top" alt="${animal.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h6 class="card-title">${animal.name}</h6>
          <p class="card-text small">
            <i class="fas fa-paw"></i> ${animal.type} • ${animal.age} • ${animal.size}<br>
            <i class="fas fa-map-marker-alt"></i> ${animal.location}
          </p>
          <a href="adocao.html" class="btn btn-sm btn-outline-primary">
            <i class="fas fa-heart"></i> Ver Perfil
          </a>
        </div>
      </div>
    `;
    container.appendChild(animalCard);
  });
}

function saveQuizResult(result) {
  try {
    const results = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '[]');
    results.unshift(result); // Adicionar no início
    
    // Manter apenas os últimos 5 resultados
    if (results.length > 5) {
      results.splice(5);
    }
    
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
  } catch (error) {
    console.error('Erro ao salvar resultado do quiz:', error);
  }
}

function shareResult() {
  const resultTitle = document.getElementById('resultTitle').textContent;
  const shareText = `Acabei de descobrir qual pet é ideal para mim na ONG Viva Bicho!\n\nResultado: ${resultTitle}\n\nFaça você também: ${window.location.href}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Quiz: Qual Pet é Ideal para Você? - ONG Viva Bicho',
      text: shareText,
      url: window.location.href
    }).catch(console.error);
  } else {
    // Fallback para navegadores que não suportam Web Share API
    navigator.clipboard.writeText(shareText).then(() => {
      showAlert('Resultado copiado para a área de transferência!', 'success');
    }).catch(() => {
      // Fallback final
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showAlert('Resultado copiado para a área de transferência!', 'success');
    });
  }
}

function restartQuiz() {
  document.getElementById('resultsContainer').style.display = 'none';
  document.getElementById('quizHeader').style.display = 'block';
}

function showAlert(message, type = 'info') {
  // Remover alertas existentes
  const existingAlerts = document.querySelectorAll('.alert-custom');
  existingAlerts.forEach(alert => alert.remove());
  
  // Criar novo alerta
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-custom`;
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '20px';
  alertDiv.style.right = '20px';
  alertDiv.style.zIndex = '9999';
  alertDiv.style.minWidth = '300px';
  
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(alertDiv);
  
  // Remover automaticamente após 5 segundos
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Função para obter histórico de resultados (pode ser usada em outras páginas)
function getQuizHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '[]');
  } catch (error) {
    console.error('Erro ao obter histórico do quiz:', error);
    return [];
  }
}