import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Sanity client configuration
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function cleanupDuplicates() {
  console.log('🧹 Starting duplicate cleanup...\n');

  try {
    // Get all cards, ordered by creation date (newest first)
    const allCards = await client.fetch('*[_type == "card"] | order(_createdAt desc)');
    console.log(`📋 Found ${allCards.length} total cards\n`);

    // Group cards by id
    const cardsById = new Map<string, any[]>();
    for (const card of allCards) {
      const cardId = card.id;
      if (!cardsById.has(cardId)) {
        cardsById.set(cardId, []);
      }
      cardsById.get(cardId)!.push(card);
    }

    // Find and delete duplicates (keep the newest one, delete the rest)
    let deletedCount = 0;
    for (const [cardId, cards] of cardsById.entries()) {
      if (cards.length > 1) {
        console.log(`⚠️  Found ${cards.length} duplicates for card: ${cardId}`);
        // Keep the first card (newest), delete the rest (older ones)
        const cardsToDelete = cards.slice(1);
        for (const cardToDelete of cardsToDelete) {
          await client.delete(cardToDelete._id);
          console.log(`   🗑️  Deleted duplicate: ${cardToDelete._id}`);
          deletedCount++;
        }
        console.log(`   ✅ Kept newest: ${cards[0]._id}\n`);
      }
    }

    // Get all projects, ordered by creation date (newest first)
    const allProjects = await client.fetch('*[_type == "project"] | order(_createdAt desc)');
    console.log(`📋 Found ${allProjects.length} total projects\n`);

    // Group projects by slug
    const projectsBySlug = new Map<string, any[]>();
    for (const project of allProjects) {
      const projectSlug = project.slug?.current;
      if (projectSlug) {
        if (!projectsBySlug.has(projectSlug)) {
          projectsBySlug.set(projectSlug, []);
        }
        projectsBySlug.get(projectSlug)!.push(project);
      }
    }

    // Find and delete duplicate projects
    for (const [slug, projects] of projectsBySlug.entries()) {
      if (projects.length > 1) {
        console.log(`⚠️  Found ${projects.length} duplicates for project: ${slug}`);
        // Keep the first project (newest), delete the rest (older ones)
        const projectsToDelete = projects.slice(1);
        for (const projectToDelete of projectsToDelete) {
          await client.delete(projectToDelete._id);
          console.log(`   🗑️  Deleted duplicate: ${projectToDelete._id}`);
          deletedCount++;
        }
        console.log(`   ✅ Kept newest: ${projects[0]._id}\n`);
      }
    }

    console.log(`\n🎉 Cleanup completed!`);
    console.log(`   - Deleted ${deletedCount} duplicate items`);
    console.log(`   - Remaining cards: ${cardsById.size}`);
    console.log(`   - Remaining projects: ${projectsBySlug.size}`);
    
  } catch (error) {
    console.error('❌ Error cleaning up duplicates:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanupDuplicates();

