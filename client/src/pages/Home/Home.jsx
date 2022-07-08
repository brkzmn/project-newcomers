import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TEST_ID from "./Home.testid";
import "./Home.css";
import welcometonl from "../../images/amsterdam.png";
import Button from "../../components/Button";
import newBegin from "../../images/connectionshome.jpeg";
import chatting from "../../images/sharing.jpg";
import party from "../../images/homeactivities.jpg";
import Testimonials from "../../components/Testimonials/Testimonials";
import { ThemeContext } from "../../ThemeContext";

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <header className="header" data-testid={TEST_ID.container}>
        <div
          className="header-btn-col"
          style={{
            cursor: "pointer",
            boxShadow: !isDarkMode
              ? `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px ,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`
              : `var(--light-background) 0px 2px 5px -1px ,
      var(--light-foreground) 0px 1px 3px -1px`,
          }}
        >
          <h1 className="title mobile-mt header-home-title">
            Welkom bij NlLink<span style={{ fontWeight: "400" }}>®</span>
          </h1>
          <Button
            className={"btn-inline"}
            type="button"
            onClick={() => navigate("/localIntro")}
          >
            I&apos;m a local
          </Button>
          <Button
            className={"btn-inline"}
            type="button"
            onClick={() => navigate("/newcomerIntro")}
          >
            I&apos;m a new comer
          </Button>
        </div>
        <div className="header-hero-container">
          <img src={welcometonl} className="hero" alt="hero" />
        </div>
      </header>
      <main>
        <section className="feature">
          <div className="feature-img-container">
            <img src={newBegin} alt="new begin" />
          </div>
          <div className="feature-description">
            <h2 className="title">
              Newcomers are welcome in the Dutch society
            </h2>
            <p className="feature-para">
              The Netherlands is a multi cultural country where had always open
              arms for the people who were looking for a safer place to live and
              grow. We do our best in order to make the connection between
              locals & newcomers in the Netherlands as stronger as possible.
              NlLink is best place to make your new circle of friends.
            </p>
          </div>
        </section>
        <section className="feature flip">
          <div className="feature-description">
            <h2 className="title">Sharing is caring!</h2>
            <p className="feature-para">
              Here you can share your ideas and information about any interested
              issue with other users who have same concerns. Ask a local about
              the rules in the Netherlands or talk about your favorite foreign
              food recipe with a newcomer.
            </p>
          </div>
          <div className="feature-img-container">
            <img src={chatting} alt="match with other users" />
          </div>
        </section>
        <section className="feature">
          <div className="feature-img-container">
            <img src={party} alt="new begin" />
          </div>
          <div className="feature-description">
            <h2 className="title">
              A platform for who wants to socialize more
            </h2>
            <p className="feature-para">
              Host your own event or party, or join other events which other
              users have created. Invite people to practice speaking in Dutch or
              ask people to join you for a football match in the upcoming
              weekend. All are possible at NlLink®.
            </p>
          </div>
        </section>
        <section className="testimonials-container">
          <h1 className="title">
            See what other people have said about our app
          </h1>
          <Testimonials />
        </section>
      </main>
    </>
  );
};

export default Home;
