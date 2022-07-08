import React, { useEffect, useState, useContext } from "react";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Select from "../../components/Forms/Select";
import Input from "../../components/Forms/Input";
import InputFile from "../../components/Forms/InputFile";
import Label from "../../components/Forms/Label";
import useFetch from "../../hooks/useFetch";
import TEST_ID from "./CreateUser.testid";
import "./CreateUser.css";
import Button from "./../../components/Button";
import Form from "../../components/Forms/Form";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner/Spinner";
//import { AuthContext } from "../../AuthContext";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import { logInfo } from "../../../../server/src/util/logging";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../ThemeContext";
import { PasswordHint, UserHint } from "./Hints";
/* const PasswordHint = () => {
  return (
    <div className="hint password-hint" style={{backgroundColor: isDarkMode ? "var(--light-background)" : "var(--dark-background)", color: isDarkMode ? "var(--light-foreground)" : "var(--dark-foreground)"  }}>
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
const UserHint = () => {
  return (
    <div className="hint userName-hint" style={{backgroundColor: isDarkMode ? "var(--light-background)" : "var(--dark-background)", color: isDarkMode ? "var(--light-foreground)" : "var(--dark-foreground)"  }}>
      <h3> Username Requirements:</h3>
      <ul>
        <li>Minimum 3 and maximum 23 characters </li>
        <li>First character should be alphabetical</li>
        <li>Allowed special characters: [-_@.]</li>
        <li>Only numeric, alphabetical or mentioned special characters</li>
        <li>Has not used before</li>
      </ul>
    </div>
  );
}; */

