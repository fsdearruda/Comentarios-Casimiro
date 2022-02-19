/* import React from "react"; */
import "./toggler.css";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const ReplyToggler = props => {
  const { toggleState, replyQuantity } = props;

  return (
    <div style={{ width: "max-content" }} className="reply-toggler">
      {toggleState ? <MdArrowDropUp size={28} className="toggle-icon" /> : <MdArrowDropDown size={28} className="toggle-icon" />}
      <span className="reply-text"> {toggleState ? `Ocultar ${replyQuantity} respostas` : `Ver ${replyQuantity} resposta${replyQuantity !== 1 ? "s" : ""}`} </span>
    </div>
  );
};

export default ReplyToggler;
