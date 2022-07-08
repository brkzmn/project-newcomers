import React, { useEffect, useState } from "react";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Input from "../../components/Forms/Input";
import Label from "../../components/Forms/Label";
import useFetch from "../../hooks/useFetch";
import "./Contact.css";
import Button from "./../../components/Button";
import Form from "../../components/Forms/Form";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import { logInfo } from "../../../../server/src/util/logging";
import "react-toastify/dist/ReactToastify.css";
import TextAreaInput from "../../components/Forms/TextAreaInput";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const clearForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };
  const onSuccess = (res) => {
    clearForm();
    logInfo(res);
    if (res.success === true) {
      navigate("/", {
        state: "Your message successfully sent to the Admin.",
      });
      toast.info("Your message successfully sent to the Admin.", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Your message didn't sent to the Admin. Try again later!", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/contact-us/send",
    onSuccess
  );
  useEffect(() => {
    return cancelFetch;
  }, []);
  const submitEmail = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });
  };
  return (
    <div className="contact-form-container">
      {isLoading && <Spinner />}
      {error && <Error>{error}</Error>}
      <div className="contact-form-title-wrapper">
        <h2 className="contact-title">Contact Us</h2>
        <p>
          Let us know what you think! In order to provide better service, please
          do not hesitate to give us your feedback. Thank you.
        </p>
      </div>
      <Form id="contact-form" onSubmit={submitEmail} method="POST">
        <InputFieldContainer>
          <Label for="name">Name</Label>
          <Input
            placeholder="Name"
            id="name"
            type="text"
            required
            value={name}
            onChange={(value) => setName(value)}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Label for="email">Email</Label>
          <Input
            placeholder="Email"
            id="email"
            type="email"
            required
            value={email}
            onChange={(value) => setEmail(value)}
          />
        </InputFieldContainer>

        <InputFieldContainer>
          <Label for="subject">Subject</Label>
          <Input
            placeholder="Subject"
            id="subject"
            type="text"
            required
            value={subject}
            onChange={(value) => setSubject(value)}
          />
        </InputFieldContainer>
        <InputFieldContainer className="message-wrapper">
          <Label for="message">Message</Label>
          <TextAreaInput
            placeholder="Message"
            id="message"
            required
            value={message}
            onChange={(value) => setMessage(value)}
          />
        </InputFieldContainer>
        <InputFieldContainer>
          <Button type="submit" className="btn-block">
            Submit
          </Button>
        </InputFieldContainer>
      </Form>
    </div>
  );
};

export default Contact;
