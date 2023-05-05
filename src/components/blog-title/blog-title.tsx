import "./blog-title.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMAIN from "../../utils/backend-Domain";
import Blogs from "../single-blog/blogs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

const BlogTitle: React.FC = (): JSX.Element => {
  const [data, setData] = useState<BlogPostPreviewProps["post"]>();
  const [search, setSearch] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const location = window.location.href;

  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    const getData = async () => {
      let data;
      location === "https://ctd-final.netlify.app/my-blogs"
        ? (data = await axios.get(`${DOMAIN}/blogs/my-blogs`, {
            headers: { authorization: `Bearer ${token}` },
          }))
        : (data = await axios.get(`${DOMAIN}/blogs/`));
      setData(data?.data?.blogs);
    };
    getData();
  }, [token, location]);

  const searchBlogs = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const getData = async () => {
      let data;
      window.location.href === "https://ctd-final.netlify.app/my-blogs"
        ? (data = await axios.get(`${DOMAIN}/blogs/my-blogs?title=${search}`, {
            headers: { authorization: `Bearer ${token}` },
          }))
        : (data = await axios.get(`${DOMAIN}/blogs?title=${search}`));
      setData(data?.data?.blogs);
    };
    getData();
  };

  const previousPage = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (page > 1) {
      let data;
      window.location.href === "https://ctd-final.netlify.app/my-blogs"
        ? (data = await axios.get(
            `${DOMAIN}/blogs/my-blogs?page=${page - 1}`,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          ))
        : (data = await axios.get(`${DOMAIN}/blogs?page=${page - 1}`));
      console.log(data);
      setPage(page - 1);
      setData(data?.data?.blogs);
    } else return;
  };
  const nextPage = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(page);
    let data;
    window.location.href === "https://ctd-final.netlify.app/my-blogs"
      ? (data = await axios.get(`${DOMAIN}/blogs/my-blogs?page=${page + 1}`, {
          headers: { authorization: `Bearer ${token}` },
        }))
      : (data = await axios.get(`${DOMAIN}/blogs?page=${page + 1}`));
    if (data.data.blogs.length === 0) {
      setPage(1);
    } else {
      setPage(page + 1);
      setData(data?.data?.blogs);
    }
  };

  return (
    <>
      <div className="blog-title">
        <h1 className="title">Blogs</h1>
        <div className="form-container">
          <form className="form">
            <input
              type="text"
              placeholder="search"
              className="input"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-btn" onClick={searchBlogs}>
              search
            </button>
          </form>
        </div>
      </div>
      <Blogs post={data} />
      <div className="arrows-container">
        <div className="arrow" onClick={previousPage}>
          <FaArrowLeft />
        </div>
        <div className="arrow" onClick={nextPage}>
          <FaArrowRight />
        </div>
      </div>
    </>
  );
};

export default BlogTitle;
