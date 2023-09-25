import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){


    const[pokemonList,setPokemonList]=useState([])
    const[isLoading,setIsLoading]=useState([true])

    const[pokedexUrl,setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")

    const [nextUrl,setNextUrl]= useState('');
    const [prevUrl,setPrevUrl]= useState('');

  async function downloadPokemon(){
        const response=await axios.get(pokedexUrl)//download list of 20 pokemon

        const pokemonResults= response.data.results;//we get the array of pokemon from the result

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous)

        //iterating over the array of pokemon, and using their url,  to create an array of promises
        //that download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url))

        //    console.log(pokemonResultPromise);
        //passing that promises array to axios.all
        const pokemonData=await axios.all(pokemonResultPromise)//array of 20 pokemon detailed data 
        console.log(pokemonData);

        //now iterate on the data of each pokemon, and extract id, name, types
        const pokeListResult= pokemonData.map((pokeData)=>{
            const pokemon=pokeData.data;
            return {
                id:pokemon.id,
                name: pokemon.name,
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny, 
                types:pokemon.types
            }
       })

       console.log(pokeListResult);
       setPokemonList(pokeListResult)
       setIsLoading(false);
    //    setPokemonList(pokemonData.map(pokeData)=>{
    //     const pokemon=pokeData.data
            
    //    })

        

  }

    useEffect(()=>{
        downloadPokemon();

    },[pokedexUrl])

    

    return(
        <div className="pokemon-list-wrapper">
            
            <div className="pokemon-wrapper">
                {(isLoading)?'Loading.....':
                pokemonList.map((pokemon)=><Pokemon name={pokemon.name} image={pokemon.image} key={pokemon.id} id={pokemon.id}/> )}
            </div>
           <div className="controls">
                <button disabled={prevUrl == null} onClick={()=> setPokedexUrl(prevUrl)}> prev</button>
                <button disabled={nextUrl == null} onClick={()=> setPokedexUrl(nextUrl)}>next</button>
           </div>
        </div>
    )
}
export default PokemonList;