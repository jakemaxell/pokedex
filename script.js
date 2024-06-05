
document.getElementById('search-button').addEventListener('click', function(){
    search();
});

document.getElementById('search-bar').addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        search();
    }
});

function search(){
    const pokemon = document.getElementById('search-bar').value;
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon).then(response => {
        return response.json();
    }).then(data => {
        const pokemonNumber = data['forms']['0']['url'];
        const formattedPokemonNumber = pokemonNumber.slice(-4, -1);
        alert('Name: ' + data['name'] + '\nPokedex Index Number: ' + formattedPokemonNumber);
        console.log(data);
    });
};