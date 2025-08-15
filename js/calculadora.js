// Dados de custos base para diferentes tipos de pets
const PET_COSTS = {
  'cachorro-pequeno': {
    food: { basica: 80, premium: 120, 'super-premium': 180 },
    vetCost: 150,
    initialCosts: 300
  },
  'cachorro-medio': {
    food: { basica: 120, premium: 180, 'super-premium': 280 },
    vetCost: 180,
    initialCosts: 400
  },
  'cachorro-grande': {
    food: { basica: 180, premium: 280, 'super-premium': 400 },
    vetCost: 220,
    initialCosts: 500
  },
  'gato': {
    food: { basica: 60, premium: 100, 'super-premium': 150 },
    vetCost: 120,
    initialCosts: 250
  }
};

// Multiplicadores por idade
const AGE_MULTIPLIERS = {
  filhote: { vet: 1.5, food: 1.2 },
  adulto: { vet: 1.0, food: 1.0 },
  idoso: { vet: 1.8, food: 0.9 }
};

// Dicas de economia por categoria
const SAVING_TIPS = {
  food: [
    'Compre ração em grandes quantidades para obter desconto',
    'Procure por promoções em pet shops',
    'Considere ração de marca própria de qualidade'
  ],
  vet: [
    'Mantenha a vacinação em dia para prevenir doenças',
    'Procure clínicas veterinárias populares',
    'Considere um plano de saúde pet para emergências'
  ],
  grooming: [
    'Aprenda a fazer a higiene básica em casa',
    'Procure cursos de banho e tosa',
    'Negocie pacotes mensais com pet shops'
  ],
  general: [
    'Castração previne problemas de saúde futuros',
    'Exercícios regulares mantêm o pet saudável',
    'Brinquedos caseiros podem ser muito eficazes'
  ]
};

// Chaves para localStorage
const STORAGE_KEYS = {
  CALCULATIONS: 'viva_bicho_calculations'
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  initializeCalculator();
});

function initializeCalculator() {
  // Inicializar localStorage se necessário
  if (!localStorage.getItem(STORAGE_KEYS.CALCULATIONS)) {
    localStorage.setItem(STORAGE_KEYS.CALCULATIONS, JSON.stringify([]));
  }
  
  // Adicionar event listeners para atualização automática
  const inputs = document.querySelectorAll('#costCalculatorForm input, #costCalculatorForm select');
  inputs.forEach(input => {
    input.addEventListener('change', autoCalculate);
  });
}

function autoCalculate() {
  const petType = document.getElementById('petType').value;
  const petAge = document.getElementById('petAge').value;
  
  if (petType && petAge) {
    calculateCosts();
  }
}

function calculateCosts() {
  // Obter valores do formulário
  const petType = document.getElementById('petType').value;
  const petAge = document.getElementById('petAge').value;
  const foodQuality = document.getElementById('foodQuality').value;
  const treats = parseFloat(document.getElementById('treats').value) || 0;
  const vetVisits = parseInt(document.getElementById('vetVisits').value) || 2;
  const insurance = parseFloat(document.getElementById('insurance').value) || 0;
  const grooming = parseFloat(document.getElementById('grooming').value) || 0;
  const hygiene = parseFloat(document.getElementById('hygiene').value) || 0;
  const toys = parseFloat(document.getElementById('toys').value) || 0;
  const accessories = parseFloat(document.getElementById('accessories').value) || 0;
  
  if (!petType || !petAge) {
    showAlert('Por favor, selecione o tipo e idade do pet.', 'warning');
    return;
  }
  
  // Obter dados base do pet
  const baseCosts = PET_COSTS[petType];
  const ageMultiplier = AGE_MULTIPLIERS[petAge];
  
  // Calcular custos mensais
  const foodCost = baseCosts.food[foodQuality] * ageMultiplier.food;
  const vetMonthlyCost = (baseCosts.vetCost * ageMultiplier.vet * vetVisits) / 12;
  
  const monthlyCosts = {
    food: foodCost,
    treats: treats,
    vet: vetMonthlyCost,
    insurance: insurance,
    grooming: grooming,
    hygiene: hygiene,
    toys: toys,
    accessories: accessories
  };
  
  const totalMonthly = Object.values(monthlyCosts).reduce((sum, cost) => sum + cost, 0);
  const totalYearly = totalMonthly * 12;
  
  // Salvar cálculo no localStorage
  saveCalculation({
    petType,
    petAge,
    foodQuality,
    monthlyCosts,
    totalMonthly,
    totalYearly,
    date: new Date().toISOString()
  });
  
  // Exibir resultados
  displayResults(monthlyCosts, totalMonthly, totalYearly, petType, petAge);
}

