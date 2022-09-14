import csrfFetch from "./csrf";


export const RECEIVE_RESTAURANT_REVIEWS = "reviews/RECEIVE_RESTAURANT_REVIEWS";
export const RECEIVE_RESTAURANT_REVIEW = "reviews/RECEIVE_RESTAURANT_REVIEW";
export const REMOVE_RESTAURANT_REVIEW = "reviews/REMOVE_RESTAURANT_REVIEW";

export function receiveRestaurantReviews(restaurantId, reviews) {
  return {
    type: RECEIVE_RESTAURANT_REVIEWS,
    restaurantId,
    reviews
  }
}

export function receiveRestaurantReview(review) {
  return {
    type: RECEIVE_RESTAURANT_REVIEWS,
    review
  }
}

export function removeRestaurantReview(reviewId) {
  return {
    type: REMOVE_RESTAURANT_REVIEW,
    reviewId
}
}


export function getRestaurantReviews(state, restaurantId) {
  // if (!state || !state["reviews"] || !state["reviews"]["restaurants"] || !state["reviews"]["restaurants"][restaurantId]) {
  //   return [];
  // }
 
  if (!state["reviews"]["restaurants"][restaurantId]) {
    return [];
  }

  return state["reviews"]["restaurants"][restaurantId];
}


export function fetchRestaurantReviews(restaurantId) {
  return async function (dispatch) {
    const response = await fetch("/api/reviews?restaurantId="+restaurantId);

    if (response.ok) {
      const reviews = await response.json();
      dispatch(receiveRestaurantReviews(restaurantId, reviews));
      return reviews;
    }
  }
}


function reviewsReducer(state = { "restaurants" : {} }, action) {
  Object.freeze(state);
  let newState = { ...state };

  switch (action.type) {
    case RECEIVE_RESTAURANT_REVIEWS:
      newState["restaurants"][action.restaurantId] = action.reviews
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;