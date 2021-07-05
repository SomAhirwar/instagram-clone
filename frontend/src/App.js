import axios from "axios";
import React from "react";
import Post from "./Post";
import Icon from "react-icons-kit";
import { plus } from "react-icons-kit/metrize/plus";
import "./App.css";

const url = `http://127.0.0.1:8080`;

function App() {
  const [posts, setPosts] = React.useState([]);
  const usernameRef = React.useRef();
  const imageUrlRef = React.useRef();
  const captionRef = React.useRef();
  const form = React.useRef();

  React.useEffect(() => {
    async function getAllPosts() {
      const postServer = await axios.get(`${url}/posts`);
      setPosts(postServer.data.data.posts);
      return postServer;
    }

    getAllPosts();
  }, []);

  async function addPost(event) {
    event.preventDefault();

    console.log(event);
    const data = new FormData(event.target);
    console.log(imageUrlRef.current);
    data.set("username", usernameRef.current.value);
    data.set("imageUrl", imageUrlRef.current.files[0]);
    data.set("caption", captionRef.current.value);
    console.log();
    const post = await axios.post(`${url}/posts`, data);
    form.current.style.display = "none";
    setPosts((prev) => [post.data.data.post, ...prev]);
  }

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__headerContainer">
          <img
            className="app__headerImg"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          ></img>

          <a
            href="#"
            className="btn app__btn-upload"
            onClick={() =>
              (form.current.style.display =
                form.current.style.display === "flex" ? "none" : "flex")
            }
          >
            <Icon icon={plus} size={"25px"} />
            <span style={{ display: "inline-block", marginLeft: "10px" }}>
              Upload
            </span>
          </a>
        </div>
      </div>

      <form ref={form} className="app__uploadPost" onSubmit={addPost}>
        <input
          name="username"
          className="app__usename"
          placeholder="Username"
          ref={usernameRef}
        ></input>

        <input
          name="imageUrl"
          type="file"
          className="app__imageUrl"
          placeholder="Image"
          ref={imageUrlRef}
        ></input>

        <input
          name="caption"
          className="app__caption"
          placeholder="Caption"
          ref={captionRef}
        ></input>
        <button type="submit">Submit</button>
      </form>

      {posts.map((post) => (
        <Post key={post._id} {...post} imageUrl={`${url}/${post.imageUrl}`} />
      ))}
    </div>
  );
}

export default App;
