// Simple card loader - Easy to maintain and extend
// To add a new card, just edit content.json
// Note: Shader cards (heart, spline) are handled by main-D2eIgtu_.js

async function loadCards() {
    try {
        const response = await fetch('/content.json');
        const data = await response.json();
        const grid = document.querySelector('.shader-grid');
        
        if (!grid) return;
        
        // Only load image cards, skip shader cards (handled by main.js)
        const imageCards = data.cards.filter(card => card.type === 'image');
        
        imageCards.forEach(card => {
            const cardElement = createCard(card);
            grid.insertBefore(cardElement, grid.firstChild);
        });
        
    } catch (error) {
        console.error('Error loading cards:', error);
    }
}

function createCard(card) {
    const a = document.createElement('a');
    a.className = 'shader-card';
    a.href = card.link;
    
    a.innerHTML = `
        <div class="shader-container" style="background: url('${card.image}') center/cover no-repeat;"></div>
        <div class="shader-info">
            <h3>${card.title}</h3>
            <p>${card.description}</p>
        </div>
    `;
    
    a.addEventListener('mouseenter', () => prefetchLink(a));
    
    return a;
}

function prefetchLink(link) {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http')) {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = href;
        document.head.appendChild(prefetch);
    }
}

if (document.querySelector('.shader-grid')) {
    loadCards();
}
