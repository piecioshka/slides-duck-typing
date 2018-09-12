
if (typeof fetch !== 'function')
    fetch = require('node-fetch');

function fetchMovies() {
    return fetch('http://localhost:3000/movies/')
        .then((body) => {
            return body.json();
        })
}

function print(movies) {
    console.log(
        JSON.stringify(movies, null, 4)
    )
}

// Ad. 2
// const strategies = new Map();
// strategies.set('movie', function (movie) {
//     movie.title += ' <span>(Film)</span>';
//     return movie;
// });
// strategies.set('series', function (movie) {
//     movie.title += ' <span>(Serial)</span>';
//     return movie;
// });

function render(movies) {
    const $page = document.querySelector('#page');
    let result = '';
    const compile = ({ title, image }) => `
        <fieldset>
            <legend>${title}</legend>
            <img src="${image}"/>
        </fieldset>
    `;

    movies.forEach((movie) => {
        movie.image = movie.poster || movie.thumbnail;

        // Ad. 1
        // if (movie.poster) {
        //     movie.title += ' <span>(Film)</span>';
        // }

        // if (movie.thumbnail) {
        //     movie.title += ' <span>(Serial)</span>';
        // }

        // Ad. 2
        // movie = strategies.get(movie.type).call(null, movie);

        result += compile(movie);
    });

    $page.innerHTML = result;
}

async function setup() {
    const movies = await fetchMovies();

    if (typeof document === 'undefined') {
        print(movies);
    } else {
        render(movies);
    }
}

setup();
