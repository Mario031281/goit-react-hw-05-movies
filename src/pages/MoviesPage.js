import { fetchSearchMovies } from 'services/Api';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { MoviesList } from 'components/MoviesList/MoviesList';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        const searchFilm = await fetchSearchMovies(
          { title: query },
          { signal: controller.signal }
        );
        setSearchResults(searchFilm.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  const value = newValue => {
    const nextParams = newValue !== '' ? { query: newValue } : {};
    setSearchParams(nextParams);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    value(evt.target.elements.movie.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="movie" />
        <button type="submit">Search movie</button>
      </form>

      {searchResults.length > 0 ? (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {' '}
            <MoviesList movies={searchResults} />
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MoviesPage;
