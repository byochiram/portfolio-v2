type Variant =
  | "diagonal"
  | "wave"
  | "marquee"
  | "timeline"
  | "seal"
  | "converge";

type SectionDividerProps = {
  /** Short kicker naming the section this leads into, e.g. "Stack". */
  label?: string;
  /** Motif matched to the upcoming section. */
  variant?: Variant;
};

const MARQUEE_TRACKS = ["Web", "Game", "Data"];

/**
 * Transition between sections. One green language, a distinct animated motif
 * per section, revealed on scroll. Purely decorative — hidden from a11y tree.
 */
export default function SectionDivider({
  label,
  variant = "diagonal",
}: SectionDividerProps) {
  return (
    <div className={`sxn sxn--${variant}`} data-reveal aria-hidden="true">
      {variant === "diagonal" && (
        <>
          <span className="sxn__slab" />
          <svg className="sxn__diagline" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <line x1="0" y1="188" x2="1200" y2="30" />
          </svg>
          <span className="sxn__rings">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="sxn__kicker">{label}</span>
        </>
      )}

      {variant === "wave" && (
        <>
          <svg className="sxn__wave" viewBox="0 0 1200 130" preserveAspectRatio="none">
            <path
              className="sxn__wave-fill"
              d="M0,64 C240,14 420,114 600,64 C780,14 960,114 1200,58 L1200,130 L0,130 Z"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="M0,64 C240,14 420,114 600,64 C780,14 960,114 1200,58 L1200,130 L0,130 Z;M0,74 C260,124 440,14 600,74 C760,124 980,14 1200,84 L1200,130 L0,130 Z;M0,64 C240,14 420,114 600,64 C780,14 960,114 1200,58 L1200,130 L0,130 Z"
              />
            </path>
            <path
              className="sxn__wave-line"
              d="M0,64 C240,14 420,114 600,64 C780,14 960,114 1200,58"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="M0,64 C240,14 420,114 600,64 C780,14 960,114 1200,58;M0,74 C260,124 440,14 600,74 C760,124 980,14 1200,84;M0,64 C240,14 420,114 600,64 C780,14 960,114 1200,58"
              />
            </path>
            <circle className="sxn__wave-bead" r="6" cx="600" cy="64">
              <animate attributeName="cx" dur="13s" repeatCount="indefinite" values="140;1060;140" />
              <animate attributeName="cy" dur="10s" repeatCount="indefinite" values="64;54;64" />
            </circle>
          </svg>
          <span className="sxn__kicker sxn__kicker--float">{label}</span>
        </>
      )}

      {variant === "marquee" && (
        <div className="sxn__marquee">
          <div className="sxn__marq-track">
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <span className="sxn__marq-group" key={k}>
                {MARQUEE_TRACKS.map((track) => (
                  <b key={`${k}-${track}`}>{track}</b>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}

      {variant === "timeline" && (
        <>
          <span className="sxn__track">
            <i className="sxn__node" />
          </span>
          <span className="sxn__ticks">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="sxn__kicker">{label}</span>
        </>
      )}

      {variant === "seal" && (
        <>
          <span className="sxn__rule" />
          <span className="sxn__seal">
            <i />
            <i />
            <b />
          </span>
          <span className="sxn__rule sxn__rule--right" />
          <span className="sxn__kicker sxn__kicker--under">{label}</span>
        </>
      )}

      {variant === "converge" && (
        <>
          <span className="sxn__converge">
            <i />
            <i />
            <i />
            <i />
            <i />
            <b />
          </span>
          <span className="sxn__kicker">{label}</span>
        </>
      )}
    </div>
  );
}
