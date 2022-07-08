import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInfo } from "../../../../server/src/util/logging.js";
import TEST_ID from "../Home/Home.testid";
import "./Intro.css";
import newComerHeader from "../../images/newcomerIntro.jpg";
import Button from "../../components/Button";
import newBegin from "../../images/groupchat.png";
import chatting from "../../images/events.png";
import party from "../../images/news.png";
import { FcHome, FcUp } from "react-icons/fc";

//import * as Scroll from "react-scroll";
import {
  Link as ScrollLink,
  /* Button as ScrollButton, */
  Events,
  animateScroll as scroll,
  scrollSpy /* , scroller */,
} from "react-scroll";
const NewComer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Events.scrollEvent.register("begin", function (to, element) {
      logInfo("begin", arguments);
      logInfo(to, element);
    });

    Events.scrollEvent.register("end", function (to, element) {
      logInfo("end", arguments);
      logInfo(to, element);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <>
      <header
        className="header-intro"
        data-testid={TEST_ID.container}
        style={{ backgroundImage: `url(${newComerHeader})` }}
      >
        {/* <div className="header-hero-container">
          <img src={newComerHeader} className="hero" alt="newcomerHeader" />
        </div> */}
        <h1 className="title-intro mobile-mt intro-header-title">
          Introduction for newcomers
        </h1>
        <div className="header-nav-col">
          <Button onClick={() => navigate("/localIntro")} className="btn-guide">
            Guide for local users
          </Button>
          <Link className="btn-guide btn-home" to="/">
            <FcHome size="2rem" />
          </Link>
        </div>
        <div className="header-btn-col-intro">
          <ScrollLink
            activeClass="active"
            className="btn-guide"
            to="connections"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            delay={500}
          >
            Connections
          </ScrollLink>
          <ScrollLink
            activeClass="active"
            className="btn-guide"
            to="activities"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            delay={500}
          >
            Activities
          </ScrollLink>
          <ScrollLink
            activeClass="active"
            className="btn-guide"
            to="news"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
            delay={500}
          >
            News
          </ScrollLink>
        </div>
      </header>
      <main>
        <section className="feature" id="connections">
          <div className="feature-img-container">
            <img src={newBegin} alt="Connections-Intro" />
          </div>
          <div className="feature-description">
            <h2 className="title">
              Make connections with locals Based on your Interests
            </h2>
            <p className="feature-para">
              At <em>Connect to locals</em> section, Newcomer users can find
              matches among local users based on their same interests or needs
              and start a conversation with them. or either receive messages
              from other locals who are interested to start a conversation with
              them.
            </p>
            <Link className="btn-guide btn-intro" to="/connect">
              Sign in & make your connections
            </Link>
          </div>
        </section>
        <section className="feature flip element" id="activities">
          <div className="feature-description">
            <h2 className="title">
              Any plans for an activity?... Why doing it alone then?!
            </h2>
            <p className="feature-para">
              In the <em>Activities</em> section, you can create new activities
              and events in different categories and let other users join your
              planned activity, or either join another user`s created activities
              and events. It could be any interesting social event from planning
              a coffee meeting or a lovely party to making new friends!. This is
              the best way to learn about different cultures and socialize with
              new people.
            </p>
            <Link className="btn-guide btn-intro" to="/activities">
              Sign in & make your activities
            </Link>
          </div>
          <div className="feature-img-container">
            <img src={chatting} alt="Activities-Intro" />
          </div>
        </section>
        <section className="feature" id="news">
          <div className="feature-img-container">
            <img src={party} alt="News-Intro" />
          </div>
          <div className="feature-description news-desc">
            <h2 className="title">Being on top of the News</h2>
            <p className="feature-para">
              In the <em>News</em> section, you get the latest News related to
              your life matters in the Netherlands. Be on top of the latest
              changes in the Dutch immigration & integration rules, governmental
              announcements, or new opportunities for refugees.
            </p>
            <Link className="btn-guide btn-intro" to="/news">
              Sign in & get latest news
            </Link>
            <ScrollLink
              activeClass="active"
              className="btn-top"
              value={() => <FcUp />}
              to="/newcomerIntro"
              readOnly
              onClick={() => scroll.scrollToTop()}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              delay={500}
            >
              {
                <FcUp
                  className="react-icons up-intro"
                  size="2.5rem"
                  color="white"
                />
              }
            </ScrollLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default NewComer;
