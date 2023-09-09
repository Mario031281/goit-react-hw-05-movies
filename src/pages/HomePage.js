// лише дефолтні експорти
import { fetchMovies } from 'services/Api';
import { useState, useEffect } from 'react';

import { MoviesList } from 'components/MoviesList/MoviesList';

const HomePage = () => {
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const trendingFilm = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetchMovies(page, { signal: controller.signal });
        const { results } = response;
        setTrending(prevMovies => [...prevMovies, ...results]);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request aborted:', error.message);
        } else {
          console.error('Error fetching data:', error);
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    trendingFilm();

    return () => {
      controller.abort();
    };
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div>
      <h1 style={{ color: 'red' }}>Trending Movies</h1>
      <ul>
        <MoviesList movies={trending} />
      </ul>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button
          style={{
            padding: '8px 16px',
            border_radius: '2px',
            background_color: '#29ff15',
          }}
          onClick={loadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default HomePage;
