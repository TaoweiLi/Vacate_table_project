// import RestaurantShow from "../RestaurantShow";

function ReservationPage (props) {

  const { partySize, date, time} = props.location.state;
  const initialState = {
    partySize: partySize,
    date: date,
    time: time,
  }


  return (
    <>
    <h1>{partySize}</h1>
    </>
  )
}

export default ReservationPage;