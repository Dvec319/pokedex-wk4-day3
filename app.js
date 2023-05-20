// const pokemon = [
// 	{
// 		slot: 1,
// 		type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
// 	},
// 	{
// 		slot: 2,
// 		type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
// 	},
// ];

// const newPoke = pokemon.map((element) => element.type.name);

// console.log(newPoke);


// // or

// console.log([
// 	{
// 		slot: 1,
// 		type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
// 	},
// 	{
// 		slot: 2,
// 		type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
// 	},
// ].map(element => element.type.name)
// );

const $searchForm = $("form")

$searchForm.on("submit", event => {
    event.preventDefault()
    // generate data drom the target value
    const formData = new FormData(event.target);
    // get the value from the generated data where the name value is "pokemon"
    const pokemon = formData.get('pokemon').toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    console.log(url);

    // $.ajax(url)
    //     .then(response => console.log(response))

    const $screen = $('.screen');
    const $result = $(".result");

    // empty out the input field
    $('[name="pokemon"]')[0].value = ""

    // empty out previous search and add loading screen
    $screen.empty();
    $result.html(`<div>Loading......</div>`);

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            $screen.html(`<img src=${data.sprites.front_default} alt=${data.name}>`)
            
            $result.html(`
                <div>
                    <b>name:&nbsp; </b> ${data.name}
                </div>
                <div>
                    <b>id:&nbsp; </b> ${data.id}
                </div>
                <div>
                    <b>weight:&nbsp; </b> ${data.weight}
                </div>
                <div>
                    <b>type:&nbsp; </b> ${data.types.map(
											(element) => element.type.name
										)}
                </div>
            `);
        })
        .catch(() => {
            $result.html(`<div> there was an error...</div>`)
        })

});