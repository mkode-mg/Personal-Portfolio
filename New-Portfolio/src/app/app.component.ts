import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";

declare var particlesJS: any;

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Mahesh Kshirsagar Portfolio";
  activeNavItem = "home";
  isScrolled = false;
  isDarkTheme = false;
  currentYear = new Date().getFullYear();
  typingText = "";
  private typingPhrases = [
    "Angular",
    "React",
    "TypeScript",
    "Node.js",
    "Web Apps",
  ];
  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly document = inject(DOCUMENT);

  @ViewChild("navbarToggler") navbarToggler!: ElementRef;

  skills: Skill[] = [
    { name: "HTML5", icon: "fa-brands fa-html5", color: "#E34F26" },
    { name: "CSS3", icon: "fa-brands fa-css3-alt", color: "#1572B6" },
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E" },
    { name: "TypeScript", icon: "fa-solid fa-code", color: "#3178C6" },
    { name: "Angular", icon: "fa-brands fa-angular", color: "#DD0031" },
    { name: "React", icon: "fa-brands fa-react", color: "#61DAFB" },
    { name: "Node.js", icon: "fa-brands fa-node-js", color: "#339933" },
    { name: "MongoDB", icon: "fa-solid fa-leaf", color: "#47A248" },
    { name: "PostgreSQL", icon: "fa-solid fa-database", color: "#336791" },
    { name: "Bootstrap", icon: "fa-brands fa-bootstrap", color: "#7952B3" },
    // { name: "Tailwind", icon: "fa-solid fa-wind", color: "#06B6D4" },
    { name: "Git", icon: "fa-brands fa-git-alt", color: "#F05032" },
    { name: "GitHub", icon: "fa-brands fa-github", color: "var(--color-skill-github)" },
    // { name: "Bitbucket", icon: "fa-brands fa-bitbucket", color: "#0052CC" },
    // { name: "Jira", icon: "fa-brands fa-jira", color: "#0052CC" },
    { name: "Material UI", icon: "fa-solid fa-palette", color: "#0081CB" },
    // { name: "PrimeNG", icon: "fa-solid fa-table-columns", color: "#337AB7" },
    { name: "OpenAI", icon: "fa-solid fa-robot", color: "#10a37f" },
    { name: "Claude", icon: "fa-solid fa-brain", color: "#cc785c" },
    { name: "Code AI", icon: "fa-solid fa-wand-magic-sparkles", color: "#6366f1" },

  ];

  projects: Project[] = [
    {
      title: "Comming Soon",
      description: "",
      tech: [],
      link: "",
      // description:
      //   "Fully dynamic admin panel to manage website content, user roles, blogs, and HR operations. Enables administrators to update sections, publish blogs, and handle workflows without any code changes.",
      // tech: ["Angular", "ngZorro", ".NET API"],
      // link: "https://www.prolanceit.com/",
    },
    // {
    //   title: "MarketTime",
    //   description:
    //     "B2B Wholesalers, Sales Agencies, and Retail Buyers unified platform. Wholesale order management software for writing orders on any device with integrated ecommerce.",
    //   tech: ["Angular", "PrimeNG", "Java", "AWS"],
    //   link: "https://markettimeqa.com",
    // },
    // {
    //   title: "Web E-Store",
    //   description:
    //     "E-commerce store with modern frontend UI, integrated with Fake Store API and Stripe payment gateway. Features product listing, cart management, and checkout flow.",
    //   tech: ["Angular", "Material", "Stripe", "Netlify"],
    //   link: "https://web-fake-store.netlify.app",
    // },
    // {
    //   title: "eGoldWSMP",
    //   description:
    //     "Admin Dashboard for shipping platform with responsive UI. Collaborated with backend team and integrated AWS REST APIs for order and delivery operations management.",
    //   tech: ["Angular", "Material", "Bootstrap", "AWS"],
    //   link: "#",
    // },
    // {
    //   title: "Digital CV",
    //   description:
    //     "Interactive digital resume showcasing experience, education, and skills with a clean, responsive design. Deployed on Netlify with continuous deployment from GitHub.",
    //   tech: ["HTML", "CSS", "JavaScript", "Netlify"],
    //   link: "https://maheshk-cv.netlify.app/",
    // },
    // {
    //   title: "Shopkeeper",
    //   description:
    //     "Dashboard web application for retail shop management. Features responsive UI with Angular Core UI components, DataTables, and integrated Node.js REST API.",
    //   tech: ["Angular", "Core UI", "DataTables", "Node.js"],
    //   link: "#",
    // },
  ];

  experiences: Experience[] = [
    {
      role: "Web Developer",
      company: "ProLance IT, Surat",
      duration: "Dec 2024 - Sept 2025",
      description:
        "Developed a fully dynamic UI end-to-end admin panel to manage an organization's website content. The platform allows administrators to update website sections, publish blogs, and handle HR workflows without code changes. Built new features, improved existing modules, and fixed bugs to maintain product quality with a focus on efficient, scalable, and user-friendly solutions.",
    },
    {
      role: "Software Engineer",
      company: "Compsulting, Surat",
      duration: "Apr 2024 - Sept 2025",
      description:
        "Specialized in developing, enhancing, and maintaining responsive web applications using Angular. Worked closely with designers and backend engineers to ensure seamless integration and user-centric features. Implemented new features, improved existing functionalities, and resolved bugs to deliver efficient, scalable solutions.",
    },
    {
      role: "Software Engineer",
      company: "Narola Infotech, Surat",
      duration: "Jan 2023 - March 2024",
      description:
        "Developed eGold Operation Panel — a web application to manage product operations, orders & courier delivery. Built ShopKeeper — a platform for small & medium-sized retail businesses to manage operations efficiently, track inventory, and maintain customer databases.",
    },
  ];

  @HostListener("window:scroll")
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;

    const sections = ["home", "skill", "work", "about", "contact"];
    for (const section of sections) {
      const element = this.document.getElementById(section);
      if (element && this.isElementInViewport(element)) {
        this.activeNavItem = section;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.loadTheme();
    this.typeEffect();
    this.initParticles();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  }

  collapseNav(): void {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    this.initParticles();
    localStorage.setItem(
      "portfolio-theme",
      this.isDarkTheme ? "dark" : "light"
    );
  }

  private loadTheme(): void {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark") {
      this.isDarkTheme = true;
    } else if (saved === "light") {
      this.isDarkTheme = false;
    } else {
      this.isDarkTheme =
        window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    }
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkTheme) {
      this.document.body.classList.add("dark-theme");
    } else {
      this.document.body.classList.remove("dark-theme");
    }
  }

  private initParticles(): void {
    if (typeof particlesJS === "undefined") {
      setTimeout(() => this.initParticles(), 200);
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const dotColor = this.isDarkTheme ? "#60a5fa" : "#2563eb";
    const lineColor = this.isDarkTheme ? "#60a5fa" : "#2563eb";
    const dotOpacity = this.isDarkTheme ? 0.4 : 0.2;
    const lineOpacity = this.isDarkTheme ? 0.18 : 0.1;

    particlesJS("particles-js", {
      particles: {
        number: {
          value: isMobile ? 25 : 55,
          density: { enable: true, value_area: isMobile ? 600 : 900 },
        },
        color: { value: dotColor },
        shape: { type: "circle" },
        opacity: {
          value: dotOpacity,
          random: true,
          anim: { enable: !isMobile, speed: 0.6, opacity_min: 0.05, sync: false },
        },
        size: {
          value: isMobile ? 2.5 : 3,
          random: true,
          anim: { enable: false },
        },
        line_linked: {
          enable: true,
          distance: isMobile ? 110 : 140,
          color: lineColor,
          opacity: lineOpacity,
          width: 1,
        },
        move: {
          enable: true,
          speed: isMobile ? 0.8 : 1.2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "bounce",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: !isMobile, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: lineOpacity * 2.5 } },
          push: { particles_nb: isMobile ? 1 : 2 },
        },
      },
      retina_detect: true,
    });
  }

  private isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top <= 150 && rect.bottom >= 150;
  }

  private navBarTogglerIsVisible(): boolean {
    return this.navbarToggler?.nativeElement?.offsetParent !== null;
  }

  private typeEffect(): void {
    const currentPhrase = this.typingPhrases[this.phraseIndex];
    const speed = this.isDeleting ? 50 : 100;

    if (this.isDeleting) {
      this.typingText = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.typingText = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      this.typingTimer = setTimeout(() => {
        this.isDeleting = true;
        this.typeEffect();
      }, 1500);
      return;
    }

    if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex =
        (this.phraseIndex + 1) % this.typingPhrases.length;
    }

    this.typingTimer = setTimeout(() => this.typeEffect(), speed);
  }
}
