import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../utils/backend-Domain";
import CommentSection from "../comment/comment-component";
import EditBLogModal from "../edit-blog-modal.tsx/edit-blog-modal";
import "./blog-post.css";
interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    author: string;
    createdBy: { name: string };
    date: string;
    summary: string;
    content: string;
    imageUrl?: string;
  };
  comments?: { content: string; author?: { name: string }; _id: string }[];
}
function BlogPage() {
  const navigate = useNavigate();
  const blogId = localStorage.getItem("blogId");
  const token = localStorage.getItem("token");
  const user = JSON.parse(`${localStorage.getItem("user")}`);

  const [blog, setBlog] = useState<BlogPostPreviewProps["post"]>();
  const [comments, setComments] = useState<BlogPostPreviewProps["comments"]>();

  const [showModal, setShowModal] = useState(false);

  const handleShowBlog = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteBlog = async () => {
    await axios.delete(`${DOMAIN}/blogs/${blogId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN}/blogs/${blogId}`);
      setBlog(data?.data?.blog);
      setComments(data?.data?.blog.comments);
    };
    getData();
  }, [blogId, token]);
  return (
    <>
      <div className="BlogPage">
        <header className="BlogHeader">
          <img className="banner-img" src={blog?.imageUrl} alt="banner-img" />
          <div className="overlay"></div>
        </header>
        <div className="Banner"></div>
        <div className="Content">
          <div className="BlogPost">
            <h2>{blog?.title}</h2>
            <p>{blog?.content}</p>
            <div className="AuthorDate">
              <p>
                By {blog?.createdBy?.name} on {blog?.date?.slice(0, 10)}
              </p>
            </div>
            {user?.name === blog?.createdBy?.name ? (
              <div className="ButtonContainer">
                <button className="EditButton" onClick={handleShowBlog}>
                  Edit
                </button>
                <button className="DeleteButton" onClick={handleDeleteBlog}>
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <>{showModal && <EditBLogModal onClose={handleCloseModal} />}</>
      </div>
      <CommentSection comments={comments} />
    </>
  );
}

export default BlogPage;
