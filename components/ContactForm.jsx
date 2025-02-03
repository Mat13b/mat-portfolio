"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Votre logique de soumission ici
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg backdrop-blur-sm bg-black/20">
      <h2 className="text-2xl font-bold mb-6">Envoyez-moi un message</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Nom"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 border rounded-md bg-transparent"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border rounded-md bg-transparent"
      />

      <Select 
        defaultValue=""
        onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
      >
        <SelectTrigger className="w-full p-3 border rounded-md bg-transparent">
          <SelectValue placeholder="Sélectionnez un sujet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="general">Question générale</SelectItem>
          <SelectItem value="project">Projet</SelectItem>
          <SelectItem value="collaboration">Collaboration</SelectItem>
          <SelectItem value="other">Autre</SelectItem>
        </SelectContent>
      </Select>

      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full p-3 border rounded-md bg-transparent"
      />

      <button
        type="submit"
        className="w-full bg-primary text-white p-3 rounded-md hover:bg-opacity-90 transition-colors"
      >
        Envoyer
      </button>
    </form>
  );
} 