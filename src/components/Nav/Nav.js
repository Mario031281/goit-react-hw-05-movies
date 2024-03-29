import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
const StyledLink = styled(NavLink)`
  color: black;

  &.active {
    color: orange;
  }
`;
export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <StyledLink to={'/'}>Home</StyledLink>
        </li>
        <li>
          <StyledLink to={'/movies'}>Movies</StyledLink>
        </li>
      </ul>
    </nav>
  );
};
