import React from "react";
import Testimonial from "./Testimonial";
import "./Testimonials.css";
import profile1 from "../../images/profile-1.jpg";
import profile2 from "../../images/profile-2.jpg";
import profile3 from "../../images/profile-3.jpg";

const Testimonials = () => {
  return (
    <div className="testimonials">
      <Testimonial
        quote='" Thanks to newcomers. I got to know many web development enthusiats.
        I got introduced to Hack your Future by a friend who I recently met on the platform, and
        now I am steps away from getting hired. "'
        profile={{
          url: profile1,
          name: "Satish Patel",
          occupation: "Hack Your Future Student",
        }}
      />
      <Testimonial
        quote='" I regulary sign up to events, and go to public meetings through this app. I am
        interested in learning Dutch, so I customize my search based on that.
        Very practical, and well-optimized search. "'
        profile={{
          url: profile2,
          name: "Bruce McKenzie",
          occupation: "Refugee",
        }}
      />
      <Testimonial
        quote='" Thanks to newcomers. I got to know many web development enthusiats.
        I got introduced to Hack your Future by a friend who I recently met on the platform, and
        now I am steps away from getting hired. "'
        profile={{
          url: profile3,
          name: "Iva Boyd",
          occupation: "Hack Your Future Student",
        }}
      />
    </div>
  );
};

export default Testimonials;
