const loadingScreen = document.getElementById("app-loading-overlay");
const mainContent = document.getElementById("main-content");
const navLinks = document.querySelectorAll(".nav-link");
const areaData = document.getElementById("area-data");
const categoriesGrid = document.getElementById("categories-grid");
const recipesCount = document.getElementById("recipes-count");
const recipesGrid = document.getElementById("recipes-grid");
const mealDetailsSection = document.getElementById("meal-details");
const mealsRecipesSection = document.getElementById("meals-recipes");
const sections = document.querySelectorAll("section");
const loader = document.querySelector(".loader");
const searchInput = document.getElementById("search-input");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");
const searchProductBtn = document.getElementById("search-product-btn");
const productSearchInput = document.getElementById("product-search-input");
const productsCount = document.getElementById("products-count");
const productsGrid = document.getElementById("products-grid");
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const barcodeInput = document.getElementById("barcode-input");
const loggedItemsList = document.getElementById("logged-items-list");
const notyf = new Notyf();
const nutriScoreFiltersButtons = document.querySelectorAll(
  ".nutri-score-filter",
);
const productCategoryBtns = document.querySelectorAll(".product-category-btn");
const overlay = document.getElementById("overlay");
const closeOverlayBtn = document.getElementById("close-overlay-btn");
const modelContent = document.getElementById("model-content");
const logMealBtn = document.getElementById("log-meal-btn");
const quickActionsBtns = document.querySelectorAll(".quick-log-btn");
const foodLogDate = document.getElementById("foodlog-date");
let dayName = document.getElementById("day-name");
const progressBars = document.getElementById("progress-bars");
let globalBarcode = null;
const loggedItemsCount = document.getElementById("logged-items-count");
const clearFoodlog = document.getElementById("clear-foodlog");
const leftColumn = document.getElementById("left-column");
const rightColumn = document.getElementById("right-column");
const heroSection = document.getElementById("hero-section");
let loggedItems = JSON.parse(localStorage.getItem("loggedItems")) || [];
localStorage.setItem("loggedItems", JSON.stringify(loggedItems));
loggedItems.length && displayLoggedItems();

function getDate() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const currentDayName = date.toLocaleDateString("default", {
    weekday: "long",
  });
  const year = date.getFullYear();
  return {
    month,
    day,
    currentDayName,
    year,
  };
}
let { month, day, currentDayName, year } = getDate();
if (!localStorage.getItem("currentDay")) {
  localStorage.setItem("currentDay", day);
}
foodLogDate.innerText = `${day} ${month} ${year}`;
dayName.innerText = currentDayName;

function showSection(sectionId) {
  for (let i = 0; i < mainContent.children.length; i++) {
    // console.log(mainContent.children[i].id);
    mainContent.children[i].classList.add("hidden");
  }
  // console.log('Showing section ', sectionId);
  document.getElementById(sectionId).classList.remove("hidden");
}
// showSection('meals-recipes');

function showSectionOfMealRecipes(sectionId) {
  for (let i = 0; i < mealsRecipesSection.children.length; i++) {
    mealsRecipesSection.children[i].classList.add("hidden");
  }
  document.getElementById(sectionId).classList.remove("hidden");
}

function changeActiveLink(clickedLink) {
  navLinks.forEach((link) => {
    link.classList.remove("bg-emerald-50", "text-emerald-700");
    link.classList.add("text-gray-600");
  });
  clickedLink.classList.remove("text-gray-600");
  clickedLink.classList.add("bg-emerald-50", "text-emerald-700");
}

(function getSpecificSection() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (_) => {
      const clickedSection = link.getAttribute("data-section");
      // console.log(clickedSection);
      showSection(clickedSection);
      changeActiveLink(link);
    });
  });
})();

function getAllEreas() {
  loadingScreen.classList.remove("hidden");
  fetch("https://nutriplan-api.vercel.app/api/meals/areas")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      displayAllAreas(data.results);
      loadingScreen.classList.add("hidden");
    });
}
getAllEreas();

function displayAllAreas(data) {
  let areasBox = `
        <button class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all">
            All Recipes
        </button>`;
  for (let i = 0; i < data.length; i++) {
    const area = data[i];
    areasBox += `
            <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all">
                ${area.name}
            </button>
        `;
  }
  areaData.innerHTML = areasBox;
}

let lastIndex = -1;
function getRandomColorCategoryCard() {
  const colors = [
    "from-red-50 to-rose-50 border-red-200 hover:border-red-400",
    "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
    "from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
    "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
    "from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
    "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
    "from-lime-50 to-green-50 border-lime-200 hover:border-lime-400",
    "from-blue-50 to-blue-50 border-blue-200 hover:border-blue-400",
    "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
  ];
  let currentIndex = -1;
  do {
    currentIndex = Math.floor(Math.random() * colors.length);
  } while (currentIndex === lastIndex);
  // console.log(colors[currentIndex]);
  lastIndex = currentIndex;
  return colors[currentIndex];
}

