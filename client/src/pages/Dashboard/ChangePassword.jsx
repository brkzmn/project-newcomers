import React, { useEffect, useState } from "react";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Input from "../../components/Forms/Input";
import Label from "../../components/Forms/Label";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "../User/CreateUser.testid";
import "../User/CreateUser.css";
import Button from "./../../components/Button";
import Form from "../../components/Forms/Form";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import { logInfo } from "../../../../server/src/util/logging";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import "./Dashboard.css";

const PasswordHint = () => {
  return (
    <div className="hint password-hint">
      <h3> Password Requirements:</h3>
      <ul>
        <li>Be 6 characters or longer</li>
        <li>1 lowercase alphabetical character</li>
        <li>1 uppercase alphabetical character</li>
        <li>1 numeric character</li>
        <li>1 special character(!@#$%^&)</li>
      </ul>
    </div>
  );
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passError, setPassError] = useState("");
  const [isEqualPass, setIsEqualPass] = useState("");
  const [equalPassError, setEqualPassError] = useState("");
  const [isHint, setIsHint] = useState(false);
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#$%^&*])(?=.{6,64})"
  );
  const passwordValidation = () => {
    isValidPassword
      ? setPassError("")
      : setPassError("Please check the password pattern again.");
    return isValidPassword ? true : passError;
  };
  const confirmPassValidation = () => {
    isEqualPass
      ? setEqualPassError("")
      : setEqualPassError("Passwords are not same, try again");
    return isEqualPass ? true : equalPassError;
  };
  const isFormValid = () => {
    const validationArray = [passwordValidation(), confirmPassValidation()];
    const errorArray = [];
    for (let validation of validationArray) {
      if (validation !== true) {
        errorArray.push(validation);
      }
    }
    if (errorArray.length === 0) {
      return true;
    } else {
      return errorArray;
    }
  };
  const clearForm = () => {
    setNewPassword("");

    setConfirmPassword("");
  };
  const onSuccess = (response) => {
    logInfo(response);
    clearForm();
    navigate("/logout", {
      state:
        "Password changed successfully. You can now login using your new password",
    });
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/changepassword",
    onSuccess
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    isFormValid();

    if (isFormValid() === true) {
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });
    } else {
      isFormValid().map((error) => {
        toast.error(error, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };
  function showPassword() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
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
        <InputFieldContainer>
          <Label>Password</Label>
          <Input
            name="password"
            value={oldPassword}
            type="password"
            title="Required field"
            minLength="6"
            maxLength="64"
            onChange={(value) => setOldPassword(value)}
            className="login-input"
            data-testid={TEST_ID.passwordInput}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="password-wrapper">
          <Label>
            Password <span className="required-star">*</span>{" "}
            <span
              className="hint-sign"
              onMouseEnter={() => setIsHint(true)}
              onMouseLeave={() => setIsHint(false)}
            >
              ?{isHint && <PasswordHint />}
            </span>
            <span>{passError && <Error>{passError}</Error>}</span>
          </Label>
          <Input
            name="password"
            title="Required field"
            value={newPassword}
            type="password"
            minLength="6"
            maxLength="64"
            onChange={(value) => {
              setNewPassword(value);
              strongRegex.test(value)
                ? setIsValidPassword(true)
                : setIsValidPassword(false);
            }}
            onBlur={passwordValidation}
            onFocus={() => {
              setPassError("");
            }}
            data-testid={TEST_ID.passwordInput}
            id="passwordInput"
            style={{
              background: isValidPassword ? "lightGreen" : "white",
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="confirm-password-wrapper">
          <Label>
            Confirm password <span className="required-star">*</span>
            <span>{equalPassError && <Error>{equalPassError}</Error>}</span>
          </Label>
          <Input
            name="confirmPassword"
            value={confirmPassword}
            title="Required field, must match the password you entered"
            type="password"
            minLength="6"
            maxLength="64"
            //onChange={(value) => setConfirmPassword(value)}
            onChange={(value) => {
              setConfirmPassword(value);
              value === newPassword
                ? setIsEqualPass(true)
                : setIsEqualPass(false);
            }}
            onBlur={confirmPassValidation}
            onFocus={() => {
              setEqualPassError("");
            }}
            data-testid={TEST_ID.passwordInput}
            style={{
              background: isEqualPass ? "lightGreen" : "white",
            }}
            required
          />
        </InputFieldContainer>
        <label className="input-checkbox-container">
          <input
            type="checkbox"
            className="input-checkbox"
            onClick={() => showPassword()}
          />
          Show password
        </label>
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
export default ChangePassword;
