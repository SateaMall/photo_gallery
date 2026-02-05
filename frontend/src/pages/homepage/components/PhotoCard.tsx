import type { PhotoResponse } from "../../../types/types";
import { photoFileUrl } from "../../../api/photos";
import "./PhotoCard.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { LinkIcon, UserIcon } from "../../../components/Icons";
import { PROFILE_BY_ID } from "../../../constants/constants";

export function PhotoCard({ photo }: { photo: PhotoResponse }) {
  const navigate = useNavigate();
  const { context } = useParams();
  const image = photoFileUrl(photo.id);

  const [copied, setCopied] = useState(false);

  function onPickPhoto(photoId: string) {
    navigate(`/${context}/photo/${photoId}`);
  }

  function onOwnerClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();     // prevents the article onClick
    navigate(`/${photo.owner}`);
  }

  async function onShare(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const urlToCopy = `${window.location.origin}/${context}/photo/${photo.id}`;

    try {
      await navigator.clipboard.writeText(urlToCopy);
    } catch {
      window.prompt("Copy this link:", urlToCopy);
    }
    setCopied(true); 
  }
  const p = PROFILE_BY_ID[photo.owner];

  return (
    <article
      className="photo-card"
      role="button"
      tabIndex={0}
      onClick={() => onPickPhoto(photo.id)}
      onMouseLeave={() => setCopied(false)} // reset when hover ends
    >
      <div className="photo-media">
        <img
          className="photo-img"
          src={image}
          alt={photo.title??""}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />

        <div className="photo-overlay" aria-hidden="true" />

        <button
          type="button"
          className={`photo-share ${copied ? "is-copied" : ""}`}
          onClick={onShare}
          aria-label={copied ? "Link copied" : "Copy photo link"}
          title={copied ? "Copied!" : "Copy link"}
        >
          {copied ? (
            <span className="photo-share-copied">Copied</span>
          ) : (
            <LinkIcon />
          )}
        </button>

        <button
          type="button"
          className="photo-owner"
          onClick={onOwnerClick}
        >
          <span className="photo-owner-avatar"  style={{ ["--bgCard" as any]: p.avatar?.bg  ?? "#111827" ,
                  ["--bgCardHover" as any]: p.avatar?.bgHoverOn
                }}>
          <UserIcon/>
          </span>
            <span className="photo-owner-name"> {p.label}</span>
          
        </button>
      </div>
    </article>
  );
}
