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
  console.log("DEBUG 1212   ", state)
  if (!state || !state["restaurants"] || !state["restaurants"][tag]) {
    return [];
  }
  console.log("DEBUG 3333   ", tag)
  console.log(state["restaurants"][tag])
  return Object.values(state["restaurants"][tag]);
}


// thunk action
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

export function fetchTaggedRestaurants(tag) {
  return async function (dispacth) {

    const response = await fetch("/api/restaurants?tag=" + tag);
    console.log("DEBUG 1111   ", tag)
    if (response.ok) {
      const restaurants = await response.json();
      dispacth(receiveTaggedRestaurants(tag, restaurants));
      console.log("DEBUG 2222 ", restaurants)
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
      console.log("DEVUG XXXXY ", action)
      newState[action.tag] = action.restaurants
      console.log("DEVUG XXXX ",newState)
      return newState;
    case RECEIVE_RESTAURANT:
      newState[action.restaurant.id] = action.restaurant;
      return newState;
    default:
      return state;
  }
}

export default restaurantsReducer;