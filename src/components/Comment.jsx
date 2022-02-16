import React, { useState } from "react";
import "./comment.css";
import { MdThumbUp, MdOutlineThumbUp, MdThumbDown, MdOutlineThumbDown } from "react-icons/md";

const Comment = props => {
  const { profilePic, username, commentLikes, message, createdAt } = props.info;
  const [isLiked, setLiked] = useState(false);
  const [isDisliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(commentLikes);
  const [isDown, setDown] = useState(false);
  const handleLike = liked => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
      setDisliked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      setDisliked(false);
    }
  };
  const handleDislike = disliked => {
    if (disliked) {
      setLiked(false);
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
      if (isLiked) setLikes(likes - 1);
    }
  };

  return (
    <div className="comment">
      <img className="author-picture" src={profilePic} alt="" />
      <div className="comment-details">
        <div>
          <span className="comment-author">{username} </span>
          <span className="comment-date">{createdAt}</span>
        </div>
        <span>{message}</span>
        <div className="comment-likes">
          <span className="like-btn">{!isLiked ? <MdOutlineThumbUp onClick={() => handleLike(isLiked)} /> : <MdThumbUp onClick={() => handleLike(isLiked)} />}</span>
          <span className="like-qnt">{likes}</span>
          <span className="like-btn">
            {!isDisliked ? <MdOutlineThumbDown onClick={() => handleDislike(isDisliked)} /> : <MdThumbDown onClick={() => handleDislike(isDisliked)} />}
          </span>
          <span
            onMouseDown={() => setDown(true)}
            onMouseLeave={() => setDown(false)}
            onMouseUp={() => setDown(false)}
            className={`comment-reply-button${isDown ? " pressed" : ""}`}
          >
            responder
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