function getRandomColorCategoryIcon() {
  const colors = [
    "from-pink-400 to-rose-500",
    "from-amber-400 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-red-400 to-rose-500",
    "from-blue-400 to-blue-500",
    "from-slate-400 to-gray-500",
    "from-green-400 to-emerald-500",
    "from-lime-400 to-green-500",
    "from-emerald-400 to-green-500",
  ];
  let currentIndex = -1;
  do {
    currentIndex = Math.floor(Math.random() * colors.length);
  } while (currentIndex === lastIndex);
  // console.log(colors[currentIndex]);
  lastIndex = currentIndex;
  return colors[currentIndex];
}

function getIconByCategory(categoryName) {
  const icons = {
    Dessert: "fa-cake-candles",
    Miscellaneous: "fa-bowl-rice",
    Pasta: "fa-bowl-food",
    Pork: "fa-bacon",
    Seafood: "fa-fish",
    Side: "fa-plate-wheat",
    Starter: "fa-utensils",
    Vegan: "fa-leaf",
    Vegetarian: "fa-seedling",
  };
  return icons[categoryName] || "fa-drumstick-bite";
}

function getAllCategories() {
  loadingScreen.classList.remove("hidden");
  fetch("https://nutriplan-api.vercel.app/api/meals/categories")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      displayAllCategories(data.results);
      loadingScreen.classList.add("hidden");
    });
}
getAllCategories();

function displayAllCategories(data) {
  let categoriesBox = "";
  for (let i = 0; i < data.length; i++) {
    const category = data[i];
    categoriesBox += `
            <div class="category-card bg-gradient-to-br ${getRandomColorCategoryCard()} rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group" data-category="${category.name}">
                <div class="flex items-center gap-2.5">
                    <div class="text-white w-9 h-9 bg-gradient-to-br ${getRandomColorCategoryIcon()} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                        <i class="fa-solid ${getIconByCategory(category.name)}"></i>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
                    </div>
                </div>
            </div>
        `;
  }
  categoriesGrid.innerHTML = categoriesBox;
}

function getSearchMeals() {
  loadingScreen.classList.remove("hidden");
  fetch(
    "https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25",
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      displaySearchMeals(data.results);
      loadingScreen.classList.add("hidden");
    });
}
getSearchMeals();

function displaySearchMeals(data) {
  if (!Array.isArray(data)) {
    console.warn("displaySearchMeals received invalid data:", data);
    recipesCount.innerHTML = "Showing 0 recipes";
    recipesGrid.innerHTML = "";
    return;
  }
  let mealsBox = "";
  for (let i = 0; i < data.length; i++) {
    mealsBox += `
            <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${data[i].id}">
                    <div class="relative h-48 overflow-hidden">
                        <img
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src="${data[i].thumbnail}"
                            alt="${data[i].name}"
                            loading="lazy"
                        >
                        <div class="absolute bottom-3 left-3 flex gap-2">
                            <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                                ${data[i].category}
                            </span>
                            <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                                ${data[i].area}
                            </span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                            ${data[i].name}
                        </h3>
                        <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                            ${data[i].instructions[0]}
                        </p>
                        <div class="flex items-center justify-between text-xs">
                            <span class="font-semibold text-gray-900">
                                <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                                ${data[i].category}
                            </span>
                            <span class="font-semibold text-gray-500">
                                <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                                ${data[i].area}
                            </span>
                        </div>
                    </div>
            </div>`;
  }
  recipesCount.innerHTML = `Showing ${data.length} recipes`;
  recipesGrid.innerHTML = mealsBox;
}

recipesGrid.addEventListener("click", (e) => {
  // Get the closest recipe card element
  const recipeCard = e.target.closest(".recipe-card");
  if (recipeCard) {
    const mealId = recipeCard.getAttribute("data-meal-id");
    // console.log('Clicked meal id ', mealId);
    getMealDetails(mealId);
  }
});

function filterMeals(meal) {
  // console.log(loader.classList.contains('hidden'));
  loader.classList.remove("hidden");
  // console.log(loader.classList.contains('hidden'));
  // Use URLSearchParams to construct query parameters: This helps in encoding the parameters properly(to handle special characters, spaces... and make it proper to URL format)
  const params = new URLSearchParams({
    category: meal.category,
    area: meal.area,
    page: 1,
    limit: 25,
  });

  fetch(`https://nutriplan-api.vercel.app/api/meals/filter?${params}`)
    .then((res) => res.json())
    .then((data) => {
      displaySearchMeals(data.results);
      loader.classList.add("hidden");
    });
}

function searchMeals(text) {
  const params = new URLSearchParams({
    q: text,
    page: 1,
    limit: 25,
  });
  fetch(`https://nutriplan-api.vercel.app/api/meals/search?${params}`)
    .then((res) => res.json())
    .then((data) => {
      displaySearchMeals(data.results);
      // console.log(data.results);
      if (data.results.length === 0) {
        recipesCount.innerHTML = `No recipes found for "${text}"`;
      } else {
        if (text === "") {
          recipesCount.innerHTML = `Showing ${data.results.length} recipes`;
        } else {
          recipesCount.innerHTML = `Found ${data.results.length} recipes for "${text}"`;
        }
      }
    });
}

