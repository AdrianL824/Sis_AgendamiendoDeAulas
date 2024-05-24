import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div>
      <div className="mt-40 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              Reserva de Aulas <span className="text-blue-600">FCYT</span>
            </h1>
            <p className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
              Sistema de reserva de aulas para docentes y auxiliares de la
              Universidad Mayor de San Simón
            </p>

            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Link
                to="/anuncios"
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Ver anuncios
                <svg
                  className="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>

            <div className="mt-6 lg:mt-10 grid grid-cols-2 gap-x-5">
              <div className="py-5"></div>

              <div className="py-5"></div>
            </div>
          </div>

          <div className="relative ms-4">
            <img
              className="wfull rounded-md"
              src="/IMG_20210719_154245-1-scaled.jpg"
              alt="Image Description"
            ></img>
            <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>

            <div className="absolute bottom-0 start-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
