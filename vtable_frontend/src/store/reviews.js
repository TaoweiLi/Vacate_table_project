export const RECEIVE_RESTAURANT_REVIEWS = "reviews/RECEIVE_RESTAURANT_REVIEWS";

export function receiveRestaurantReviews(restaurantId, reviews) {
  return {
    type: RECEIVE_RESTAURANT_REVIEWS,
    restaurantId,
    reviews
  }
}


export function getRestaurantReviews(state, restaurantId) {
  // if (!state || !state["reviews"] || !state["reviews"]["restaurants"] || !state["reviews"]["restaurants"][restaurantId]) {
  //   return [];
  // }
  console.log("DEBUG AAA ", state)

  if (!state["reviews"]["restaurants"][restaurantId]) {
    return [];
  }
  console.log("DEBUG BBB ", state)
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