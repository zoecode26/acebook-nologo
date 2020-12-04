import React from 'react';
import moment from 'moment';
import Button from "../UI/Button/Button";

const Comment = (props) => {
  let date = new Date(props.comment.created_at);
  let formattedDate = moment(date).fromNow();
  let deleteControls = null;
  //show delete button if you made post
  if(props.comment.user.id == props.user.id) {
    deleteControls = <Button btnType="Danger" clicked={props.deleteComment}>Delete</Button>;
  }
  return (
      <div className='comment-main'>
        <div className="comment-author">
          <span>{`By: ${props.comment.user.firstName} ${props.comment.user.lastName}`}</span><span>{formattedDate}</span>
        </div>
        <div className='comment-content'>
          {props.comment.content}
        </div>
        <div className="controls">
          {deleteControls}
        </div>
      </div>
  )
}

export default Comment;
