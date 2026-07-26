"use client";

import {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type DraggableLanyardCardProps = {
  active: boolean;
  name: string;
  initials: string;
};

type MotionState = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  dragging: boolean;
  pointerStartX: number;
  pointerStartY: number;
  cardStartX: number;
  cardStartY: number;
  lastPointerX: number;
  lastPointerY: number;
  lastPointerTime: number;
};

const SPRING_STRENGTH = 0.018;
const DAMPING = 0.92;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function DraggableLanyardCard({
  active,
  name,
  initials,
}: DraggableLanyardCardProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const ropeShadowRef = useRef<SVGPathElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const hasEnteredRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const idleRef = useRef(false);
  const loopRef = useRef<(() => void) | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [givenName, ...familyNameParts] = name.trim().split(/\s+/);
  const familyName = familyNameParts.join(" ");

  const motion = useRef<MotionState>({
    x: 0,
    y: -350,
    velocityX: 0,
    velocityY: 0,
    dragging: false,
    pointerStartX: 0,
    pointerStartY: 0,
    cardStartX: 0,
    cardStartY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    lastPointerTime: 0,
  });

  const renderMotion = useCallback(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const rope = ropeRef.current;
    const ropeShadow = ropeShadowRef.current;
    const clip = clipRef.current;
    if (!stage || !card || !rope || !ropeShadow || !clip) return;

    const { x, y, velocityX } = motion.current;
    const stageWidth = stage.clientWidth;
    const anchorX = stageWidth / 2;
    const cardTopX = anchorX + x;
    const cardTopY = card.offsetTop + y;
    const rotation = clamp(x * 0.045 + velocityX * 0.72, -24, 24);
    const rotateY = clamp(-velocityX * 0.75, -13, 13);

    card.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation}deg) rotateY(${rotateY}deg)`;
    clip.style.transform = `translate3d(${x}px, ${y}px, 0) rotateZ(${rotation * 0.32}deg)`;

    // Smooth cubic drape: two control points give the cord a natural sag that
    // bows in the direction of the swing instead of a stiff single-arc bend.
    const dx = cardTopX - anchorX;
    const dy = cardTopY - 8;
    const bow = x * 0.26 + velocityX * 0.5;
    const c1x = anchorX + dx * 0.22 + bow * 0.55;
    const c1y = 8 + dy * 0.44;
    const c2x = anchorX + dx * 0.78 + bow * 0.32;
    const c2y = 8 + dy * 0.8;
    const ropePath = `M ${anchorX} 8 C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${cardTopX.toFixed(1)} ${cardTopY.toFixed(1)}`;
    rope.setAttribute("d", ropePath);
    ropeShadow.setAttribute("d", ropePath);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const run = () => {
      const state = motion.current;

      if (!state.dragging && active && !reducedMotionRef.current) {
        state.velocityX += -state.x * SPRING_STRENGTH;
        state.velocityY += -state.y * SPRING_STRENGTH;
        state.velocityX *= DAMPING;
        state.velocityY *= DAMPING;
        state.x += state.velocityX;
        state.y += state.velocityY;

        if (
          Math.abs(state.x) < 0.02 &&
          Math.abs(state.y) < 0.02 &&
          Math.abs(state.velocityX) < 0.02 &&
          Math.abs(state.velocityY) < 0.02
        ) {
          state.x = 0;
          state.y = 0;
          state.velocityX = 0;
          state.velocityY = 0;
          idleRef.current = true;
        }
      }

      renderMotion();

      if (!idleRef.current || state.dragging) {
        animationRef.current = window.requestAnimationFrame(run);
      } else {
        animationRef.current = null;
      }
    };

    loopRef.current = run;
    animationRef.current = window.requestAnimationFrame(run);
    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, renderMotion]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !active || hasEnteredRef.current) return;

    hasEnteredRef.current = true;
    card.style.opacity = "1";

    if (reducedMotionRef.current) {
      motion.current.x = 0;
      motion.current.y = 0;
      renderMotion();
      return;
    }

    motion.current.x = 28;
    motion.current.y = -350;
    motion.current.velocityX = -0.6;
    motion.current.velocityY = 2.8;
    renderMotion();
  }, [active, renderMotion]);

  const updateFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || !motion.current.dragging) return;

    const state = motion.current;
    const now = performance.now();
    const elapsed = Math.max(now - state.lastPointerTime, 8);
    const nextX = state.cardStartX + event.clientX - state.pointerStartX;
    const nextY = state.cardStartY + event.clientY - state.pointerStartY;

    state.x = nextX;
    state.y = nextY;
    state.velocityX = ((event.clientX - state.lastPointerX) / elapsed) * 15;
    state.velocityY = ((event.clientY - state.lastPointerY) / elapsed) * 15;
    state.lastPointerX = event.clientX;
    state.lastPointerY = event.clientY;
    state.lastPointerTime = now;
    renderMotion();
  };

  const startDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!active) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const state = motion.current;
    state.dragging = true;
    state.pointerStartX = event.clientX;
    state.pointerStartY = event.clientY;
    state.cardStartX = state.x;
    state.cardStartY = state.y;
    state.lastPointerX = event.clientX;
    state.lastPointerY = event.clientY;
    state.lastPointerTime = performance.now();
    state.velocityX = 0;
    state.velocityY = 0;
    setIsDragging(true);

    if (idleRef.current && loopRef.current) {
      idleRef.current = false;
      animationRef.current = window.requestAnimationFrame(loopRef.current);
    }
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!motion.current.dragging) return;
    motion.current.dragging = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const nudgeCard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!active) return;
    const amount = event.shiftKey ? 42 : 20;
    const state = motion.current;

    if (event.key === "ArrowLeft") state.x -= amount;
    else if (event.key === "ArrowRight") state.x += amount;
    else if (event.key === "ArrowUp") state.y -= amount;
    else if (event.key === "ArrowDown") state.y += amount;
    else if (event.key === "Home" || event.key === "Escape") {
      state.x = 0;
      state.y = 0;
      state.velocityX = 0;
      state.velocityY = 0;
    } else {
      return;
    }

    event.preventDefault();
    if (idleRef.current && loopRef.current) {
      idleRef.current = false;
      animationRef.current = window.requestAnimationFrame(loopRef.current);
    }
    renderMotion();
  };

  return (
    <div className="lanyard-stage" ref={stageRef}>
      <div className="lanyard-anchor" aria-hidden="true">
        <span />
      </div>

      <svg className="lanyard-rope" aria-hidden="true">
        <defs>
          <linearGradient id="lanyard-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#172f35" />
            <stop offset="55%" stopColor="#237169" />
            <stop offset="100%" stopColor="#5fae99" />
          </linearGradient>
        </defs>
        <path ref={ropeShadowRef} className="lanyard-rope__shadow" />
        <path ref={ropeRef} className="lanyard-rope__main" />
      </svg>

      <div className="lanyard-clip" ref={clipRef} aria-hidden="true">
        <i />
        <span />
      </div>

      <div
        ref={cardRef}
        className={`lanyard-card ${isDragging ? "lanyard-card--dragging" : ""}`}
        role="group"
        tabIndex={0}
        aria-label="Interactive identity card. Drag with a mouse or finger, or use the arrow keys."
        onPointerDown={startDragging}
        onPointerMove={updateFromPointer}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onKeyDown={nudgeCard}
      >
        <div className="lanyard-card__shine" aria-hidden="true" />
        <div className="lanyard-card__topline">
          <span>BUILD PASS</span>
          <b>{initials}—26</b>
        </div>

        <div className="lanyard-card__portrait" aria-hidden="true">
          <img className="lanyard-card__avatar" src="/rosidah-lanyard-crop.png" alt="" draggable={false} />
        </div>

        <div className="lanyard-card__identity">
          <strong>
            <span>{givenName}</span>
            {familyName && <span>{familyName}</span>}
          </strong>
        </div>
      </div>

    </div>
  );
}
