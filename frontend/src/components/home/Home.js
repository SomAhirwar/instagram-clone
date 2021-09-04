import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import Post from "../post/Post";

function Home({
  authenticated,
  posts,
  username,
  usernameSetState,
  password,
  passwordSetState,
  setAuthenticated,
  setUser,
}) {
  return (
    <>
      {authenticated ? (
        posts.map((post) => (
          <Post
            key={post._id}
            username={post.user.username}
            profileImg={post.user.profileImg}
            caption={post.caption}
            imageUrl={`/${post.imageUrl}`}
          />
        ))
      ) : (
        <LoginForm
          username={username}
          usernameSetState={usernameSetState}
          password={password}
          passwordSetState={passwordSetState}
          setAuthenticated={setAuthenticated}
          setUser={setUser}
        />
      )}
    </>
  );
}

export default Home;
