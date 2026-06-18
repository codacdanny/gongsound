import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tours);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tours" },
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
    const tour = await prisma.tour.create({
      data: {
        title: body.title,
        month: body.month,
        day: parseInt(body.day),
        place: body.place,
        venue: body.venue,
        time: body.time,
        note: body.note,
      },
    });
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create tour" },
      { status: 500 }
    );
  }
}
