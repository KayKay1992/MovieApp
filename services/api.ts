import Constants from 'expo-constants';

// Get the API key from Expo config
const API_KEY = Constants.expoConfig?.extra?.apiKey;

export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
  API_KEY
};

type FetchMoviesParams = {
  query?: string;
  page?: number;
};

export const fetchMovies = async ({ query = '', page = 1 }: FetchMoviesParams) => {
  // Choose endpoint: search or discover
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  // Handle error
  if (!response.ok) {
    console.error(`TMDB Error: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  // Parse and return the data
  const data = await response.json();
  return data.results;
};


//function to fetch movie details

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  try{
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
      method: 'GET',
      headers: TMDB_CONFIG.headers,

    });

    if(!response.ok) throw new Error('failed to fetch movie details')
      const data = await response.json();
     return data
  }
  catch(error){
     console.log(error)
     throw error
  }
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjhlNmRiYWQ1YTBiNjUwYmRkYTU5N2FkYjliMmUxNiIsIm5iZiI6MTc0MzA2ODQyOC4xODcsInN1YiI6IjY3ZTUxZDBjMjU4MGVlZjFlODAwM2MxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PFCh--An3G0T3GgRQM-UpRHF5xl85e5ZkopnJ1EljpA'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));