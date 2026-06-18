import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const artists = await prisma.artist.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(artists);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch artists" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const artist = await prisma.artist.create({
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio,
        image: body.image,
      },
    });
    return NextResponse.json(artist, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create artist" },
      { status: 500 }
    );
  }
}
