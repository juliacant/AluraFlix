/// Configuração de filmes com mais elementos
const movies = {
    acao: Array.from({ length: 12 }, (_, i) => ({
        title: `Filme de Ação ${i + 1}`,
        description: `Descrição do Filme de Ação ${i + 1}`,
        image: `https://via.placeholder.com/200x300?text=Ação+${i + 1}`,
    })),
    drama: Array.from({ length: 10 }, (_, i) => ({
        title: `Filme de Drama ${i + 1}`,
        description: `Descrição do Filme de Drama ${i + 1}`,
        image: `https://via.placeholder.com/200x300?text=Drama+${i + 1}`,
    })),
    comedia: Array.from({ length: 8 }, (_, i) => ({
        title: `Filme de Comédia ${i + 1}`,
        description: `Descrição do Filme de Comédia ${i + 1}`,
        image: `https://via.placeholder.com/200x300?text=Comédia+${i + 1}`,
    })),
};

// Inicializar carrosséis
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(movies).forEach(category => {
        const track = document.querySelector(`.carousel-track[data-category="${category}"]`);
        movies[category].forEach(movie => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<img src="${movie.image}" alt="${movie.title}"><h3>${movie.title}</h3>`;
            card.addEventListener("click", () => showModal(movie));
            track.appendChild(card);
        });
    });

    // Configurar botões de navegação
    setupCarouselNavigation();
});

// Modal de Detalhes
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close-btn");

function showModal(movie) {
    modalTitle.textContent = movie.title;
    modalDescription.textContent = movie.description;
    modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Função para configurar a navegação do carrossel
function setupCarouselNavigation() {
    const carousels = document.querySelectorAll(".carousel-container");
    carousels.forEach(container => {
        const track = container.querySelector(".carousel-track");
        const prevButton = container.querySelector(".carousel-btn.prev");
        const nextButton = container.querySelector(".carousel-btn.next");
        const cardWidth = 220 + 10; // Largura do card + gap
        let currentScroll = 0;

        // Navegar para trás
        prevButton.addEventListener("click", () => {
            currentScroll -= cardWidth * 3; // Rola 3 cards por clique
            if (currentScroll < 0) currentScroll = 0; // Evita ultrapassar o início
            track.style.transform = `translateX(-${currentScroll}px)`;
        });

        // Navegar para frente
        nextButton.addEventListener("click", () => {
            const maxScroll = track.scrollWidth - container.offsetWidth;
            currentScroll += cardWidth * 3; // Rola 3 cards por clique
            if (currentScroll > maxScroll) currentScroll = maxScroll; // Evita ultrapassar o fim
            track.style.transform = `translateX(-${currentScroll}px)`;
        });
    });
}