import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { 
  Terminal, Zap, GitBranch, Globe, Cpu, 
  ChevronRight, ChevronLeft, Star, Menu, X, Shield,
  Rocket, Trophy, Users, Clock, Sparkles, ArrowRight, ArrowUpRight,
  Play, Github, Twitter, Linkedin, Instagram, Code2, Layers, Box
} from 'lucide-react';

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#CCFF00] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
};

// --- NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          
          {/* Logo */}
          <motion.a 
            href="#"
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
              ASTRO<span className="text-[#CCFF00]">NOVA</span>
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {['Platform', 'Solutions', 'Developers', 'Enterprise', 'Pricing'].map((item, i) => (
              <motion.a 
                key={item}
                href="#"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#CCFF00] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button 
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Sign In
            </motion.button>
            <motion.button 
              className="bg-[#CCFF00] text-black text-sm font-bold px-6 py-3 rounded-full hover:bg-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#CCFF00] z-40 flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {['Platform', 'Solutions', 'Developers', 'Enterprise', 'Pricing'].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-5xl md:text-7xl font-black text-black hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- HERO SECTION ---
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-[100vh] md:min-h-[120vh] flex items-center overflow-hidden bg-black">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-10" />
        <motion.div 
          style={{ y, scale }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')] bg-cover bg-center"
        />
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 z-20" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-30 max-w-[1800px] mx-auto px-6 md:px-12 pt-32 md:pt-40">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-12 h-[2px] bg-[#CCFF00]" />
          <span className="text-[#CCFF00] text-sm font-bold tracking-[0.3em] uppercase">The Future of Development</span>
        </motion.div>

        {/* Main Heading */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-white leading-[0.85] tracking-tighter"
          >
            BUILD
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-transparent tracking-tighter"
            style={{ WebkitTextStroke: '2px white' }}
          >
            WITHOUT
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-[#CCFF00] leading-[0.85] tracking-tighter"
          >
            LIMITS
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl text-white/60 text-lg md:text-xl mt-12 leading-relaxed"
        >
          The complete development platform for building, shipping, and scaling applications that define the future.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-[#CCFF00] text-black font-bold text-lg px-8 py-4 rounded-full flex items-center gap-3 hover:bg-white transition-colors"
            data-hover
          >
            Start Building
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group text-white font-medium text-lg flex items-center gap-3 hover:text-[#CCFF00] transition-colors"
            data-hover
          >
            <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-[#CCFF00] transition-colors">
              <Play size={20} fill="currentColor" />
            </div>
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-white/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Side Stats */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hidden xl:flex flex-col gap-12 absolute right-12 top-1/2 -translate-y-1/2 z-30"
      >
        {[
          { value: '100M+', label: 'Developers' },
          { value: '4.2B', label: 'Deployments' },
          { value: '99.99%', label: 'Uptime' },
        ].map((stat, i) => (
          <div key={i} className="text-right">
            <div className="text-3xl font-black text-white">{stat.value}</div>
            <div className="text-white/40 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

// --- MARQUEE TEXT ---
const MarqueeText = ({ children, direction = 1 }) => (
  <div className="overflow-hidden py-8 bg-[#CCFF00]">
    <motion.div
      animate={{ x: direction > 0 ? [0, -1920] : [-1920, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="flex gap-8 whitespace-nowrap"
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="text-4xl md:text-6xl font-black text-black flex items-center gap-8">
          {children} <Star className="inline" fill="black" size={32} /> 
          {children} <Star className="inline" fill="black" size={32} />
        </span>
      ))}
    </motion.div>
  </div>
);

// --- BENTO GRID ---
const BentoGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      title: "Cloud IDE",
      desc: "Full VS Code experience in your browser. Zero setup, instant coding.",
      icon: Terminal,
      color: "#CCFF00",
      size: "col-span-2 row-span-2",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
    },
    {
      title: "Global Edge",
      desc: "Deploy to 30+ regions worldwide",
      icon: Globe,
      color: "#FF6B6B",
      size: "col-span-1 row-span-1",
    },
    {
      title: "AI Copilot",
      desc: "Your intelligent coding partner",
      icon: Cpu,
      color: "#4ECDC4",
      size: "col-span-1 row-span-1",
    },
    {
      title: "Real-time Collab",
      desc: "Code together, ship faster. Multiplayer development.",
      icon: Users,
      color: "#FFE66D",
      size: "col-span-1 row-span-2",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600"
    },
    {
      title: "Enterprise Security",
      desc: "SOC2, HIPAA, GDPR compliant",
      icon: Shield,
      color: "#A855F7",
      size: "col-span-1 row-span-1",
    },
    {
      title: "Git Integration",
      desc: "Native GitHub, GitLab, Bitbucket",
      icon: GitBranch,
      color: "#06B6D4",
      size: "col-span-1 row-span-1",
    },
  ];

  return (
    <section className="py-32 md:py-48 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#CCFF00] text-sm font-bold tracking-[0.3em] uppercase mb-4 block"
            >
              Platform
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
            >
              EVERYTHING
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>YOU NEED</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md text-white/50 text-lg mt-8 md:mt-0"
          >
            A complete toolkit designed for developers who demand the best. Every feature built with obsessive attention to detail.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${card.size} group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500`}
              data-hover
            >
              {/* Background Image */}
              {card.image && (
                <div className="absolute inset-0">
                  <img src={card.image} alt="" className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
              )}
              
              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: card.color + '20', color: card.color }}
                  >
                    <card.icon size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-white/50 text-sm md:text-base">{card.desc}</p>
                </div>
                
                <motion.div 
                  className="flex items-center gap-2 text-white/30 group-hover:text-white transition-colors mt-6"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowUpRight size={16} />
                </motion.div>
              </div>

              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${card.color}10 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- HORIZONTAL SCROLL GALLERY (HACKATHONS) ---
const hackathonEvents = [
  { 
    year: "2024", 
    title: "Genesis Hack", 
    desc: "48 hours of pure chaos and brilliance.", 
    prize: "$50K",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    color: "#CCFF00"
  },
  { 
    year: "2024", 
    title: "AI Apocalypse", 
    desc: "Build the AI that'll probably replace us all.", 
    prize: "$100K",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    color: "#FF6B6B"
  },
  { 
    year: "2024", 
    title: "Web3 Wormhole", 
    desc: "Decentralized dreams and blockchain schemes.", 
    prize: "$75K",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
    color: "#4ECDC4"
  },
  { 
    year: "2024", 
    title: "DevOps Deathmatch", 
    desc: "Ship it or sink it. CI/CD speedrun.", 
    prize: "$80K",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    color: "#F59E0B"
  },
  { 
    year: "2024", 
    title: "Security Siege", 
    desc: "Break things responsibly. White hats unite.", 
    prize: "$90K",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    color: "#EF4444"
  },
  { 
    year: "2025", 
    title: "Quantum Quest", 
    desc: "Code in multiple states simultaneously.", 
    prize: "$120K",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    color: "#8B5CF6"
  },
  { 
    year: "2025", 
    title: "Space Race", 
    desc: "Ground control to Major Dev.", 
    prize: "$200K",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    color: "#A855F7"
  },
  { 
    year: "2025", 
    title: "Climate Crunch", 
    desc: "Save the planet with code.", 
    prize: "$150K",
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800",
    color: "#06B6D4"
  },
];

const HackathonGallery = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#CCFF00] text-sm font-bold tracking-[0.3em] uppercase mb-4 block"
            >
              Hackathons
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
            >
              HALL OF
              <br />
              <span className="text-[#CCFF00]">FAME</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 mt-6 md:mt-0 flex items-center gap-3"
          >
            <span className="hidden md:block w-8 h-[1px] bg-white/30" />
            Drag to explore →
          </motion.p>
        </div>
      </div>

      {/* Custom Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`
          flex gap-6 md:gap-8 px-6 md:px-12 pb-8
          overflow-x-auto
          cursor-grab active:cursor-grabbing
          scrollbar-thin
          [&::-webkit-scrollbar]:h-2
          [&::-webkit-scrollbar-track]:bg-white/5
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#CCFF00]
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:hover:bg-[#CCFF00]/80
          scroll-smooth
        `}
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#CCFF00 rgba(255,255,255,0.05)'
        }}
      >
        {hackathonEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative flex-shrink-0 w-[320px] md:w-[450px] lg:w-[500px] h-[450px] md:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden group select-none"
            whileHover={{ scale: 0.98 }}
            data-hover
          >
            {/* Image */}
            <img 
              src={event.image} 
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Colored Top Accent */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: event.color }}
            />
            
            {/* Content */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-3">
                <span 
                  className="text-xs font-bold tracking-widest px-3 py-1 rounded-full"
                  style={{ backgroundColor: event.color + '20', color: event.color }}
                >
                  {event.year}
                </span>
                <span className="text-white/40 text-sm">•</span>
                <span className="text-white/40 text-sm">48 hours</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2">{event.title}</h3>
              <p className="text-white/50 text-sm md:text-base mb-6">{event.desc}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white/40 text-xs uppercase tracking-wider">Prize Pool</span>
                  <div className="text-2xl md:text-3xl font-black" style={{ color: event.color }}>{event.prize}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 45 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: event.color }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight className="text-black" size={20} />
                </motion.button>
              </div>
            </div>

            {/* Number Badge */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <span className="text-6xl md:text-7xl font-black text-white/10">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        ))}

        {/* End Card - CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex-shrink-0 w-[320px] md:w-[400px] h-[450px] md:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden flex items-center justify-center border-2 border-dashed border-white/20 bg-white/5 select-none"
          data-hover
        >
          <div className="text-center p-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#CCFF00] border-dashed flex items-center justify-center"
            >
              <Sparkles className="text-[#CCFF00]" size={32} />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">More Coming</h3>
            <p className="text-white/40 mb-6">Join the next hackathon and make history</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#CCFF00] text-black font-bold px-6 py-3 rounded-full"
            >
              Get Notified
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Custom Scroll Progress Indicator */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mt-8">
        <div className="flex items-center gap-4">
          <span className="text-white/30 text-sm font-mono">01</span>
          <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#CCFF00] rounded-full"
              style={{ width: '30%' }}
            />
          </div>
          <span className="text-white/30 text-sm font-mono">{String(hackathonEvents.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* View All Link */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mt-12">
        <motion.a
          href="#"
          className="inline-flex items-center gap-3 text-white hover:text-[#CCFF00] transition-colors group"
          whileHover={{ x: 10 }}
          data-hover
        >
          <span className="text-lg font-medium">View all hackathons</span>
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
};

// --- SPLIT SECTION ---
const SplitSection = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* Left - On Track */}
      <motion.div 
        className="flex-1 relative min-h-[50vh] md:min-h-screen bg-black overflow-hidden group"
        whileHover="hover"
        data-hover
      >
        <motion.div 
          className="absolute inset-0"
          variants={{
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200" 
            alt="Code"
            className="w-full h-full object-cover opacity-50"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 h-full flex flex-col justify-center p-12 md:p-20">
          <motion.span 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#CCFF00] text-sm font-bold tracking-[0.3em] uppercase mb-6"
          >
            For Teams
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6"
          >
            ON<br />TRACK
          </motion.h2>
          <p className="text-white/50 text-lg max-w-md mb-8">
            Collaborative tools, CI/CD pipelines, and enterprise features for teams that ship.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 text-white group/link"
            whileHover={{ x: 10 }}
          >
            <span className="font-medium">Explore Enterprise</span>
            <ArrowRight className="group-hover/link:translate-x-2 transition-transform" />
          </motion.a>
        </div>
      </motion.div>

      {/* Right - Off Track */}
      <motion.div 
        className="flex-1 relative min-h-[50vh] md:min-h-screen bg-[#CCFF00] overflow-hidden group"
        whileHover="hover"
        data-hover
      >
        <motion.div 
          className="absolute inset-0"
          variants={{
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200" 
            alt="Creative"
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>
        
        <div className="relative z-10 h-full flex flex-col justify-center p-12 md:p-20">
          <motion.span 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-black/60 text-sm font-bold tracking-[0.3em] uppercase mb-6"
          >
            For Individuals
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-6"
          >
            OFF<br />TRACK
          </motion.h2>
          <p className="text-black/60 text-lg max-w-md mb-8">
            Personal projects, open source contributions, and learning resources for indie hackers.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 text-black group/link"
            whileHover={{ x: 10 }}
          >
            <span className="font-medium">Start Free</span>
            <ArrowRight className="group-hover/link:translate-x-2 transition-transform" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

// --- PARTNERS SECTION ---
const partners = [
  { name: "Vercel", icon: Box },
  { name: "GitHub", icon: Github },
  { name: "Docker", icon: Layers },
  { name: "AWS", icon: Globe },
  { name: "Stripe", icon: Zap },
  { name: "Figma", icon: Code2 },
];

const PartnersSection = () => (
  <section className="py-32 bg-black border-y border-white/10">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center text-white/30 text-sm tracking-widest uppercase mb-16 block"
      >
        Trusted by industry leaders
      </motion.span>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
        {partners.map((partner, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-4 text-white/30 hover:text-white transition-colors cursor-pointer"
            data-hover
          >
            <partner.icon size={40} strokeWidth={1} />
            <span className="text-sm font-medium">{partner.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- CTA SECTION ---
const CTASection = () => (
  <section className="py-32 md:py-48 bg-black relative overflow-hidden">
    {/* Background Effect */}
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#CCFF00]/20 rounded-full blur-[200px]" />
    </div>
    
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative z-10">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-8"
      >
        ALWAYS
        <br />
        <span className="text-[#CCFF00]">BUILDING</span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/50 text-xl max-w-2xl mx-auto mb-12"
      >
        Join the millions of developers who chose to build without limits. Your next breakthrough starts here.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#CCFF00] text-black font-bold text-lg px-10 py-5 rounded-full hover:bg-white transition-colors"
          data-hover
        >
          Get Started Free
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-white/30 text-white font-bold text-lg px-10 py-5 rounded-full hover:border-white hover:bg-white/5 transition-all"
          data-hover
        >
          Contact Sales
        </motion.button>
      </motion.div>
    </div>
  </section>
);

// --- FOOTER ---
const Footer = () => (
  <footer className="bg-black border-t border-white/10 py-20">
    <div className="max-w-[1800px] mx-auto px-6 md:px-12">
      {/* Top */}
      <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">
        {/* Brand */}
        <div className="max-w-md">
          <span className="text-3xl font-black text-white tracking-tighter mb-6 block">
            ASTRO<span className="text-[#CCFF00]">NOVA</span>
          </span>
          <p className="text-white/40 mb-8">
            The complete development platform for building applications without limits.
          </p>
          <div className="flex gap-4">
            {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2, y: -3 }}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                data-hover
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Resources', links: ['Docs', 'API', 'Guides', 'Community'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-bold mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
        <span className="text-white/30 text-sm">© 2025 Astronova. All rights reserved.</span>
        <span className="text-white/30 text-sm mt-4 md:mt-0">Made with 💚 for developers everywhere</span>
      </div>
    </div>
  </footer>
);

// --- MAIN APP ---
export default function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#CCFF00] selection:text-black overflow-x-hidden cursor-none">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeText>BUILD FASTER • SHIP SMARTER • SCALE BIGGER</MarqueeText>
        <BentoGrid />
        <HackathonGallery />
        <SplitSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
