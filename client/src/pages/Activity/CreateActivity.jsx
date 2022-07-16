import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Form from "../../components/Forms/Form";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner/Spinner";
// import Error from "../../components/Error/Error";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Label from "../../components/Forms/Label";
import Input from "../../components/Forms/Input";
import Select from "../../components/Forms/Select";
import TextAreaInput from "../../components/Forms/TextAreaInput";
import DateTime from "../../components/Forms/DateTime";
import "./CreateActivity.css";
import useUserDetails from "../../hooks/useUserDetails";
import Modal from "../../components/Modal/Modal";

const CreateActivity = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [description, setDescription] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [activityData, setActivityData] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [openModal, setOpenModal] = useState("");

  const { userDetails } = useUserDetails();

  const location = {
    city,
    street,
    postCode,
  };

  const clearForm = () => {
    setTitle("");
    setCategory("");
    setStartAt("");
    setEndAt("");
    setDescription("");
    setMaxPeople("");
    setCity("");
    setStreet("");
    setPostCode("");
  };

  const onSuccess = (response) => {
    setActivityData(response.result);
    clearForm();
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/activities/create",
    onSuccess
  );

  let userId;

  if (userDetails) {
    userId = userDetails._id;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    performFetch({
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        category,
        createdBy: userId,
        startAt,
        endAt,
        description,
        location,
        maxPeople: maxPeople[0],
      }),
    });
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  return (
    <div className="create-activity-page-container">
      <Form onSubmit={handleSubmit} title="Create Activity">
        <InputFieldContainer className="activity-title-wrapper">
          <Label>Title</Label>
          <Input
            name="activityTitle"
            value={title}
            title="Activity Title"
            onChange={(value) => {
              setTitle(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-category-wrapper">
          <Label>Category</Label>
          <Select
            value={category}
            title="Activity Category"
            onChange={(value) => setCategory(value)}
            options={[
              { value: "all", text: "Choose a category" },
              { value: "sport", text: "Sport" },
              { value: "language", text: "Language" },
              { value: "city tour", text: "City Tour" },
              { value: "museum", text: "Museum" },
              { value: "food", text: "Food" },
              { value: "education", text: "Education" },
              { value: "music", text: "Music" },
              { value: "volunteer work", text: "Volunteer Work" },
              { value: "countryside tour", text: "Countryside Tour" },
            ]}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-start-wrapper">
          <Label>Start At</Label>
          <DateTime
            name="activityStart"
            value={startAt}
            title="Activity Start"
            onChange={(value) => {
              setStartAt(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-end-wrapper">
          <Label>End At</Label>
          <DateTime
            name="activityEnd"
            value={endAt}
            title="Activity End"
            onChange={(value) => {
              setEndAt(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-description-wrapper">
          <Label>Description</Label>
          <TextAreaInput
            name="activityDescription"
            value={description}
            title="Activity Description"
            onChange={(value) => {
              setDescription(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-city-wrapper">
          <Label>City</Label>
          <Input
            name="activityCity"
            value={city}
            title="Activity City"
            onChange={(value) => {
              setCity(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-street-wrapper">
          <Label>Street</Label>
          <Input
            name="activityStreet"
            value={street}
            title="Activity Street"
            onChange={(value) => {
              setStreet(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="activity-post-code-wrapper">
          <Label>Postcode</Label>
          <Input
            name="activityPostCode"
            value={postCode}
            title="Activity Postcode"
            onChange={(value) => {
              setPostCode(value);
            }}
            required
          />
        </InputFieldContainer>

        <InputFieldContainer className="activity-max-people-wrapper">
          <Label>Max People</Label>
          <Input
            name="activityMaxPeople"
            value={maxPeople}
            title="Max People"
            onChange={(value) => {
              setMaxPeople([value]);
            }}
            type="number"
            required
          />
        </InputFieldContainer>

        <Button
          className="btn-block"
          type="submit"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Create Activity
        </Button>
      </Form>

      {isLoading && <Spinner />}

      {openModal && error && Object.keys(error).length !== 0 && (
        <Modal setOpenModal={setOpenModal}>
          <div className="created-news-details-wrapper">
            <h2>Failed to Create Activity </h2>
            <div>{error}</div>
          </div>
        </Modal>
      )}

      {openModal && activityData && (
        <Modal setOpenModal={setOpenModal}>
          <div className="created-news-details-wrapper">
            <h2>Activity Created</h2>
            {activityData && <div>You created: {activityData.title}</div>}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CreateActivity;
