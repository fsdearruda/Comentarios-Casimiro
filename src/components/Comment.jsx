import React, { useState } from "react";
import "./comment.css";
import { MdThumbUp, MdOutlineThumbUp, MdThumbDown, MdOutlineThumbDown } from "react-icons/md";
import ReplyToggler from "./ReplyToggler";

const Comment = props => {
  const { isReply } = props;
  const { profilePic, username, commentLikes, message, createdAt, replies } = props.info;
  const [isLiked, setLiked] = useState(false);
  const [isDisliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(commentLikes);
  const [isDown, setDown] = useState(false);
  const [toggleState, setToggle] = useState(false);

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
      <div className="author-picture">
        <img src={profilePic} alt="" />
      </div>
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
          {!isReply && (
            <span
              onMouseDown={() => setDown(true)}
              onMouseLeave={() => setDown(false)}
              onMouseUp={() => setDown(false)}
              className={`comment-reply-button${isDown ? " pressed" : ""}`}
            >
              responder
            </span>
          )}
        </div>
        <span onClick={() => setToggle(!toggleState)}>
          {replies.length > 0 && (toggleState ? <ReplyToggler replyQuantity={replies.length} toggleState /> : <ReplyToggler replyQuantity={replies.length} />)}
          {/* Adicionar renderização das replies aqui */}
        </span>
      </div>
    </div>
  );
};

export default Comment;
