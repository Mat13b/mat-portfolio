"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Snackbar, Alert } from "@mui/material";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Numéro de téléphone",
    description: "07 68 56 13 38",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "mathieu.schmitt13@icloud.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "450 chemin de l'enclos",
  },
];

import { motion } from "framer-motion";

const Contact = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const validateInput = (type, value) => {
    const regexPatterns = {
      email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      phone: /^\+?\d{10,15}$/,
      text: /^[a-zA-Z\s]*$/,
    };
    return value ? regexPatterns[type].test(value) : false;
  };

  const validateMessage = (message) => {
    // Vérifiez si le message contient au moins 10 mots
    const words = message.trim().split(/\s+/);
    return words.length >= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    if (validateMessage(message)) {
      // Ici, vous pouvez ajouter la logique pour envoyer le message
      setSnackbarMessage("Votre message a été envoyé avec succès. Nous vous répondrons bientôt.");
      setSnackbarSeverity("success");
    } else {
      setSnackbarMessage("Veuillez écrire un message plus détaillé (au moins 10 mots).");
      setSnackbarSeverity("error");
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
            <h3 className="text-4xl text-accent">Travaillons ensemble</h3>
              <p className="text-white/60">
                Veuillez me contacter pour tous vos projets web, que ce soit du front-end ou du back-end. <br />
                Je suis à votre disposition en tant que développeur web fullstack.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input type="text" placeholder="Prénom" validate={(value) => validateInput('text', value)} required />
                <Input type="text" placeholder="Nom" validate={(value) => validateInput('text', value)} required />
                <Input type="email" placeholder="Adresse email" validate={(value) => validateInput('email', value)} required />
                <Input type="tel" placeholder="Numéro de téléphone" validate={(value) => validateInput('phone', value)} required />
              </div>
              {/* select */}
              <Select required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sélectionnez un service</SelectLabel>
                    <SelectItem value="web">Développement Web</SelectItem>
                    <SelectItem value="ui">UI/UX Design</SelectItem>
                    <SelectItem value="logo">Logo Design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                className="h-[200px]"
                placeholder="Tapez votre message ici (au moins 10 mots)."
                required
                name="message"
              />
              {/* btn */}
              <Button type="submit" size="md" className="max-w-40">
                Envoyer le message
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="flex items-center flex-1 order-1 mb-8 xl:justify-end xl:order-none xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </motion.section>
  );
};

export default Contact;
