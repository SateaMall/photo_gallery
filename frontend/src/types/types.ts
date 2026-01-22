
export type AlbumViewResponse = {
  albumId: string;
  firstPhotoId: string | null;
  title: string;
  description: string | null;
  numberOfPhotos: number;
};

export type PageResponse<T> = {
  content: T[];
  number: number;        // current page (0-based)
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type PhotoResponse = {
  id: string;
  owner: Owner;
  context: Context;
  createdAt: string; // ISO date string
  themes: Theme[]
  title: string;
  description: string | null;
  index: number| null;
};

export type Theme =
  | "STREET_SOCIETY"
  | "PEOPLE_EMOTION"
  | "NATURE_ENVIRONMENT"
  | "ARCHITECTURE_SPACES"
  | "MOOD_ATMOSPHERE"
  | "CONCEPTUAL_ARTISTIC"
  | "DOCUMENTARY_SOCIAL";

export type Scope = "SATEA" | "ALEXIS" | "SHARED";

export type Owner = "SATEA" | "ALEXIS";

export type Context = "PERSONAL" | "SHARED";

export type Profile = {
  id: "satea" | "shared" | "alexis";
  label: string;
  avatar?: { type: "initials"; bg: string };
};

export type photoVariant= "ORIGINAL"| "MEDIUM"| "THUMB";