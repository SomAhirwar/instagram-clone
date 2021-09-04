import React from "react";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import "./profile.css";

const url = `http://127.0.0.1:8080`;

function Profile({ match, user }) {
  const [profile, setProfile] = React.useState({});
  const [posts, setPosts] = React.useState([]);
  console.log(posts);
  React.useEffect(() => {
    console.log("hello");
    async function getResponse() {
      try {
        const res = await axios.get(`/${match.params.username}`);
        setProfile(res.data.data.user);
        setPosts(res.data.data.posts);
      } catch (error) {
        console.log(error);
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          alert(
            `Error (${error.response.status}):\n${error.response.data.error}`
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.log("response not recieved from server");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Error", error.message);
        }
      }
    }

    getResponse();
    console.log(user);
    console.log(profile);
  }, []);

  return (
    <div className="profile">
      <header className="profile__header">
        <div className="profile__headerImgBox">
          <Avatar
            src={`${url}/${profile.profileImg}`}
            alt={profile.username}
            className="profile__headerImg"
          />
        </div>
        <div className="profile__headerInfoBox">
          <div className="profile__usenameBox">
            <h2>{profile.username}</h2>
            {user.username !== profile.username ? (
              <button
                className="profile__headerFollowBtn"
                onClick={() => console.log("hellos")}
              >
                Follow
              </button>
            ) : (
              <button
                className="profile__headerEditBtn"
                onClick={() => console.log("hellos")}
              >
                Edit Profile
              </button>
            )}
          </div>
          <div className="profile__headerInfo">
            <span>
              <strong>{posts.length}</strong> Posts
            </span>
            <span>
              <strong>X</strong> Followers
            </span>
            <span>
              <strong>X</strong> Fllowing
            </span>
          </div>
          <h3>{profile.name}</h3>
        </div>
      </header>

      <div className="profile__posts">
        {posts.map((post) => (
          <div className="profile__postsImgContainer" key={post._id}>
            <img
              src={`/${post.imageUrl}`}
              alt={post.username}
              className="profile__postsImg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
