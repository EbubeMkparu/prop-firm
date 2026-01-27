import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import ContactUs from "@/components/contact-us/contact-us";
import { FadeIn } from "./fade-in";
import { MotionProvider } from "./framer-provider";
import AnimatedBackground from "./effects/AnimatedBackground";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#0a0a0a]">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Content */}
        <div className="relative z-10">
          <Header />
          {children}
          <FadeIn>
            <ContactUs />
          </FadeIn>
          <FadeIn>
            <Footer />
          </FadeIn>
        </div>
      </div>
    </MotionProvider>
  );
};

export default AppLayout;
