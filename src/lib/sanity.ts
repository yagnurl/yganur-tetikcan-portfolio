import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
})

export async function getCards() {
  const query = `*[_type == "card"] | order(order asc) {
    _id,
    id,
    title,
    subtitle,
    description,
    category,
    color,
    type,
    size,
    order,
    spotifyData,
    instagramData,
    vscoData,
    hoverImages
  }`
  
  return await client.fetch(query)
}

export async function getProjects() {
  const query = `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    summary,
    publishedAt
  }`
  
  return await client.fetch(query)
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    summary,
    content,
    link,
    publishedAt
  }`
  
  return await client.fetch(query, { slug })
}
