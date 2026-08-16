/* ==========================================================================
   EIGHTPLUS NEWSROOM DYNAMIC RENDERER & FILTER ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const featuredContainer = document.getElementById("featured-story-container");
    const gridContainer = document.getElementById("articles-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!newsroomData || newsroomData.length === 0) return;

    // 1. Render Featured Article (Pulls the story where isFeatured: true, or the first one)
    const featuredArticle = newsroomData.find(a => a.isFeatured) || newsroomData[0];
    if (featuredContainer && featuredArticle) {
        featuredContainer.innerHTML = `
            <div class="featured-card">
                <div class="featured-image" style="background-image: url('${featuredArticle.image}');"></div>
                <div class="featured-content">
                    <div class="card-meta">
                        <span class="card-category">${featuredArticle.category}</span>
                        <span class="card-source">${featuredArticle.source} &bull; ${featuredArticle.date}</span>
                    </div>
                    <h2 class="featured-title">${featuredArticle.title}</h2>
                    <p class="featured-excerpt">${featuredArticle.excerpt}</p>
                    <a href="${featuredArticle.url}" ${featuredArticle.isExternal ? 'target="_blank" rel="noopener"' : ''} class="read-link">
                        ${featuredArticle.isExternal ? 'Read story &rarr;' : 'Read article &rarr;'}
                    </a>
                </div>
            </div>
        `;
    }

    // 2. Render Article Grid
    function renderArticles(categoryFilter = "ALL") {
        gridContainer.innerHTML = "";

        const filtered = categoryFilter === "ALL" 
            ? newsroomData.filter(a => a.id !== featuredArticle.id) 
            : newsroomData.filter(a => a.category.toUpperCase() === categoryFilter.toUpperCase());

        if (filtered.length === 0) {
            gridContainer.innerHTML = `<div class="no-articles"><p>No articles found under ${categoryFilter}.</p></div>`;
            return;
        }

        filtered.forEach(article => {
            const card = document.createElement("article");
            card.className = "news-card";
            card.innerHTML = `
                <div class="card-image" style="background-image: url('${article.image}');"></div>
                <div class="card-body">
                    <div class="card-meta">
                        <span class="card-category">${article.category}</span>
                        <span class="card-source">${article.source} &bull; ${article.date}</span>
                    </div>
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <a href="${article.url}" ${article.isExternal ? 'target="_blank" rel="noopener"' : ''} class="read-link">
                        ${article.isExternal ? 'Read story &rarr;' : 'Read article &rarr;'}
                    </a>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    // Initial Grid Render
    renderArticles("ALL");

    // 3. Filter Button Interactivity
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.getAttribute("data-category");
            renderArticles(category);
        });
    });
});
