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
    return (
      <form style={{ display: "grid", gridTemplateColumns: "2.3em .3fr" }} className="comment-reply-input">
        <img className="author-picture" src="/assets/no-user.png" alt="" width="24px" />
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
          <input
            onChange={e => setReplyState(e.target.value)}
            value={replyState}
            placeholder="Adicione uma resposta pública..."
            className="comment-reply-box"
            type="text"
            autoFocus
          ></input>
          <div>
            <MdSentimentSatisfiedAlt className="reply-emoji-icon" />
            <span className="reply-send-btn">responder</span>
            <span
              style={{ userSelect: "none" }}
              onMouseDown={() => setCancel(true)}
              onMouseLeave={() => setCancel(false)}
              onMouseUp={() => setCancel(false)}
              onClick={() => openReplyBox(false)}
              className={`reply-cancel-btn${cancel ? " pressed" : ""}`}
            >
              cancelar
            </span>
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
        <div onClick={() => setToggle(!toggleState)}>
          {replies.length > 0 && (toggleState ? <ReplyToggler replyQuantity={replies.length} toggleState /> : <ReplyToggler replyQuantity={replies.length} />)}
          {/* Adicionar renderização das replies aqui */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
