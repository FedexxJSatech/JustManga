// Manga Database
const mangaDatabase = [
    {
        id: 1,
        title: "One Piece",
        author: "Eiichiro Oda",
        description: "Follow Monkey D. Luffy on his adventure to become the King of the Pirates and find the legendary treasure One Piece!",
        rating: "9.2/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"],
        emoji: "🏴‍☠️"
    },
    {
        id: 2,
        title: "Naruto",
        author: "Masashi Kishimoto",
        description: "A young ninja dreams of becoming the Hokage and protecting his village from dark forces.",
        rating: "8.9/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
        emoji: "🥷"
    },
    {
        id: 3,
        title: "Attack on Titan",
        author: "Hajime Isayama",
        description: "Humanity fights for survival against giant humanoid creatures called Titans in this thrilling action series.",
        rating: "9.0/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"],
        emoji: "👹"
    },
    {
        id: 4,
        title: "Death Note",
        author: "Tsugumi Ohba",
        description: "A genius high school student discovers a supernatural notebook that can kill anyone whose name is written in it.",
        rating: "8.7/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3"],
        emoji: "📓"
    },
    {
        id: 5,
        title: "My Hero Academia",
        author: "Kohei Horikoshi",
        description: "In a world where superheroes are common, a quirkless boy dreams of becoming a hero despite his disadvantage.",
        rating: "8.8/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"],
        emoji: "🦸"
    },
    {
        id: 6,
        title: "Demon Slayer",
        author: "Koyoharu Gotouge",
        description: "A boy joins the Demon Slayer Corps after his sister is turned into a demon to find a way to save her.",
        rating: "8.9/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
        emoji: "🔥"
    },
    {
        id: 7,
        title: "Jujutsu Kaisen",
        author: "Gege Akutami",
        description: "A high school boy swallows a cursed finger and becomes the vessel for a powerful jujutsu sorcerer.",
        rating: "8.8/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"],
        emoji: "👁️"
    },
    {
        id: 8,
        title: "Fairy Tail",
        author: "Hiro Mashima",
        description: "Follow the adventures of Natsu and his guild members as they complete dangerous magical quests and face powerful enemies.",
        rating: "8.5/10",
        chapters: ["Chapter 1", "Chapter 2", "Chapter 3"],
        emoji: "✨"
    }
];

let currentManga = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayPopularManga();
    addSearchListener();
});

// Display Popular Manga
function displayPopularManga() {
    const container = document.getElementById('popularContainer');
    container.innerHTML = '';

    mangaDatabase.forEach(manga => {
        const mangaCard = createMangaCard(manga);
        container.appendChild(mangaCard);
    });
}

// Create Manga Card Element
function createMangaCard(manga) {
    const card = document.createElement('div');
    card.className = 'manga-card';
    card.innerHTML = `
        <div class="manga-image">
            ${manga.emoji}
        </div>
        <div class="manga-info">
            <div class="manga-title">${manga.title}</div>
            <div class="manga-author">by ${manga.author}</div>
            <div class="manga-rating">⭐ ${manga.rating}</div>
            <div class="manga-description">${manga.description}</div>
            <div class="manga-footer">
                <div class="manga-chapters">${manga.chapters.length} chapters</div>
                <button class="read-btn" onclick="openReader(${manga.id})">Read Now</button>
            </div>
        </div>
    `;
    return card;
}

// Search Manga
function searchManga() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchInput.trim()) {
        alert('Please enter a manga title or author name');
        return;
    }

    const results = mangaDatabase.filter(manga => 
        manga.title.toLowerCase().includes(searchInput) ||
        manga.author.toLowerCase().includes(searchInput) ||
        manga.description.toLowerCase().includes(searchInput)
    );

    displaySearchResults(results, searchInput);
}

// Display Search Results
function displaySearchResults(results, query) {
    const popularSection = document.getElementById('popular');
    const resultsSection = document.getElementById('results');
    const searchResultsContainer = document.getElementById('searchResults');

    popularSection.style.display = 'none';
    resultsSection.style.display = 'block';

    if (results.length === 0) {
        searchResultsContainer.innerHTML = `
            <div style="text-align: center; grid-column: 1/-1; padding: 3rem;">
                <h3 style="color: #8a8a9e; font-size: 1.3rem;">No manga found for "${query}"</h3>
                <p style="color: #6a6a7e; margin-top: 1rem;">Try searching with different keywords</p>
            </div>
        `;
        return;
    }

    searchResultsContainer.innerHTML = '';
    results.forEach(manga => {
        const mangaCard = createMangaCard(manga);
        searchResultsContainer.appendChild(mangaCard);
    });
}

// Go Back to Home
function goBack() {
    document.getElementById('popular').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('searchInput').value = '';
}

// Open Reader
function openReader(mangaId) {
    currentManga = mangaDatabase.find(m => m.id === mangaId);
    if (!currentManga) return;

    document.getElementById('mangaTitle').textContent = currentManga.title;
    
    const chapterSelect = document.getElementById('chapterSelect');
    chapterSelect.innerHTML = '';
    
    currentManga.chapters.forEach((chapter, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = chapter;
        chapterSelect.appendChild(option);
    });

    loadChapter();
    document.getElementById('readerModal').style.display = 'flex';
}

// Load Chapter Content
function loadChapter() {
    const chapterSelect = document.getElementById('chapterSelect');
    const chapterIndex = parseInt(chapterSelect.value);
    const readerContent = document.getElementById('readerContent');

    const chapterTitle = currentManga.chapters[chapterIndex];

    readerContent.innerHTML = `
        <h3 style="margin-bottom: 1.5rem; color: var(--accent-color);">${chapterTitle}</h3>
        <div style="line-height: 2; text-align: justify;">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae nibh. 
                Cras porttitor metus justo. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. 
                Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
            </p>
            <p style="margin-top: 1rem;">
                Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. 
                Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. 
                Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla.
            </p>
            <p style="margin-top: 1rem;">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
                In ac dui quis dui vulputate elementum. Sed a turpis. Nulla eget sem vitae eros pharetra faucibus. 
                Nulla facilisi. Donec lacinia eros et nisi vestibulum iaculis. Sed ac nulla. Pellentesque felis eros, 
                vehicula at, venenatis ac, volutpat et, malesuada vel, mauris.
            </p>
            <p style="margin-top: 1rem;">
                Vivamus quis mi. Phasellus a est. Phasellus magna. Nullam eu ante vel est convallis dignissim. 
                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam felis. 
                Sed ac ex. Mauris molestie, felis ut volutpat ultrices, mauris ipsum aliquam orci, interdum mollis 
                mauris nibh eu sem. Maecenas semper orci sit amet metus imperdiet interdum.
            </p>
            <p style="margin-top: 2rem; text-align: center; color: #8a8a9e; font-style: italic;">
                ✧ End of ${chapterTitle} ✧
            </p>
        </div>
    `;
}

// Close Reader
function closeReader() {
    document.getElementById('readerModal').style.display = 'none';
    currentManga = null;
}

// Add Enter Key Search Listener
function addSearchListener() {
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchManga();
        }
    });
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('readerModal');
    if (event.target === modal) {
        closeReader();
    }
}
