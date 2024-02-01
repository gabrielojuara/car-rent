"use client";

import { useEffect, useState } from "react";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";


export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Condição de busca 

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // Condição de filtros

  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // Condição de paginação

  const [limit, setLimit] = useState(10); 

  const getCars = async () => {
    setLoading(true);
    try {
        const result = await fetchCars({
          manufacturer: manufacturer || '',
          year: year || 2022,
          fuel: fuel || '',
          limit: limit || 10,
          model: model || '',
        });
    
        setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getCars();
  }, [fuels, year, limit, manufacturer, model])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length <1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4x1 font-extrabold">Catálogo de carros</h1>
          <p>Escolha o carro que você quer</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer}
          setModel={setModel}/>

          <div className="home__filter-container">
            <CustomFilter title="Combustível" options={fuels}
            setFilter={setFuel}/>
            <CustomFilter title="Ano" options={yearsOfProduction}
            setFilter={setYear}/>
          </div>
        </div>

          {allCars.length > 0 ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (<CarCard car={car} />
                ))}
              </div>
              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image
                    src="/loader.svg"
                    alt="loader"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              )

              }
              <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
                setLimit={setLimit}
               />
            </section>
          ): (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Resultados não encontrados</h2>
              <p>{allCars?.message}</p>
            </div>
          )}
      </div>
    </main>
  );
}
