export default function ContactInfo() {
  return (
    <div className="p-6 rounded-lg backdrop-blur-sm bg-black/20">
      <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-gray-300">votre@email.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Localisation</h3>
          <p className="text-gray-300">Votre ville, Pays</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Réseaux sociaux</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/votre-compte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/votre-compte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Disponibilité</h3>
          <p className="text-gray-300">
            Je suis disponible pour des projets freelance et des opportunités de collaboration.
          </p>
        </div>
      </div>
    </div>
  );
} 