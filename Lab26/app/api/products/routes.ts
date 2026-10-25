import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");   

  const db = await getMongoDb();
  const collection = db.collection("products");

  const query = search
    ? { name: { $regex: search, $options: "i" } }   
    : {};

  const docs = await collection.find(query).toArray();
  return NextResponse.json(docs);
}
