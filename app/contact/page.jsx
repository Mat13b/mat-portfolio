"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Snackbar, Alert } from "@mui/material";
import emailjs from '@emailjs/browser';
import dynamic from 'next/dynamic';

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

import { motion } from "framer-motion";

// Initialisez EmailJS (à mettre dans votre composant)
emailjs.init("SLg2UipHeSFDgf8MD");

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
];

// Composant avec SSR désactivé
const ContactForm = dynamic(() => Promise.resolve(Contact), {
  ssr: false
});

// Composant principal
function Contact() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction de validation du téléphone
  const isValidPhone = (phone) => {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValidPhone(formData.phone)) {
      setSnackbarMessage("Format du numéro de téléphone invalide");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      await emailjs.send(
        'service_zimdd1b',
        'template_bq2uzar',
        {
          from_name: formData.name || "",
          from_email: formData.email || "",
          subject: formData.subject || "",
          message: formData.message || "",
          phone: formData.phone || "",
          date: new Date().toLocaleString('fr-FR', {
            dateStyle: 'full',
            timeStyle: 'short'
          })
        },
        'SLg2UipHeSFDgf8MD'
      );
      
      setStatus({ loading: false, error: null, success: true });
      setFormData({ 
        name: "", 
        email: "", 
        phone: "",
        subject: "", 
        message: "" 
      });
      
      setSnackbarMessage("Message envoyé avec succès !");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Erreur:", error);
      setStatus({ 
        loading: false, 
        error: "Erreur lors de l'envoi du message", 
        success: false 
      });
      setSnackbarMessage("Erreur lors de l'envoi du message");
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
        transition: { delay: 0.2, duration: 0.4 }
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
                Je suis à votre disposition en tant que développeur web fullstack junior
              </p>
              {/* input */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input type="text" placeholder="Prénom" name="name" value={formData.name} onChange={handleChange} required />
                <Input type="email" placeholder="Adresse email" name="email" value={formData.email} onChange={handleChange} required />
                <Input 
                  type="tel" 
                  placeholder="Numéro de téléphone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  pattern="^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$"
                  required 
                />
              </div>
              {/* select */}
              <Select 
                onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                value={formData.subject}
              >
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
                className="h-[200px] "
                placeholder="Tapez votre message ici (au moins 5 mots)."
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              {/* btn */}
              <Button type="submit" size="md" className="max-w-50" disabled={status.loading}>
                {status.loading ? "Envoi en cours..." : "Envoyer le message"}
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
}

// Export le composant sans SSR
export default ContactForm;
