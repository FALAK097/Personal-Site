"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="w-full h-screen bg-background overflow-x-hidden flex justify-center items-center relative">
      <MessageDisplay />
      <CharactersAnimation />
      <CircleAnimation />
    </div>
  );
};

function MessageDisplay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute flex flex-col justify-center items-center w-full max-w-lg mx-auto px-6 h-full z-[100]">
      <div
        className={`flex flex-col items-center transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-2xl sm:text-3xl md:text-[35px] font-semibold text-foreground mb-2 sm:mb-4 text-center">
          Page Not Found
        </div>
        <div className="text-5xl sm:text-6xl md:text-[80px] font-bold text-purple-500 mb-4 sm:mb-6">
          404
        </div>
        <div className="text-sm sm:text-base md:text-[15px] text-center text-muted-foreground mb-8 max-w-md">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </div>
        <Link
          href="/"
          className="w-full sm:w-auto group bg-purple-500 text-white hover:bg-purple-600 transition-all duration-300 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:scale-105"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Go Back Home</span>
        </Link>
      </div>
    </div>
  );
}

function CharactersAnimation() {
  const charactersRef = useRef(null);

  useEffect(() => {
    const stickFigures = [
      {
        top: "10%",
        transform: "rotateZ(-90deg)",
        speedX: 3000, // Slowed down
      },
      {
        top: "20%",
        speedX: 4500,
        speedRotation: 3000, // Slowed down
      },
      {
        top: "35%",
        speedX: 6000,
        speedRotation: 2000,
      },
      {
        top: "50%",
        speedX: 3500,
        speedRotation: 2500,
      },
      {
        top: "65%",
        speedX: 3000,
        speedRotation: 1500,
      },
    ];

    if (charactersRef.current) {
      charactersRef.current.innerHTML = "";
    }

    stickFigures.forEach((figure, index) => {
      const stick = document.createElement("div");
      stick.classList.add("characters");
      stick.style.position = "absolute";
      stick.style.width = "40px";
      stick.style.height = "40px";
      stick.style.backgroundColor = "var(--purple-500)";
      stick.style.borderRadius = "50%";

      if (figure.top) stick.style.top = figure.top;
      if (figure.transform) stick.style.transform = figure.transform;

      charactersRef.current?.appendChild(stick);

      stick.animate([{ left: "100%" }, { left: "-20%" }], {
        duration: figure.speedX,
        iterations: Infinity,
        easing: "linear",
      });

      if (figure.speedRotation) {
        stick.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }],
          {
            duration: figure.speedRotation,
            iterations: Infinity,
            easing: "linear",
          }
        );
      }
    });

    return () => {
      if (charactersRef.current) {
        charactersRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={charactersRef} className="absolute w-full h-full" />;
}

function CircleAnimation() {
  const canvasRef = useRef(null);
  const requestIdRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circles = [];
    for (let i = 0; i < 100; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
      });
    }

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(168, 85, 247, 0.4)";

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
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
}
