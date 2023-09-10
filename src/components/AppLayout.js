import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { Nav } from './Nav/Nav';
const Container = styled.main`
  display: fles;
  flex-direction: column;
  gap: 24px;
  padding: 0 15px;
  max-width: 900px;
  margin: 0 auto;
`;
function Loading() {
  return <h2>🌀 Loading...</h2>;
}
export const AppLayout = () => {
  return (
    <Container>
      <Nav />
      <hr />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Toaster />
    </Container>
  );
};
