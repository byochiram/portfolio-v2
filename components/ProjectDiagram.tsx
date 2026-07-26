type DiagramKind = "tempus" | "sigma" | "sipp";

/**
 * Hand-drawn process diagrams, one per documented project. Text labels stay
 * short so the SVG holds up on a phone; colour comes from the page theme.
 */
export default function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === "tempus") return <TempusDiagram />;
  if (kind === "sigma") return <SigmaDiagram />;
  return <SippDiagram />;
}

function Node({
  x,
  y,
  w = 128,
  h = 40,
  label,
  sub,
  tone = "plain",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: "plain" | "accent" | "amber" | "muted";
}) {
  return (
    <g className={`pdg__node pdg__node--${tone}`}>
      <rect x={x} y={y} width={w} height={h} rx={9} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} className="pdg__label">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} className="pdg__sub">
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="pdg__arrow" markerEnd="url(#pdg-arrow)" />;
}

function Defs() {
  return (
    <defs>
      <marker id="pdg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" className="pdg__arrowhead" />
      </marker>
    </defs>
  );
}

function LaneLabel({ x, y, text, tone }: { x: number; y: number; text: string; tone: "muted" | "accent" }) {
  return (
    <text x={x} y={y} className={`pdg__lane pdg__lane--${tone}`}>
      {text}
    </text>
  );
}

/** Fixed price today versus the auction flow that replaced it. */
function TempusDiagram() {
  return (
    <figure className="pdg">
      <svg viewBox="0 0 700 250" className="pdg__svg" role="img" aria-label="Fixed price flow compared with the auction flow">
        <Defs />

        <LaneLabel x={0} y={14} text="BEFORE — FIXED PRICE" tone="muted" />
        <Node x={0} y={26} label="Browse" sub="catalog" tone="muted" />
        <Arrow x1={132} y1={46} x2={152} y2={46} />
        <Node x={156} y={26} label="Add to cart" tone="muted" />
        <Arrow x1={288} y1={46} x2={308} y2={46} />
        <Node x={312} y={26} label="Checkout" sub="pay + address" tone="muted" />
        <Arrow x1={444} y1={46} x2={464} y2={46} />
        <Node x={468} y={26} label="Admin ships" tone="muted" />

        <text x={0} y={100} className="pdg__note">
          Price set by one side only — a rare piece can sell under its value.
        </text>

        <line x1={0} y1={116} x2={700} y2={116} className="pdg__divider" />

        <LaneLabel x={0} y={140} text="AFTER — AUCTION" tone="accent" />
        <Node x={0} y={152} label="Admin opens lot" sub="start + end time" tone="accent" />
        <Arrow x1={132} y1={172} x2={152} y2={172} />
        <Node x={156} y={152} label="Bidders compete" tone="accent" />
        <Arrow x1={288} y1={172} x2={308} y2={172} />
        <Node x={312} y={152} label="Anti-sniping" sub="late bid extends" tone="amber" />
        <Arrow x1={444} y1={172} x2={464} y2={172} />
        <Node x={468} y={152} label="Winner pays" sub="24-hour invoice" tone="accent" />
        <Arrow x1={600} y1={172} x2={620} y2={172} />
        <Node x={624} y={152} w={76} label="Ships" tone="accent" />

        <text x={0} y={226} className="pdg__note">
          Unpaid win is rescheduled, never passed to the runner-up.
        </text>
      </svg>
      <figcaption className="pdg__caption">
        Selling model before and after — drawn from the AS-IS / TO-BE activity diagrams.
      </figcaption>
    </figure>
  );
}

/** The whole IRS cycle: what the student does, and what the advisor does back. */
function SigmaDiagram() {
  return (
    <figure className="pdg">
      <svg viewBox="0 0 700 232" className="pdg__svg" role="img" aria-label="Full IRS cycle from student submission to advisor approval and monitoring">
        <Defs />

        <LaneLabel x={0} y={22} text="STUDENT" tone="muted" />
        <LaneLabel x={286} y={22} text="ACADEMIC ADVISOR — MY MODULE" tone="accent" />

        {/* main path */}
        <Node x={0} y={36} w={128} h={44} label="Fill IRS" sub="each semester" tone="muted" />
        <Arrow x1={132} y1={58} x2={139} y2={58} />
        <Node x={143} y={36} w={128} h={44} label="Submit" sub="within window" tone="muted" />
        <Arrow x1={275} y1={58} x2={282} y2={58} />
        <Node x={286} y={36} w={128} h={44} label="Approval queue" sub="filter + bulk" tone="accent" />
        <Arrow x1={418} y1={58} x2={425} y2={58} />
        <Node x={429} y={36} w={128} h={44} label="Approve" sub="or send back" tone="accent" />
        <Arrow x1={561} y1={58} x2={568} y2={58} />
        <Node x={572} y={36} w={128} h={44} label="History PDF" sub="per semester" tone="muted" />

        {/* branch bracket down from the approval queue */}
        <path d="M 350 80 L 350 112 L 636 112" className="pdg__bracket" />
        <Arrow x1={350} y1={112} x2={350} y2={134} />
        <Arrow x1={493} y1={112} x2={493} y2={134} />
        <Arrow x1={636} y1={112} x2={636} y2={134} />

        <Node x={286} y={138} w={128} h={44} label="Grant revision" sub="within 2 weeks" tone="accent" />
        <Node x={429} y={138} w={128} h={44} label="Grant cancellation" sub="within 4 weeks" tone="accent" />
        <Node x={572} y={138} w={128} h={44} label="Cohort recap" sub="who has not filed" tone="amber" />

        <text x={0} y={210} className="pdg__note">
          An advisor carries a whole cohort, so routine approvals clear in bulk
        </text>
        <text x={0} y={226} className="pdg__note">
          and the recap surfaces the students who still have not filed.
        </text>
      </svg>
      <figcaption className="pdg__caption">
        The full IRS cycle. The advisor side — requirements SRS-IRS-005 to 008 — is the part I built.
      </figcaption>
    </figure>
  );
}

/** Legacy rebuild plus the identity check that removed manual entry. */
function SippDiagram() {
  return (
    <figure className="pdg">
      <svg viewBox="0 0 700 250" className="pdg__svg" role="img" aria-label="Legacy rebuild and MANTRA identity validation">
        <Defs />

        <LaneLabel x={0} y={14} text="LEGACY" tone="muted" />
        <Node x={0} y={26} w={190} label="Native PHP workflow" sub="identity typed by hand" tone="muted" />

        <Arrow x1={194} y1={46} x2={238} y2={46} />
        <text x={198} y={38} className="pdg__edge">rebuild</text>

        <LaneLabel x={242} y={14} text="REBUILT ON LARAVEL" tone="accent" />
        <Node x={242} y={26} w={170} label="Training management" tone="accent" />
        <Node x={242} y={76} w={170} label="Participant validation" tone="accent" />
        <Node x={242} y={126} w={170} label="Certificates" tone="accent" />
        <Node x={242} y={176} w={170} label="Dashboard analytics" tone="accent" />

        <Arrow x1={416} y1={96} x2={462} y2={96} />
        <Node x={466} y={76} w={150} label="MANTRA API" sub="government identity" tone="amber" />

        <Arrow x1={416} y1={146} x2={462} y2={146} />
        <Node x={466} y={126} w={150} label="Date guard" sub="no early certificates" tone="amber" />

        <text x={0} y={226} className="pdg__note">
          Records start correct instead of being corrected later.
        </text>
      </svg>
      <figcaption className="pdg__caption">
        What the rebuild changed, and where the external checks sit.
      </figcaption>
    </figure>
  );
}
