// /movies/:movieId/cast – компонент Cast, інформація про акторський склад. Рендериться на сторінці MovieDetails.
// /movies/:movieId/reviews – компонент Reviews, інформація про огляди. Рендериться на сторінці MovieDetails.
import { fetchMovieById } from 'services/Api';
import { defaultImgUrl } from 'components/img/img';
import { useEffect, useState, useRef, Suspense } from 'react';
import { NavLink, useParams, useLocation, Outlet } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { styled } from 'styled-components';
const StyledLink = styled(NavLink)`
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  font: green;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid;
  margin: 8px;
  border-radius: 5px;
  &:hover,
  &:focus {
    color: #ffffff;
    background-color: #0000ff;
  }
  &.active {
    color: orange;
  }
`;
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  // console.log('movieId:', movieId);
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
            <NavLink to={`/movies/${movieId}/cast`}>Cast</NavLink>
          </li>
          <li>
            <NavLink to={`/movies/${movieId}/reviews`}>Reviews</NavLink>
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
