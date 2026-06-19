import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const artists = [
  { name: 'Rema', role: 'Singer', bio: 'Afrobeats sensation from Benin City' },
  { name: 'Fireboy DML', role: 'Singer', bio: 'Rising star in the Afrobeats movement' },
  { name: 'Tems', role: 'Vocalist', bio: 'Grammy-nominated Nigerian artist' },
  { name: 'Olamide', role: 'Rapper', bio: 'Street hop pioneer and cultural influencer' }
];

for (const artist of artists) {
  try {
    const created = await prisma.artist.create({ data: artist });
    console.log(`✅ Added: ${created.name}`);
  } catch (err) {
    if (err.code === 'P2002') {
      console.log(`⏭️  ${artist.name} already exists`);
    } else {
      console.log(`❌ Error adding ${artist.name}`);
    }
  }
}

const all = await prisma.artist.findMany();
console.log(`\nTotal artists: ${all.length}`);
all.forEach(a => console.log(`  • ${a.name}`));

await prisma.$disconnect();
