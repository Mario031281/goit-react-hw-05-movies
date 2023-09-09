import { fetchCast } from 'services/Api';
import { useParams } from 'react-router-dom';
import { defaultImgUrl } from 'components/img/img';
import { useEffect, useState } from 'react';
import {
  CastImg,
  CastList,
  CastStyled,
  TextCast,
  TextTitle,
} from './Cast.styled';

export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    async function movieCredits() {
      try {
        const fetchedCredits = await fetchCast(movieId);
        setCast(fetchedCredits.cast);
      } catch (error) {
        console.log(error);
      }
    }
    movieCredits();
  }, [movieId]);

  return (
    <CastStyled>
      <h1>Cast</h1>
      {cast.length !== 0 ? (
        <CastList>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id}>
              <CastImg
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultImgUrl
                }
                alt={name}
                width="100"
              />
              <TextTitle>{name}</TextTitle>
              <TextCast>Character: {character}</TextCast>
            </li>
          ))}
        </CastList>
      ) : (
        <p>No cast information available.</p>
      )}
    </CastStyled>
  );
};
