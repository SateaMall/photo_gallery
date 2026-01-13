// src/router.tsx
import { Navigate, createBrowserRouter } from "react-router-dom";

import ProfilesPage from "./pages/ProfilesPage";
import GalleryLayout from "./layouts/GalleryLayout";

import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import AlbumPage from "./pages/AlbumPage";
import PhotosPage from "./pages/PhotosPage";
import PhotoPage from "./pages/PhotoPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/profiles" replace /> },

  { path: "/profiles", element: <ProfilesPage /> },

{
  path: ":context",
  element: <GalleryLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "albums", element: <AlbumsPage /> },
    { path: "albums/:albumId", element: <AlbumPage /> },
    { path: "photos", element: <PhotosPage /> },
    { path: "photos/:photoId", element: <PhotoPage /> },
    { path: "contact", element: <ContactPage /> },
  ],
},
  { path: "*", element: <NotFound /> } 
]);
