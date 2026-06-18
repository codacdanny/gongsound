import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    const body = await req.json();
    const album = await prisma.album.update({
      where: { id: parseInt(resolvedParams.id) },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        artists: body.artists,
        releaseDate: body.releaseDate,
        streamingUrl: body.streamingUrl,
      },
    });
    return NextResponse.json(album);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update album" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const resolvedParams = await params;
    await prisma.album.delete({
      where: { id: parseInt(resolvedParams.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete album" },
      { status: 500 }
    );
  }
}