searchInput.addEventListener("input", (e) => {
  recipesCount.innerHTML = `Searching for "${e.target.value}"...`;
  const query = e.target.value;
  // console.log(query);
  searchMeals(query);
});

categoriesGrid.addEventListener("click", (e) => {
  // Get the closest category card element
  const categoryCard = e.target.closest(".category-card");
  if (categoryCard) {
    const clickedCategory = categoryCard.getAttribute("data-category");
    // console.log('Clicked category ', category);
    filterMeals({ category: clickedCategory, area: "" });
  }
});

areaData.addEventListener("click", (e) => {
  const areaBtn = e.target.closest("button");
  for (const btn of areaData.children) {
    btn.classList.remove("bg-emerald-600", "text-white");
    btn.classList.add("bg-gray-100", "text-gray-700");
  }
  areaBtn.classList.remove("bg-gray-100", "text-gray-700");
  areaBtn.classList.add("bg-emerald-600", "text-white");
  if (areaBtn) {
    const clickedArea = areaBtn.textContent.trim();
    // console.log('Clicked area ', clickedArea);
    if (clickedArea === "All Recipes") {
      filterMeals({ category: "Chicken", area: "" });
    } else {
      filterMeals({ category: "", area: clickedArea });
    }
  }
});

gridViewBtn.addEventListener("click", (_) => {
  recipesGrid.classList.remove("grid-cols-2");
  recipesGrid.classList.add("grid-cols-4");
  gridViewBtn.classList.add("bg-white");
  listViewBtn.classList.remove("bg-white");
});

listViewBtn.addEventListener("click", (_) => {
  recipesGrid.classList.remove("grid-cols-4");
  recipesGrid.classList.add("grid-cols-2");
  listViewBtn.classList.add("bg-white");
  gridViewBtn.classList.remove("bg-white");
});

function getMealDetails(mealId) {
  loadingScreen.classList.remove("hidden");
  fetch(`https://nutriplan-api.vercel.app/api/meals/${mealId}`)
    .then((res) => res.json())
    .then(({ result }) => {
      console.log(result);
      analizeMealNutrition(result);
    });
}
// getMealDetails("52772");

for (const card of recipesGrid.children) {
  card.addEventListener("click", function () {
    // console.log('Clicked meal id ', this.getAttribute('data-meal-id'));
    getMealDetails(this.getAttribute("data-meal-id"));
  });
}

// Convert youtube URL to embed URL as iframe src
function toYoutubeEmbed(url) {
  try {
    // Check if the URL is a youtube URL
    const parsedUrl = new URL(url);
    // if it's a standard youtube URL
    if (parsedUrl.hostname.includes("youtube.com")) {
      // extract the video ID from the query parameters
      const videoId = parsedUrl.searchParams.get("v");
      // if the video ID is present (there isn't params but there is pathname)
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    // if it's a short youtube URL
    if (parsedUrl.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${parsedUrl.pathname}`;
    }
    return null;
  } catch {
    return null;
  }
}

function getIngredientsList(ingredientsObj) {
  let ingredientsBox = "";
  for (const ingredient of ingredientsObj) {
    ingredientsBox += `
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300">
                <span class="text-gray-700">
                    <span class="font-medium text-gray-900">${ingredient.parsed.quantity} ${ingredient.parsed.unit}</span>
                    ${ingredient.matched.description}
                </span>
            </div>
        `;
  }
  return ingredientsBox;
}

function getInstructionsList(instructionsArr) {
  // console.log(instructionsArr);
  let instructionsBox = "";
  for (let i = 0; i < instructionsArr.length; i++) {
    instructionsBox += `
            <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${i + 1}
                </div>
                <p class="text-gray-700 leading-relaxed pt-2">
                    ${instructionsArr[i]}
                </p>
            </div>
        `;
  }
  return instructionsBox;
}

mealDetailsSection.addEventListener("click", (e) => {
  if (e.target.closest("#back-to-meals-btn")) {
    hideMealDetails("meal-details");
  }
});

function hideMealDetails(sectionId) {
  for (let i = 0; i < mealsRecipesSection.children.length; i++) {
    mealsRecipesSection.children[i].classList.remove("hidden");
  }
  document.getElementById(sectionId).classList.add("hidden");
}

function searchProducts(query) {
  productsCount.innerHTML = `Showing results for "${productSearchInput.value}"....`;
  loader.classList.remove("hidden");
  query = query.trim();
  fetch(
    `https://nutriplan-api.vercel.app/api/products/search?q=${query}&page=1&limit=24`,
  )
    .then((res) => res.json())
    .then((data) => {
      loader.classList.add("hidden");
      // console.log(data);
      displaySearchProducts(data);
      productsCount.innerHTML = `Found ${data.pagination.total} results for "${productSearchInput.value}"`;
    });
}

function getProductByBarcode(barcode) {
  loader.classList.remove("hidden");
  fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`)
    .then((res) => res.json())
    .then(({ result: data }) => {
      if (data) {
        data.type = "meal";
        loader.classList.add("hidden");
        // console.log(data.barcode);
        displayProductByBarcode(data);
        overlay.classList.remove("hidden");
        changeTheContentOfTheOverlay(data.barcode);
        // console.log(data.nutrients);
        displayTodaysNutritions(data.nutrients);
        calcNutritions(data.nutrients);
        clearFoodlog.classList.remove("hidden");
        data.loggedAt = new Date();
        loggedItems.push(data);
        localStorage.setItem("loggedItems", JSON.stringify(loggedItems));
        displayLoggedItems();
      } else {
        productsCount.innerHTML = `No results found for "${barcodeInput.value}"`;
        notyf.open({
          type: "error",
          message: "No results found for " + barcodeInput.value,
        });
      }
    });
}

function displayProductCard(product) {
  // console.log(product);
  if (product) {
    productsCount.innerHTML = `Showing results for "${product.name}"`;
    return `
            <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${product.barcode}">
                <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >
                    <!-- Nutri-Score Badge -->
                    <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                        Nutri-Score ${product.nutritionGrade ? product.nutritionGrade : ""}
                    </div>
                    <!-- NOVA Badge -->
                    <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="${product.novaGroup}">
                        ${product.novaGroup ? product.novaGroup : ""}
                    </div>
                </div>
                <div class="p-4">
                    <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                        ${product.brand}
                    </p>
                    <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        ${product.name}
                    </h3>
                    <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span>
                            <i class="fa-solid fa-weight-scale mr-1"></i>
                            ${product.nutrients.calories}g
                        </span>
                        <span>
                            <i class="fa-solid fa-fire mr-1"></i>
                            ${product.nutrients.calories} kcal/100g
                        </span>
                    </div>
                    <!-- Mini Nutrition -->
                    <div class="grid grid-cols-4 gap-1 text-center">
                        <div class="bg-emerald-50 rounded p-1.5">
                            <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}g</p>
                            <p class="text-[10px] text-gray-500">Protein</p>
                        </div>
                        <div class="bg-blue-50 rounded p-1.5">
                            <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}g</p>
                            <p class="text-[10px] text-gray-500">Carbs</p>
                        </div>
                        <div class="bg-purple-50 rounded p-1.5">
                            <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}g</p>
                            <p class="text-[10px] text-gray-500">Fat</p>
                        </div>
                        <div class="bg-orange-50 rounded p-1.5">
                            <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}g</p>
                            <p class="text-[10px] text-gray-500">Sugar</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
  } else {
    notyf.open({
      type: "error",
      message: "No results found for barcode",
    });
    productsCount.innerHTML = `No results found for barcode "${barcodeInput.value}"`;
    return "";
  }
}

