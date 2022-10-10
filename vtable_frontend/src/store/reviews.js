// import { dispatch } from "d3";
import csrfFetch from "./csrf";

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
export const RECEIVE_REVIEW = "RECEIVE_REVIEW"
export const REMOVE_REVIEW = "REMOVE_REVIEW"

const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
})

const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
})


const removeReview = reviewId => ({
  type: REMOVE_REVIEW,
  reviewId
})

export const getReviews = state => {
  if (!state.reviews) {
    return []
  }
  return Object.values(state.reviews)
}

export const getReviewsByResId = restaurantId => state => {
  if (!state) {
    return null
  } else if (!state.reviews) {
    return null
  } else {
    const matched = []
    Object.values(state.reviews).forEach((review) => {
      if (review.restaurantId == restaurantId) {
        matched.push(review)
      }
    })
    return matched
  }
}

export const getReview = reviewId => state => {
  if (!state) {
    return null
  } else if (!state.reviews) {
    return null
  } else {
    return state.reviews[reviewId]
  }
}

export const fetchReviews = () => async dispatch => {
  const response = await csrfFetch('/api/reviews');
  if (response.ok) {
    const reviews = await response.json()
    dispatch(receiveReviews(reviews))
  }
}

export const fetchReviewsByRestaurantId = (restaurantId) => async dispatch => {
  const response = await csrfFetch('/api/reviews?restaurantId=' + restaurantId);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(receiveReviews(reviews));
  }
}


export const fetchReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`)
  if (response.ok) {
    const review = await review.json()
    dispatch(receiveReview)
  }
}

export const createReview = (review) => async dispatch => {

  const response = await csrfFetch('/api/reviews', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review)
  })
  if (response.ok) {
    const review = await response.json()
    dispatch(receiveReview(review))
  }
}

export const updateReview = (review) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review)
  })
  if (response.ok) {
    const review = await response.json()
    dispatch(receiveReview(review))
  }
}

export const deleteReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    dispatch(removeReview(reviewId))
  }
}

const reviewsReducer = (state = {}, action) => {
  Object.freeze(state)
  const nextState = { ...state }

  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews
    case RECEIVE_REVIEW:
      nextState[action.review.id] = action.review
      return nextState
    case REMOVE_REVIEW:
      delete nextState[action.reviewId]
      return nextState
    default:
      return state
  }
}

export default reviewsReducer
















// import csrfFetch from "./csrf";


// export const RECEIVE_RESTAURANT_REVIEWS = "reviews/RECEIVE_RESTAURANT_REVIEWS";
// export const RECEIVE_RESTAURANT_REVIEW = "reviews/RECEIVE_RESTAURANT_REVIEW";
// export const REMOVE_RESTAURANT_REVIEW = "reviews/REMOVE_RESTAURANT_REVIEW";

// export function receiveRestaurantReviews(restaurantId, reviews) {
//   return {
//     type: RECEIVE_RESTAURANT_REVIEWS,
//     restaurantId,
//     reviews
//   }
// }

// export function receiveRestaurantReview(review) {
//   return {
//     type: RECEIVE_RESTAURANT_REVIEWS,
//     review
//   }
// }

// export function removeRestaurantReview(reviewId) {
//   return {
//     type: REMOVE_RESTAURANT_REVIEW,
//     reviewId
// }
// }

// // selector
// export function getRestaurantReviews(state) {
//   if (!state.reviews) {
//     return []
//   }
//   return Object.values(state.reviews)
// }


// export function getRestaurantReviewsByResId(state, restaurantId) {
//   // if (!state || !state["reviews"] || !state["reviews"]["restaurants"] || !state["reviews"]["restaurants"][restaurantId]) {
//   //   return [];
//   // }
 
//   if (!state["reviews"]["restaurants"][restaurantId]) {
//     return [];
//   }

//   return state["reviews"]["restaurants"][restaurantId];
// }

// export function getRestaurantReview(restaurantId) {
//   return function (state) {
//     if (!state || !state["reviews"]) {
//       return null;
//     }

//     return state["reviews"][restaurantId];
//   }
// }


// // thunk action
// export function fetchRestaurantReviews(restaurantId) {
//   return async function (dispatch) {
//     const response = await fetch("/api/reviews?restaurantId="+restaurantId);
 
//     if (response.ok) {
//       const reviews = await response.json();
//       dispatch(receiveRestaurantReviews(restaurantId, reviews));
//       return reviews;
//     }
//   }
// }

// export function fetchRestaurantReview(reviewId) {
//   return async function (dispatch) {
//     const response = await csrfFetch(`/api/reviews/${reviewId}`)
//     if (response.ok) {
//       const review = await review.json()
//       dispatch(receiveRestaurantReview(review))
//     }
//   }
// }

// export function createRestaurantReview(review) {
//   return async function (dispatch) {
//     const response = await csrfFetch('/api/reviews', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(review)
//     })
//     if (response.ok) {
//       const review = await response.json()
//       dispatch(receiveRestaurantReview(review))
//     }
//   }
// }

// export function updateRestaurantReview(review) {
//   return async function (dispatch) {
//     const response = await csrfFetch(`/api/reviews/${review.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(review)
//     })
//     if (response.ok) {
//       const review = await response.json()
//       dispatch(receiveRestaurantReview(review))
//     }
//   }
// }


// export function deleteRestaurantReview(reviewId) {
//   return async function (dispatch) {
//     const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//       method: "DELETE"
//     })
//     if (response.ok) {
//       dispatch(removeRestaurantReview(reviewId))
//     }
//   }
// }




// // reducer
// function reviewsReducer(state = {}, action) {
//   Object.freeze(state);
//   let newState = { ...state };

//   // switch (action.type) {
//   //   case RECEIVE_RESTAURANT_REVIEWS:
//   //     newState["restaurants"][action.restaurantId] = action.reviews
//   //     return newState;
//   //   default:
//   //     return state;
//   // }

//   switch (action.type) {
//     case RECEIVE_RESTAURANT_REVIEWS:
//       return action.reviews
//     case RECEIVE_RESTAURANT_REVIEW:
//       newState[action.review.id] = action.review
//       return newState
//     case REMOVE_RESTAURANT_REVIEW:
//       delete newState[action.reviewId]
//       return newState
//     default:
//       return state
//   }
// }

// export default reviewsReducer;