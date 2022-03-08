export class pokeHandler {
    constructor() {
        this.getNextPage = "";
        this.getPreviousPage = "";
        this.typeColor = {
            bug: "#26de81",
            dragon: "#ffeaa7",
            electric: "#fed330",
            fairy: "#FF0069",
            fighting: "#30336b",
            fire: "#f0932b",
            flying: "#81ecec",
            grass: "#00b894",
            ground: "#EFB549",
            ghost: "#a55eea",
            ice: "#74b9ff",
            normal: "#95afc0",
            poison: "#6c5ce7",
            psychic: "#a29bfe",
            rock: "#2d3436",
            water: "#0190FF",
            steel: "#b8b8d0",
            dark: "#705848",
        };
        this.pokemonObj = [];
        this.pokemonList = [];
        this.flavorTexts = [];
        this.speciesUrls = [];
        this.cartItems = [];
        this.prices = ["99", "129", "159", "179", "199"];
        this.lastPageUrl = "https://pokeapi.co/api/v2/pokemon?offset=886&limit=12";
        this.offsetUrl = "https://pokeapi.co/api/v2/pokemon?offset=898&limit=12";
        this.pokeUrl = new URL("https://pokeapi.co");
        this.pokeUrl.pathname = "/api/v2/pokemon";
        this.pokeUrl.searchParams.set("limit", "12");
    }
    async fetchPokemonURL(pokeAPIUrl) {
        try {
            let urlData = await fetch(pokeAPIUrl).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw "Something went wrong, status: " + response.status;
                }
            });
            this.getNextPage = urlData.next;
            this.getPreviousPage = urlData.previous;
            this.pokemonList = urlData.results;
        }
        catch (error) {
            return error;
        }
        return this.getPokemonData(this.pokemonList);
    }
    async getPokemonData(pokemonList) {
        for (let pokemon of pokemonList) {
            let pokemonData = await fetch(pokemon.url).then((response) => {
                return response.json();
            });
            const newPokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                sprite: pokemonData.sprites.other["official-artwork"].front_default,
                abilities: pokemonData.abilities,
                type: pokemonData.types[0].type.name,
                speciesUrl: pokemonData.species.url,
                price: this.getPrice(),
            };
            this.pokemonObj.push(newPokemon);
        }
    }
    async fetchSpeciesData(speciesUrl) {
        let speciesData = await fetch(speciesUrl).then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw "Something went wrong, status: " + response.status;
            }
        });
        speciesData.flavor_text_entries.forEach((entry) => {
            if (entry.language.name == "en") {
                this.flavorTexts.push(entry.flavor_text);
            }
        });
    }
    async getPokemonId(value) {
        if (typeof value !== "number") {
            const onePokeUrl = new URL("https://pokeapi.co");
            onePokeUrl.pathname = `/api/v2/pokemon/${value.toLowerCase()}`;
            let pokemonId = await fetch(onePokeUrl.href).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return response.status;
                }
            });
            value = pokemonId.id;
        }
        return `${value - 1}`;
    }
    getPrice() {
        return parseInt(this.prices[Math.floor(Math.random() * this.prices.length)]);
    }
    totalCartQty() {
        let totalQty = 0;
        for (let item of this.cartItems) {
            totalQty += item.quantity;
        }
        return totalQty;
    }
}
