import React from "react";
import Header from "../../../components/iu/Client/Header";

const PageAnuncios = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-neutral-300">
          Anuncios
        </h2>
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div class="h-20 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl"></div>
              <div class="p-4 md:p-6">
                <span class="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                  RESERVA DE AULAS
                </span>
                <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                  Docentes
                </h3>
                <p class="mt-3 text-gray-500 dark:text-neutral-500 text-lg">
                  <span class="font-bold">Inicio: </span>
                  <span> 1 de junio de 2024 </span>
                  <div class="block">
                    <span class="font-bold">Fin: </span>
                    <span>30 de junio de 2024</span>
                  </div>
                </p>
              </div>
            </div>

            <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div class="h-20 flex flex-col justify-center items-center bg-rose-500 rounded-t-xl"></div>
              <div class="p-4 md:p-6">
                <span class="block mb-1  text-xs font-semibold uppercase text-rose-600 dark:text-rose-500">
                  RESERVA DE AULAS
                </span>
                <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                  Auxiliares
                </h3>
                <p class="mt-3 text-gray-500 dark:text-neutral-500 text-lg">
                  <span class="font-bold">Inicio: </span>
                  <span> 15 de junio de 2024 </span>
                  <div class="block">
                    <span class="font-bold">Fin: </span>
                    <span>30 de junio de 2024 </span>
                  </div>
                </p>
              </div>
            </div>

            <div class="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div class="h-20 flex flex-col justify-center items-center bg-amber-500 rounded-t-xl"></div>
              <div class="p-4 md:p-6">
                <span class="block mb-1 text-xs font-semibold uppercase text-amber-500">
                  PERIODO DE EXÁMENES
                </span>
                <h3 class="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                  Segundo Parcial
                </h3>
                <p class="mt-3 text-gray-500 dark:text-neutral-500 text-lg">
                  <span class="font-bold">Inicio: </span>
                  <span> 1 de julio de 2024 </span>
                  <div class="block">
                    <span class="font-bold">Fin: </span>
                    <span>15 de julio de 2024 </span>
                  </div>
                </p>
              </div>
              <div class="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAnuncios;
