import bgSatea from "../assets/bg-satea.jpg";
import bgShared from "../assets/bg-shared.jpg";
import bgAlexis from "../assets/bg-alexis.jpg";
import type { Profile } from "../types/types";

export const PROFILES: Profile[] = [
      {
    id: "SATEA",
    label: "Mohamad Satea Almallouhi",
    avatar: { type: "initials", bg: "#d98a8652"},
  },
      {
    id: "SHARED",
    label: "Shared space",
    avatar: { type: "initials", bg:"#5b67816f"   },
  },
  {
    id: "ALEXIS",
    label: "Alexis Cordier",
    avatar: { type: "initials", bg: "#8e8b6b73" },
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
