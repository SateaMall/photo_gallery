import bgSatea from "../assets/bg-satea.jpg";
import bgShared from "../assets/bg-shared.jpg";
import bgAlexis from "../assets/bg-alexis.jpg";
import type { Profile } from "../types/types";

export const PROFILES: Profile[] = [
      {
    id: "SATEA",
    label: "Mohamad Satea Almallouhi",
    avatar: { type: "initials", bg: "#d98a8652", bgHoverOn: "#8b4845b7"},
    linkedIn: "satea-almallouhi",
    instagram: "satea_almallouhi",
    location: "Montpellier, France",
    bio: "Amature in photography, and bla bla",
    email: "sate3.mallouhi@gmail.com"


  },
      {
    id: "SHARED",
    label: "Shared space",
    avatar: { type: "initials", bg:"#5b67816f", bgHoverOn: "#2a3857c6"   },
    linkedIn: "",
    instagram: "",
    location: "",
    bio: "",
    email: ""
  },
  {
    id: "ALEXIS",
    label: "Alexis Cordier",
    avatar: { type: "initials", bg: "#8e8b6b73", bgHoverOn:  "#5c572ac0" },
    linkedIn: "alexis683off",
    instagram: "alexis683off",
    location: "Toulouse, France",
    bio: "Hi my name is Alexis, and I like to take and edit pictures as an amateur.",
    email: "alexis.cordier683@icloud.com "
  },
];

export const PROFILE_BY_ID: Record<Profile["id"], Profile> =
  Object.fromEntries(PROFILES.map(p => [p.id, p])) as Record<
    Profile["id"],
    Profile
  >;
export const BG_BY_ID: Record<Profile["id"], string> = {
  SATEA: bgSatea,
  SHARED: bgShared,
  ALEXIS: bgAlexis,
};

