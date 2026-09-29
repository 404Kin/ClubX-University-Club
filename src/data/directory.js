
import clubs from "./clubs";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery5 from "../assets/gallery5.jpg";

export const CATEGORIES = ["Technology", "Culture", "Sports", "Arts", "Academic", "Social"];

const entries = [
  { slug: "ieee", short: "IEEE", category: "Technology", hue: 222, image: gallery1 },
  { slug: "computer-club", short: "Computer Club", name: "Computer Club", tagline: "Code, compete, create", category: "Technology", hue: 262, image: gallery2 },
  { slug: "iiucps", short: "IIUCPS", name: "IIUCPS", tagline: "Career guidance and professional growth", category: "Academic", hue: 165, image: gallery3 },
  { slug: "business-club", short: "Business Club", name: "Business Club", tagline: "Where ideas meet enterprise", category: "Academic", hue: 38 },
  { slug: "photography-society", short: "Photography", name: "Photography Society", tagline: "See the campus differently", category: "Arts", hue: 322 },
  { slug: "debate-club", short: "Debate", name: "Debate Club", tagline: "Argue well. Think better.", category: "Academic", hue: 8 },
  { slug: "cultural-club", short: "Cultural", name: "Cultural Club", tagline: "Celebrate every tradition", category: "Culture", hue: 292, image: gallery5 },
  { slug: "sports-club", short: "Sports", name: "Sports Club", tagline: "Play. Compete. Belong.", category: "Sports", hue: 140 },
  { slug: "volunteer-circle", short: "Volunteers", name: "Volunteer Circle", tagline: "Do good, together", category: "Social", hue: 190 },
];

const directory = entries.map((e) => {
  const profile = clubs[e.slug];
  return {
    ...e,
    name: profile?.name ?? e.name,
    tagline: profile?.tagline ?? e.tagline,
    hasPage: Boolean(profile),
  };
});

export default directory;
