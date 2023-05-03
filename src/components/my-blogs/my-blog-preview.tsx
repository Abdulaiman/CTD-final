import "./my-blog-preview.css";
import BlogPreview from "../blog-preview/blog-preview";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "../../utils/backend-Domain";
interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    author: string;
    createdBy?: { name: string };
    date: string;
    summary: string;
    content: string;
  }[];
}

const MyBLogs: React.FC = (): JSX.Element => {
  const [data, setData] = useState<BlogPostPreviewProps["post"]>();
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${DOMAIN}/blogs/my-blogs`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setData(data?.data?.blogs);
    };
    getData();
  }, [token]);
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  return (
    <>
      {data?.length === 0 ? (
        <div className="no-blog-parent">
          <h1>No Blogs</h1>
          <h2>You are Yet To Create Any Blog</h2>
        </div>
      ) : (
        <div className="blog-post-list-container">
          {data?.map((post) => {
            post.createdBy = user;
            return <BlogPreview key={post._id} post={post} />;
          })}
        </div>
      )}
    </>
  );
};
export default MyBLogs;
