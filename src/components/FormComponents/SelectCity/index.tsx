import { City } from "@/types/Cities";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { FaCircle } from "react-icons/fa";

interface SelectCityProps {
  selectedCities: City[];
  setSelectedCities: (city: City[]) => void;
  cities?: City[];
}

export default function SelectCity({ selectedCities, setSelectedCities, cities }: SelectCityProps) {
  return (
    <Listbox value={selectedCities} onChange={setSelectedCities} multiple>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-neutral-700 h-14 pr-3 pl-3 border border-neutral-600 text-left text-white outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="flex items-center gap-2 pr-6">
              {selectedCities.length > 0
                ? selectedCities.map((city) => city.nm_cidade).join(", ")
                : "Selecione uma ou mais cidades"}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-7 self-center justify-self-end text-gray-400 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-neutral-700 py-1 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {cities?.map((city) => (
            <ListboxOption
              key={city.cd_cidade}
              value={city}
              className="group relative cursor-pointer py-2 pr-9 pl-3 text-white select-none data-[focus]:bg-neutral-800"
            >
              <div className="flex items-center">
                <FaCircle
                  className={`size-7 mr-2 ${selectedCities.some((c) => c.cd_cidade === city.cd_cidade)
                    ? "text-primary-500"
                    : "text-transparent border border-neutral-600 rounded-full"
                    }`}
                />
                <div className="flex items-center mt-0.5">
                  <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{city.nm_cidade} - {city.nm_uf}</span>
                </div>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}