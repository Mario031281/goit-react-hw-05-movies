import axios from 'axios';
const API_KEY = '4ec653905388d965034f595a8adc64a2';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  language: 'en-US',
  time_window: 'day',
  api_key: API_KEY,
};
export const fetchMovies = async page => {
  const params = {
    page,
  };
  const response = await axios.get(`/trending/movie/day?language=en-US`, {
    params,
  });
  
  return response.data;
};

export const fetchSearchMovies = async ({ title }) => {
  const response = await axios.get(
    `/search/movie?include_adult=false&language=en-US&page=1&query=${title}`
  );
  
  return response.data;
};
export const fetchMovieById = async movieId => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
 
  return response.data;
};

export const fetchCast = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits?language=en-US`);

  return response.data;
};

export const fetchReviews = async movieId => {
  const response = await axios.get(
    `movie/${movieId}/reviews?language=en-US&page=1`
  );
 
  return response.data;
};
