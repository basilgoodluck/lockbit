import { NextRequest, NextResponse } from "next/server";

const mockResources: Record<string, { password: string; expires: Date }> = {
  "sample-resource-123": {
    password: "secure123",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
  },
};

export async function GET(req: NextRequest, { params }: { params: { resourceId: string } }) {
  const { resourceId } = params;

  const resource = mockResources[resourceId];
  if (!resource || resource.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
  }

  return NextResponse.json({ message: "Link is valid" }, { status: 200 });
}

export async function POST(req: NextRequest, { params }: { params: { resourceId: string } }) {
  const { resourceId } = params;
  const { password } = await req.json();

  const resource = mockResources[resourceId];
  if (!resource || resource.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
  }

  if (resource.password !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ message: "Access granted" }, { status: 200 });
}