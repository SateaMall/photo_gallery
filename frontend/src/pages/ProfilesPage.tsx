import { useMemo, useState } from "react";
import "./ProfilesPage.css";
import { useNavigate } from "react-router-dom";
import bgSatea from "../assets/bg-satea.jpg";
import bgShared from "../assets/bg-shared.jpg";
import bgAlexis from "../assets/bg-alexis.jpg";
import { UserIcon, LinkIcon } from "../components/Icons";
type Profile = {
  id: "SATEA" | "SHARED" | "ALEXIS";
  label: string;
  avatar?: { type: "initials"; text: string; bg: string };
};

const PROFILES: Profile[] = [
      {
    id: "SATEA",
    label: "Mohamad Satea Almallouhi",
    avatar: { type: "initials", text: "SA", bg: "#d98a8652"},
  },
      {
    id: "SHARED",
    label: "Shared space",
    avatar: { type: "initials", text: "SH", bg:"#5b67816f"   },
  },
  {
    id: "ALEXIS",
    label: "Alexis Cordier",
    avatar: { type: "initials", text: "AC", bg: "#8e8b6b73" },
  },
];

const BG_BY_ID: Record<Profile["id"], string> = {
  SATEA: bgSatea,
  SHARED: bgShared,
  ALEXIS: bgAlexis,
};

/* Route context helper */
function toRouteContext(id: Profile["id"]): "satea" | "alexis" | "shared" {
  if (id === "SATEA") return "satea";
  if (id === "ALEXIS") return "alexis";
  return "shared";
}


export default function ProfilesPages() {
  const navigate = useNavigate();

  const [hoveredId, setHoveredId] = useState<Profile["id"] | null>(null);

  const currentBg = useMemo(() => {
    return hoveredId ? BG_BY_ID[hoveredId] : bgShared;
  }, [hoveredId]);

 async function onPickProfile(p: Profile) {
    const routeContext = toRouteContext(p.id);
    /*  API 
    const apiContext = toApiContext(p.id);

    // 1) call API (send p.id + derived context)
    // adjust URL/body to your backend
    await fetch("/api/public/select-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profileId: p.id,
        context: apiContext, // PERSONAL or SHARED
      }),
    });

    // 2) go to homepage for that context
    */
    navigate(`/${routeContext}`);
  }

  

  return (
    <div className="page" style={{ backgroundImage: `url(${currentBg})` }}>
     
        <div className="ps-header">
          <div className="ps-gallery">Satea & Alexis Gallery</div>
        </div>
          <div className="ps-grid">
            {PROFILES.map((p) => {
              const isShared = p.id === "SHARED";
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
