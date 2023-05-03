import axios from "axios";
import React, { useState } from "react";
import DOMAIN from "../../utils/backend-Domain";
import "./add-comment-modal.css";

function AddCommentModal(props: any) {
  const [content, setContent] = useState("");
  const token: string | null = localStorage.getItem("token");
  const blogId: string | null = localStorage.getItem("blogId");

  const onPostComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const data = await axios.post(
      `${DOMAIN}/blogs/comment/${blogId}`,
      { content },
      { headers: { authorization: `Bearer ${token}` } }
    );
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Comment</h2>
        <form>
          <label htmlFor="content">comment</label>
          <textarea
            id="content"
            name="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="modal-buttons">
            <button type="button" onClick={props.onClose}>
              Cancel
            </button>
            <button type="submit" onClick={onPostComment}>
              Post comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCommentModal;
