import { Cards } from "./Cards";

export const HeroSection = () => {
  return (
    <div className="flex  h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Manage Your Organization Efficiently
      </h1>

      <Cards></Cards>
    </div>
  );
};
