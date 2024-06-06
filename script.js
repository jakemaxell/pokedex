
document.getElementById('pokemonInput').addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        searchPokemon();
    }
});

function searchPokemon(){
    const pokemon = document.getElementById('pokemonInput').value;
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon).then(response => {
        if(!response.ok){
            alert('There was an issue with your request. . .');
            return;
        }
        return response.json();
    }).then(data => {
        updatePokedexStats(data);
    });

    document.getElementById('pokemonInput').value = '';
};

async function updatePokedexStats(data){
    const pokemonName = data['name'];
    const pokemonNumber = data['id'];
    const baseExperience = data['base_experience'];
    const color = await getSpeciesData(pokemonNumber, 'color');
    const generation = await getSpeciesData(pokemonNumber, 'generation');

    const types = getTypes(data['types']);
    const typeOne = types[0];
    const typeTwo = types[1];

    const height = (data['height'] / 10);
    const weight = (data['weight'] / 10);

    var image = document.getElementById('pokemon-image');
    image.src = data['sprites']['front_default'];

    document.getElementById('height').textContent = 'Height: ' + height + ' m';
    document.getElementById('weight').textContent = 'Weight: ' + weight + ' kgs';

    document.getElementById('pokemonName').textContent = 'Name: ' + capitalize(pokemonName);
    document.getElementById('pokedexId').textContent = 'Pokedex Id: ' + pokemonNumber;
    document.getElementById('baseExperience').textContent = 'Base Experience: ' + baseExperience + ' exp';
    document.getElementById('generation').textContent = 'Generation: ' + generation;
    document.getElementById('color').textContent = 'Color: ' + color;

    document.getElementById('typeOne').textContent = typeOne;
    document.getElementById('typeTwo').textContent = typeTwo;
};

async function getSpeciesData(pokemon, desiredStat) {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemon);
        if (!response.ok) {
            throw new Error('There was an issue with your request');
        }
        const data = await response.json();
        if (desiredStat === 'color') {
            return capitalize(data['color']['name']);
        } else if (desiredStat === 'generation'){
            return getGeneration(data['generation']['name']);
        }
    } catch (error) {
        console.error(error);
    }
};

function getGeneration(generation){
    switch(generation){
        case 'generation-i':
            return 'Generation 1';
        case 'generation-ii':
            return 'Generation 2';
        case 'generation-iii':
            return 'Generation 3';
        case 'generation-iv':
            return 'Generation 4';
        case 'generation-v':
            return 'Generation 5';
        case 'generation-vi':
            return 'Generation 6';
        case 'generation-vii':
            return 'Generation 7';
        case 'generation-vii':
            return 'Generation 8';
        case 'generation-ix':
            return 'Generation 9';
        default:
            return;
    }
};

function getTypes(types){
    let listOfTypes = [];
    for(let type of types){
        listOfTypes.push(capitalize(type['type']['name']));
    }

    return listOfTypes;
};

function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
};