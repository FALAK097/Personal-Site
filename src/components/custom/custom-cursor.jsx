"use client";

import { useEffect, useState, useRef } from "react";

export const CustomCursor = () => {
  const [circles, setCircles] = useState([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setCircles((prev) => {
        const newCircle = {
          id: idCounter.current++,
          x: e.clientX,
          y: e.clientY,
          size: 0,
          opacity: 0.5,
        };
        return [...prev, newCircle].slice(-5);
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    let animationFrame;
    const animate = () => {
      setCircles((prev) =>
        prev
          .map((circle) => ({
            ...circle,
            size: circle.size + 2,
            opacity: circle.opacity - 0.01,
          }))
          .filter((circle) => circle.opacity > 0)
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="fixed top-0 left-0 rounded-full border border-purple-500 pointer-events-none z-[9998]"
          style={{
            transform: `translate(${circle.x - circle.size / 2}px, ${
              circle.y - circle.size / 2
            }px)`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            opacity: circle.opacity,
          }}
        />
      ))}
    </>
  );
};
