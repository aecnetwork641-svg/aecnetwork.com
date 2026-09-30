import type { SVGProps } from "react";

const NAVY = "#0B1F3A";
const SKY_BLUE = "#4DA3D9";
const WHITE = "#FFFFFF";
const FONT = "Inter, 'Segoe UI', Helvetica, Arial, sans-serif";

// Left half of the symbol; the right half is mirrored about x = 60.
const PAGES = {
  base: "M58 88C44 79 26 75 6 77L6 62C26 60 44 64 58 73Z",
  outer: "M58 66C44 62 26 56 10 40C28 42 46 48 58 58Z",
  middle: "M58 51C46 45 32 35 24 17C38 21 52 31 58 41Z",
  inner: "M58 39C52 31 44 19 44 3C52 9 58 21 58 29Z",
};

const PAGES_B = {
  base: "M58 92L6 76L6 60L58 76Z",
  l1: "M58 70L14 56L14 46L58 60Z",
  l2: "M58 54L24 43L24 34L58 45Z",
  l3: "M58 39L34 31L34 23L58 31Z",
};

type Props = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children"> & {
  /** "light" = for white/light backgrounds, "dark" = for navy backgrounds */
  theme?: "light" | "dark";
  /** Show "A Project by AEC Network" under the wordmark */
  showTagline?: boolean;
  /** Symbol only, no text */
  iconOnly?: boolean;
  /** Icon beside the wordmark instead of above it */
  horizontal?: boolean;
  /** "a" = fanned pages, "b" = layered pages */
  variant?: "a" | "b";
};

function Symbol({ dark, variant = "a" }: { dark: boolean; variant?: "a" | "b" }) {
  const main = dark ? WHITE : NAVY;
  const half = variant === "b" ? (
    <>
      <path fill={main} d={PAGES_B.base} />
      <path fill={main} d={PAGES_B.l1} />
      <path fill={SKY_BLUE} d={PAGES_B.l2} />
      <path fill={main} d={PAGES_B.l3} />
    </>
  ) : (
    <>
      <path fill={main} d={PAGES.base} />
      <path fill={main} d={PAGES.outer} />
      <path fill={SKY_BLUE} d={PAGES.middle} />
      <path fill={main} d={PAGES.inner} />
    </>
  );
  return (
    <>
      <g>{half}</g>
      <g transform="matrix(-1 0 0 1 120 0)">{half}</g>
    </>
  );
}

export default function AECNetworkLogo({
  theme = "light",
  showTagline = true,
  iconOnly = false,
  horizontal = false,
  variant = "a",
  width = "100%",
  height,
  style,
  ...rest
}: Props) {
  const dark = theme === "dark";
  const text = dark ? WHITE : NAVY;
  const tag = dark ? WHITE : SKY_BLUE;
  const label = iconOnly ? "AEC Network" : "AEC Network, A Project by AEC Network";

  let viewBox: string;
  let content: import("react").ReactNode;

  if (iconOnly) {
    viewBox = "0 0 128 100";
    content = (
      <g transform="translate(4 4)">
        <Symbol dark={dark} variant={variant} />
      </g>
    );
  } else if (horizontal) {
    viewBox = showTagline ? "0 0 480 140" : "0 0 480 120";
    content = (
      <>
        <g transform={`translate(16 ${showTagline ? 20 : 8}) scale(1.15)`}>
          <Symbol dark={dark} variant={variant} />
        </g>
        <text x="310" y={showTagline ? 80 : 74} textAnchor="middle" fontFamily={FONT} fontSize="50" letterSpacing="-0.5" fill={text}>
          <tspan fontWeight="800">AEC</tspan>
          <tspan fontWeight="400" dx="9">Network</tspan>
        </text>
        {showTagline && (
          <text x="310" y="106" textAnchor="middle" fontFamily={FONT} fontSize="15" letterSpacing="1" fill={tag} fillOpacity={dark ? 0.8 : 1}>
            A Project by AEC Network
          </text>
        )}
      </>
    );
  } else {
    viewBox = showTagline ? "0 0 400 250" : "0 0 400 215";
    content = (
      <>
        <g transform="translate(112 8) scale(1.4)">
          <Symbol dark={dark} variant={variant} />
        </g>
        <text x="200" y="196" textAnchor="middle" fontFamily={FONT} fontSize="58" letterSpacing="-0.5" fill={text}>
          <tspan fontWeight="800">AEC</tspan>
          <tspan fontWeight="400" dx="10">Network</tspan>
        </text>
        {showTagline && (
          <text x="200" y="228" textAnchor="middle" fontFamily={FONT} fontSize="17" letterSpacing="1.2" fill={tag} fillOpacity={dark ? 0.8 : 1}>
            A Project by AEC Network
          </text>
        )}
      </>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      style={{ display: "block", maxWidth: "100%", height: height ?? "auto", ...style }}
      {...rest}
    >
      <title>{label}</title>
      {content}
    </svg>
  );
}
