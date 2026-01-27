import Portfolio from "@/components/Portfolio";
import { getCards } from "@/lib/sanity";
import { puzzleData } from "@/data/cardData";
import { urlForImage } from "@/sanity/image";

// Revalidate every 10 seconds - Sanity changes will be reflected
export const revalidate = 10;

export default async function Home() {
  // Fetch cards from Sanity
  const sanityCards = await getCards();
  
  // Transform Sanity cards: convert image objects to URLs
  const transformedCards = sanityCards?.map((card: any) => {
    if (card.image && typeof card.image === 'object') {
      return {
        ...card,
        image: urlForImage(card.image).width(800).height(600).url()
      };
    }
    return card;
  });
  
  // Use Sanity data if available, otherwise fallback to local data
  const cards = transformedCards && transformedCards.length > 0 ? transformedCards : puzzleData;
  
  return <Portfolio initialData={cards} />;
}
