import React, { useEffect, useState } from "react";
import "./AddNews.css";

import useFetch from "../../hooks/useFetch";
import Form from "../../components/Forms/Form";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import InputFieldContainer from "../../components/Forms/InputFieldContainer";
import Label from "../../components/Forms/Label";
import Input from "../../components/Forms/Input";
import InputFile from "../../components/Forms/InputFile";
import Select from "../../components/Forms/Select";
import TextAreaInput from "../../components/Forms/TextAreaInput";
import Check from "../../components/Check/Check";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [sources, setSources] = useState([]);
  const [image, setImage] = useState(null);
  const [newsData, setNewsData] = useState(null);

  const clearForm = () => {};

  const onSuccess = (response) => {
    setNewsData(response.result);
    clearForm();
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/news/add",
    onSuccess
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", image);
    data.append("title", title);
    data.append("content", content);
    data.append("category", category);
    data.append("sources", sources);

    performFetch({
      method: "POST",
      credentials: "include",
      body: data,
    });
  };

  useEffect(() => {
    return cancelFetch;
  }, []);

  let statusComponent = null;
  if (error != null) {
    statusComponent = <Error>Error while trying to create user: {error}</Error>;
  } else if (isLoading) {
    statusComponent = <Spinner />;
  }

  return (
    <div className="news-page-container">
      <Form onSubmit={handleSubmit} title="Create News">
        <InputFieldContainer className="news-title-wrapper">
          <Label>News Title</Label>
          <Input
            name="newsTitle"
            value={title}
            minLength="10"
            maxLength="200"
            title="News Title"
            onChange={(value) => {
              setTitle(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-content-wrapper">
          <Label>News Content</Label>
          <TextAreaInput
            name="newsContent"
            value={content}
            title="News Content"
            onChange={(value) => {
              setContent(value);
            }}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-category-wrapper">
          <Label>News Category</Label>
          <Select
            value={category}
            title="News Category"
            onChange={(value) => setCategory(value)}
            options={[
              { value: "", text: "Choose news category" },
              { value: "refugees", text: "Refugees" },
              { value: "politics", text: "Politics" },
              { value: "finance", text: "Finance" },
              { value: "society", text: "Society" },
            ]}
            required
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-source-wrapper">
          <Label>News Source</Label>
          <Input
            name="newsSource"
            value={sources}
            title="News Title"
            onChange={(value) => {
              setSources([value]);
            }}
          />
        </InputFieldContainer>
        <InputFieldContainer className="news-image-wrapper">
          <Label for="newsImage">News Image</Label>
          <InputFile
            name="newsImage"
            accept="image/*"
            id="newsImage"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </InputFieldContainer>
        <Button className="btn-block" type="submit">
          Create News
        </Button>
      </Form>
      {statusComponent && statusComponent}
      {newsData && (
        <Check>
          {" "}
          <div className="created-news-details-wrapper">
            <h2>News Created</h2>
            <h4>{newsData.title}</h4>
            <p>{newsData.content}</p>
            <p>{newsData.image}</p>
            <p>{newsData.sources[0]}</p>
            <p>{newsData.category}</p>
          </div>
        </Check>
      )}
    </div>
  );
};

export default AddNews;