function displaySearchProducts(data) {
  // console.log('Displaying searched products');
  // console.log(data);
  let productsBox = "";
  data.results.forEach((product) => {
    productsBox += displayProductCard(product);
  });
  productsGrid.innerHTML = productsBox;
}

function displayProductByBarcode(data) {
  // console.log('Displaying product by barcode');
  // console.log(data);
  let productsBox = "";
  productsBox += displayProductCard(data);
  productsGrid.innerHTML = productsBox;
}

function filterByNutriScore(nutriScore) {
  productsCount.innerHTML = `Filtering by Nutri-Score ${nutriScore}`;
  loader.classList.remove("hidden");
  fetch(
    `https://nutriplan-api.vercel.app/api/products/search?q=${productSearchInput.value}&page=1&limit=24`,
  )
    .then((res) => res.json())
    .then((data) => {
      loader.classList.add("hidden");
      if (nutriScore === "All") {
        displaySearchProducts(data);
      } else {
        data.results = data.results.filter(
          (product) => product.nutritionGrade === nutriScore,
        );
        displaySearchProducts(data);
        if (data.results.length === 0) {
          notyf.open({
            type: "error",
            message: "No results found for Nutri-Score " + nutriScore,
          });
          productsCount.innerHTML = `Found ${data.pagination.total} results for "${productSearchInput.value}" with No results found for Nutri-Score ${nutriScore}`;
        }
      }
      productsCount.innerHTML = `Found ${data.pagination.total} results for "${productSearchInput.value !== "" ? productSearchInput.value : "All"}" with ${data.results.length} results found for Nutri-Score ${nutriScore}`;
    });
}

function filterByCategory(categry) {
  productsCount.innerHTML = `Filtering by Category ${categry}`;
  loader.classList.remove("hidden");
  fetch(
    `https://nutriplan-api.vercel.app/api/products/search?q=${categry}&page=1&limit=24`,
  )
    .then((res) => res.json())
    .then((data) => {
      loader.classList.add("hidden");
      // console.log(data);
      displaySearchProducts(data);
      productsCount.innerHTML = `Found ${data.pagination.total} results for "${categry}"`;
    });
}

searchProductBtn.addEventListener("click", (_) => {
  const query = productSearchInput.value;
  // console.log('Searching products for ', query);
  searchProducts(query);
});

lookupBarcodeBtn.addEventListener("click", (_) => {
  const barcode = barcodeInput.value;
  globalBarcode = barcode;
  // console.log('Looking up product by barcode ', barcode);
  getProductByBarcode(barcode);
});

