import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Figma, 
  Github, 
  Globe, 
  Mail, 
  Menu, 
  X, 
  Zap, 
  Terminal,
  Layout, 
  Trophy, 
  MapPin, 
  Phone, 
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Heart,
  ChevronUp,
  Database,
  Smartphone,
  CheckCircle2,
  Users,
  GraduationCap,
  Facebook,
  Linkedin,
  Twitter,
  MessageSquare as Discord,
  Settings,
  Play
} from 'lucide-react';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);

// --- CONSTANTS ---
const NAME = "Carl Vincent B. Dictaan";
const EMAIL = "carldictaan@gmail.com";
const PHONE = "09098282075";
const LOCATION = "Caba, La Union, Philippines";
const TAGLINE = "UI/UX Designer | Front-End Developer | Robotics Enthusiast";

const ROLES = [
  "Front-End Developer",
  "UI/UX Designer",
  "Robotics Enthusiast",
  "Web Developer",
  "Full-Stack Developer",
  "Video Editor"
];

const Typewriter = React.memo(({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : subIndex === words[index].length ? 1000 : 80));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-accent-blue font-mono relative drop-shadow-[0_0_10px_rgba(0,210,255,0.3)] uppercase will-change-[contents]">
      {` ${words[index].substring(0, subIndex)}`}
      <span className="inline-block w-[2px] h-[1em] bg-accent-blue ml-1 animate-pulse align-middle" />
    </span>
  );
});

const SKILLS = {
  frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Bootstrap", "Tailwind CSS", "Responsive Design"],
  uiux: ["Figma", "Wireframing", "Prototyping", "User-Centered Design", "Design Systems", "Mobile-First Design"],
  robotics: ["Arduino", "ESP32", "EV3", "LEGO Robotics", "FLL & Robo Mission", "Robotics Programming"],
  backend: ["Node.js", "REST APIs", "Firebase", "PHP (basic)", "Git", "Database Fundamentals"],
  multimedia: ["Video Editing", "Content Creation", "Website Design", "Broadcasting", "Application Dev"],
  tools: ["VS Code", "Figma", "Git", "Google Sheets", "Claude", "Gemini", "ChatGPT"]
};

interface Achievement {
  title: string;
  year: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
  link?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Philippines Robotics Olympiad (PRO) — Finalist",
    year: "2024 & 2026",
    desc: "National & International Level Competition Finalist. Represented the Philippines and competed against top young robotics engineering talents.",
    icon: <Trophy className="text-yellow-400" />,
    image: "/images/regenerated_image_1778054408619.png"
  },
  {
    title: "GAR China — International Robotics Competition",
    year: "2025",
    desc: "Represented the Philippines in Global AI Robot Competition held in Hangzhou, China. Gained international experience in robotics and teamwork.",
    icon: <Globe className="text-blue-400" />,
    image: "/images/regenerated_image_1778054413461.jpg"
  },
  {
    title: "DOST RoboTech Cup — Search & Rescue",
    year: "February 2026",
    desc: "Elite Team Leader for Polytechnic College of La Union. Designed and programmed autonomous robots for complex search and rescue missions.",
    icon: <Cpu className="text-emerald-400" />,
    image: "/images/regenerated_image_1778054415571.jpg"
  },
  {
    title: "Outstanding Kabataan Award",
    year: "October 2025",
    desc: "Community Youth Recognition awarded for outstanding contributions to local youth leadership and technological involvement.",
    icon: <Zap className="text-purple-400" />,
    image: "/images/regenerated_image_1778055540363.png"
  },
  {
    title: "Peak Minds",
    year: "Fitness Design · 2026",
    desc: "A high-energy fitness landing page built to inspire motivation and action. This powerful platform turns inspiration into real results through impactful design, bold typography, and a structured layout that effectively captures attention.",
    icon: <Zap className="text-orange-400" />,
    image: "/images/regenerated_image_1778438973804.png",
    link: "https://peakminds.netlify.app/"
  },
  {
    title: "entertainment video of cat edit",
    year: "Video Creation · 2024",
    desc: "Cat education video, that shows the importance of reading.",
    icon: <Play className="text-red-400" />,
    image: "/images/regenerated_image_1778440569107.png",
    link: "/videos/cat.mp4"
  },
  {
    title: "pristinepaws",
    year: "Luxury Pet Care · 2026",
    desc: "A high-end digital sanctuary for pets. pristinepaws offers luxury grooming, holistic boarding, and mindful pet care services for your beloved companions.",
    icon: <Heart className="text-emerald-400" />,
    image: "/images/regenerated_image_1778438972567.png",
    link: "https://pristinepawss.netlify.app/"
  }
];

const LEADERSHIP = [
  { role: "Robotics Club Leader", org: "PCLU (2025–Present)", icon: <Users size={20} /> },
  { role: "Robotics Elite Team Member", org: "PCLU (2024–Present)", icon: <Cpu size={20} /> },
  { role: "CAT Cadet Commander", org: "Cadet of the Year (JHS)", icon: <CheckCircle2 size={20} /> },
  { role: "Youth Leadership Camp", org: "PCLU (2026)", icon: <Users size={20} /> }
];

// --- COMPONENTS ---

