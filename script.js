const form = document.getElementById('titleForm');
const loadingEl = document.getElementById('loading');
const resultEl = document.getElementById('resultField');
const submitBtn = document.querySelector('.submit-btn');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Reset states
  resultEl.className = '';
  submitBtn.disabled = true;
  loadingEl.style.display = 'flex';
  resultEl.style.display = 'none';

  try {
    const res = await fetch(
      'https://n8n-2025n8n.wjemh8.easypanel.host/webhook/4cbfdbd5-cbeb-4323-a2fa-2a6ff06c2e0e',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: form.titulo.value })
      }
    );
    
    const json = await res.json();
    
    // Hide loading
    loadingEl.style.display = 'none';
    submitBtn.disabled = false;

    // Show result with appropriate styling
    resultEl.value = json.message;
    resultEl.className = json.success ? 'success' : 'error';
    resultEl.style.display = 'block';
    
    // Auto focus on result for accessibility
    setTimeout(() => resultEl.focus(), 100);
    
  } catch (err) {
    loadingEl.style.display = 'none';
    submitBtn.disabled = false;
    
    resultEl.value = 'Erro na comunicação. Tente novamente.';
    resultEl.className = 'error';
    resultEl.style.display = 'block';
  }
});

// Enhanced copy functionality with visual feedback
resultEl.addEventListener('click', function() {
  if (!this.value.trim()) return;
  
  navigator.clipboard.writeText(this.value).then(() => {
    // Create and show copy feedback
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = 'Copiado!';
    this.parentElement.style.position = 'relative';
    this.parentElement.appendChild(feedback);
    
    // Remove feedback after animation
    setTimeout(() => {
      feedback.remove();
    }, 1500);
    
    // Brief visual feedback on the field itself
    const originalBg = this.style.background;
    this.style.background = 'rgba(255, 0, 0, 0.1)';
    setTimeout(() => {
      this.style.background = originalBg;
    }, 200);
  });
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.ctrlKey && resultEl.style.display === 'block') {
    resultEl.click();
  }
});

// Auto-resize textarea based on content
resultEl.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.max(56, this.scrollHeight) + 'px';
});
