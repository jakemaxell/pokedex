
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
        if(!response.ok){
            alert("There was an issue with your request. . .");
            return;
        }
        return response.json();
    }).then(data => {
        const pokemonNumber = data['forms']['0']['url'];
        const formattedPokemonNumber = pokemonNumber.match(/\b\d+\b/)[0];
        alert('Name: ' + data['name'] + '\nPokedex Index Number: ' + formattedPokemonNumber);

        var image = document.getElementById('pokemon-image');
        image.src = data['sprites']['front_default'];

        console.log(data);
    });

    document.getElementById('search-bar').value = '';
};