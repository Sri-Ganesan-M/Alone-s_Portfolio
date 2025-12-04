import { groq } from "next-sanity";

export const PROFILE_QUERY = groq`*[_type == "profile"][0] {
  name,
  title,
  description,
  "profileImage": profileImage.asset->url,
  stats,
  socialLinks
}`;

export const TOOLS_QUERY = groq`*[_type == "tool"] {
  "id": _id,
  name,
  type,
  "logo": logo.asset->url
}`;

export const CLIENTS_QUERY = groq`*[_type == "client"] {
  "id": _id,
  name,
  category,
  url,
  "logo": logo.asset->url
}`;

export const WORKS_QUERY = groq`*[_type == "work"] | order(_createdAt desc) {
  "id": _id,
  title,
  description,
  orientation,
  "thumbnail": thumbnail.asset->url,
  "media": coalesce(media.secure_url, media),
  externalLink,
  contentType,
  subjectMatter,
  editingStyle,
  software[]->{
    name,
    "logo": logo.asset->url
  }
}`;
