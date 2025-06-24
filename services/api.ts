export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
     headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
     }
}

//creating a function that calls the fetch movie 

export const fetchMovies = async ({query}: {query: string}) => {
    //define the endpoint you are calling 
   const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
   `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
   //get response 
   const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,

   })
   //check if the response is not ok
  if (!response.ok) {
  throw new Error(`Failed to fetch movies: ${response.statusText}`);
}
 //Extract data from the response 
 const data = await response.json()

 //return the data 
 return data.results
}



// const url = 'https://api.themoviedb.org/3/keyword/keyword_id/movies?include_adult=false&language=en-US&page=1';
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