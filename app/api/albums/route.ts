import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(albums);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch albums" },
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
    const album = await prisma.album.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        artists: body.artists,
        releaseDate: body.releaseDate,
        streamingUrl: body.streamingUrl,
      },
    });
    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 }
    );
  }
}
