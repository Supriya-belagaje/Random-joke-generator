const jokeElement = document.getElementById("joke");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");

const categoriesUrl = "https://api.chucknorris.io/jokes/categories";
const jokeUrl = "https://api.chucknorris.io/jokes/random";
const searchUrl = "https://api.chucknorris.io/jokes/search?query=";

const fetchCategories = async () => {
    try {
        const response = await fetch(categoriesUrl);
        const categories = await response.json();
        categorySelect.innerHTML = `<option value="">Any Category</option>` + 
            categories.map(category => 
            `<option value="${category}">${category}</option>`).join("");
    } catch (error) {
        console.error("Error fetching categories:", error);
        categorySelect.innerHTML = "<option>Error loading categories</option>";
    }
};

const getJoke = async () => {
    const selectedCategory = categorySelect.value;
    const url = selectedCategory ? `${jokeUrl}?category=${selectedCategory}` : jokeUrl;

    try {
        const response = await fetch(url);
        const data = await response.json();
        jokeElement.textContent = data.value;
        if (response.ok) {
            //alert("Fetching");
            // fetchProducts(); 

        } else {
            alert(`Failed ! Status: ${response.status}`);
        }
    } catch (error) {
        jokeElement.textContent = "Failed to load joke.";
        console.error("Error fetching joke:", error);
    }
};

const searchJokes = async () => {
    console.log('Searching for jokes...'); // Debugging log

    const query = searchInput.value.trim();
    console.log('Search Query:', query);

    if (!query) {
        jokeElement.textContent = "Please enter a search term.";
        return;
    }

    try {
        const response = await fetch(`${searchUrl}${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.result || data.result.length === 0) {
            jokeElement.textContent = "No jokes found.";
            return;
        }

        jokeElement.textContent = data.result[0].value;

    } catch (error) {
        jokeElement.textContent = "Failed to fetch jokes. Please try again.";
        console.error("Error fetching jokes:", error);
    }
};


document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    getJoke(); 
    btn.addEventListener("click", getJoke);
    btn1.addEventListener("click", searchJokes);
    });
