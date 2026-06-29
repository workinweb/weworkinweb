import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { CSSProperties } from "react";

interface LottieReactProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  style?: CSSProperties;
}

function LottieReact({
  src,
  className = "w-full h-full",
  autoplay = true,
  loop = true,
  speed = 1,
  style,
}: LottieReactProps) {
  return (
    <DotLottieReact
      src={src}
      className={className}
      autoplay={autoplay}
      loop={loop}
      speed={speed}
      style={style}
    />
  );
}

export default LottieReact;
