import csrfFetch from "./csrf";


export const RECEIVE_RESERVATIONS = "reservations/RECEIVE_RESERVATIONS";
export const RECEIVE_RESERVATION = "reservations/RECEIVE_RESERVATION";
export const REMOVE_RESERVATION = "reservations/REMOVE_RESERVATION";

export function receiveReservations(reservations) {
  return {
    type: RECEIVE_RESERVATIONS,
    reservations: reservations
  }
}

export function receiveReservation(reservation) {
  return {
    type: RECEIVE_RESERVATION,
    reservation: reservation
  }
}

export function removeReservation(reservationId) {
  return {
    type: REMOVE_RESERVATION,
    reservationId: reservationId
  }
}

// selector
export function getReservation(reservationId) {
  return function (state) {
    if (!state || !state["reservations"]) {
      return null;
    }

    return state["reservations"][reservationId];
  }
}

export function getReservations(state) {
  if (!state || !state["reservations"]) {
    return [];
  }
  return Object.values(state["reservations"]);
}



// thunk action creator
export function fetchReservations() {
  return async function (dispacth) {
    const response = await csrfFetch("/api/reservations");
    if (response.ok) {
      const reservations = await response.json();
      dispacth(receiveReservations(reservations));
      return true;
    }
    return false;
  }
}

export function fetchUserReservations(userId) {
  return async function (dispacth) {
    const response = await csrfFetch("/api/reservations?userId="+userId);

    if (response.ok) {
      const reservations = await response.json();
      dispacth(receiveReservations(reservations));
      return true;
    }
    return false;
  }
}

export function fetchReservation(reservationId) {
  return async function (dispatch) {
    const response = await csrfFetch(`/api/reservations/${reservationId}`)
    if (response.ok) {
      const reservation = await response.json();
      dispatch(receiveReservation(reservation));
      // return post;
      return true
    }
    return false
  }
}

export function createReservation(reservation) {

  return async function (dispatch) {
    const response = await csrfFetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Accept": "application/json"
        "X-CSRF-Token": sessionStorage.getItem('X-CSRF-Token')
      },
      body: JSON.stringify(reservation)
    })
 
    if (response.ok) {
      const data = await response.json();
      dispatch(receiveReservation(data));
      return true
    }
    return false
  }
}

export function updateReservation(reservation) {
  return async function (dispatch) {
    const response = await csrfFetch(`/api/reservations/${reservation.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reservation)
    })
    if (response.ok) {
      const data = await response.json();
      dispatch(receiveReservation(data));
      return true
    }
    return false
  }
}

export function deleteReservation(reservationId) {
  
  return async function (dispatch) {
    const response = await csrfFetch(`/api/reservations/${reservationId}`, {
      method: "DELETE"
    })
 
    if (response.ok) {

      dispatch(removeReservation(reservationId));
      return true
    }

    return false
  }
}


// reducer
function reservationReducer(state = {}, action) {
  Object.freeze(state);
  let newState = { ...state };

  switch (action.type) {
    case RECEIVE_RESERVATIONS:
      newState = { ...action.reservations };
      return newState;
    case RECEIVE_RESERVATION:
      newState[action.reservation.id] = action.reservation;
      return newState;
    case REMOVE_RESERVATION:
      delete newState[action.reservationId];
      return newState;
    default:
      return state;
  }
}

export default reservationReducer;

