import "./blogs.css";
import BlogPreview from "../blog-preview/blog-preview";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMAIN from "../../utils/backend-Domain";
interface BlogPostPreviewProps {
  post: {
    _id: string;
    title: string;
    author: string;
    date: string;
    summary: string;
    content: string;
  }[];
}
const Blogs: React.FC<any> = ({ post }): JSX.Element => {
  // const [data, setData] = useState<BlogPostPreviewProps["post"]>();
  // const token: string | null = localStorage.getItem("token");
  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await axios.get(`${DOMAIN}/blogs`);
  //     setData(data?.data?.blogs);
  //   };
  //   getData();
  // }, [token]);
  // console.log(data);
  console.log(post);
  return (
    <div className="blog-post-list-container">
      {post?.map((post: any) => (
        <BlogPreview key={post?._id} post={post} />
      ))}
    </div>
  );
};
export default Blogs;
