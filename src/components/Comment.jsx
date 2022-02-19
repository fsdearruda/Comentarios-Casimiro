import React, { useState } from "react";
import "./comment.css";
import { MdThumbUp, MdOutlineThumbUp, MdThumbDown, MdOutlineThumbDown, MdSentimentSatisfiedAlt } from "react-icons/md";
import ReplyToggler from "./ReplyToggler";

const Comment = props => {
  const { isReply } = props;
  const { profilePic, username, commentLikes, message, createdAt, replies } = props.info;
  const [isLiked, setLiked] = useState(false);
  const [isDisliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(commentLikes);
  const [isDown, setDown] = useState(false);
  const [toggleState, setToggle] = useState(false);
  const [replyBox, openReplyBox] = useState(false);
  const [replyState, setReplyState] = useState("");
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
  // Tem que trocar isso pra outro arquivo, mas não sei como faz isso agora.
  const ReplyInput = () => {
    const [cancel, setCancel] = useState(false);

    const handleSubmit = e => {
      e.preventDefault();
      if (!replyState) return;
      console.log(replyState);
      openReplyBox(false);
      setReplyState("");
    };

    const handleCancel = () => {
      openReplyBox(false);
      setReplyState("");
    };

    return (
      <form onSubmit={e => handleSubmit(e)} style={{ display: "grid", gridTemplateColumns: "2.3em .3fr" }} className="comment-reply-input">
        <img className="author-picture" src="/assets/no-user.png" alt="" width="24px" />
        <div className="comment-reply-container">
          <input
            onChange={e => setReplyState(e.target.value)}
            value={replyState}
            placeholder="Adicione uma resposta pública..."
            className="comment-reply-box"
            type="text"
            autoFocus
          ></input>
          <div className="reply-options">
            <MdSentimentSatisfiedAlt className="reply-emoji-icon" />
            <span
              style={{ userSelect: "none" }}
              onMouseDown={() => setCancel(true)}
              onMouseLeave={() => setCancel(false)}
              onMouseUp={() => setCancel(false)}
              onClick={() => handleCancel()}
              className={`reply-cancel-btn${cancel ? " pressed" : ""}`}
            >
              cancelar
            </span>
            <button type="submit" style={{ border: "none" }} className={`reply-send-btn${replyState ? "" : " disabled"}`}>
              responder
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="comment" style={{ display: "grid", gridTemplateColumns: isReply ? "3em 1fr" : "3.5em 1fr" }}>
      <img className="author-picture" src={profilePic} alt="" width={isReply ? "28px" : "40px"} />

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
              onClick={() => openReplyBox(true)}
              className={`comment-reply-button${isDown ? " pressed" : ""}`}
            >
              responder
            </span>
          )}
        </div>
        {replyBox && <ReplyInput />}
        <span style={{ display: "inline-block" }} onClick={() => setToggle(!toggleState)}>
          {replies.length > 0 && (toggleState ? <ReplyToggler replyQuantity={replies.length} toggleState /> : <ReplyToggler replyQuantity={replies.length} />)}
          {/* Adicionar renderização das replies aqui */}
        </span>
      </div>
    </div>
  );
};

export default Comment;
