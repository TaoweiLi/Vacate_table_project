import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Rating } from "@mui/material";
import { deleteReview } from '../../store/reviews'


export default function ReviewIndexItem({ review }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  return (

    <>
      <li id="review-content">
        <section id="reviewer-info">{review.reviewerFirst} {review.reviewerLast}</section>
        <section id="review-details">
          <div>
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div>Review: {review.body}</div>
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