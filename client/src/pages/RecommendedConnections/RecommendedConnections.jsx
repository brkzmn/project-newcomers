import React, { useEffect, useState } from "react";
import "./RecommendedConnections.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserCard from "../../components/RecentConnections/UserCard";
import Tags from "./Tags";
import Button from "./../../components/Button";
import useFetch from "./../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import useUserDetails from "../../hooks/useUserDetails";

const RecommendedConnections = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [users, setUsers] = useState([]);
  const { userDetails } = useUserDetails();
  const onSuccess = (res) => {
    const { users } = res;
    setUsers(users);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/find_matches",
    onSuccess
  );

  useEffect(() => {
    if (state !== null) {
      const interests = state.selectedInterests;
      const province = state.province;

      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          interests,
          province,
        }),
      });

      return cancelFetch;
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  if (users.length === 0) {
    return (
      <>
        <div className="btn-wrapper">
          <Button className={"btn-inline"} onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <h1 className="empty-users-fallback">
          Sorry. We could not find any users that match your search preferences
        </h1>
      </>
    );
  }

  return (
    <div className="recommended-connections">
      {users.length > 0 &&
        users.map((user, index) => {
          const navigateToChat = () => {
            localStorage.setItem("receiver", JSON.stringify(user));
            navigate(`/chat/${user._id}`, {
              state: { receiver: user, userId: userDetails._id },
            });
          };
          return (
            <div className="card-wrapper" key={index}>
              <UserCard user={user}>
                <Tags tags={user.interests} />
              </UserCard>
              <div className="btn-wrapper">
                <Button className={"btn-inline"} onClick={navigateToChat}>
                  Start a conversation
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RecommendedConnections;