const CreateUser = () => {
  const navigate = useNavigate();

  //const { isAuthenticated } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [isHint, setIsHint] = useState(false);
  const [userHint, setUserHint] = useState(false);
  const [isValidUsername, setIsValidUserName] = useState(false);
  const [userError, setUserError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isValidPhone, setIsValidPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [userType, setUserType] = useState("Newcomer");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [isValidAge, setIsValidAge] = useState("");
  const [isEqualPass, setIsEqualPass] = useState("");
  const [equalPassError, setEqualPassError] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { isDarkMode } = useContext(ThemeContext);
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#$%^&*])(?=.{6,64})"
  );
  const USER_REGEX = new RegExp("^[a-zA-Z][a-zA-Z0-9-_@.]{2,64}$");
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  const phoneRegex = /^\+|00[1-9]{1,3}[0-9]{4,12}$/;
  const onSuccess = () => {
    clearForm();
    navigate("/login", {
      state:
        "Account created successfully. You can now login using your username/password",
    });
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess
  );
  const userNameValidation = () => {
    isValidUsername
      ? setUserError("")
      : setUserError("Please check the username pattern again.");
    return isValidUsername ? true : userError;
  };
  const passwordValidation = () => {
    isValidPassword
      ? setPassError("")
      : setPassError("Please check the password pattern again.");
    return isValidPassword ? true : passError;
  };
  const emailValidation = () => {
    isValidEmail
      ? setEmailError("")
      : setEmailError("Please enter a valid Email address.");
    return isValidEmail ? true : emailError;
  };
  const phoneValidation = () => {
    isValidPhone
      ? setPhoneError("")
      : setPhoneError("Please enter a valid Phone number.");
    return isValidPhone ? true : phoneError;
  };
  const ageValidation = () => {
    isValidAge
      ? setAgeError("")
      : setAgeError("You need to be above 18 to sign up.");
    return isValidAge ? true : ageError;
  };
  const confirmPassValidation = () => {
    isEqualPass
      ? setEqualPassError("")
      : setEqualPassError("Passwords are not same, try again");
    return isEqualPass ? true : equalPassError;
  };
  useEffect(() => {
    /*   if (isAuthenticated) {
      navigate("/dashboard");
    } */

    return cancelFetch;
  }, []);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setBirthDay("");
    setUserType("Newcomer");
    setConfirmPassword("");
  };
  function getAge(birthDay) {
    var today = new Date();
    var birthDate = new Date(birthDay);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  useEffect(() => {
    logInfo(profileImage);
  }, [profileImage]);

  const isFormValid = () => {
    const validationArray = [
      userNameValidation(),
      emailValidation(),
      phoneValidation(),
      ageValidation(),
      passwordValidation(),
      confirmPassValidation(),
    ];
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
  const handleSubmit = (e) => {
    e.preventDefault();
    isFormValid();
    if (isFormValid() === true) {
      const data = new FormData();
      data.append("profileImage", profileImage);
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("userName", userName);
      data.append("password", password);
      data.append("email", email);
      data.append("birthDay", birthDay);
      data.append("phoneNumber", phoneNumber);
      data.append("userType", userType);

      performFetch({
        method: "POST",
        body: data,
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

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <Error data-testid={TEST_ID.errorContainer}>
        Error while trying to create user: {error}
      </Error>
    );
  } else if (isLoading) {
    statusComponent = <Spinner data-testid={TEST_ID.loadingContainer} />;
  }
  /* const handleMouseEnter = () => {
  window.innerWidth > 450 && setUserHint(true);
}
const handleMouseExit = () => {
  window.innerWidth > 450 && setUserHint(false);
} */
  useEffect(() => {
    document.body.onClick = () => setUserHint(false);
  });
  return (
    <Form onSubmit={handleSubmit} title="Join NlLink">
      <InputFieldContainer className="first-name-wrapper">
        <Label>
          First Name <span className="required-star">*</span>
        </Label>
        <Input
          name="firstName"
          value={firstName}
          placeholder="First Name"
          maxLength="100"
          title="Required field"
          onChange={(value) => setFirstName(value)}
          data-testid={TEST_ID.firstNameInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="last-name-wrapper">
        <Label>
          Last Name <span className="required-star">*</span>
        </Label>
        <Input
          name="lastName"
          value={lastName}
          maxLength="100"
          placeholder="Last Name"
          title="Required field"
          onChange={(value) => setLastName(value)}
          data-testid={TEST_ID.lastNameInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="username-wrapper">
        <Label>
          Username <span className="required-star">* </span>{" "}
          <span
            className="hint-sign"
            onMouseEnter={() => setUserHint(true)}
            onMouseLeave={() => setUserHint(false)}
            onTouchStart={() => setUserHint(true)}
            onTouchEnd={() => setUserHint(false)}
          >
            ?{userHint && <UserHint />}
          </span>
          <span>{userError && <Error>{userError}</Error>}</span>
        </Label>
        <Input
          name="userName"
          value={userName}
          minLength="3"
          maxLength="64"
          pattern="^[a-zA-Z][a-zA-Z0-9-_@.]{2,64}$"
          placeholder="Username, should not be used before."
          title="Required field, should not be used before"
          onChange={(value) => {
            setUserName(value);
            USER_REGEX.test(value)
              ? setIsValidUserName(true)
              : setIsValidUserName(false);
          }}
          onBlur={userNameValidation}
          onFocus={() => {
            setUserError("");
          }}
          data-testid={TEST_ID.userNameInput}
          style={{
            background: isValidUsername ? "lightGreen" : "white",
          }}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="email-input-wrapper">
        <Label>
          Email address <span className="required-star">*</span>{" "}
          <span>{emailError && <Error>{emailError}</Error>}</span>
        </Label>
        <Input
          name="email"
          type="email"
          minLength="3"
          maxLength="250"
          title="Required field, please enter a valid email address"
          value={email}
          pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
          placeholder="foo@domain.com"
          onChange={(value) => {
            setEmail(value);
            emailRegex.test(value)
              ? setIsValidEmail(true)
              : setIsValidEmail(false);
          }}
          onBlur={emailValidation}
          onFocus={() => {
            setEmailError("");
          }}
          style={{
            background: isValidEmail ? "lightGreen" : "white",
          }}
          data-testid={TEST_ID.emailInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="phone-input-wrapper">
        <Label>
          Mobile Number <span className="required-star">*</span>
          <span>{phoneError && <Error>{phoneError}</Error>}</span>
        </Label>
        <PhoneInput
          name="phoneNumber"
          value={phoneNumber}
          defaultCountry="NL"
          minLength="8"
          maxLength="16"
          title="Required field, please enter a valid mobile number"
          placeholder="First select the country."
          onChange={(value) => {
            setPhoneNumber(value);

            phoneRegex.test(value)
              ? setIsValidPhone(true)
              : setIsValidPhone(false);
          }}
          onBlur={phoneValidation}
          onFocus={() => {
            setPhoneError("");
          }}
          style={{
            background: isValidPhone ? "lightGreen" : "white",
          }}
          data-testid={TEST_ID.phoneNumberInput}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="userType-input-wrapper">
        <Label>
          User type <span className="required-star">*</span>{" "}
        </Label>
        <Select
          value={userType}
          title="Required field"
          onChange={(value) => setUserType(value)}
          options={[
            { value: "Newcomer", text: "Newcomer" },
            { value: "Local", text: "Local" },
          ]}
          required
        />
      </InputFieldContainer>
      <InputFieldContainer className="birthDay-input-wrapper">
        <Label>
          Date of birth <span className="required-star">*</span>{" "}
          <span>{ageError && <Error>{ageError}</Error>}</span>
        </Label>
        <Input
          name="birthDay"
          title="Required field, You need to be above 18!"
          type="date"
          value={birthDay}
          onChange={(value) => {
            setBirthDay(value);
            getAge(value) >= 18 ? setIsValidAge(true) : setIsValidAge(false);
          }}
          onBlur={ageValidation}
          onFocus={() => {
            setAgeError("");
          }}
          style={{
            background: isValidAge ? "lightGreen" : "white",
          }}
          data-testid={TEST_ID.birthDayInput}
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
            onTouchStart={() => setIsHint(true)}
            onTouchEnd={() => setIsHint(false)}
          >
            ?{isHint && <PasswordHint />}
          </span>
          <span>{passError && <Error>{passError}</Error>}</span>
        </Label>
        <Input
          name="password"
          title="Required field"
          value={password}
          type="password"
          minLength="6"
          maxLength="64"
          onChange={(value) => {
            setPassword(value);
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
            value === password ? setIsEqualPass(true) : setIsEqualPass(false);
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
      <InputFieldContainer className="profile-image-wrapper">
        <Label for="proFileImage">profile Image</Label>
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
          style={{
            backgroundColor: isDarkMode
              ? "var(--light-background)"
              : "var(--dark-background)",
            color: isDarkMode
              ? "var(--light-foreground)"
              : "var(--dark-foreground)",
          }}
        />
      </InputFieldContainer>
      <Button
        className="btn-block"
        data-testid={TEST_ID.submitButton}
        type="submit"
      >
        Create new account
      </Button>
      {statusComponent && statusComponent}
    </Form>
  );
};

export default CreateUser;
