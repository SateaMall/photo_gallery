import { useMemo, useState } from "react";
import "./profileSelect.css";

import bgSatea from "../assets/bg-satea.jpg";
import bgShared from "../assets/bg-shared.jpg";
import bgAlexis from "../assets/bg-alexis.jpg";

type Profile = {
  id: "SATEA" | "SHARED" | "ALESXIS";
  label: string;
  avatar?: { type: "initials"; text: string; bg: string };
};

const PROFILES: Profile[] = [
      {
    id: "SHARED",
    label: "Shared space",
    avatar: { type: "initials", text: "SH", bg: "#9871db61" },
  },

  {
    id: "SATEA",
    label: "Mohamad Satea Almallouhi",
    avatar: { type: "initials", text: "SA", bg: "#8eaef26f" },
  },

  {
    id: "ALESXIS",
    label: "Alexis Cordier",
    avatar: { type: "initials", text: "AC", bg: "#76d29842" },
  },
];

const BG_BY_ID: Record<Profile["id"], string> = {
  SATEA: bgSatea,
  SHARED: bgShared,
  ALESXIS: bgAlexis,
};

export default function ProfileSelect() {
  const [hoveredId, setHoveredId] = useState<Profile["id"] | null>(null);

  const currentBg = useMemo(() => {
    return hoveredId ? BG_BY_ID[hoveredId] : bgShared;
  }, [hoveredId]);

  const onSelect = (p: Profile) => {
    console.log("Selected profile:", p.id);
    alert(`Selected: ${p.label}`);
  };

  return (
    <div className="page" style={{ backgroundImage: `url(${currentBg})` }}>
      <div className="ps-root">
        <div className="ps-header logo">
          <div className="ps-gallery">Satea & Alexis Gallery</div>
        </div>

        <main className="ps-main">
          <div className="ps-grid">
            {PROFILES.map((p) => (
              <button
                key={p.id}
                className="ps-card"
                type="button"
                onClick={() => onSelect(p)}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(p.id)}   // nice for keyboard
                onBlur={() => setHoveredId(null)}
                style={{ background: p.avatar?.bg ?? "#111827" }}
              >

                <div className="ps-label">{p.label}</div>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
