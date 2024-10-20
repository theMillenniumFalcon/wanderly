import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json(
            { error: "Invalid JSON format" },
            { status: 400 }
        );
    }

    const { fromLocation, description, openai, serp } = body;

    if (!fromLocation || !description || !openai || !serp) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(`${process.env.CLOUDFLARE_WORKER_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fromLocation,
                description,
                openai,
                serp,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message || "External service error" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (e) {
        console.error("Error while fetching data:", e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
