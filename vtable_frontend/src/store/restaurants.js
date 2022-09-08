export const RECEIVE_RESTAURANTS = "restaurants/RECEIVE_RESTAURANTS";
export const RECEIVE_RESTAURANT = "restaurants/RECEIVE_RESTAURANT";


export function receiveRestaurants(restaurants) {
  return {
    type: RECEIVE_RESTAURANTS,
    restaurants
  }
}

export function receiveRestaurant(restaurant) {
  return {
    type: RECEIVE_RESTAURANT,
    restaurant
  }
}


export function getRestaurant(restaurantId) {
  return function (state) {
    if (!state || !state["restaurants"]) {
      return null;
    }

    return state["restaurants"][restaurantId];
  }
}

export function getRestaurants(state) {
  if (!state || !state["restaurants"]) {
    return [];
  }

  return Object.values(state["restaurants"]);
}


export function fetchRestaurants() {
  return async function (dispacth) {
    const response = await fetch("/api/restaurants");
    if (response.ok) {
      const restaurants = await response.json();
      dispacth(receiveRestaurants(restaurants));
      return restaurants;
    }
  }
}

export function fetchRestaurant(restaurantId) {
  return async function (dispatch) {
    const response = await fetch(`/api/restaurants/${restaurantId}`)
    if (response.ok) {
      const restaurant = await response.json();
      dispatch(receiveRestaurant(restaurant));
      return restaurant;
    }
  }
}


function restaurantsReducer(state = {}, action) {
  Object.freeze(state);
  let newState = { ...state };

  switch (action.type) {
    case RECEIVE_RESTAURANTS:
      newState = { ...action.restaurants };
      return newState;
    case RECEIVE_RESTAURANT:
      newState[action.restaurant.id] = action.restaurant;
      return newState;
    default:
      return state;
  }
}

export default restaurantsReducer;