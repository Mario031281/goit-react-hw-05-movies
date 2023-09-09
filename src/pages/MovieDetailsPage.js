import { fetchMovieById } from 'services/Api';
import { defaultImgUrl } from 'components/img/img';
import { useEffect, useState, useRef, Suspense } from 'react';
import { NavLink, useParams, useLocation, Outlet } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { StyledLink } from 'components/Link/Link.styled';
const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackPath = useRef(location.state?.from ?? '/');

  useEffect(() => {
    async function fetchMovie() {
      try {
        const fetchedMovie = await fetchMovieById(movieId);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      <StyledLink to={goBackPath.current}>
        <AiOutlineArrowLeft /> Go back
      </StyledLink>
      {movie && (
        <div>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImgUrl
            }
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>{movie.popularity}</p>
          <ul>
            <li>
              <h3>Overview</h3> <p>{movie.overview}</p>
            </li>
            <li>
              <h3>Genres</h3>{' '}
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </li>
          </ul>
        </div>
      )}
      <div>
        <p>Additional information</p>
        <ul>
          <hr />
          <li>
            <NavLink to={`cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`reviews`}>Reviews</NavLink>
          </li>
        </ul>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
function Loading() {
  return <h2>🌀 Loading...</h2>;
}
export default MovieDetailsPage;
