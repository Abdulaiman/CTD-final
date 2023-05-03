import "./nav.css";
import { IoMdLogIn } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddBlogModal from "../blog-modal/add-blog-modal";

const Nav = () => {
  const [showModal, setShowModal] = useState(false);

  function handleAddBlog() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  const logoutHandler = () => {
    localStorage.clear();
  };

  const user = JSON.parse(`${localStorage.getItem("user")}`);
  console.log(user);

  return (
    <>
      <nav className="navbar">
        <div className="logo navbar-logo">
          <Link to={"/"}>Welcome {user?.name?.split(" ")[0]}</Link>
        </div>
        {user ? (
          <div className="search-container">
            {window.location.href ===
            "https://ctd-final.netlify.app/my-blogs" ? (
              <Link onClick={handleAddBlog} className="my-blogs" to="/my-blogs">
                Add Blog
              </Link>
            ) : (
              <Link className="my-blogs" to="/my-blogs">
                My Blogs
              </Link>
            )}
            :
          </div>
        ) : (
          ""
        )}
        <div className="login pointer">
          {user ? (
            <Link to={"/login"} onClick={logoutHandler}>
              Logout
              <IoMdLogIn />
            </Link>
          ) : (
            <Link to={"/login"}>
              Login
              <IoMdLogIn />
            </Link>
          )}
        </div>
      </nav>
      <>{showModal && <AddBlogModal onClose={handleCloseModal} />}</>
    </>
  );
};

export default Nav;
