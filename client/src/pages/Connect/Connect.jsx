import React, { useState, useEffect } from "react";
import "./Connect.css";
import RecentConnections from "../../components/RecentConnections/RecentConnections";
import makeAConnection from "../../images/make-a-connection-desktop.jpg";
import InterestsFilter from "./InterestsFilter";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../hooks/useUserDetails";
import Label from "../../components/Forms/Label";
import Select from "../../components/Forms/Select";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Spinner from "../../components/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import Error from "../../components/Error/Error";

const Connect = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails, isMeLoading, meError, cancelMeFetch } =
    useUserDetails();
  const [province, setProvince] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestsErr, setInterestsErr] = useState(null);
  const [provinceErr, setProvinceErr] = useState(null);
  const onAddInterestSuccess = (res) => {
    const { interest } = res;

    setUserDetails((prev) => {
      return { ...prev, interests: [...prev.interests, interest] };
    });
    setInterestsErr(null);
  };

  const onDeleteInterestSuccess = (res) => {
    const { interest } = res;

    setUserDetails((prev) => {
      return {
        ...prev,
        interests: prev.interests.filter((item) => item !== interest),
      };
    });
  };

  const onAddProvinceSuccess = (res) => {
    const { province } = res;
    setUserDetails((prev) => {
      return { ...prev, province };
    });
    setProvinceErr(null);
  };

  const {
    isLoading: isAddInterestLoading,
    error: addInterestError,
    performFetch: postInterest,
    cancelFetch: cancelAddInterest,
  } = useFetch("/interest/add", onAddInterestSuccess);

  const {
    isLoading: isDeleteInterestLoading,
    error: deleteInterestError,
    performFetch: removeInterest,
    cancelFetch: cancelDeleteInterest,
  } = useFetch("/interest/delete", onDeleteInterestSuccess);

  const {
    isLoading: isAddProvinceLoading,
    error: addProvinceError,
    performFetch: postProvince,
    cancelFetch: cancelAddProvince,
  } = useFetch("/province/add", onAddProvinceSuccess);

  const addInterest = (interest) => {
    if (!selectedInterests.includes(interest)) {
      postInterest({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          interest,
        }),
      });
    }
  };

  const deleteInterest = (interest) => {
    removeInterest({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        interest,
      }),
    });
  };

  const updateProvince = (province) => {
    if (province !== "") {
      postProvince({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          province,
        }),
      });
    } else {
      setProvinceErr("Province is required to find a match!");
    }
  };

  const findMatches = () => {
    if (province !== "" && selectedInterests.length > 0) {
      navigate("/recommended-connections", {
        state: { selectedInterests, province },
      });
    } else {
      if (province === "") {
        setProvinceErr("Province is required to find a match!");
      }

      if (selectedInterests.length === 0) {
        setInterestsErr("At least one interest is required to find a match");
      }
    }
  };

  useEffect(() => {
    if (userDetails !== null) {
      if (userDetails.province !== null) {
        setProvince(userDetails.province);
      }
      setSelectedInterests(userDetails.interests);
    }
    return () => {
      cancelAddInterest();
      cancelAddProvince();
      cancelDeleteInterest();
      cancelMeFetch();
    };
  }, [userDetails]);

  return (
    <>
      {addInterestError && <Error>{addInterestError}</Error>}
      {deleteInterestError && <Error>{deleteInterestError}</Error>}
      {addProvinceError && <Error>{addProvinceError}</Error>}
      {meError && <Error>{meError}</Error>}
      <div className="ctnc-wrapper">
        <div className="ctnc-search-container">
          <div className="ctnc-filter-section">
            <h1 className="ctnc-section-title">Make A New Connection</h1>
            <section className="ctnc-interests">
              <Label className="ctnc-section-title">
                What are you interested at {userDetails?.firstName}?
              </Label>
              <InterestsFilter
                onInsertInterest={addInterest}
                onDeleteInterest={deleteInterest}
                selectedInterests={selectedInterests}
              />
              {interestsErr && <Error>{interestsErr}</Error>}
            </section>
            <section className="ctnc-location">
              <InputFieldContainer>
                <Label>which province do you live?</Label>
                <Select
                  value={province}
                  onChange={(value) => updateProvince(value)}
                  options={[
                    { text: "select your province", value: "" },
                    { value: "Drenthe", text: "Drenthe" },
                    { value: "Flevoland", text: "Flevoland" },
                    { value: "Friesland", text: "Friesland" },
                    { value: "Gelderland", text: "Gelderland" },
                    { value: "Groningen", text: "Groningen" },
                    { value: "Limburg", text: "Limburg" },
                    { value: "North Brabant", text: "North Brabant" },
                    { value: "North Holland", text: "North Holland" },
                    { value: "Overijssel", text: "Overijssel" },
                    { value: "South Holland", text: "South Holland" },
                    { value: "Utrecht", text: "Utrecht" },
                    { value: "Zeeland", text: "Zeeland" },
                  ]}
                />
                {provinceErr && <Error>{provinceErr}</Error>}
              </InputFieldContainer>
            </section>
            <Button className={"btn-block"} type="button" onClick={findMatches}>
              Find a match
            </Button>
          </div>
          <section className="ctnc-illustration">
            <div className="ctnc-img-container">
              <img src={makeAConnection} alt="make a new connection" />
            </div>
          </section>
        </div>
        {((!addInterestError &&
          !deleteInterestError &&
          !addProvinceError &&
          !meError &&
          isAddInterestLoading) ||
          isDeleteInterestLoading ||
          isMeLoading ||
          isAddProvinceLoading) && <Spinner />}
        {userDetails && <RecentConnections userId={userDetails._id} />}
      </div>
    </>
  );
};

export default Connect;
