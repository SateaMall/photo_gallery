import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PROFILE_BY_ID } from "../../constants/constants";
import './SocialBioSection.css'
type ContextId = "SATEA" | "ALEXIS" | "SHARED";

function buildLinks(profile: { linkedIn?: string; instagram?: string }) {
  const linkedInUrl = profile.linkedIn?.trim()
    ? `https://www.linkedin.com/in/${profile.linkedIn.trim()}`
    : "";

  const instagramUrl = profile.instagram?.trim()
    ? `https://www.instagram.com/${profile.instagram.trim()}/`
    : "";

  return { linkedInUrl, instagramUrl };
}

export function SocialBioSection() {
  const { context } = useParams();
  const ctx = (context?.toUpperCase() as ContextId) ?? "SHARED";

  const profilesToShow = useMemo(() => {
    if (ctx === "SHARED") {
      return [PROFILE_BY_ID["SATEA"], PROFILE_BY_ID["ALEXIS"]].filter(Boolean);
    }
    const p = PROFILE_BY_ID[ctx];
    return p ? [p] : [];
  }, [ctx]);

  const hasAny = profilesToShow.some((p) => {
    const { linkedInUrl, instagramUrl } = buildLinks(p);
    return Boolean(linkedInUrl || instagramUrl);
  });

  if (!hasAny) return null;

  return (
    <footer className="social-footer" aria-label="Social links">
      <div className="social-footer-inner">
        {profilesToShow.map((p) => {
          const { linkedInUrl, instagramUrl } = buildLinks(p);

          // If one profile has no links, just skip rendering it
          if (!linkedInUrl && !instagramUrl) return null;

          return (
            <div className="social-footer-person" key={p.id}>
              <span className="social-footer-label">{p.label}</span>

              <div className="social-footer-links">
                {instagramUrl && (
                  <a
                    className="social-btn"
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.label} Instagram`}
                  >
                    Instagram
                  </a>
                )}

                {linkedInUrl && (
                  <a
                    className="social-btn"
                    href={linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.label} LinkedIn`}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
