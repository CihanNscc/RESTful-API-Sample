import { NextRequest, NextResponse } from "next/server";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const intitle = searchParams.get("intitle");
  const inauthor = searchParams.get("inauthor");
  const maxResults = 40;

  if (!API_KEY) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  if (!query && !intitle && !inauthor) {
    return NextResponse.json(
      { error: "At least one search parameter is required" },
      { status: 400 }
    );
  }

  let queryString = "";
  if (query) queryString += `${query}`;
  if (intitle) queryString += `+intitle:${intitle}`;
  if (inauthor) queryString += `+inauthor:${inauthor}`;

  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(
        queryString
      )}&printType=books&maxResults=${maxResults}&key=${API_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch the book from API" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.totalItems === 0) {
      return NextResponse.json(
        { error: "No book found with the provided query" },
        { status: 404 }
      );
    }

    const book: Book[] = data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      categories: item.volumeInfo.categories || [],
      description: item.volumeInfo.description,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    }));

    return NextResponse.json(book);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
