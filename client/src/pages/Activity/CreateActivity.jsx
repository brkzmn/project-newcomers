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
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [startAt, setStartAt] = useState(null);
  const [endAt, setEndAt] = useState(null);
  const [description, setDescription] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [postCode, setPostCode] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { userDetails } = useUserDetails();

  const location = {
    city,
    street,
    postCode,
  };

  const clearForm = () => {
    setTitle(null);
    setCategory(null);
    setStartAt(null);
    setEndAt(null);
    setDescription(null);
    setMaxPeople(null);
    setCity(null);
    setStreet(null);
    setPostCode(null);
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
          <Label>Activity Title</Label>
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
          <Label>Activity Category</Label>
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
          <Label>Activity Start At:</Label>
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
          <Label>Activity End At:</Label>
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
          <Label>Activity Description</Label>
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
          <Label>Activity City</Label>
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
          <Label>Activity Street</Label>
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
          <Label>Activity Postcode</Label>
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
          <Label>Activity Max People</Label>
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
