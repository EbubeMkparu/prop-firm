"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#FFD700", "#FFA500", "#DAA520", "#F4C430", "#FFDF00"];
    const particleCount = 70;
    const speed = 0.5;
    const minSize = 1;
    const maxSize = 3;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (startFromBottom = false): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: startFromBottom ? canvas.height + 10 : Math.random() * canvas.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedY: (Math.random() * speed + speed * 0.5) * -1,
        speedX: (Math.random() - 0.5) * speed * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(false));
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.shadowBlur = 8;
      ctx.shadowColor = particle.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const updateParticle = (particle: Particle, index: number) => {
      particle.y += particle.speedY;
      particle.x += particle.speedX;
      particle.x += Math.sin(particle.y * 0.008) * 0.3;

      if (particle.y < -10) {
        particlesRef.current[index] = createParticle(true);
      }

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        updateParticle(particle, index);
        drawParticle(particle);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gradient Orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
        style={{
          top: "10%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-pulse-slow"
        style={{
          top: "50%",
          right: "5%",
          background:
            "radial-gradient(circle, rgba(255,165,0,0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-pulse-slow"
        style={{
          bottom: "10%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)",
          filter: "blur(120px)",
          animationDelay: "4s",
        }}
      />

      {/* Canvas Floating Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ background: "transparent" }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,0.9) 100%)",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
