import { Route, Routes, Navigate } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { GlobalStyle } from './GlobalStyled';

import HomePage from 'pages/HomePage';
import MovieDetailsPage from 'pages/MovieDetailsPage';
import MoviesPage from 'pages/MoviesPage';
import Cast from './Cast/Cast';
import Reviews from './Reviews/Reviews';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies/" element={<MoviesPage />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>

      <GlobalStyle />
    </>
  );
};
