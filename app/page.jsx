import Social from "@/components/Social";
import Photo from "@/components/Photo";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:py-8">
          <div className="text-center xl:text-left xl:w-1/2">
            <span className="text-xl font-medium">Développeur Web</span>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4">
              Bonjour, je suis <br /> <span className="text-accent">Mathieu Schmitt</span>
            </h1>
            <p className="max-w-[500px] mb-6 text-white/80">
              Passionné par la programmation et le design, je crée des sites web alliant esthétique et fonctionnalité. Toujours en quête de nouveaux défis et technologies à maîtriser.
            </p>
            <Social
              containerStyles="flex justify-center xl:justify-start gap-4"
              iconStyles="w-10 h-10 border border-accent rounded-full flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all duration-300"
            />
          </div>
          <div className="mt-8 xl:mt-0 xl:w-1/2">
            <Photo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
