import { fetchReviews } from 'services/Api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewsStyled, TextReviews, TextTitle } from './Reviews.styled';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    async function movieReviews() {
      try {
        const fetchedReviews = await fetchReviews(movieId);
        if (fetchedReviews && fetchedReviews.results) {
          setReviews(fetchedReviews.results);
        } else {
          console.log('Received empty or unexpected data:', fetchedReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    movieReviews();
  }, [movieId]);
  return (
    <ReviewsStyled>
      <h1>Reviews</h1>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <TextTitle>{author}</TextTitle>
              <TextReviews>{content}</TextReviews>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews information available.</p>
      )}
    </ReviewsStyled>
  );
};