function displayResults(costs, totalMonthly, totalYearly, petType, petAge) {
  // Atualizar valores totais
  document.getElementById('totalMonthly').textContent = `R$ ${totalMonthly.toFixed(2).replace('.', ',')}`;
  document.getElementById('totalYearly').textContent = `R$ ${totalYearly.toFixed(2).replace('.', ',')}`;
  
  // Criar breakdown dos custos
  const breakdownContainer = document.getElementById('costBreakdown');
  breakdownContainer.innerHTML = '';
  
  const costLabels = {
    food: 'Alimentação',
    treats: 'Petiscos',
    vet: 'Veterinário',
    insurance: 'Plano de Saúde',
    grooming: 'Banho e Tosa',
    hygiene: 'Higiene',
    toys: 'Brinquedos',
    accessories: 'Acessórios'
  };
  
  Object.entries(costs).forEach(([key, value]) => {
    if (value > 0) {
      const percentage = (value / totalMonthly * 100).toFixed(1);
      const item = document.createElement('div');
      item.className = 'd-flex justify-content-between mb-1';
      item.innerHTML = `
        <span>${costLabels[key]}:</span>
        <span>R$ ${value.toFixed(2).replace('.', ',')} (${percentage}%)</span>
      `;
      breakdownContainer.appendChild(item);
    }
  });
  
  // Gerar dicas de economia
  generateSavingTips(costs, petType, petAge);
  
  // Mostrar card de resultados
  document.getElementById('resultsCard').style.display = 'block';
  
  // Scroll para os resultados
  document.getElementById('resultsCard').scrollIntoView({ behavior: 'smooth' });
}

function generateSavingTips(costs, petType, petAge) {
  const tipsContainer = document.getElementById('savingTips');
  tipsContainer.innerHTML = '';
  
  const tips = [];
  
  // Dicas baseadas nos maiores custos
  const sortedCosts = Object.entries(costs).sort((a, b) => b[1] - a[1]);
  const topCost = sortedCosts[0];
  
  if (topCost[0] === 'food' && SAVING_TIPS.food) {
    tips.push(SAVING_TIPS.food[Math.floor(Math.random() * SAVING_TIPS.food.length)]);
  }
  
  if (costs.vet > 50 && SAVING_TIPS.vet) {
    tips.push(SAVING_TIPS.vet[Math.floor(Math.random() * SAVING_TIPS.vet.length)]);
  }
  
  if (costs.grooming > 50 && SAVING_TIPS.grooming) {
    tips.push(SAVING_TIPS.grooming[Math.floor(Math.random() * SAVING_TIPS.grooming.length)]);
  }
  
  // Sempre incluir uma dica geral
  tips.push(SAVING_TIPS.general[Math.floor(Math.random() * SAVING_TIPS.general.length)]);
  
  // Dicas específicas por idade
  if (petAge === 'filhote') {
    tips.push('Filhotes precisam de mais consultas, mas isso previne problemas futuros');
  } else if (petAge === 'idoso') {
    tips.push('Pets idosos precisam de cuidados especiais, mas o amor que oferecem é inestimável');
  }
  
  // Remover duplicatas e limitar a 4 dicas
  const uniqueTips = [...new Set(tips)].slice(0, 4);
  
  uniqueTips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    tipsContainer.appendChild(li);
  });
}

function saveCalculation(calculation) {
  try {
    const calculations = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATIONS) || '[]');
    calculations.unshift(calculation); // Adicionar no início
    
    // Manter apenas os últimos 10 cálculos
    if (calculations.length > 10) {
      calculations.splice(10);
    }
    
    localStorage.setItem(STORAGE_KEYS.CALCULATIONS, JSON.stringify(calculations));
  } catch (error) {
    console.error('Erro ao salvar cálculo:', error);
  }
}

function shareResults() {
  const totalMonthly = document.getElementById('totalMonthly').textContent;
  const totalYearly = document.getElementById('totalYearly').textContent;
  
  const shareText = `Calculei os custos de adoção na ONG Viva Bicho:\n\nCusto mensal: ${totalMonthly}\nCusto anual: ${totalYearly}\n\nAdote com responsabilidade! 🐾\n\n${window.location.href}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Calculadora de Custos - ONG Viva Bicho',
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

// Função para obter histórico de cálculos (pode ser usada em outras páginas)
function getCalculationHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CALCULATIONS) || '[]');
  } catch (error) {
    console.error('Erro ao obter histórico:', error);
    return [];
  }
}