nutriScoreFiltersButtons.forEach((button) => {
  button.addEventListener("click", (_) => {
    const nutriScore = button.getAttribute("data-grade");
    // console.log('Filtering by Nutri-Score ', nutriScore);
    filterByNutriScore(nutriScore);
  });
});

productCategoryBtns.forEach((button) => {
  button.addEventListener("click", (_) => {
    const category = button.getAttribute("data-category");
    // console.log('Filtering by category ', category);
    filterByCategory(category);
    productSearchInput.value = category;
  });
});

productsGrid.addEventListener("click", (e) => {
  // console.log(e.target.closest('.product-card'));
  overlay.classList.remove("hidden");
  const barcode = e.target
    .closest(".product-card")
    .getAttribute("data-barcode");
  console.log(barcode);
  globalBarcode = barcode;
  changeTheContentOfTheOverlay(barcode);
});

// Event delegation
document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target === overlay || e.target.closest("#close-overlay-btn")) {
    overlay.classList.add("hidden");
  }
});

function changeTheContentOfTheOverlay(barcode) {
  // console.log('Changing the content of the overlay');
  // console.log(barcode);
  fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`)
    .then((res) => res.json())
    .then(({ result: data }) => {
      // console.log(data);
      displayOverlayContent(data);
    });
}

function displayOverlayContent(data) {
  console.log(data);
  modelContent.innerHTML = `
        <!-- Header -->
        <div class="flex items-start gap-4 p-4 border-b">
            <div style="width: 100px; height: 100px;" class="overflow-hidden">
                <img src="${data.image}" class="w-full object-contain rounded-lg bg-gray-100" alt="${data.name}">
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm text-emerald-600 font-medium">LU</p>
                <h2 class="font-bold text-base truncate">
                    ${data.name}
                </h2>
                <p class="text-xs text-gray-500">300 g</p>
                <div class="flex gap-2 mt-2 flex-wrap">
                    <span class="px-2 py-1 text-[10px] rounded bg-red-100 text-red-600 font-semibold">
                        Nutri-Score ${data.nutritionGrade}
                    </span>
                    <span class="px-2 py-1 text-[10px] rounded bg-orange-100 text-orange-600 font-semibold">
                        NOVA ${data.novaGroup}
                    </span>
                </div>
            </div>
            <button class="text-gray-400 hover:text-gray-600 text-lg" id="close-overlay-btn">
                ×
            </button>
        </div>
        <!-- Content -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-5" id="overlay-content">
            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p class="text-xs font-semibold mb-2">
                    Nutrition Facts (per 100g)
                </p>
                <div class="text-center mb-4">
                    <p class="text-3xl font-bold">${data.nutrients.calories}</p>
                    <p class="text-xs text-gray-500">Calories</p>
                </div>
                <div class="grid grid-cols-4 gap-2 text-xs text-center">
                    <div>
                        <p class="font-bold text-emerald-600">${data.nutrients.protein}g</p>
                        <p class="text-gray-500">Protein</p>
                    </div>
                    <div>
                        <p class="font-bold text-blue-600">${data.nutrients.carbs}g</p>
                        <p class="text-gray-500">Carbs</p>
                    </div>
                    <div>
                        <p class="font-bold text-purple-600">${data.nutrients.fat}g</p>
                        <p class="text-gray-500">Fat</p>
                    </div>
                    <div>
                        <p class="font-bold text-orange-600">${data.nutrients.sugar}g</p>
                        <p class="text-gray-500">Sugar</p>
                    </div>
                </div>
            </div>
            <div class="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600 break-words mt-3">
                <strong>Allergens:</strong>
                en:eggs,en:gluten,en:milk,en:soybeans
            </div>
            <!-- Footer -->
            <div class="p-4 ">
                <button id="log-meal-btn" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-xl text-sm">
                    + Log This Food
                </button>
            </div>
        </div>
    `;
}

quickActionsBtns.forEach((btn) => {
  if (btn.id === "quick-log-btn") {
    btn.addEventListener("click", () => {
      showSection("meals-recipes");
      changeActiveLink(navLinks[0]);
    });
  } else if (btn.id === "quick-scan-btn" || btn.id === "quick-custom-btn") {
    btn.addEventListener("click", () => {
      showSection("product-scanner");
      changeActiveLink(navLinks[1]);
    });
  }
});

function updateClock() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateClock, 1000);
function checkDay() {
  let savedDay = localStorage.getItem("currentDay");

  if (savedDay != day) {
    calories = 0;
    protein = 0;
    carbs = 0;
    fats = 0;
    localStorage.setItem("currentDay", day);
  }
}
checkDay();

function updateLocalStorage() {
  localStorage.setItem("calories", calories);
  localStorage.setItem("protein", protein);
  localStorage.setItem("carbs", carbs);
  localStorage.setItem("fats", fats);
}

let calories = Number(localStorage.getItem("calories")) || 0;
let protein = Number(localStorage.getItem("protein")) || 0;
let carbs = Number(localStorage.getItem("carbs")) || 0;
let fats = Number(localStorage.getItem("fats")) || 0;

updateLocalStorage();

function displayTodaysNutritions() {
  console.log("Displaying todays nutritions");

  updateLocalStorage();
  checkDay();

  const calories = Number(localStorage.getItem("calories")) || 0;
  const caloriesPercent = (calories / 2000) * 100;

  const protein = Number(localStorage.getItem("protein")) || 0;
  const proteinPercent = (protein / 50) * 100;

  const carbs = Number(localStorage.getItem("carbs")) || 0;
  const carbsPercent = (carbs / 250) * 100;

  const fats = Number(localStorage.getItem("fats")) || 0;
  const fatsPercent = (fats / 65) * 100;

  progressBars.innerHTML = `
                <div class="bg-emerald-50 rounded-xl p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">
                            Calories
                        </span>
                        <span class="text-sm text-gray-500">${calories.toFixed(2) <= 0 ? 0 : calories.toFixed(2)} kcal</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="${caloriesPercent > 100 ? "bg-red-500" : "bg-emerald-500"} h-2.5 rounded-full" style="width: ${ caloriesPercent > 100 ? 100 : caloriesPercent <= 0 ? 0 : caloriesPercent}%"></div>
                    </div>
                </div>
                <!-- Protein Progress -->
                <div class="bg-blue-50 rounded-xl p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">
                            Protein
                        </span>
                        <span class="text-sm text-gray-500"> ${protein.toFixed(2) <= 0 ? 0 : protein.toFixed(2)} / 50 g</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="${proteinPercent > 100 ? "bg-red-500" : "bg-blue-500"} h-2.5 rounded-full" style="width: ${proteinPercent > 100 ? 100 : proteinPercent <= 0 ? 0 : proteinPercent}%"></div>
                    </div>
                </div>
                <!-- Carbs Progress -->
                <div class="bg-amber-50 rounded-xl p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">Carbs</span>
                        <span class="text-sm text-gray-500">${carbs.toFixed(2) <= 0 ? 0 : carbs.toFixed(2)} / 250 g</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="${carbsPercent > 100 ? "bg-red-500" : "bg-amber-500"} h-2.5 rounded-full" style="width: ${carbsPercent > 100 ? 100 : carbsPercent <= 0 ? 0 : carbsPercent}%"></div>
                    </div>
                </div>
                <!-- Fat Progress -->
                <div class="bg-purple-50 rounded-xl p-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">Fat</span>
                        <span class="text-sm text-gray-500">${fats.toFixed(2) <= 0 ? 0 : fats.toFixed(2)} / 65 g</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="${fatsPercent > 100 ? "bg-red-500" : "bg-purple-500"} h-2.5 rounded-full" style="width: ${fatsPercent > 100 ? 100 : fatsPercent <= 0 ? 0 : fatsPercent}%"></div>
                    </div>
                </div>
    `;
}

displayTodaysNutritions();

function calcNutritions(nutrients) {
  calories += nutrients.calories;
  protein += nutrients.protein;
  carbs += nutrients.carbs;
  fats += nutrients.fat;
  updateLocalStorage();
  displayTodaysNutritions();
}

document.addEventListener("click", (e) => {
  if (e.target.closest("#log-meal-btn")) {
    console.log("Logging the meal with barcode", globalBarcode);
    getProductByBarcode(globalBarcode);
    notyf.open({
      type: "success",
      message: "Meal logged successfully",
    });
  }
});

function displayLoggedItems() {
  loggedItemsCount.innerHTML = loggedItems.length;
  let loggedItemsBox = "";
  // console.log("Displaying logged items");
  // console.log(loggedItems);
  if(loggedItems.length === 0) {
    loggedItemsBox += `
        <div class="text-center py-8 text-gray-500">
            <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
            <p class="font-medium">No meals logged today</p>
            <p class="text-sm">
                Add meals from the Meals page or scan products
            </p>
        </div>
        `;
        loggedItemsList.innerHTML = loggedItemsBox;
        return;
  }
  for (let i = 0; i < loggedItems.length; i++) {
    // Transform loggedAt to time format
    const date = new Date(loggedItems[i].loggedAt);

    // Convert to 12 hour format
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    loggedItemsBox += `
                <div class="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 w-full max-w-5xl">
                    <!-- Left Side -->
                    <div class="flex items-center gap-4">
                        <!-- Image -->
                        <img src="${loggedItems[i].image}" alt="${loggedItems[i].name}" class="w-14 h-14 rounded-lg object-cover">
                        <!-- Info -->
                        <div>
                            <h3 class="font-semibold text-gray-900">${loggedItems[i].name}</h3>
                            <div class="flex items-center gap-2 text-sm text-gray-500">
                                <span>1 serving</span>
                                <span>•</span>
                                <span class="text-emerald-600 font-medium">${loggedItems[i].type}</span>
                            </div>
                            <span class="text-xs text-gray-400">${time}</span>
                        </div>
                    </div>
                    <!-- Right Side -->
                    <div class="flex items-center gap-6">
                        <!-- Calories -->
                        <div class="text-right">
                            <p class="text-emerald-600 font-bold text-lg">${loggedItems[i].nutrients.calories}</p>
                            <span class="text-xs text-gray-400">kcal</span>
                        </div>
                        <!-- Macros -->
                        <div class="flex items-center gap-2 text-xs font-medium">
                            <span class="bg-blue-50 text-blue-600 px-2 py-1 rounded-md">${loggedItems[i].nutrients.protein} g P</span>
                            <span class="bg-amber-50 text-amber-600 px-2 py-1 rounded-md">${loggedItems[i].nutrients.carbs} g C</span>
                            <span class="bg-purple-50 text-purple-600 px-2 py-1 rounded-md">${loggedItems[i].nutrients.fat} g F</span>
                        </div>
                        <!-- Delete -->
                        <button data-index="${i}" class="delete-btn text-gray-400 hover:text-red-500 transition">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
        `;
  }
  loggedItemsList.innerHTML = loggedItemsBox;
}

loggedItemsList.addEventListener("click", (e) => {
  // console.log(e.target.closest(".delete-btn").getAttribute("data-index"));
  if (e.target.closest(".delete-btn")) {
    const index = e.target.closest(".delete-btn").getAttribute("data-index");
    calories -= loggedItems[index].nutrients.calories;
    protein -= loggedItems[index].nutrients.protein;
    carbs -= loggedItems[index].nutrients.carbs;
    fats -= loggedItems[index].nutrients.fat;
    updateLocalStorage();
    loggedItems.splice(index, 1);
    localStorage.setItem("loggedItems", JSON.stringify(loggedItems));
    displayLoggedItems();
    displayTodaysNutritions();
    notyf.open({
      type: "success",
      message: "Meal deleted successfully",
    });
    if (loggedItems.length === 0) {
      // console.log("There are logged items");
      clearFoodlog.classList.add("hidden");
    }
  }
});

if (loggedItems.length > 0) {
  // console.log("There are logged items");
  clearFoodlog.classList.remove("hidden");
}

clearFoodlog?.addEventListener("click", (_) => {
  loggedItems = [];
  calories = 0;
  protein = 0;
  carbs = 0;
  fats = 0;
  updateLocalStorage();
  localStorage.setItem("loggedItems", JSON.stringify(loggedItems));
  displayLoggedItems();
  displayTodaysNutritions();
  notyf.open({
    type: "success",
    message: "Food log cleared successfully",
  });
  clearFoodlog.classList.add("hidden");
});

function analizeMealNutrition(meal) {
    fetch(`https://nutriplan-api.vercel.app/api/nutrition/analyze`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'x-api-key': 'q0SSlJpe8ND5mYD4QfgMqDpzz2CFqLCgPdBiI7aW',
        },
        body: JSON.stringify({
            recipeName: meal.name,
            ingredients: meal.ingredients.map(ing => `${ing.measure} ${ing.ingredient}`),
        })
    }).then(res => res.json())
    .then(data => {
        loadingScreen.classList.add("hidden");
        console.log(loadingScreen.classList.contains('hidden'));
        console.log(data);
        displayMealDetails(data, meal);
        // document.getElementById('hero-calories').innerText = `${data.totalCalories} cal/serving`;
    })
}

