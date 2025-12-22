import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DotLottiePreloader = () => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center bg-white">
    <DotLottieReact
      src="/animations/preloader.lottie"  // ← This path (no src/ or public/)
      loop
      autoplay
      style={{ width: 140, height: 140 }}
    />
  </div>
);

export default DotLottiePreloader;
