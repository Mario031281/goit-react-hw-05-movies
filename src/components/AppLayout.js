import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { Nav } from './Nav/Nav';
const Container = styled.main`
  display: fles;
  flex-direction: column;
  gap: 24px;
  padding: 0 15px;
  max-width: 900px;
  margin: 0 auto;
`;

export const AppLayout = () => {
  return (
    <Container>
      <Nav />
      <hr />
      <Outlet />
      <Toaster />
    </Container>
  );
};
