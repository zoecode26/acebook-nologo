import React from 'react';
import moment from 'moment';
import Button from "../UI/Button/Button";
import Comment from "../Comments/Comment";
import Aux from "../../hoc/Aux/Aux";
import Comments from "../Comments/Comments";


const Post = (props) => {
	let comments = null;
	if(props.displayComments) {
		comments = <Comments
									comments={props.comments}
									user={props.user}
									post_id={props.post.id}
									updateComments={props.updateComments}
		/>
	}
	let date = new Date(props.post.created_at);
	let formattedDate = moment(date).fromNow();
	let likesString = "";
	let deleteControls = null;
	//show delete button if you made post
	if(props.post.user.id == props.user.id) {
		deleteControls = <Button btnType="Danger" clicked={props.deletePost}>Delete</Button>;
	}
	let likeControls = <Button btnType="Success" clicked={props.likePost}> Like </Button>
	if(props.likes.length != 0) {
		likesString = "Liked by: "
		props.likes.forEach(like => {
			likesString += like.user.firstName + ", ";
			if(like.user.id == props.user.id) {
				likeControls = <Button btnType="Danger" clicked={props.unlikePost}>Unlike</Button>
			}
		})
		likesString = likesString.slice(0, -2)
	}





	return (
			<Aux>
		<div className='post-main'>
			<div className="post-author">
				<span>{`By: ${props.post.user.firstName} ${props.post.user.lastName}`}</span><span>{formattedDate}</span>
			</div>
			<div className='post-content'>
				{props.post.content}
			</div>

			<div className="controls">
				<div className='likes'>
					{likesString}
				</div>
				{likeControls}
				<Button
						btnType="Success"
						clicked={props.showComments}>
					{props.displayComments ? "Hide Comments" : `Show Comments (${props.comments.length})`  }
				</Button>
				{deleteControls}
			</div>
		</div>
				{comments}
			</Aux>
	)
}

export default Post;
