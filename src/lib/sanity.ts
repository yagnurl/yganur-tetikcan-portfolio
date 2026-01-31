import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production
})

export async function getCards() {
  const query = `*[_type == "card" && (!defined(visible) || visible == true)] | order(order asc) {
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
    visible,
    spotifyData,
    instagramData,
    vscoData,
    image,
    hoverImages,
    technologies[] {
      name,
      weight,
      size,
      opacity,
      blur
    }
  }`
  
  return await client.fetch(query)
}

export async function getProjects() {
  const query = `*[_type == "project"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    summary,
    publishedAt,
    category,
    color,
    size,
    order,
    hasDetailPage,
    externalLink,
    isSoon
  }`
  
  return await client.fetch(query)
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    images,
    summary,
    content,
    link,
    publishedAt
  }`
  
  return await client.fetch(query, { slug })
}
