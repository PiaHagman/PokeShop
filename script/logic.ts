
export class pokeHandler{

    pokemonObj:any[];
    pokeUrl:URL;

    constructor(){
    this.pokemonObj  = [];

        /* POKEMON-API URL SETUP */
    this.pokeUrl = new URL("https://pokeapi.co");
    this.pokeUrl.pathname = "/api/v2/pokemon";
    this.pokeUrl.searchParams.set("limit", "12");

    }



/* const typeColor = {
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
    Steel: "#b8b8d0" ,
    Dark: "#705848"
  }; */




async onPageLoad () {
    
await this.fetchPokemonURL(this.pokeUrl.href);

}


async fetchPokemonURL (pokeUrl:string) {    
await fetch(pokeUrl)
.then((response) => {
if(response.ok)
{
    return response.json();
}
else
{
    throw "Something went wrong, status: " + response.status;
}
    
})
.then((urlData) => {       
    const getNextPage:string = urlData.next; 
    const getPreviousPage:string = urlData.previous;
    const pokemonList:any[] = urlData.results;         
    //paginationData(getNextPage, getPreviousPage);
    this.getPokemonData(pokemonList);
})
.catch((err) => console.log(err));
}  



async getPokemonData(pokemonList:any[]){
    //console.log(pokemonObj);

    for(let pokemon of pokemonList){        
        let pokemonData = await fetch(pokemon.url)
        .then((response) => {        
            return response.json();});

            const newPokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                sprite: pokemonData.sprites.front_default,
                abilities: pokemonData.abilities,
                type: pokemonData.types[0].type.name 

    } 
    this.pokemonObj.push(newPokemon);
 }

}

paginationData(getNextPage:string, getPreviousPage:string){

    //console.log(getNextPage);
    //console.log(getPreviousPage);

    throw new Error("function not implemented");
    return undefined;
};

}