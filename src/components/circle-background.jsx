"use client";

import { useEffect, useRef } from "react";

export function CircleBackground({ color = "rgba(168, 85, 247, 0.4)" }) {
  const canvasRef = useRef(null);
  const requestIdRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    }));

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color;

      circles.forEach((circle) => {
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        if (circle.x < 0 || circle.x > canvas.width) circle.speedX *= -1;
        if (circle.y < 0 || circle.y > canvas.height) circle.speedY *= -1;

        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        context.fill();
      });

      requestIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
