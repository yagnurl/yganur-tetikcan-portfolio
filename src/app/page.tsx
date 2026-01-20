import Portfolio from "@/components/Portfolio";
import { getCards } from "@/lib/sanity";
import { puzzleData } from "@/data/cardData";

// Revalidate every 10 seconds - Sanity changes will be reflected
export const revalidate = 10;

export default async function Home() {
  // Fetch cards from Sanity
  const sanityCards = await getCards();
  
  // Use Sanity data if available, otherwise fallback to local data
  const cards = sanityCards && sanityCards.length > 0 ? sanityCards : puzzleData;
  
  return <Portfolio initialData={cards} />;
}