let recipeInfo = {};
function displayMealDetails(data, meal) {
  // console.log(data.data);
  // console.log(meal);
  // console.log('Displaying meal details');
  // console.log(data.ingredients);
  showSectionOfMealRecipes("meal-details");
  recipeInfo = {
    name: meal.name,
    img : meal.thumbnail,
    calories: data.data.totals.calories,
    protein: data.data.totals.protein,
    carbs: data.data.totals.carbs,
    fats: data.data.totals.fat,
  }
  console.log(recipeInfo);
  mealDetailsSection.innerHTML =`
                    <div class="max-w-7xl mx-auto">
                        <!-- Back Button -->
                        <button id="back-to-meals-btn" class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
                            <i class="fa-solid fa-arrow-left"></i>
                            <span>Back to Recipes</span>
                        </button>
                        <!-- Hero Section -->
                        <div id="hero-section" class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                            <div class="relative h-80 md:h-96">
                                <img src="${meal.thumbnail}" alt="${meal.name}" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div class="absolute bottom-0 left-0 right-0 p-8">
                                    <div class="flex items-center gap-3 mb-3">
                                        <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                                            ${meal.category}
                                        </span>
                                        <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                                            ${meal.area}
                                        </span>
                                        ${meal.tags.map(tag => `
                                            <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
                                                ${tag}
                                            </span>
                                        `).join('')}
                                    </div>
                                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                                        ${meal.name}
                                    </h1>
                                    <div class="flex items-center gap-6 text-white/90">
                                        <span class="flex items-center gap-2">
                                            <i class="fa-solid fa-clock"></i>
                                            <span>30 min</span>
                                        </span>
                                        <span class="flex items-center gap-2">
                                            <i class="fa-solid fa-utensils"></i>
                                            <span id="hero-servings">${data.data.servings} servings</span>
                                        </span>
                                        <span class="flex items-center gap-2">
                                            <i class="fa-solid fa-fire"></i>
                                            <span id="hero-calories">${data.data.totals.calories} cal</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Action Buttons -->
                        <div class="flex flex-wrap gap-3 mb-8">
                            <button id="log-recipe-btn" class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all" data-meal-id="${meal.id}">
                                <i class="fa-solid fa-clipboard-list"></i>
                                <span>Log This Meal</span>
                            </button>
                        </div>
                        <!-- Main Content Grid -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <!-- Left Column - Ingredients & Instructions -->
                            <div id="left-column" class="lg:col-span-2 space-y-8">
                                <!-- Ingredients -->
                                <div class="bg-white rounded-2xl shadow-lg p-6">
                                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i class="fa-solid fa-list-check text-emerald-600"></i>
                                        Ingredients
                                        <span class="text-sm font-normal text-gray-500 ml-auto">
                                            ${data.data.ingredients.length} items
                                        </span>
                                    </h2>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        ${getIngredientsList(data.data.ingredients)}
                                    </div>
                                </div>
                                <!-- Instructions -->
                                <div class="bg-white rounded-2xl shadow-lg p-6">
                                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                                        Instructions
                                    </h2>
                                    <div class="space-y-4">
                                        ${getInstructionsList(meal.instructions)}
                                    </div>
                                </div>
                                <!-- Video Section -->
                                <div class="bg-white rounded-2xl shadow-lg p-6">
                                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i class="fa-solid fa-video text-red-500"></i>
                                        Video Tutorial
                                    </h2>
                                    <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                                        <iframe
                                            src="${toYoutubeEmbed(meal.youtube)}"
                                            class="absolute inset-0 w-full h-full"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Column - Nutrition -->
                            <div id="right-column" class="space-y-6">
                                <!-- Nutrition Facts -->
                                <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                    <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                                        Nutrition Facts
                                    </h2>
                                    <div id="nutrition-facts-container">
                                        <p class="text-sm text-gray-500 mb-4">Per serving</p>
                                        <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                                            <p class="text-sm text-gray-600">Calories per serving</p>
                                            <p class="text-4xl font-bold text-emerald-600">${data.data.perServing.calories}</p>
                                            <p class="text-xs text-gray-500 mt-1">Total: ${data.data.totals.calories} cal</p>
                                        </div>
                                        <div class="space-y-4">
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-2">
                                                    <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                                                    <span class="text-gray-700">Protein</span>
                                                </div>
                                                <span class="font-bold text-gray-900">${data.data.perServing.protein}g</span>
                                            </div>
                                            <div class="w-full bg-gray-100 rounded-full h-2">
                                                <div class="bg-emerald-500 h-2 rounded-full" style="width: ${data.data.perServing.protein / data.data.totals.protein * 100}%"></div>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-2">
                                                    <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                                                    <span class="text-gray-700">Carbs</span>
                                                </div>
                                                <span class="font-bold text-gray-900">${data.data.perServing.carbs}g</span>
                                            </div>
                                            <div class="w-full bg-gray-100 rounded-full h-2">
                                                <div class="bg-blue-500 h-2 rounded-full" style="width: ${data.data.perServing.carbs / data.data.totals.carbs * 100}%"></div>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-2">
                                                    <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                                                    <span class="text-gray-700">Fat</span>
                                                </div>
                                                <span class="font-bold text-gray-900">${data.data.perServing.fat}g</span>
                                            </div>
                                            <div class="w-full bg-gray-100 rounded-full h-2">
                                                <div class="bg-purple-500 h-2 rounded-full" style="width: ${data.data.perServing.fat / data.data.totals.fat * 100}%"></div>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-2">
                                                    <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                                                    <span class="text-gray-700">Fiber</span>
                                                </div>
                                                <span class="font-bold text-gray-900">${data.data.perServing.fiber}g</span>
                                            </div>
                                            <div class="w-full bg-gray-100 rounded-full h-2">
                                                <div class="bg-orange-500 h-2 rounded-full" style="width: ${data.data.perServing.fiber / data.data.totals.fiber * 100}%"></div>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-2">
                                                    <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                                                    <span class="text-gray-700">Sugar</span>
                                                </div>
                                                <span class="font-bold text-gray-900">${data.data.perServing.sugar}g</span>
                                            </div>
                                            <div class="w-full bg-gray-100 rounded-full h-2">
                                                <div class="bg-pink-500 h-2 rounded-full" style="width: ${data.data.perServing.sugar / data.data.totals.sugar * 100}%"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  `
}

mealDetailsSection.addEventListener('click', e => {
  const btn = e.target.closest('#log-recipe-btn');
  if (!btn) return;

  logMeal();
  notyf.open({
    type: "success",
    message: "Meal logged successfully",
  })
});

function logMeal() {
  const loggedMeal = {
    name: recipeInfo.name,
    image: recipeInfo.img,
    nutrients: {
      calories: recipeInfo.calories,
      protein: recipeInfo.protein,
      carbs: recipeInfo.carbs,
      fat: recipeInfo.fats,
    },
    loggedAt: new Date(),
    type: "recipe",
  };

  loggedItems.push(loggedMeal);

  localStorage.setItem("loggedItems", JSON.stringify(loggedItems));

  calcNutritions(loggedMeal.nutrients);

  displayLoggedItems();

  updateLocalStorage();
}
