// Font loader utility for figlet fonts
// This avoids runtime fetch issues on Vercel

export async function loadFontData(fontName: string): Promise<string> {
  // For Vercel deployment, use CDN directly with correct font names
  const fontNameMap: Record<string, string> = {
    '3D': '3-d',  // Uppercase 3D maps to 3-d on CDN
    // '3d' (lowercase) stays as '3d' - it's a different font
  };
  
  const cdnFontName = fontNameMap[fontName] || fontName;
  
  // Try local first (from public/fonts/), then fallback to CDN
  try {
    console.log(`Loading font ${fontName} from local /fonts/...`);
    const localResponse = await fetch(`/fonts/${fontName}.flf`);
    
    if (localResponse.ok) {
      const fontData = await localResponse.text();
      console.log(`✅ Font ${fontName} loaded from LOCAL /fonts/`);
      return fontData;
    }
  } catch (error) {
    console.log(`Local font not found, trying CDN...`);
  }
  
  // Fallback to CDN
  try {
    console.log(`Loading font ${fontName} (CDN name: ${cdnFontName}) from unpkg...`);
    const response = await fetch(`https://unpkg.com/figlet@1.7.0/fonts/${cdnFontName}.flf`);
    
    if (!response.ok) {
      throw new Error(`Failed to load font: ${response.status}`);
    }
    
    const fontData = await response.text();
    console.log(`✅ Font ${fontName} loaded successfully from CDN`);
    return fontData;
  } catch (error) {
    console.error(`❌ Error loading font ${fontName}:`, error);
    throw error;
  }
}
