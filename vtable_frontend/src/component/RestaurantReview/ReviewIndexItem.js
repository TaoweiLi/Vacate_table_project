import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from "@mui/material";
import { deleteReview } from '../../store/reviews'


export default function ReviewIndexItem({ review, onUpdateReview }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);


  function handleUpdateSubmit(e) {
    // e.preventDefault();
    //   const newReview = { ...review, user_id: sessionUser.id }
    //   dispatch(createReview(newReview));
    //   setReview(reviewData);
    onUpdateReview(review)
  }

  function handleDeleteSubmit(e) {
    e.preventDefault();
    dispatch(deleteReview(review.id));
  }



  return (

    <>
      <li id="review-content">
        <section id="reviewer-info">{review.reviewerFirst} {review.reviewerLast[0]}</section>
        <section id="review-details">
          <div>
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div id="review-body">Review: {review.body}</div>
          <div id="update-delete-wrapper">
          {
            sessionUser && (sessionUser.id === review.userId) && (
              <div id="update-delete-container">
                <button id="update-button" onClick={handleUpdateSubmit}>Update</button>
                <button id="delete-button" onClick={handleDeleteSubmit}>Delete</button>
              </div>
            )
          }
          </div>
        </section>
      </li>
    </>
    // <div className='r-i-i-container'>
    //   <div className='r-i-i-n'>
    //     <div className="r-i-n">
    //       <a>{review.reviewerFirst} {review.reviewerLast}</a>
    //     </div>
    //   </div>
    //   <div className='r-i-i-b-d'>
    //     <p className='r-i-i-b'>{review.body}</p>
    //     {/* {(sessionUser ? sessionUser.id : null) === review.userId ? <p className='r-i-i-d' onClick={() => dispatch(deleteReview(review.id))}>Delete</p> : <p></p>} */}
    //   </div>
    // </div>
  )
}