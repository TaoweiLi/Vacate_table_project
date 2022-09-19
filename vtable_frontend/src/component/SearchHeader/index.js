import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { fetchQueryRestaurants } from '../../store/restaurants';
import "./SearchHeader.scss"

function SearchHeader() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const history = useHistory();


  const handleSubmit = (e) => {

    e.preventDefault();
    // dispatch(fetchQueryBusinesses(query));
    history.push(`/search/${query}`)
  }


  return (
    <>
  
      <header id="search-header-wrapper">
        <div id="search-header-content">
          <h1 id="search-header-text">Find your table for any occasion</h1>
          <div id="search-bar-wrapper">
            <div id="search-bar-content-wrapper">

              <div id="search-bar-left">
                <div className="dtp" id="dtp-date">
                  <button id="dtp-date-button">
                    <div id="dtp-date-view">
                      <div id="dtp-date-view-icon">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><g fill="none" fillRule="evenodd"><path d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z" fill="#2D333F"></path></g></svg>
                      </div>
                      <div id="dtp-date-view-content">
                        Sep 16, 2022
                      </div>
                      <div id="dtp-date-view-arrow">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><g fill="none" fillRule="evenodd"><path d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z" fill="#2D333F" transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"></path></g></svg>
                      </div>
                    </div>
                  </button>
                  <div></div>
                </div>

                <div className="dtp" id="dtp-time">
                  <select id="dtp-time-drop">
                    <option value="2000-02-01T22:30:00">10:30 PM</option>
                  </select>
                  <div id="dtp-time-view">
                    <div id="dtp-time-view-icon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><g fill="none" fillRule="evenodd"><path d="M13,11 L14.5,11 C14.7761424,11 15,11.2238576 15,11.5 L15,12.5 C15,12.7761424 14.7761424,13 14.5,13 L12.5,13 L11.5,13 C11.2238576,13 11,12.7761424 11,12.5 L11,7.5 C11,7.22385763 11.2238576,7 11.5,7 L12.5,7 C12.7761424,7 13,7.22385763 13,7.5 L13,11 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z" fill="#2D333F"></path></g></svg>
                    </div>
                    <div id="dtp-time-view-content">
                      10:30 PM
                    </div>
                    <div id="dtp-time-view-arrow">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><g fill="none" fillRule="evenodd"><path d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z" fill="#2D333F" transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"></path></g></svg>
                    </div>
                  </div>
                </div>

                <div className="dtp" id="dtp-people">
                  <select id="dtp-people-drop">
                    <option value="2">2 people</option>
                  </select>
                  <div id="dtp-people-view">
                    <div id="dtp-people-view-icon">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><g fill="none" fillRule="evenodd"><path d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z" fill="#2D333F"></path></g></svg>
                    </div>
                    <div id="dtp-people-view-content">
                      2 people
                    </div>
                    <div id="dtp-people-view-arrow">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false"><g fill="none" fillRule="evenodd"><path d="M11,11 L11,14.5 C11,14.7761424 10.7761424,15 10.5,15 L9.5,15 C9.22385763,15 9,14.7761424 9,14.5 L9,10.5 L9,9.5 C9,9.22385763 9.22385763,9 9.5,9 L14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,10.5 C15,10.7761424 14.7761424,11 14.5,11 L11,11 Z" fill="#2D333F" transform="translate(12.000000, 12.000000) rotate(-135.000000) translate(-12.000000, -12.000000)"></path></g></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div id="searvh-bar-right">
                <form action="/action_page.php" onSubmit={handleSubmit}>
                  {/* <i id="search-text-icon" className="fa-solid fa-magnifying-glass"></i> */}
                  <input id="search-bar-container" type="text" placeholder="Restaurant or Category" name="search" value={query} onChange={(e) => setQuery(e.target.value)} />
                  <button id="search-button" type="submit">Let’s go</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </header>


    </>
  )
}

export default SearchHeader;