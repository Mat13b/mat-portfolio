"use client";

import { useState, useEffect } from "react";
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
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";

export default function Contact() {
  const [isMounted, setIsMounted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // ou un loader/skeleton
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Votre logique de soumission ici
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ContactForm />
          <ContactInfo />
        </motion.div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
