import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    "X-RapidAPI-Key": "bb255ee034msh8bb46fd24551784p17b3cejsn9398edbc317e",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
      headers: headers,
     });
  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Preço base do aluguel em reais

    const mileageFactor = 0.1; // Adcional por quilômetro

    const ageFactor = 0.05; // Adcional por ano de fabricação do veículo


    //Calcular adcional baseado na quilometragem e idade
    const mileageRate = city_mpg * mileageFactor; 
    const ageRate = (new Date().getFullYear() - year) * ageFactor; 

    //Calcular valor do aluguel por dia 
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate; 

    return rentalRatePerDay.toFixed(0)

};

export const generateCarImageUrl = (car: CarProps, angle? : string) => {
const url = new URL ('https://cdn.imagin.studio/getimage'); 

const {make, year, model} = car; 

url.searchParams.append('costumer', 'n4/kugzXb+YEPPdhQEQVcQ==hxwdokzxUFnWEbNU');
url.searchParams.append('make', make); 
url.searchParams.append('modelFamily', model.split('')[0]); 
url.searchParams.append('zoomType', 'fullscreen'); 
url.searchParams.append('modelYear', `${year}`); 
url.searchParams.append('angle', `${angle}`); 

return`${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value)

const newPathname = `${window.location.pathname}?${searchParams.toString()}` 

return newPathname;

}