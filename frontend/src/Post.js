import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

function Post({ caption, username, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={username} className="post__avatar" />
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
