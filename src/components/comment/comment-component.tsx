import React, { useEffect, useState } from "react";
import AddCommentModal from "../comment-modal/add-comment-modal";

interface Icomment {
  content?: string;
  author?: string;
  comments?: { content: string; author?: { name: string }; _id: string }[];
}

const CommentSection: React.FC<Icomment> = ({ comments }): JSX.Element => {
  const [showCommentModal, setShowCommentModal] = useState(false);

  const handleShowCommentModal = () => {
    setShowCommentModal(true);
  };
  const handleCloseModalComment = () => {
    setShowCommentModal(false);
  };
  const user = JSON.parse(`${localStorage.getItem("user")}`);

  return (
    <div className="comment-section">
      <div>
        <h2>Comments</h2>
        <ul>
          {comments?.map((comment) => (
            <li key={comment._id}>
              <h3>{comment?.author?.name}</h3>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
        {user ? (
          <button type="button" onClick={handleShowCommentModal}>
            Add Comment
          </button>
        ) : (
          <h2>login to add comments</h2>
        )}
      </div>
      <>
        {showCommentModal && (
          <AddCommentModal onClose={handleCloseModalComment} />
        )}
      </>
    </div>
  );
};

export default CommentSection;
