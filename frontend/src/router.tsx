// src/router.tsx
import { Navigate, createBrowserRouter } from "react-router-dom";

import ProfilesPage from "./pages/ProfilesPage/ProfilesPage.tsx";
import GalleryLayout from "./layouts/GalleryLayout";
import RootLayout from "./layouts/RootLayout.tsx";
import Homepage from "./pages/homepage/Homepage.tsx";
import AlbumPage from "./pages/AlbumPage";
import PhotoPage from "./pages/PhotoPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminPage from "./AdminSection/admin_upload";

export const router = createBrowserRouter([
  { path: "/",  element: <RootLayout />, children: [
  { index : true, element: <Navigate to="/profiles" /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/profiles", element: <ProfilesPage /> },

{
  path: ":context",
  element: <GalleryLayout />,
  children: [
    { index: true, element: <Homepage /> },
    { path: "albums/:albumId", element: <AlbumPage /> },
    { path: "photos/:photoId", element: <PhotoPage /> },
    { path: "contact", element: <ContactPage /> },
  ],
},
  { path: "*", element: <NotFound /> } 
] },
]);
