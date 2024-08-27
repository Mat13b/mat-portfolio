"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projets = [
  {
    num: "01",
    categorie: "frontend",
    titre: "projet 1",
    description:
      "Développement de site web ",
    technologies: [{ nom: "Html 5" }, { nom: "Css 3" }, { nom: "Javascript" }],
    image: "/assets/127.0.0.1_5501_index.html(1_Desktop).png",
    lienDirect: "https://ez-bike-beta.vercel.app/",
    github: "https://github.com/KD63799/EZ_Bike ",
  },
  {
    num: "02",
    categorie: "fullstack",
    titre: "projet 2",
    description:
      "Création d'un site web pour mon projet de fin de formation",
    technologies: [{ nom: "React.JS" }, { nom: "Tailwind.css" }, { nom: "Node.js" }, { nom: "ExpressJS" }],
    image: "/assets/Capture d’écran 2024-08-27 à 17.53.48.png",
    lienDirect: "https://arena-maven.onrender.com/",
    github: "https://github.com/yuuta2s/arena_maven",
  },
  {
    num: "03",
    categorie: "frontend",
    titre: "projet 3",
    description:
      "Mes projets personnels",
    technologies: [{ nom: "Next.js" }, { nom: "Tailwind.css" }],
    image: "/assets/Capture d’écran 2024-06-14 à 23.52.19.png",
    github: "https://github.com/Mat13b/Formul-air",
  },
  {
    num: "04",
    categorie: "frontend",
    titre: "projet 4",
    description:
      "Projet de démonstration",
    technologies: [{ nom: "Html 5" }, { nom: "Css 3" }, { nom: "Javascript" }],
    image: "/assets/Capture d’écran 2024-08-27 à 18.06.55.png",
    github: "https://github.com/jlaron230/ProjetX",
  },
];

const Travail = () => {
  const [projet, setProjet] = useState(projets[0]);

  const gererChangementDiapo = (swiper) => {
    const indexActuel = swiper.activeIndex;
    setProjet(projets[indexActuel]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {projet.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                Projet {projet.categorie}
              </h2>
              <p className="text-white/60">{projet.description}</p>
              <ul className="flex gap-4">
                {projet.technologies.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.nom}
                      {index !== projet.technologies.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                {projet.lienDirect && (
                  <Link href={projet.lienDirect}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Voir le projet en direct</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
                {projet.github && (
                  <Link href={projet.github}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsGithub className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Dépôt Github</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={gererChangementDiapo}
            >
              {projets.map((projet, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={projet.image}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Travail;
