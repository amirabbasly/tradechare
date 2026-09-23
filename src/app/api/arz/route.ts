import { NextResponse } from "next/server";
import { getRates } from "@/lib/upstream";

export const revalidate = 300;

export async function GET() {
  const data = await getRates("arz");
  return NextResponse.json(data);
}
