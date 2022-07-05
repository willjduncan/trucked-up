import React from "react";
import { Navigate, useParams } from "react-router-dom";

// import FriendList from "../components/FriendList";
// import { ADD_FRIEND } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
// import JobForm from "../components/JobForm";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
//   const [addFriend] = useMutation(ADD_FRIEND);

  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }
//   console.log(user);
//   const handleClick = async () => {
//     try {
//       await addFriend({
//         variables: { id: user._id },
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        {/* {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )} */}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          {/* <JobList
            user={user}
            username={`${user.username}'s assignments...`}
          /> */}
        </div>

        {/* <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div> */}
      </div>
      {/* <div className="mb-3">{!userParam && <JobForm />}</div> */}
    </div>
  );
};

export default Profile;
