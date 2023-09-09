import { styled } from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { ListStyle, MoviesListStyled } from './MoviesList.styled';
const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;
export const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      {movies.length > 0 && (
        <ListStyle>
          {movies.map((movie, index) => (
            <MoviesListStyled key={`${movie.id}_${index}`}>
              <StyledLink to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </StyledLink>
            </MoviesListStyled>
          ))}
        </ListStyle>
      )}
    </div>
  );
};
