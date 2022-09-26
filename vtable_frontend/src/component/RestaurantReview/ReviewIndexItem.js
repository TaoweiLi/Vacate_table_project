import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from "@mui/material";
import { deleteReview } from '../../store/reviews'

export default function ReviewIndexItem({ review, onUpdateReview }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  function handleUpdateSubmit(e) {
    onUpdateReview(review)
    document.getElementById("nav-button-review").click();
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
  )
}