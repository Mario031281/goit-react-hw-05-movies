import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
export const StyledLink = styled(NavLink)`
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
