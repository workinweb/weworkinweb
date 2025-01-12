import { Player, PlayerEvent } from "@lottiefiles/react-lottie-player";
import React from "react";

interface LottieReactProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  direction?: number;
  hover?: boolean;
  style?: React.CSSProperties;
  segments?: [number, number][];
  background?: string;
  controls?: boolean;
  onEvent?: (event: PlayerEvent) => void;
  onStateChange?: (state: string) => void;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  onEnterFrame?: (frame: number) => void;
  onLoad?: () => void;
  keepLastFrame?: boolean;
}

function LottieReact({
  src,
  className = "w-full h-full",
  autoplay = true,
  loop = true,
  speed,
  direction,
  hover,
  style,
  segments,
  background,
  controls,
  onEvent,
  onStateChange,
  onComplete,
  onLoopComplete,
  onEnterFrame,
  onLoad,
  keepLastFrame,
}: LottieReactProps) {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      className={className}
      speed={speed}
      direction={direction}
      hover={hover}
      style={style}
      segments={segments}
      background={background}
      controls={controls}
      onEvent={onEvent}
      onStateChange={onStateChange}
      onComplete={onComplete}
      onLoopComplete={onLoopComplete}
      onEnterFrame={onEnterFrame}
      onLoad={onLoad}
      keepLastFrame={keepLastFrame}
    />
  );
}

export default LottieReact;
