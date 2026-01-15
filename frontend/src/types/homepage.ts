export type AlbumViewResponse = {
  albumId: string;
  firstPhotoId: string | null;
  title: string;
  description: string | null;
  numberOfPhotos: number;
};
