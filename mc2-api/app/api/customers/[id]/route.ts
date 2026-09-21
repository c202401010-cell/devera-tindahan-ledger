import { NextResponse } from "next/server";
import { ROWS } from "../../rows";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string}> }
) {
    const { id } = await params;
    const row = ROWS.find((r) => r.id === id);
    return row ? NextResponse.json(row) 
    : new NextResponse("Customer not found", { status: 404});
}