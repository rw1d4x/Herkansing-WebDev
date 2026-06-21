// DATA STRUCTUUR EN MODELSPECIFICATIE
// BRON TYPESCRIPT OBJECT INTERFACES: https://www.typescriptlang.org/docs/handbook/2/objects.html
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var alleProjecten = [
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
var actieveTechFilter = "all";
var actieveZoektekst = "";
// DYNAMISCH GRID GENERATOR COMPONENT
// BRON TS DOM ELEMENT MANIPULATIE: https://www.typescriptlang.org/docs/handbook/dom-manipulation.html
function bouwMangaGrid(projecten, gridId) {
    var gridContainer = document.getElementById(gridId);
    if (!gridContainer)
        return;
    gridContainer.innerHTML = "";
    if (projecten.length === 0) {
        gridContainer.innerHTML = "<p role=\"alert\" style=\"grid-column: 1/-1; text-align:center; color: var(--tekst-licht); font-weight: bold; padding: 1rem;\">Geen projecten gevonden.</p>";
        return;
    }
    projecten.forEach(function (project) {
        var kaart = document.createElement("article");
        kaart.classList.add("manga-card");
        // BRON NUMBER TO LOCALESTRING: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
        var weergavenGeformatteerd = project.views.toLocaleString('nl-NL');
        kaart.innerHTML = "\n            <img src=\"".concat(project.imageUrl, "\" alt=\"Cover afbeelding van project ").concat(project.title, "\" loading=\"lazy\">\n            <div class=\"card-content\">\n                <span class=\"manga-genre\">").concat(project.techStack, "</span>\n                <span class=\"manga-views\" aria-label=\"").concat(weergavenGeformatteerd, " clicks\">\uD83D\uDD25 ").concat(weergavenGeformatteerd, " clicks</span>\n                <h3 class=\"manga-title\">").concat(project.title, "</h3>\n                <p class=\"manga-desc\">").concat(project.description, "</p>\n                <a href=\"#\" class=\"read-btn\" aria-label=\"Bekijk nu het project ").concat(project.title, "\">Bekijk Project</a>\n            </div>\n        ");
        gridContainer.appendChild(kaart);
    });
}
// EXTRA FUNCTIONALITEIT: MOST VIEWED SORTERING
// BRON ARRAY COPY EN SORT MET ARROW LOGICA: https://www.typescriptlang.org/docs/handbook/variable-declarations.html
function toonMeestBekeken() {
    // BRON DEEP COPY EN SORT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // EXTRA CREATIVITEIT: Sorteert de array op basis van de klik-statistieken om de beste projecten bovenaan te pushen.
    var gesorteerdeLijst = __spreadArray([], alleProjecten, true).sort(function (a, b) { return b.views - a.views; });
    var topDrie = gesorteerdeLijst.slice(0, 3);
    bouwMangaGrid(topDrie, "populair-grid");
}
// CATALOGUS GEAVANCEERDE FILTER ENGINE
// BRON ARRAYS FILTEREN EN INCLUDES METHODE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
function filterCatalogus() {
    var gefilterdeResultaten = alleProjecten.filter(function (project) {
        // Gecorrigeerd: We gebruiken nu .includes() zodat 'Laravel' ook matched op 'Laravel, React'
        var kloptTech = actieveTechFilter === "all" || project.techStack.includes(actieveTechFilter);
        var kloptZoekbalk = project.title.toLowerCase().includes(actieveZoektekst);
        return kloptTech && kloptZoekbalk;
    });
    bouwMangaGrid(gefilterdeResultaten, "catalogus-grid");
}
// INTERACTIE EN LIVE ARIA EVENT LISTENERS
// BRON TS ELEMENT EVENT TARGETING: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
function zetKnoppenAan() {
    var zoekInput = document.getElementById("zoekbalk");
    var genreKnoppen = document.querySelectorAll(".filter-btn");
    if (zoekInput) {
        zoekInput.addEventListener("input", function () {
            actieveZoektekst = zoekInput.value.toLowerCase();
            filterCatalogus();
        });
    }
    genreKnoppen.forEach(function (knop) {
        knop.addEventListener("click", function () {
            genreKnoppen.forEach(function (k) {
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
document.addEventListener("DOMContentLoaded", function () {
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
