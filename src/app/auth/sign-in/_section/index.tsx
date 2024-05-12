// pages/index.tsx
"use client";
import RiveComp from "src/components/RiveComp";

const Home = () => {
  return (
    <div>
      <RiveComp src="/assets/rive/whale_animation.riv" width={500} height={500} />
    </div>
  );
};

export default Home;