const RoboticCore = React.memo(() => {
  const [greeting, setGreeting] = useState("SYSTEM INITIALIZING...");
  const [showGreeting, setShowGreeting] = useState(false);
  const coreRef = useRef<HTMLDivElement>(null);
  
  // Spring-based mouse tracking for buttery smooth movement
  const springX = useSpring(0, { stiffness: 40, damping: 20 });
  const springY = useSpring(0, { stiffness: 40, damping: 20 });
  const rotateX = useSpring(0, { stiffness: 40, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 40, damping: 20 });
  
  const greetings = ["HELLO HUMAN", "WELCOME TO MY DOMAIN", "SYSTEM INITIALIZED", "SENSING YOUR BRAINWAVES", "PREPARING FOR DEPLOYMENT"];

  useEffect(() => {
    // Automatic trigger after 2 seconds
    const timeout = setTimeout(() => setShowGreeting(true), 2000);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!coreRef.current) return;
      const rect = coreRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const offsetX = (e.clientX - centerX) / 20;
      const offsetY = (e.clientY - centerY) / 20;
      
      springX.set(offsetX);
      springY.set(offsetY);
      rotateX.set(-offsetY * 1.2);
      rotateY.set(offsetX * 1.2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [springX, springY, rotateX, rotateY]);

  useEffect(() => {
    if (showGreeting) {
      let i = 0;
      const interval = setInterval(() => {
        setGreeting(greetings[i % greetings.length]);
        i++;
      }, 4000); // Not too fast: 4 seconds per message
      return () => clearInterval(interval);
    }
  }, [showGreeting, greetings]);
  
  useEffect(() => {
    if (!coreRef.current) return;
    
    const ctx = gsap.context(() => {
      // Background rotation (constant)
      gsap.to(".gear-outer", { rotation: 360, duration: 40, repeat: -1, ease: "none" });
      gsap.to(".gear-mid", { rotation: -360, duration: 25, repeat: -1, ease: "none" });
      
      // Scroll-linked rotation (Reactive)
      gsap.to(".gear-inner", {
        rotation: 720,
        scrollTrigger: {
          trigger: coreRef.current,
          start: "top center+=200",
          end: "bottom top",
          scrub: 2,
        }
      });

      // Data display scaling on scroll
      gsap.from(".hud-data", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: coreRef.current,
          start: "top center",
          end: "center center",
          scrub: 1,
        }
      });
      
      // Pulsing data lines
      gsap.to(".hud-line", { 
        strokeDashoffset: -20, 
        duration: 1, 
        repeat: -1, 
        ease: "none" 
      });
    }, coreRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={coreRef} className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[500px] aspect-square flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-accent-blue/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse"></div>
      
      {/* Outer Gear Hud */}
      <div className="gear-outer absolute inset-0 opacity-20 will-change-transform transform-gpu">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="text-accent-blue" />
          {[...Array(12)].map((_, i) => (
            <text key={i} x="100" y="8" transform={`rotate(${i * 30} 100 100)`} className="fill-accent-blue text-[4px] font-mono font-bold tracking-tighter">
              DRV_{i.toString().padStart(2, '0')}
            </text>
          ))}
        </svg>
      </div>

      {/* Middle Ring */}
      <div className="gear-mid absolute inset-10 opacity-40 will-change-transform transform-gpu">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="100 20" className="text-accent-blue hud-line" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="text-accent-blue opacity-30" />
        </svg>
      </div>

      {/* Inner Core Plate */}
      <motion.div 
        style={{ 
          x: springX, 
          y: springY,
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setShowGreeting(true)}
        className="relative hide-on-hover-trigger w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-accent-blue/10 backdrop-blur-xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center transition-shadow duration-700 shadow-[0_0_100px_rgba(0,210,255,0.1)] group hud-data cursor-pointer z-10 will-change-transform transform-gpu"
      >
        <div className="absolute inset-3 sm:inset-4 border border-accent-blue/20 rounded-[1.2rem] sm:rounded-[2rem] gear-inner"></div>
        
        {/* Scanning Line Effect */}
        <motion.div 
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-6 right-6 h-[1px] bg-accent-blue/40 shadow-[0_0_10px_#00D2FF] z-0 pointer-events-none"
        />
        
        {/* Dynamic Greeting Label */}
        <AnimatePresence>
          {showGreeting && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: -40 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              className="absolute -top-12 sm:-top-20 md:-top-24 left-1/2 -translate-x-1/2 px-4 sm:px-10 py-2 sm:py-5 bg-accent-blue text-bg-deep rounded-xl sm:rounded-2xl whitespace-nowrap z-30 shadow-[0_0_50px_rgba(0,210,255,0.7)] border-2 border-white/30 backdrop-blur-md will-change-transform transform-gpu"
            >
              <div className="text-[10px] sm:text-base md:text-xl font-hacker font-black tracking-[0.1em] sm:tracking-[0.2em] flex items-center gap-2 sm:gap-4 leading-none">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-bg-deep rounded-full animate-pulse shadow-[0_0_10px_#000]" />
                {greeting}
                <Terminal size={12} className="sm:size-6 opacity-90" />
              </div>
              <div className="absolute -bottom-1 sm:-bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-5 sm:h-5 bg-accent-blue rotate-45 border-r-2 border-b-2 border-white/30 shadow-[5px_5px_10px_rgba(0,0,0,0.2)]"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center gap-2 sm:gap-4 relative z-10">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu size={40} className="sm:size-20 text-accent-blue md:size-[100px] drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
          </motion.div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[12px] font-black tracking-[0.1em] sm:tracking-[0.2em] text-white uppercase italic">DAISY</span>
          </div>
        </div>
      </motion.div>

      {/* Orbiting Points */}
      {[...Array(3)].map((_, i) => (
        <motion.div
           key={i}
           animate={{ rotate: 360 }}
           transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 pointer-events-none"
        >
           <div 
             className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
           >
             <div className="w-1.5 h-1.5 bg-accent-blue rounded-full shadow-[0_0_10px_#00D2FF]"></div>
             <div className="w-[1px] h-12 bg-gradient-to-t from-accent-blue/50 to-transparent"></div>
           </div>
        </motion.div>
      ))}
    </div>
  );
});

const ParallaxShowcase = ({ onPlayVideo }: { onPlayVideo?: (url: string) => void }) => {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-bg-deep py-20 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center lg:text-left">
         <Reveal>
            <h2 className="text-accent-blue font-hacker font-bold uppercase tracking-[0.3em] text-[12px] mb-6 flex items-center justify-center lg:justify-start gap-3 leading-none">
              <span className="w-8 h-[1px] bg-accent-blue/30" /> 
              VISUAL CHRONICLE
            </h2>
            <h3 className="text-3xl sm:text-5xl md:text-8xl font-display font-black leading-tight uppercase">
              The Journey In <br/><span className="text-accent-blue">Motion.</span>
            </h3>
         </Reveal>
      </div>
      
      <div className="space-y-40 md:space-y-64 pb-32">
        {ACHIEVEMENTS.map((item, idx) => (
          <ParallaxItem 
            key={idx} 
            achievement={item} 
            index={idx} 
            onPlayVideo={onPlayVideo}
          />
        ))}
      </div>
    </section>
  );
};

function ParallaxItem({ achievement, index, onPlayVideo }: { achievement: Achievement; index: number; onPlayVideo?: (url: string) => void; key?: React.Key }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Parallax transforms - smoothed and refined
  // Enhanced parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.93, 1, 1, 0.93]);
  const textX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [isEven ? -40 : 40, 0, 0, isEven ? -40 : 40]);

  return (
    <div ref={ref} id={`journey-item-${index}`} className="relative min-h-[50vh] lg:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 will-change-transform transform-gpu">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Content Side */}
        <motion.div 
          style={{ opacity, x: textX, y }}
          className={`z-20 text-center lg:text-left ${isEven ? 'lg:order-1' : 'lg:order-2'} will-change-transform transform-gpu`}
        >
          {achievement.title !== "entertainment video of cat edit" && (
            <div className="inline-flex items-center gap-4 py-2 px-6 bg-white/5 rounded-full border border-white/10 mb-8 backdrop-blur-md">
              <span className="text-accent-blue opacity-80">{achievement.icon}</span>
              <span className="text-[11px] font-bold tracking-[0.3em] text-white uppercase">{achievement.year}</span>
            </div>
          )}
          <h4 className="text-4xl md:text-7xl font-display font-black mb-8 leading-tight tracking-tight italic">
            {achievement.title}
          </h4>
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 font-sans leading-[1.6] mb-10">
            {achievement.desc}
          </p>
          
          {achievement.link && !achievement.link.startsWith('#') && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <ElectricButton 
                onClick={() => {
                  if (achievement.title === "entertainment video of cat edit") {
                    onPlayVideo?.(achievement.link!);
                  } else {
                    window.open(achievement.link, '_blank');
                  }
                }}
                className="!px-8 !py-4"
              >
                {achievement.title === "entertainment video of cat edit" ? "WATCH VIDEO" : "VISIT PROJECT WEBSITE"} {achievement.title === "entertainment video of cat edit" ? <Play size={14} className="ml-2" /> : <ExternalLink size={14} className="ml-2" />}
              </ElectricButton>
            </motion.div>
          )}
        </motion.div>

        {/* Image Side */}
        <div className={`relative group ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <motion.div 
            onClick={() => {
              if (achievement.title === "entertainment video of cat edit" && achievement.link) {
                onPlayVideo?.(achievement.link);
              } else if (achievement.link?.startsWith('#')) {
                window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: achievement.link }));
              } else if (achievement.link) {
                window.open(achievement.link, '_blank');
              }
            }}
            style={{ y: imageY, opacity, scale }}
            className={`block relative aspect-[3/4] sm:aspect-[4/3] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] ${achievement.link ? 'cursor-pointer' : 'cursor-default'} will-change-transform transform-gpu`}
          >
            <img 
              id={`journey-image-${index}`}
              src={achievement.image} 
              alt={achievement.title} 
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-110"
            />

            {/* Video Play Button Overlay for the specific cat edit video */}
            {achievement.title === "entertainment video of cat edit" && (
              <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 sm:w-28 sm:h-28 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] group/play"
                >
                  <div className="w-16 h-16 sm:w-22 sm:h-22 bg-accent-blue rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,210,255,0.5)] transition-all duration-500 group-hover/play:bg-white group-hover/play:shadow-[0_0_40px_white]">
                     <Play className="text-bg-deep fill-bg-deep translate-x-1" size={40} />
                  </div>
                </motion.div>
              </div>
            )}
            
          </motion.div>
          
          {/* Decorative frame elements that move independently */}
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
            className="absolute -top-10 -right-10 w-40 h-40 border-r border-t border-accent-blue/20 rounded-tr-[4rem] z-0 pointer-events-none transform-gpu will-change-transform"
          />
          <motion.div 
             style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
             className="absolute -bottom-10 -left-10 w-40 h-40 border-l border-b border-accent-blue/20 rounded-bl-[4rem] z-0 pointer-events-none transform-gpu will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}

const Reveal = React.memo(({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={`${className} will-change-[transform,opacity] transform-gpu`}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
));

const ProjectLink = ({ href, icon, label, type, onClick, isSecondary }: { href?: string, icon: React.ReactNode, label: string, type: string, onClick?: (e: React.MouseEvent) => void, isSecondary?: boolean }) => (
  <motion.a 
    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    whileTap={{ scale: 0.98 }}
    href={href} 
    onClick={onClick}
    target={href ? "_blank" : undefined} 
    rel={href ? "noopener noreferrer" : undefined} 
    className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-[#00D2FF]/30 transition-all group cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#00D2FF]/50 transition-colors shadow-2xl`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-brand font-black tracking-[0.2em] uppercase text-[#00D2FF] mb-0.5 opacity-80">{type}</span>
        <span className="text-sm font-brand font-black tracking-widest uppercase text-white leading-none">{label}</span>
      </div>
    </div>
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 opacity-40 group-hover:opacity-100 group-hover:bg-[#00D2FF]/20 group-hover:text-[#00D2FF] transition-all">
      {isSecondary ? <Play size={14} /> : <ExternalLink size={14} />}
    </div>
  </motion.a>
);

const ProjectPromoPopup = React.memo(({ isOpen, onClose, onPlayVideo }: { isOpen: boolean, onClose: () => void, onPlayVideo?: (url: string) => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-6 p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm"
          />
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9, y: 30 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: 30 }}
             transition={{ type: "spring", damping: 25, stiffness: 300 }}
             className="relative w-full max-w-md bg-bg-deep/95 border border-[#00D2FF]/30 rounded-[3rem] shadow-[0_0_100px_rgba(0,210,255,0.1)] backdrop-blur-2xl max-h-[90vh] flex flex-col overflow-hidden transform-gpu"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00D2FF]/10 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#00D2FF]/10 blur-[100px] pointer-events-none rounded-full" />
            
            {/* Scanning Line Effect */}
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
              <motion.div 
                animate={{ y: ["0%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#00D2FF]/5 to-transparent absolute -top-1/2"
              />
            </div>

            <button 
              onClick={onClose} 
              className="absolute top-8 right-8 text-white/50 hover:text-[#00D2FF] hover:bg-white/5 p-2 rounded-full transition-all z-[70] group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
            
            {/* Scrollable Content Area */}
            <div className="relative z-50 flex-1 overflow-y-auto overflow-x-hidden p-8 sm:p-10 [scrollbar-gutter-stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#00D2FF]/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#00D2FF]/30 [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#11111100] [&::-webkit-scrollbar-thumb]:bg-clip-padding">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#00D2FF]/10 rounded-full border border-[#00D2FF]/20 mb-10 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]" />
                  <span className="text-[9px] font-brand font-black tracking-[0.4em] uppercase text-[#00D2FF]">System Alert: Feature Projects</span>
                </div>

                <h4 className="text-3xl sm:text-4xl font-brand font-black mb-6 uppercase text-white italic leading-[1.1] tracking-[0.1em] text-center">
                  Check My <span className="text-[#00D2FF] drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]">Main</span> Projects.
                </h4>
                
                <p className="text-sm text-text-secondary/70 mb-10 leading-relaxed font-brand tracking-[0.05em] max-w-[280px] text-center">
                  Explore a curated selection of my latest <span className="text-[#00D2FF] font-bold opacity-100">Modern Websites</span> and <span className="text-white font-bold opacity-100 italic">Creative Edits</span>.
                </p>
                
                <div className="flex flex-col gap-3.5 mb-12 w-full">
                  <ProjectLink 
                    href="https://pristinepawss.netlify.app/"
                    icon={<Heart size={16} className="text-emerald-400" />}
                    label="PristinePaws"
                    type="Luxury Pet Care"
                  />
                  <ProjectLink 
                    href="https://peakminds.netlify.app/"
                    icon={<Zap size={16} className="text-orange-400" />}
                    label="Peak Minds"
                    type="Fitness Ecosystem"
                  />
                  <ProjectLink 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (onPlayVideo) onPlayVideo("/videos/cat.mp4");
                      else window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: '#portfolio' }));
                      onClose(); 
                    }}
                    icon={<Play size={16} className="text-red-400" />}
                    label="Cat Edit Video"
                    type="Creative Motion"
                    isSecondary
                  />
                </div>
                
                <div className="pt-10 border-t border-white/5 w-full">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
                    <span className="text-[10px] font-brand font-black tracking-[0.4em] uppercase text-text-secondary/40">Connect</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
                  </div>
                  <div className="flex justify-center gap-6 sm:gap-8">
                     <SocialLink href={`mailto:${EMAIL}`} icon={<Mail size={20} />} />
                     <SocialLink href="https://www.facebook.com/CarlDictaan" icon={<Facebook size={20} />} />
                     <SocialLink href="https://ph.linkedin.com/in/carl-vincent-dictaan-412838406" icon={<Linkedin size={20} />} />
                     <SocialLink href="https://www.upwork.com/freelancers/~01cc0415fe3f913e35?mp_source=share" icon={<div className="font-brand font-black text-[9px]">UP</div>} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

// --- PERFORMANCE OPTIMIZED COMPONENTS ---
const BackgroundAnimation = React.memo(() => {
  return (
    <div className="fixed inset-0 -z-10 bg-bg-deep overflow-hidden pointer-events-none will-change-[background-color]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <svg width="100%" height="100%" className="text-accent-blue">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Circuit Paths - Optimized */}
      <div className="absolute inset-0 opacity-5 md:opacity-10 pointer-events-none will-change-transform">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="text-accent-blue">
          <motion.path 
            d="M 0 100 L 200 100 L 250 150 L 500 150 L 550 100 L 1000 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M 1000 800 L 800 800 L 750 750 L 500 750 L 450 800 L 0 800" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-accent/5 blur-[60px] md:blur-[100px] rounded-full pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent-blue/5 blur-[50px] md:blur-[80px] rounded-full pointer-events-none transform-gpu" />
    </div>
  );
});

const Navbar = ({ scrolled, scrollTo, open, setOpen, progress, activeSection }: { 
  scrolled: boolean, 
  scrollTo: (href: string) => void,
  open: boolean,
  setOpen: (open: boolean) => void,
  progress: any,
  activeSection: string
}) => {
  const navLinks = [
    { name: 'Profile', href: '#about' },
    { name: 'TECH STACK', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'PROJECTS', href: '#projects' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'py-4 glass shadow-[0_10px_30px_rgba(0,0,0,0.1)]' : 'py-5 md:py-8 bg-transparent'} ${open ? '!bg-[#020617] !backdrop-blur-none' : ''}`}>
      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1.5px] md:h-[2px] bg-accent-blue z-10 origin-left opacity-30" 
        style={{ scaleX: progress }} 
      />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 h-full flex items-center justify-between">
        <a 
          href="#" 
          className="font-brand text-xl md:text-2xl tracking-normal flex items-center group relative z-[110]" 
          onClick={(e) => handleNavClick(e, '#top')}
        >
          <motion.span 
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="uppercase relative py-2 px-4 md:py-2.5 md:px-7 border border-white/10 bg-white/5 rounded-xl group-hover:border-accent-blue/50 transition-colors duration-500 overflow-hidden flex items-center gap-2 md:gap-3 backdrop-blur-md"
          >
            {/* Rotating Gear Icon */}
            <motion.div
              variants={{
                initial: { rotate: 0, scale: 1 },
                hover: { rotate: 360, scale: 1.25 }
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="text-accent-blue shrink-0 drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]"
            >
              <Settings size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={2.5} />
            </motion.div>

            <span className="relative z-10 transition-colors duration-500 group-hover:text-white flex items-center whitespace-nowrap tracking-wide">
              CARL <span className="mx-1 hidden md:inline">DICTAAN</span>
            </span>
          </motion.span>
        </a>

        <div className="hidden md:flex items-center gap-2 lg:gap-4 font-sans relative">
          {/* Track Line Background */}
          <div className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-white/10 pointer-events-none rounded-full" />
          
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              initial="initial"
              animate={activeSection === link.href.substring(1) ? "active" : "initial"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className={`relative px-3 lg:px-6 py-3 text-[11px] lg:text-[13px] font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] transition-colors duration-300 group z-10 ${activeSection === link.href.substring(1) ? 'text-accent-blue' : 'text-white/50 hover:text-white'}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className="relative z-10">{link.name}</span>
              
              {activeSection === link.href.substring(1) && (
                <motion.div 
                  layoutId="activeNavLine"
                  className="absolute inset-x-0 bottom-[-4px] h-[3px] bg-accent-blue rounded-full shadow-[0_0_15px_#00D2FF] z-20"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}

              <motion.div 
                className="absolute inset-x-0 bottom-[-4px] h-[3px] bg-accent-blue/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                variants={{
                  hover: { scaleX: 0.5 },
                }}
              />

              <motion.div 
                className="absolute inset-0 bg-accent-blue/5 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
              />
            </motion.a>
          ))}
          <div className="w-[1px] h-8 bg-white/10 mx-1 lg:mx-3" />
          <div className="relative">
            <ElectricButton 
              isActive={activeSection === 'contact'}
              className={`!px-0 !py-4 !rounded-xl !text-[11px] ml-1 lg:ml-2 font-hacker border-none transition-all duration-500 w-[140px] md:w-[150px] lg:w-[180px] flex justify-center items-center ${
                activeSection === 'contact' 
                  ? '!bg-bg-deep !text-white !border !border-accent-blue/30 shadow-[0_0_30px_rgba(0,210,255,0.4)]' 
                  : '!bg-accent-blue !text-bg-deep shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:!bg-white'
              }`} 
              onClick={(e) => handleNavClick(e, '#contact')}
              backChildren={<span className="font-bold tracking-[0.1em] text-white">HIRE ME</span>}
            >
              GET IN TOUCH
            </ElectricButton>
            
            {activeSection === 'contact' && (
              <motion.div 
                layoutId="activeNavLine"
                className="absolute inset-x-0 bottom-[-4px] h-[3px] bg-accent-blue rounded-full shadow-[0_0_15px_#00D2FF] z-20 ml-1 lg:ml-2"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
          </div>
        </div>

        <button 
          className="md:hidden relative z-[210] p-2 text-white group outline-none" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <div className="relative w-6 h-5">
            <motion.span 
               initial={false}
               animate={open ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
               className="absolute top-0 left-0 h-0.5 bg-white rounded-full origin-center"
               transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span 
               initial={false}
               animate={open ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
               className="absolute top-1/2 -translate-y-1/2 left-0 w-3/4 h-0.5 bg-white rounded-full"
               transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span 
               initial={false}
               animate={open ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
               className="absolute bottom-0 left-0 h-0.5 bg-white rounded-full origin-center"
               transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div 
            initial={{ clipPath: "circle(0% at 90% 5%)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at 90% 5%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 90% 5%)", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#020617] flex flex-col items-center justify-center p-6 md:hidden overflow-hidden"
          >
            {/* Background decoration for mobile menu */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-accent-blue/10 blur-[120px] rounded-full" 
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [0, -90, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-blue/5 blur-[100px] rounded-full" 
              />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-sm">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 md:mb-12"
              >
                <span className="text-[10px] font-bold tracking-[0.4em] text-accent-blue/60 uppercase">Explore Hub</span>
              </motion.div>
              
              <div className="flex flex-col items-center gap-4 w-full">
                {navLinks.map((link, idx) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    initial={{ opacity: 0, y: 30, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => {
                      setOpen(false);
                      handleNavClick(e, link.href);
                    }} 
                    className="group relative text-3xl xs:text-4xl sm:text-5xl font-display font-black text-center text-white hover:text-accent-blue transition-all duration-500 uppercase tracking-tight italic w-full overflow-hidden py-4"
                  >
                    <span className="relative z-10 block group-hover:-translate-y-2 transition-transform duration-500">{link.name}</span>
                    <span className="absolute inset-0 flex items-center justify-center text-accent-blue opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500 blur-sm group-hover:blur-0">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="w-full mt-10 pt-10 border-t border-white/10"
              >
                <ElectricButton 
                  className="!w-full !py-6 !rounded-2xl !text-sm font-black !bg-accent-blue !text-bg-deep border-none shadow-[0_0_30px_rgba(0,210,255,0.3)] hover:scale-105 active:scale-95 transition-transform" 
                  onClick={(e) => {
                    setOpen(false);
                    handleNavClick(e, '#contact');
                  }}
                >
                  GET IN TOUCH
                </ElectricButton>
              </motion.div>

              {/* Close button inside menu for redundancy */}
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => setOpen(false)}
                className="mt-8 text-white/30 hover:text-white uppercase text-[9px] tracking-[0.3em] font-bold transition-colors"
              >
                BACK TO TERMINAL
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const VideoModal = ({ url, onClose }: { url: string; onClose: () => void }) => {
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
  const isLocalVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');

  // Extract YouTube ID if it's a YouTube link
  const getEmbedUrl = (url: string) => {
    if (isYoutube) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`;
      }
    }
    return url;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      <motion.button
        onClick={onClose}
        className="absolute top-6 right-6 z-[210] p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-white group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
      </motion.button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {isLocalVideo ? (
          <video 
            src={url} 
            className="w-full h-full" 
            controls 
            autoPlay 
            playsInline
          />
        ) : (
          <iframe
            src={getEmbedUrl(url)}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Player"
          ></iframe>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [showPromo, setShowPromo] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const promoTriggerRef = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const lenisRef = useRef<Lenis | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setFormStatus('sending');

    // To make this work:
    // 1. Go to https://web3forms.com/ and get your free Access Key.
    // 2. Replace 'YOUR_ACCESS_KEY_HERE' with your key.
    
    const formData = new FormData(form);
    
    // Honeypot check for bots
    if (formData.get("botcheck")) {
      return; 
    }

    const object = Object.fromEntries(formData);
    
    // SECURITY: Input sanitization is handled by Web3Forms on the server,
    // but we enforce client-side structure here.
    if (!object.name || !object.email || !object.message) {
      console.error("Missing required fields");
      return;
    }

    // Message length limit to prevent oversized payloads
    if (String(object.message).length > 2000) {
       console.error("Message too long");
       return;
    }

    const json = JSON.stringify({
      ...object,
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      subject: "New Portfolio Message"
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const res = await response.json();

      if (res.success) {
        setFormStatus('sent');
        setTimeout(() => setFormStatus('idle'), 5000);
        form.reset();
      } else {
        throw new Error(res.message || "Submission failed");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Filter for elements that are actually entering or exiting the "center zone"
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id && ['hero', 'about', 'skills', 'portfolio', 'projects', 'contact'].includes(id)) {
            setActiveSection(id === 'hero' ? 'top' : id);
          }
        }
      });
    }, { 
      threshold: 0.01,
      // Focus on a narrow horizontal strip in the middle of the screen
      rootMargin: "-48% 0px -48% 0px" 
    });

    // Observe sections for navbar highlighting
    const selectors = ['#hero', '#about', '#skills', '#portfolio', '#projects', '#contact'];
    selectors.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) observer.observe(el);
    });

    // Special observer for promo popup trigger at the bottom of contact
    const promoObserver = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        setShowPromo(true);
        // Only show once per session correctly by unobserving
        if (promoTriggerRef.current) obs.unobserve(promoTriggerRef.current);
      }
    }, { threshold: 0.5 });
    
    if (promoTriggerRef.current) promoObserver.observe(promoTriggerRef.current);

    return () => {
      observer.disconnect();
      promoObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScrollEvent = (e: any) => {
      if (e.detail) {
        handleSectionScroll(e.detail);
      }
    };
    window.addEventListener('scroll-to-section', handleScrollEvent);
    return () => window.removeEventListener('scroll-to-section', handleScrollEvent);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    
    lenisRef.current = lenis;
    
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSectionScroll = (href: string) => {
    const targetHref = href === '#' || href === '#top' || href === '' ? '#top' : href;
    
    // Set active section immediately for better UX
    const sectionId = targetHref.substring(1);
    const validSections = ['top', 'hero', 'about', 'skills', 'portfolio', 'projects', 'contact'];
    if (validSections.includes(sectionId)) {
      setActiveSection(sectionId === 'hero' ? 'top' : sectionId);
    }
    
    // Ensure Lenis is started
    if (lenisRef.current) {
      lenisRef.current.start();
    }

    // Small delay on mobile to allow menu to start closing
    const isMobile = window.innerWidth < 768;
    
    const executeScroll = () => {
      if (targetHref === '#top') {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { 
            duration: 1.5, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const targetElement = document.querySelector(targetHref);
      if (!targetElement) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, { 
          duration: 1.5,
          offset: isMobile ? -80 : -100, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          immediate: false,
        });
      } else {
        const rect = targetElement.getBoundingClientRect();
        const top = rect.top + window.pageYOffset - (isMobile ? 80 : 100);
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    if (isMobile) {
      setTimeout(executeScroll, 350); // Increased delay for mobile menu closure sync
    } else {
      executeScroll();
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div id="top" className="relative selection:bg-accent-blue/30 overflow-x-hidden">
      <BackgroundAnimation />
      <Navbar 
        scrolled={scrolled} 
        scrollTo={handleSectionScroll} 
        open={mobileMenuOpen} 
        setOpen={setMobileMenuOpen} 
        progress={scaleX}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 overflow-hidden scroll-mt-28">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="z-10 text-center md:text-left order-2 md:order-1">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[9.5rem] font-brand leading-[0.85] mb-8 lg:mb-16 tracking-tight cursor-default select-none group"
              >
                <span className="block text-[#00D2FF] drop-shadow-[0_0_25px_rgba(0,210,255,0.4)]">{NAME.split(" ").slice(0, 2).join(" ")}</span>
                <span className="text-[#00D2FF] relative inline-block group-hover:text-white transition-colors duration-500">
                  {NAME.split(" ").slice(2).join(" ")}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#00D2FF] group-hover:w-full transition-all duration-500 shadow-[0_0_20px_#00D2FF]" />
                </span>
                <span className="text-[#00D2FF] group-hover:scale-150 inline-block transition-transform duration-500 ml-2">.</span>
              </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base md:text-xl lg:text-2xl text-text-primary max-w-2xl mx-auto md:mx-0 mb-10 md:mb-16 font-sans flex flex-col gap-6 md:gap-10">
              <p className="leading-[1.4] font-black tracking-wide uppercase italic text-lg sm:text-2xl md:text-3xl lg:text-4xl">{TAGLINE}</p>
              <div className="text-xs sm:text-base md:text-xl font-hacker tracking-normal text-white flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-3 md:gap-x-6 md:gap-y-4">
                <span className="opacity-40 font-bold text-[8px] md:text-sm tracking-[0.3em]">SPECIALIZING IN</span>
                <Typewriter words={ROLES} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap justify-center md:justify-start gap-4">
              <ElectricButton 
                onClick={() => handleSectionScroll('#projects')}
                className="!bg-accent-blue !border-none !text-bg-deep !rounded-full !px-8 md:!px-10 hover:!bg-white w-full sm:w-auto shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_40px_rgba(0,210,255,0.5)]"
              >
                VIEW MY WORK <ChevronRight size={16} />
              </ElectricButton>
              <ElectricButton 
                onClick={() => handleSectionScroll('#contact')}
                className="!bg-accent-blue/5 !border-accent-blue/40 !rounded-full !px-8 md:!px-10 w-full sm:w-auto hover:!bg-accent-blue/20 shadow-[0_0_15px_rgba(0,210,255,0.1)] hover:shadow-[0_0_30px_rgba(0,210,255,0.3)]"
              >
                CONTACT ME
              </ElectricButton>
            </motion.div>
          </div>
          
          <div className="relative flex justify-center items-center order-1 md:order-2 opacity-50 md:opacity-100 scale-75 md:scale-90 lg:scale-100">
            <RoboticCore />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 scroll-mt-28">
        <AboutSectionContent />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-accent-blue/5 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-accent-blue font-bold uppercase tracking-[0.3em] text-sm mb-6">Technical Proficiency</h2>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">Skill Arsenal.</h3>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Reveal delay={0.1}><SkillCard title="Front-End Dev" skills={SKILLS.frontend} icon={<Layout size={24} className="text-accent-blue" />} /></Reveal>
            <Reveal delay={0.2}><SkillCard title="UI/UX Design" skills={SKILLS.uiux} icon={<Figma size={24} className="text-purple-400" />} /></Reveal>
            <Reveal delay={0.3}><SkillCard title="Basic Backend" skills={SKILLS.backend} icon={<Database size={24} className="text-orange-400" />} /></Reveal>
            <Reveal delay={0.4}><SkillCard title="Video & Media" skills={SKILLS.multimedia} icon={<Play size={24} className="text-red-400" />} /></Reveal>
            <Reveal delay={0.5}><SkillCard title="Technical & Robotics" skills={SKILLS.robotics} icon={<Cpu size={24} className="text-emerald-400" />} /></Reveal>
            <Reveal delay={0.6}><SkillCard title="Tools & Ecosystem" skills={SKILLS.tools} icon={<Zap size={24} className="text-yellow-400" />} /></Reveal>
          </div>

        </div>
      </section>

      {/* Immersive Parallax Showcase */}
      <ParallaxShowcase onPlayVideo={setActiveVideo} />

      <AnimatePresence>
        {activeVideo && (
          <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>

      <ProjectPromoPopup isOpen={showPromo} onClose={() => setShowPromo(false)} onPlayVideo={setActiveVideo} />

      {/* Achievements & Projects Section */}
      <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 md:px-8 scroll-mt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mb-16 md:mb-24 font-sans">
            <Reveal>
              <h2 className="text-accent-blue font-hacker font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] mb-4 flex items-center gap-2 leading-none">Milestones & Creations</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black leading-[1.1] uppercase tracking-normal max-w-2xl">Achievements & Projects.</h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-md text-text-secondary text-base md:text-lg">
                Fusing advanced systems engineering with modern full-stack development to build the next generation of digital solutions.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
            {ACHIEVEMENTS.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <AchievementCard 
                  title={item.title} 
                  year={item.year} 
                  desc={item.desc} 
                  icon={item.icon} 
                  image={item.image}
                  index={idx}
                  link={item.link}
                  onAction={(index) => {
                    const item = ACHIEVEMENTS[index];
                    const link = item.link;
                    if (item.title === "entertainment video of cat edit" && link) {
                      setActiveVideo(link);
                    } else if (link && !link.startsWith('#')) {
                      window.open(link, '_blank');
                    }
                  }}
                />
              </Reveal>
            ))}
          </div>

          <div className="pt-20 border-t border-white/5 font-sub">
            <Reveal>
              <h3 className="text-3xl md:text-4xl font-display font-black mb-16 flex items-center gap-6 uppercase tracking-tight">
                <Users size={40} className="text-accent-blue" /> Leadership & Engagement
              </h3>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEADERSHIP.map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <motion.div 
                    whileHover="hover"
                    initial="initial"
                    animate="initial"
                    className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-accent-blue/30 transition-all group h-full cursor-default"
                  >
                     <motion.div 
                       variants={{
                         initial: { rotate: 0, x: 0, scale: 1 },
                         hover: { rotate: -12, scale: 1.2 }
                       }}
                       transition={{ type: "spring", stiffness: 400, damping: 12 }}
                       className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue mb-4 group-hover:scale-110 transition-all"
                     >
                       {item.icon}
                     </motion.div>
                     <h4 className="font-bold text-lg mb-1">{item.role}</h4>
                     <p className="text-xs text-text-secondary font-medium uppercase tracking-widest">{item.org}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-40 px-4 sm:px-6 bg-[#020617] relative overflow-hidden font-sans scroll-mt-28">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"></div>
        
        <div className={`max-w-7xl mx-auto flex flex-col ${showContactForm ? 'lg:flex-row lg:items-start lg:justify-between lg:gap-20' : 'items-center text-center'}`}>
          <motion.div 
            layout="position"
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className={`flex flex-col w-full ${showContactForm ? 'lg:w-[45%] items-start text-left' : 'items-center text-center'} transform-gpu will-change-transform`}
          >
            <div className={`flex flex-col w-full ${showContactForm ? 'items-start' : 'items-center'}`}>
              <motion.h2 layout="position" className="text-accent-blue font-hacker font-bold uppercase tracking-[0.3em] text-[10px] md:text-[12px] mb-8 leading-none">Get in Touch</motion.h2>
              <motion.h3 layout="position" className="text-4xl sm:text-6xl md:text-8xl font-display font-black mb-12 md:mb-20 leading-[1.1] uppercase tracking-normal">Let's Build the <br className="hidden sm:block"/> Future Together.</motion.h3>
                
                <motion.div layout="position" className={`flex flex-col items-start gap-10 md:gap-14 mb-20 w-fit ${showContactForm ? '' : 'mx-auto'}`}>
                <ContactInfo icon={<Mail size={20} />} title="Email" value={EMAIL} link={`mailto:${EMAIL}`} />
                <ContactInfo icon={<Phone size={20} />} title="Contact" value={PHONE} link={`tel:${PHONE}`} />
                <ContactInfo icon={<MapPin size={20} />} title="Location" value={LOCATION} />
              </motion.div>

              {!showContactForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <ElectricButton 
                      onClick={() => setShowContactForm(true)}
                      className="!px-12 !py-6 !rounded-full !bg-accent-blue !text-bg-deep !border-none hover:!bg-white shadow-[0_0_40px_rgba(0,210,255,0.4)] hover:shadow-[0_0_80px_rgba(0,210,255,0.7)]"
                    >
                      SEND ME A MESSAGE
                    </ElectricButton>
                  </motion.div>
                )}
            </div>
          </motion.div>

          <AnimatePresence>
            {showContactForm && (
              <div 
                className="w-full lg:w-[55%] mt-12 lg:mt-0" 
                style={{ perspective: '1300px' }}
              >
                <motion.div 
                  initial={{ opacity: 0, rotateX: -70, y: 30 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: -70, y: 30 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.34, 1.56, 0.64, 1] // Bouncy entry for flip
                  }}
                  className="w-full h-full transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <form onSubmit={handleFormSubmit} className="p-6 sm:p-10 md:p-16 bg-white/[0.03] rounded-[3rem] border border-white/10 backdrop-blur-xl relative overflow-hidden text-left w-full group">
                      {/* Decorative elements for the form */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <button 
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors z-30"
                      >
                        <X size={20} />
                      </button>

                      <AnimatePresence>
                        {formStatus === 'sent' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-0 z-20 bg-bg-deep/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8"
                          >
                            <div className="w-24 h-24 bg-accent-blue/20 rounded-full flex items-center justify-center mb-8 text-accent-blue shadow-[0_0_30px_rgba(0,210,255,0.3)]">
                              <CheckCircle2 size={48} />
                            </div>
                            <h4 className="text-3xl font-display font-black uppercase mb-4 italic">Message Transmitted!</h4>
                            <p className="text-text-secondary text-base mb-10 max-w-xs mx-auto leading-relaxed">I've received your data packet. Expect a response soon.</p>
                            <ElectricButton 
                              type="button"
                              onClick={() => setFormStatus('idle')}
                              className="!px-10 !py-4 !rounded-full !bg-white/5 !border-white/20 !text-white hover:!bg-white hover:!text-bg-deep"
                            >
                              NEW MESSAGE
                            </ElectricButton>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                        <InputField name="name" label="Identity" type="text" placeholder="Full Name" required />
                        <InputField name="email" label="Digital Address" type="email" placeholder="email@server.com" required />
                      </div>
                      <div className="mb-10">
                        <label className="block text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-text-secondary mb-4 leading-none font-hacker flex items-center gap-2">
                          <MessageSquare size={12} className="text-accent-blue" />
                          Transmission Content <span className="text-accent-blue">*</span>
                        </label>
                        <textarea 
                          name="message"
                          required
                          rows={5} 
                          maxLength={5000}
                          className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-base focus:border-accent-blue outline-none transition-all duration-500 resize-none placeholder:text-white/10 focus:bg-white/[0.08]" 
                          placeholder="What would you like to build?"
                        ></textarea>
                      </div>
                     <ElectricButton 
                       disabled={formStatus !== 'idle'}
                       className={`w-full !py-7 !rounded-full !text-bg-deep !bg-accent-blue !border-none hover:!bg-white shadow-[0_0_40px_rgba(0,210,255,0.4)] hover:shadow-[0_0_80px_rgba(0,210,255,0.7)] transition-all duration-700 ${formStatus !== 'idle' ? 'opacity-70 cursor-not-allowed' : ''} ${formStatus === 'error' ? '!bg-red-500 !text-white' : ''} ${formStatus === 'sent' ? '!bg-green-500 !text-white' : ''}`}
                     >
                       <div className="flex items-center justify-center gap-4">
                        {formStatus === 'sending' ? (
                          <>INITIATING UPLOAD...</>
                        ) : (
                          <>ENGAGE TRANSMISSION <Zap size={18} className="fill-current" /></>
                        )}
                       </div>
                     </ElectricButton>
                  </form>
                  
                  {/* Social Hub specifically for when form is open */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12"
                  >
                    <SocialLink href="https://www.facebook.com/CarlDictaan" icon={<Facebook size={22} />} />
                    <SocialLink href="https://ph.linkedin.com/in/carl-vincent-dictaan-412838406" icon={<Linkedin size={22} />} />
                    <SocialLink href="https://www.upwork.com/freelancers/~01cc0415fe3f913e35?mp_source=share" icon={<div className="font-brand font-black text-xs">UP</div>} />
                  </motion.div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Hub at bottom ONLY when form is closed */}
        {!showContactForm && (
          <div className="max-w-7xl mx-auto mt-20 flex flex-wrap justify-center gap-8 md:gap-12 relative z-10 border-t border-white/5 pt-12">
            <SocialLink href="https://www.facebook.com/CarlDictaan" icon={<Facebook size={22} />} />
            <SocialLink href="https://ph.linkedin.com/in/carl-vincent-dictaan-412838406" icon={<Linkedin size={22} />} />
            <SocialLink href="https://www.upwork.com/freelancers/~01cc0415fe3f913e35?mp_source=share" icon={<div className="font-brand font-black text-xs">UP</div>} />
          </div>
        )}
        
        {/* Intersection marker for promo popup */}
        <div ref={promoTriggerRef} className="absolute bottom-40 left-0 w-full h-1 pointer-events-none" />
      </section>

      <footer className="py-20 px-6 border-t border-white/5 bg-[#020617] text-center relative overflow-hidden">
        {/* Subtle decorative grid background for the footer */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="flex flex-col items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-text-secondary font-sub relative z-10 w-full transform-gpu">
          <div className="flex flex-col items-center gap-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl font-brand tracking-tight text-accent-blue cursor-default select-none group"
            >
              <span className="block sm:inline">{NAME.split(" ").slice(0, 2).join(" ")}</span> <span className="block sm:inline">{NAME.split(" ").slice(2).join(" ")}</span><span className="opacity-50">.</span>
            </motion.div>

            <p className="max-w-md text-sm md:text-base leading-relaxed text-text-secondary normal-case tracking-tight font-medium font-sans opacity-70 italic">
              "Pushing the boundaries of digital craftsmanship, one pixel at a time. Let's transform your vision into an interactive reality."
            </p>

            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 py-2.5 px-5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-blue"></span>
                </div>
                <p className="text-[11px] font-hacker font-bold tracking-[0.15em] text-text-primary uppercase leading-none opacity-90">
                  Global Availability · Based in PH
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="h-[1px] w-8 bg-white/10 mx-auto" />
                <p className="font-black opacity-15 text-[8px] tracking-[0.4em]">
                  STEADFAST IN INNOVATION
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes electric-x-fast {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes electric-x-slow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes electric-y-fast {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-electric-x-fast { animation: electric-x-fast 1s infinite linear; }
        .animate-electric-x-slow { animation: electric-x-slow 1.8s infinite linear; }
        .animate-electric-x-reverse { animation: electric-x-fast 1.2s infinite linear reverse; }
        .animate-electric-y-fast { animation: electric-y-fast 0.8s infinite linear; }
        .animate-electric-y-reverse { animation: electric-y-fast 1.5s infinite linear reverse; }

        .glass {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-6 md:bottom-12 md:right-12 z-[70] flex flex-col-reverse items-center gap-4">
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ElectricButton 
                onClick={() => handleSectionScroll('#top')}
                className="!p-5 !rounded-full !bg-bg-deep/80 !backdrop-blur border-white/20 hover:border-accent-blue transition-all"
              >
                <ChevronUp size={24} />
              </ElectricButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

const ElectricButton = ({ children, backChildren, className = "", onClick, disabled, type, isActive = false }: { children: React.ReactNode, backChildren?: React.ReactNode, className?: string, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void, disabled?: boolean, type?: "button" | "submit" | "reset", isActive?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isActive && buttonRef.current) {
      gsap.killTweensOf(buttonRef.current);
      
      gsap.set(buttonRef.current, { 
        transformPerspective: 1000, 
        transformOrigin: "center center" 
      });

      // Flip DOWN (rotating around X axis)
      gsap.to(buttonRef.current, {
        rotationX: 180,
        duration: 0.85,
        ease: "power3.inOut",
        force3D: true
      });
    } else if (buttonRef.current) {
      gsap.killTweensOf(buttonRef.current);
      // Flip UP back to original
      gsap.to(buttonRef.current, {
        rotationX: 0,
        duration: 0.85,
        ease: "power3.inOut",
        force3D: true
      });
    }
  }, [isActive]);

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={disabled ? "initial" : "hover"}
      initial="initial"
      animate={isActive ? "active" : isHovered ? "hover" : "initial"}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        active: { scale: 1.1 }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`relative px-8 py-4 bg-accent-blue/10 border border-white/10 rounded-2xl font-hacker text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all duration-300 group cursor-pointer will-change-transform ${className} ${isActive ? 'border-orange-500/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]' : ''}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Front Face */}
      <span 
        className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-105 leading-none backface-hidden w-full h-full"
      >
        {children}
      </span>

      {/* Back Face (Visible after 180deg flip) */}
      <span 
        className="absolute inset-0 z-10 flex items-center justify-center gap-2 leading-none backface-hidden rounded-2xl border border-accent-blue/30"
        style={{ 
          transform: 'rotateX(180deg) translateZ(1px)',
          background: 'rgba(4, 12, 20, 0.95)',
          boxShadow: 'inset 0 0 30px rgba(0, 210, 255, 0.05), 0 0 20px rgba(0, 210, 255, 0.1)'
        }}
      >
        {backChildren || children}
      </span>

        <AnimatePresence mode="popLayout">
          {isActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-accent-blue/10 mix-blend-overlay pointer-events-none rounded-2xl"
            />
          )}
        </AnimatePresence>
      
      {/* Simplified Electricity Lines */}
      {(isHovered || isActive) && (
        <span className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100">
          <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent animate-electric-x-fast" />
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent animate-electric-x-slow" />
        </span>
      )}

      {/* Background Glow */}
      <motion.div 
        variants={{
          hover: { 
            opacity: [0, 0.2, 0.1, 0.3],
            transition: { duration: 0.2, repeat: Infinity }
          },
          active: {
            opacity: [0.2, 0.5, 0.2, 0.5],
            transition: { duration: 0.15, repeat: Infinity }
          }
        }}
        className="absolute inset-0 bg-accent-blue/20 blur-2xl opacity-0" 
      />

      {/* Minimal Spark Particles */}
      <AnimatePresence>
        {(isHovered || isActive) && !disabled && [...Array(2)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1.2, 0],
              x: (Math.random() - 0.5) * 80,
              y: (Math.random() - 0.5) * 80
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.3 }}
            className="absolute left-1/2 top-1/2 w-1 h-1 bg-accent-blue rounded-full blur-[1px] pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

const ElectricLink = ({ children, className = "", href }: { children: React.ReactNode, className?: string, href: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover="hover"
      initial="initial"
      animate="initial"
      variants={{
        initial: { scale: 1, y: 0 },
        hover: { scale: 1.02, y: -2 }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`relative inline-flex items-center justify-center font-hacker font-bold uppercase tracking-[0.3em] transition-all duration-300 group overflow-hidden cursor-pointer rounded-2xl ${className}`}
    >
      {/* Electricity Frame - Pulsing Glow */}
      <motion.span 
        variants={{
          initial: { opacity: 0 },
          hover: { 
            opacity: [0, 1, 0.8, 1, 0.9, 1],
            transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
          }
        }}
        className="absolute inset-0 border border-accent-blue/50 rounded-inherit shadow-[0_0_20px_rgba(0,210,255,0.4)] pointer-events-none" 
      />
      
      {/* Multi-layered Animated Electricity Lines */}
      <span className="absolute inset-0 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300">
        <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent animate-electric-x-fast" />
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue to-transparent animate-electric-x-slow" />
        <span className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-accent-blue to-transparent animate-electric-y-fast" />
        <span className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-accent-blue to-transparent animate-electric-y-reverse" />
        
        {/* Extra chaotic sparks */}
        <span className="absolute top-[40%] left-0 w-full h-[1px] bg-accent-blue/20 animate-electric-x-reverse blur-[1px]" />
        <span className="absolute top-0 left-[60%] h-full w-[1px] bg-accent-blue/20 animate-electric-y-fast blur-[1px]" />
      </span>
      
      {/* Inner Glows and Flicker */}
      <motion.div 
        variants={{
          hover: { 
            opacity: [0, 0.2, 0.1, 0.3, 0.2],
            transition: { duration: 0.2, repeat: Infinity }
          }
        }}
        className="absolute inset-0 bg-accent-blue/20 blur-2xl opacity-0 pointer-events-none" 
      />
      
      <span className="relative z-10 flex items-center justify-center gap-3 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] py-4 px-8">
        {children}
      </span>

      {/* Spark Particles */}
      <AnimatePresence>
        {isHovered && [...Array(4)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ 
              opacity: 1, 
              scale: 0, 
              x: Math.random() * 80 - 40, 
              y: Math.random() * 40 - 20 
            }}
            animate={{ 
              opacity: 0, 
              scale: 1, 
              x: Math.random() * 160 - 80, 
              y: Math.random() * 80 - 40,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            className="absolute center-1/2 w-1 h-1 bg-accent-blue rounded-full shadow-[0_0_10px_#00D2FF] pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </motion.a>
  );
};

const SkillCard = React.memo(({ title, skills, icon }: { title: string, skills: string[], icon: React.ReactNode }) => (
  <motion.div 
    whileHover="hover"
    initial="initial"
    animate="initial"
    className="p-6 md:p-8 bg-bg-surface border border-white/5 rounded-3xl hover:border-accent-blue/30 transition-all group overflow-hidden relative h-full cursor-default transform-gpu"
  >
    <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 will-change-transform"></div>
    <motion.div 
      variants={{
        initial: { rotate: 0, x: 0, scale: 1 },
        hover: { rotate: -5, scale: 1.15, y: -5 }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-all relative z-10 will-change-transform"
    >
      {icon}
    </motion.div>
    <h4 className="text-2xl font-display font-black mb-6 relative z-10">{title}</h4>
    <div className="flex flex-wrap gap-2 relative z-10 font-mono">
      {skills.map((skill, idx) => (
        <motion.div 
          key={skill}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ 
            scale: 1.05,
            y: -2,
            backgroundColor: "rgba(0, 210, 255, 0.15)",
            borderColor: "rgba(0, 210, 255, 0.4)"
          }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 15, delay: idx * 0.05 }}
          className="group/tag px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 hover:border-accent-blue/30 transition-all flex items-center gap-2 cursor-default transform-gpu will-change-transform"
        >
          <div className="w-1.5 h-1.5 rounded-sm bg-accent-blue/30 group-hover/tag:bg-accent-blue group-hover/tag:rotate-45 transition-all duration-300" />
          <span className="text-[11px] font-bold text-text-secondary group-hover/tag:text-text-primary uppercase tracking-[0.1em] transition-colors whitespace-nowrap">
            {skill}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

interface AchievementProps extends Achievement {}

const AchievementCard = React.memo(({ title, year, desc, icon, image, index, onAction, link }: { 
  title: string, 
  year: string, 
  desc: string, 
  icon: React.ReactNode,
  image?: string,
  index?: number,
  onAction?: (index: number) => void,
  link?: string
}) => (
  <motion.div 
    whileHover={link ? "hover" : "initial"}
    initial="initial"
    animate="initial"
    onClick={() => link && onAction && typeof index === 'number' && onAction(index)}
    className={`group p-6 md:p-8 bg-white/5 rounded-[2rem] border border-white/5 ${link ? 'hover:border-accent-blue/30 cursor-pointer' : 'cursor-default'} transition-all relative overflow-hidden h-full transform-gpu`}
  >
    {image && (
      <div className="absolute inset-x-0 bottom-0 top-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 will-change-opacity transform-gpu">
        <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" />
      </div>
    )}
    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-bl-[100px] -z-0"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <motion.div 
          variants={{
            initial: { rotate: 0, x: 0, scale: 1, y: 0 },
            hover: { 
              rotate: 12, 
              scale: 1.2, 
              y: -5,
              textShadow: "0 0 15px currentColor"
            }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-accent-blue shadow-[0_0_20px_rgba(0,210,255,0.1)] group-hover:shadow-[0_0_30px_rgba(0,210,255,0.3)] transition-shadow duration-500 will-change-transform"
        >
          {icon}
        </motion.div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold text-accent-blue tracking-[0.2em] uppercase px-4 py-1 rounded-full border border-accent-blue/30">{year}</span>
           <motion.div 
             variants={{ initial: { opacity: 0, x: 10 }, hover: { opacity: 1, x: 0 } }}
             className="text-accent-blue"
           >
             <ChevronRight size={14} />
           </motion.div>
        </div>
      </div>
      <h4 className="text-2xl font-display font-black mb-4 group-hover:text-accent-blue transition-colors uppercase italic leading-[1.1]">{title}</h4>
      <p className="text-text-secondary leading-[1.7] text-sm font-sans">{desc}</p>
    </div>
    
    {/* Bottom scan line decoration */}
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 will-change-transform" />
  </motion.div>
));

const ContactInfo = ({ icon, title, value, link }: { icon: React.ReactNode, title: string, value: string, link?: string }) => (
  <motion.div whileHover="hover" initial="initial" animate="initial" className="flex gap-6 group cursor-default">
    <motion.div 
      variants={{
        initial: { rotate: 0, x: 0, scale: 1 },
        hover: { rotate: -8, scale: 1.1, x: 2 }
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-accent-blue border border-white/5 group-hover:border-accent-blue transition-all shrink-0"
    >
      {icon}
    </motion.div>
    <div className="flex flex-col justify-center">
      <p className="text-[11px] font-hacker font-bold uppercase tracking-[0.15em] text-text-secondary mb-1 leading-none opacity-80">{title}</p>
      {link ? (
        <a href={link} className="text-xl md:text-2xl font-bold hover:text-accent-blue transition-colors uppercase leading-[1.2]">{value}</a>
      ) : (
        <p className="text-xl md:text-2xl font-bold uppercase leading-[1.2]">{value}</p>
      )}
    </div>
  </motion.div>
);

const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <motion.a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    initial="initial"
    animate="initial"
    whileHover="hover"
    variants={{
      initial: { rotate: 0, x: 0, y: 0, scale: 1 },
      hover: { rotate: 8, scale: 1.15, y: -8 }
    }}
    transition={{ type: "spring", stiffness: 400, damping: 12 }}
    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-all bg-white/5 relative group"
  >
    <div className="absolute inset-0 bg-accent-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    <div className="relative z-10 transition-transform duration-500 group-hover:drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
      {icon}
    </div>
  </motion.a>
);

const InputField = ({ label, type, placeholder, required, name }: { label: string, type: string, placeholder: string, required?: boolean, name?: string }) => (
  <div>
    <label className="block text-[11px] font-hacker uppercase tracking-widest font-bold text-text-secondary mb-3 leading-none">
      {label} {required && <span className="text-accent-blue">*</span>}
    </label>
    <input 
      name={name}
      required={required}
      type={type} 
      placeholder={placeholder} 
      maxLength={250}
      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-accent-blue outline-none transition-colors placeholder:text-white/10" 
    />
  </div>
);

const AboutSectionContent = React.memo(() => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const aboutImageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center relative">
      <Reveal>
        <motion.div 
          style={{ y: aboutImageY }}
          className="relative px-4 sm:px-0 will-change-transform transform-gpu"
        >
          <div className="aspect-[4/5] rounded-[2rem] md:rounded-3xl bg-white/5 overflow-hidden border border-white/10">
            <img id="about-image" src="/images/regenerated_image_1778052205183.jpg" alt="Carl" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 p-6 md:p-8 bg-bg-surface border border-white/10 rounded-2xl md:rounded-3xl z-20 shadow-2xl">
            <div className="text-3xl md:text-4xl font-black text-accent-blue mb-1">SIGMA</div>
            <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-text-secondary">Energy Status</div>
          </div>
        </motion.div>
      </Reveal>
      
      <Reveal delay={0.2}>
        <h2 className="text-accent-blue font-hacker font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] mb-4 md:mb-6 flex items-center gap-2 leading-none">
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            whileHover={{ rotate: 15, scale: 1.3, color: "#00D2FF" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center"
          >
            <Code2 size={14} />
          </motion.div> 
          ABOUT ME
        </h2>
        <h3 className="text-3xl md:text-6xl font-display font-black mb-8 md:mb-12 leading-[1.15] tracking-normal">
          A Creative <span className="text-accent-blue font-brand tracking-normal">Developer</span> with a Passion for Design & Robotics.
        </h3>
        <p className="text-base md:text-lg text-text-secondary leading-[1.8] mb-8 md:mb-10 font-sans">
          I'm a driven individual from La Union, Philippines with a passion for UI/UX design, front-end development, and robotics. I love building clean, responsive interfaces and working on robotic systems that solve real-world problems.
        </p>
        <p className="text-base md:text-lg text-text-secondary leading-[1.8] mb-10 md:mb-14 font-sans italic opacity-80">
          From representing the Philippines in international robotics competitions to taking on lead roles in community and academic organizations — I bring both technical skills and creative thinking to everything I work on.
        </p>
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-4 py-6 border-y border-white/5 font-sub">
            <GraduationCap className="text-accent-blue shrink-0" size={32} />
            <div>
              <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Education</p>
              <h5 className="text-white font-bold text-base">Polytechnic College of La Union (2024 – 2026)</h5>
              <p className="text-xs text-text-secondary mt-1">STEM Strand · Academic Achiever (94% GWA)</p>
            </div>
          </div>
          <p className="text-sm text-text-secondary font-sans italic opacity-60">I'm not just building projects. I'm building my craft — one experience at a time.</p>
        </div>
      </Reveal>
    </div>
  );
});
