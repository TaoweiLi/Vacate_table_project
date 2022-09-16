import React, { useEffect } from 'react'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { SideSheet } from 'evergreen-ui';
import './ReviewIndex.css'
import { fetchReviews } from '../../store/reviews';
import { useDispatch } from 'react-redux';
import ReviewIndexItem from './ReviewIndexItem';
import ReviewForm from './ReviewForm';

// export default function ReviewIndex({ reviews }) {
//   const [isShown, setIsShown] = React.useState(false)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(fetchReviews())
//   }, [])
//   return (
//     <>
//       <SideSheet width={400} isShown={isShown} onCloseComplete={() => setIsShown(false)}>
//         <ReviewForm reviews={reviews} />
//         {reviews.map(review => {
//           return <ReviewIndexItem key={review.id} review={review} />
//         })}
//       </SideSheet>
//       <a onClick={() => setIsShown(true)}><ChatBubbleOutlineOutlinedIcon /></a>
//     </>

//   )
// }