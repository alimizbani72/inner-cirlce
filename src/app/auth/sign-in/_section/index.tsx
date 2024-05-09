// pages/index.tsx
"use client";

import { useRive } from "@rive-app/react-canvas";
const Home = () => {
  // const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { RiveComponent } = useRive({
    src: "/assets/rive/whale_animation.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // console.log(rive.);

  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     setCursorPosition({
  //       x: event.clientX,
  //       y: event.clientY,
  //     });
  //   };

  //   // Listen to mouse move events
  //   document.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  return (
    <div>
      <RiveComponent
        style={{ width: 500, height: 500 }}
        // onMouseMove={(e: any) => {
        //   // Update animation based on mouse position
        //   console.log(`Mouse X: ${e.clientX}, Y: ${e.clientY}`);
        // }}
      />
      {/* <div>
        Cursor Position: X: {cursorPosition.x}, Y: {cursorPosition.y}
      </div> */}
    </div>
  );
};

export default Home;
