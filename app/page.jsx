import Social from "@/components/Social";
import Photo from "@/components/Photo";
import StairTransition from '../components/StairTransition';
import dynamic from 'next/dynamic';  // Ajoutez cette ligne
import { Suspense } from 'react';

const dynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Chargement...</p>,
  ssr: false
});

export default function Home() {
  return (
    <StairTransition>
      <section className="h-full">
        <div className="container h-full mx-auto">
          <div className="flex flex-col items-center justify-between xl:flex-row xl:py-8">
            <div className="text-center xl:text-left xl:w-1/2">
              <span className="font-medium text-xxl">Développeur Web</span>
              <h1 className="mb-4 text-4xl font-bold xl:text-5xl">
               <span className="text-accent">Mathieu Schmitt</span>
              </h1>
              <p className="max-w-[500px] mb-7 text-white/90">
                Passionné par la programmation et le design, je crée des sites web alliant esthétique et fonctionnalité. Toujours en quête de nouveaux défis et technologies à maîtriser.
              </p>
              <Social
                containerStyles="flex justify-center xl:justify-start gap-4"
                iconStyles="w-10 h-10 border border-accent rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
              />
            </div>
            <div className="mt-8 xl:mt-0 xl:w-1/2">
            <Photo/>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<p>Chargement du composant lourd...</p>}>
        <dynamicComponent />  {/* Notez la minuscule ici */}
      </Suspense>
    </StairTransition>
  );
}
