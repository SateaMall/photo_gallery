import { useMemo, useState } from "react";
import "./ProfilesPage.css";
import { useNavigate } from "react-router-dom";
import bgSatea from "../assets/bg-satea.jpg";
import bgShared from "../assets/bg-shared.jpg";
import bgAlexis from "../assets/bg-alexis.jpg";
import { UserIcon, LinkIcon } from "../components/Icons";
import { Navbar } from "../components/Navbar";
import type { Profile } from "../types/types";

const PROFILES: Profile[] = [
      {
    id: "satea",
    label: "Mohamad Satea Almallouhi",
    avatar: { type: "initials", bg: "#d98a8652"},
  },
      {
    id: "shared",
    label: "Shared space",
    avatar: { type: "initials", bg:"#5b67816f"   },
  },
  {
    id: "alexis",
    label: "Alexis Cordier",
    avatar: { type: "initials", bg: "#8e8b6b73" },
  },
];

const BG_BY_ID: Record<Profile["id"], string> = {
  satea: bgSatea,
  shared: bgShared,
  alexis: bgAlexis,
};


export default function ProfilesPages() {
 const navigate = useNavigate();

/* Background switcher */
  const [hoveredId, setHoveredId] = useState<Profile["id"] | null>(null);

  const currentBg = useMemo(() => {
    return hoveredId ? BG_BY_ID[hoveredId] : bgShared;
  }, [hoveredId]);



 async function onPickProfile(p: Profile) {
    const routeContext = p.id; // "satea" | "alexis" | "shared"
    // set profile in the backend & Go
    navigate(`/${routeContext}`);
  }

  

  return (


    <div className="page" style={{ backgroundImage: `url(${currentBg})` }}>
         {<Navbar />}
          <div className="ps-grid">
            {PROFILES.map((p) => {
              const isShared = p.id === "shared";
              return(
              <button
                key={p.id}
                className="ps-card"
                type="button"
                onClick={() => onPickProfile(p)}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(p.id)}   // nice for keyboard
                onBlur={() => setHoveredId(null)}
                style={{ background: p.avatar?.bg ?? "#111827" }}
              >
                <div className="ps-icon" aria-hidden="true">
                {isShared ? <LinkIcon /> : <UserIcon />}
              </div>
                <div className="ps-label">{p.label}</div>
              </button>
                );
        })}
          </div>
    </div>

  );
}
