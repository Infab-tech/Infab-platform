import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'INFAB Semiconductor — Advanced MEMS & Microfluidic Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Centered logo group */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

          {/* Wordmark row — gray block + fab side by side, baseline aligned */}
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>

            {/* Gray square block containing "in" */}
            <div
              style={{
                width: 180,
                height: 180,
                background: '#888888',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 100,
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: -2,
                  lineHeight: 1,
                }}
              >
                in
              </span>
            </div>

            {/* "fab" — much larger, black, no background */}
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 0 }}>
              <span
                style={{
                  fontSize: 260,
                  fontWeight: 800,
                  color: '#111111',
                  letterSpacing: -8,
                  lineHeight: 0.75,
                  marginBottom: 0,
                }}
              >
                fab
              </span>
              {/* Subtitle — sits below "fab", left-aligned to "f" */}
              <span
                style={{
                  fontSize: 26,
                  color: '#555555',
                  letterSpacing: 1,
                  fontWeight: 400,
                  marginTop: 12,
                  marginLeft: 4,
                }}
              >
                MEMS &amp; Microfluidics Solution
              </span>
            </div>

          </div>

        </div>
      </div>
    ),
    { ...size }
  );
}
