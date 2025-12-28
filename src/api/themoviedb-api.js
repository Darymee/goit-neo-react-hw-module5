import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = '74bfe718a55ac7916c6e6ad87b15f944';

export const fetchTrendyMovies = async () => {
  const response = await axios.get(`trending/movie/day?api_key=${API_KEY}`);
  return response.data.results;
};

export const fetchMoviesByName = async query => {
  const response = await axios.get(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  return response.data.results;
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

export const getMovieCredits = async movieId => {
  const response = await axios.get(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  return response.data.cast;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};
