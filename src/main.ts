
// DATA STRUCTUUR EN MODELSPECIFICATIE
// BRON TYPESCRIPT OBJECT INTERFACES: https://www.typescriptlang.org/docs/handbook/2/objects.html

interface Project {
    id: number;
    title: string;
    techStack: string; 
    description: string;
    imageUrl: string;
    views: number; 
}

const alleProjecten: Project[] = [
    {
        id: 1,
        title: "Online Tandarts Platform",
        techStack: "HTML, PDO",
        description: "Een webapplicatie die bedoeld was als een tandarts platform voor Beroepsproject.",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop",
        views: 298900
    },
    {
        id: 2,
        title: "ZZP Portal",
        techStack: "Laravel",
        description: "Een webpagina bedoeld als zzp portaal voor Beroepsproject.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop",
        views: 245000
    },
    {
        id: 3,
        title: "Belastingdienst Toeslagen",
        techStack: "Laravel",
        description: "Een webpagina bedoeld als Belastingdienst toeslagen pagina voor Beroepsproject.",
        imageUrl: "https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?w=500&auto=format&fit=crop",
        views: 192000
    },
    {
        id: 4,
        title: "Schiphol Dashboard",
        techStack: "Laravel, React",
        description: "Een webpagina bedoeld als Schiphol Dashboard voor Beroepsproject",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&auto=format&fit=crop",
        views: 154300
    },
    {
        id: 5,
        title: "FlappyDuck",
        techStack: "Unity",
        description: "Een game geïnspireerd door flappybird voor een examen.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop",
        views: 89200
    }
];

let actieveTechFilter: string = "all";
let actieveZoektekst: string = "";

// DYNAMISCH GRID GENERATOR COMPONENT
// BRON TS DOM ELEMENT MANIPULATIE: https://www.typescriptlang.org/docs/handbook/dom-manipulation.html
function bouwMangaGrid(projecten: Project[], gridId: string): void {
    const gridContainer = document.getElementById(gridId);
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    if (projecten.length === 0) {
        gridContainer.innerHTML = `<p role="alert" style="grid-column: 1/-1; text-align:center; color: var(--tekst-licht); font-weight: bold; padding: 1rem;">Geen projecten gevonden.</p>`;
        return;
    }

    projecten.forEach(project => {
        const kaart = document.createElement("article");
        kaart.classList.add("manga-card");
        
        // BRON NUMBER TO LOCALESTRING: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
        const weergavenGeformatteerd = project.views.toLocaleString('nl-NL');

        kaart.innerHTML = `
            <img src="${project.imageUrl}" alt="Cover afbeelding van project ${project.title}" loading="lazy">
            <div class="card-content">
                <span class="manga-genre">${project.techStack}</span>
                <span class="manga-views" aria-label="${weergavenGeformatteerd} clicks">🔥 ${weergavenGeformatteerd} clicks</span>
                <h3 class="manga-title">${project.title}</h3>
                <p class="manga-desc">${project.description}</p>
                <a href="#" class="read-btn" aria-label="Bekijk nu het project ${project.title}">Bekijk Project</a>
            </div>
        `;
        gridContainer.appendChild(kaart);
    });
}


// EXTRA FUNCTIONALITEIT: MOST VIEWED SORTERING
// BRON ARRAY COPY EN SORT MET ARROW LOGICA: https://www.typescriptlang.org/docs/handbook/variable-declarations.html

function toonMeestBekeken(): void {
    // BRON DEEP COPY EN SORT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // EXTRA CREATIVITEIT: Sorteert de array op basis van de klik-statistieken om de beste projecten bovenaan te pushen.
    const gesorteerdeLijst = [...alleProjecten].sort((a, b) => b.views - a.views);
    const topDrie = gesorteerdeLijst.slice(0, 3);
    
    bouwMangaGrid(topDrie, "populair-grid");
}


// CATALOGUS GEAVANCEERDE FILTER ENGINE
// BRON ARRAYS FILTEREN EN INCLUDES METHODE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

function filterCatalogus(): void {
    const gefilterdeResultaten = alleProjecten.filter(project => {
        // Gecorrigeerd: We gebruiken nu .includes() zodat 'Laravel' ook matched op 'Laravel, React'
        const kloptTech = actieveTechFilter === "all" || project.techStack.includes(actieveTechFilter);
        const kloptZoekbalk = project.title.toLowerCase().includes(actieveZoektekst);
        
        return kloptTech && kloptZoekbalk;
    });

    bouwMangaGrid(gefilterdeResultaten, "catalogus-grid");
}


// INTERACTIE EN LIVE ARIA EVENT LISTENERS
// BRON TS ELEMENT EVENT TARGETING: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

function zetKnoppenAan(): void {
    const zoekInput = document.getElementById("zoekbalk") as HTMLInputElement;
    const genreKnoppen = document.querySelectorAll(".filter-btn");

    if (zoekInput) {
        zoekInput.addEventListener("input", () => {
            actieveZoektekst = zoekInput.value.toLowerCase();
            filterCatalogus();
        });
    }

    genreKnoppen.forEach(knop => {
        knop.addEventListener("click", () => {
            genreKnoppen.forEach(k => {
                k.classList.remove("active");
                k.setAttribute("aria-pressed", "false");
            });
            
            knop.classList.add("active");
            knop.setAttribute("aria-pressed", "true");

            actieveTechFilter = knop.getAttribute("data-tech") || "all";
            filterCatalogus();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    toonMeestBekeken();   
    filterCatalogus();    
    zetKnoppenAan();      
});


// HERTRACEERBARE TYPESCRIPT & DEVELOPMENT BRONNEN (Canvas Eis)

// 1. TypeScript Object Interfaces: https://www.typescriptlang.org/docs/handbook/2/objects.html
// 2. TypeScript DOM Manipulatie: https://www.typescriptlang.org/docs/handbook/dom-manipulation.html
// 3. Array.prototype.sort() Sortering: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// 4. Array.prototype.filter() Selectie: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// 5. WAI-ARIA Authoring Practices Suite (A11y): https://www.w3.org/WAI/ARIA/apg/