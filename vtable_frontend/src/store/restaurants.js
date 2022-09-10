export const RECEIVE_RESTAURANTS = "restaurants/RECEIVE_RESTAURANTS";
export const RECEIVE_RESTAURANT = "restaurants/RECEIVE_RESTAURANT";
export const RECEIVE_TAGGED_RESTAURANTS = "restaurants/RECEIVE_TAGGED_RESTAURANTS";


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

export function receiveTaggedRestaurants(tag, restaurants) {
  return {
    type: RECEIVE_TAGGED_RESTAURANTS,
    tag: tag,
    restaurants: restaurants
  }
}



// selector
export function getRestaurant(restaurantId) {
  return function (state) {
    if (!state || !state["restaurants"]) {
      return null;
    }

    return state["restaurants"][restaurantId];
  }
}

export function getRestaurants(state) {
  if (!state || !state["restaurants"] || !state["restaurants"]["all"] ) {
    return [];
  }

  return Object.values(state["all"]);
}

export function getTaggedRestaurants(state, tag) {
  
  if (!state || !state["restaurants"] || !state["restaurants"][tag]) {
    return [];
  }

  return Object.values(state["restaurants"][tag]);
}


// thunk action
export function fetchRestaurants() {
  return async function (dispatch) {

    const response = await fetch("/api/restaurants");
  
    if (response.ok) {
      const restaurants = await response.json();
      dispatch(receiveRestaurants(restaurants));
      return restaurants;
    }
  }
}

export function fetchTaggedRestaurants(tag) {
  return async function (dispatch) {

    const response = await fetch("/api/restaurants?tag=" + tag);

    if (response.ok) {
      const restaurants = await response.json();
      dispatch(receiveTaggedRestaurants(tag, restaurants));

      // return restaurants;
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
      newState["all"] = action.restaurants
      return newState;
    case RECEIVE_TAGGED_RESTAURANTS:
      newState[action.tag] = action.restaurants
      return newState;
    case RECEIVE_RESTAURANT:
      newState[action.restaurant.id] = action.restaurant;
      return newState;
    default:
      return state;
  }
}

export default restaurantsReducer;