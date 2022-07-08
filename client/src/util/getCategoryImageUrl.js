import cityTour from "../images/city-tour.jpg";
import countrysideTour from "../images/keukenhof.jpg";
import museum from "../images/museum.jpg";
import food from "../images/food.jpg";
import language from "../images/language.jpg";
import music from "../images/partyBackground.jpg";
import sport from "../images/sport.jpg";
import education from "../images/training.jpg";
import volunteerWork from "../images/volunturee.jpg";

const getCategoryImageUrl = (category) => {
  const categoryName = category.replace(/\s+/g, "-").toLowerCase();

  switch (categoryName) {
    case "city-tour":
      return cityTour;
    case "countryside-tour":
      return countrysideTour;
    case "museum":
      return museum;
    case "food":
      return food;
    case "language":
      return language;
    case "music":
      return music;
    case "sport":
      return sport;
    case "education":
      return education;
    case "volunteer-work":
      return volunteerWork;
  }
};

export default getCategoryImageUrl;
