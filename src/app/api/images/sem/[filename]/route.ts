import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const filename = (await params).filename;
  // Read directly from the folder the user provided
  const sourceFolder = "C:/Users/dell/Documents/InFAB/Website/Infab_website/website/SEM Images_To Show/SEM Images_To Show";
  const filePath = path.join(sourceFolder, filename);

  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine content type based on extension
    let contentType = 'image/jpeg';
    if (filename.endsWith('.png')) contentType = 'image/png';
    else if (filename.endsWith('.webp')) contentType = 'image/webp';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
