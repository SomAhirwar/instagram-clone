import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

const url = `http://127.0.0.1:8080`;

function Post({ profileImg, caption, username, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          alt={username}
          className="post__avatar"
          src={url + "/" + profileImg}
        />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} className="post__img" />

      <div className="post__footer">
        <div>
          <strong>{username}</strong> {caption}
        </div>
      </div>
    </div>
  );
}

export default Post;
