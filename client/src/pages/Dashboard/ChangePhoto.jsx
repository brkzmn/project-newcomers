import React, { useEffect, useState } from "react";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import InputFile from "../../components/Forms/InputFile";
import Label from "../../components/Forms/Label";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "../User/CreateUser.testid";
import "../User/CreateUser.css";
import Button from "./../../components/Button";
import Form from "../../components/Forms/Form";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner/Spinner";
//import { AuthContext } from "../../AuthContext";
import Error from "../../components/Error/Error";
//import { toast } from "react-toastify";
import { logInfo } from "../../../../server/src/util/logging";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import { IoMdClose } from "react-icons/io";

const ChangePhoto = () => {
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  const onSuccess = (response) => {
    logInfo(response);
    window.location.reload();
    navigate("/dashboard");
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/changephoto",
    onSuccess
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileImage) {
      const data = new FormData();
      data.append("profileImage", profileImage);

      performFetch({
        method: "POST",
        credentials: "include",
        body: data,
      });
    }
  };
  useEffect(() => {
    return () => {
      cancelFetch();
    };
  }, []);

  return (
    <div className="changePhoto-form-wrapper">
      <IoMdClose
        onClick={() => {
          navigate("/dashboard");
        }}
        className="change-info-close-btn"
      />
      {isLoading && !error && <Spinner />}
      {error && <Error>{error}</Error>}
      <Form
        onSubmit={handleSubmit}
        className="form changePhoto-form"
        title="Change your profile image"
      >
        <InputFieldContainer className="profile-image-wrapper">
          <Label for="proFileImage">New Image</Label>
          <InputFile
            name="profileImage"
            accept="image/*"
            //className="profile-image-input"
            //placeholder={profileImage && profileImage.name }
            className={"input profile-image-input"}
            id="profileImage"
            onChange={(e) => {
              logInfo(e.target.value);
              setProfileImage(e.target.files[0]);
            }}
          />
        </InputFieldContainer>
        <Button
          className="btn-block"
          data-testid={TEST_ID.submitButton}
          type="submit"
        >
          Change profile image
        </Button>
      </Form>
    </div>
  );
};
export default ChangePhoto;
