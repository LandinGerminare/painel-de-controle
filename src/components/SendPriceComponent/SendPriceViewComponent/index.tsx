import { priceApi } from "@/api/priceApi";
import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import CityForm from "@/components/FormComponents/CityForm";
import InputPriceComponent from "@/components/FormComponents/InputPriceComponent";
import SelectCity from "@/components/FormComponents/SelectCity";
import Layout from "@/components/Layout";
import Loading from "@/lib/Loading";
import { City } from "@/types/Cities";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IFormCity {
  city_name: string;
  city_id: number;
  value: string;
  price_type: string;
  boardingMonth?: string;
  taxed?: boolean;
}

export default function SendPriceViewComponent() {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [formCity, setFormCity] = useState<IFormCity[]>([]);
  const [invalidCities, setInvalidCities] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await priceApi.get("/v1/prices/basic-info");

        setCities(response.data.cities);
      } catch (error: any) {
        toast.error("Erro ao carregar cidades.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFormCity((prev) =>
      prev.filter((c) =>
        selectedCities.some((sc) => sc.cd_cidade === c.city_id)
      )
    );
  }, [selectedCities]);

  const handleChange = (city: City, field: string, newValue: any) => {
    setFormCity((prev) => {
      const exists = prev.find((f) => f.city_id === city.cd_cidade);
      let parsedValue = newValue;

      if (field === "value" && typeof newValue === "string") {
        parsedValue = newValue.replace(/[^0-9.]/g, "");
      }
      if (exists) {
        return prev.map((f) =>
          f.city_id === city.cd_cidade ? { ...f, [field]: parsedValue } : f
        );
      }
      return [
        ...prev,
        {
          city_id: city.cd_cidade,
          city_name: `${city.nm_cidade} - ${city.nm_uf}`,
          value: field === "value" ? newValue : "",
          boardingMonth: field === "boardingMonth" ? newValue : "",
          taxed: field === "taxed" ? newValue : true,
          price_type: "market",
        },
      ];
    });
  }

  const handleSubmit = async () => {
    if (formCity.length === 0) {
      toast.warning("Nenhum preço para enviar");
      return;
    }

    const invalid = selectedCities
      .filter(city => {
        const data = formCity.find(f => f.city_id === city.cd_cidade);
        return !data?.value || !data?.boardingMonth;
      })
      .map(city => city.cd_cidade);

    if (invalid.length > 0) {
      setInvalidCities(invalid);
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);
      const payload = formCity.map((c) => ({
        value: Number(c.value),
        boarding_month: Number(c.boardingMonth?.split("-")[1]),
        taxed: c.taxed,
        creation_date: new Date().toISOString(),
        price_type: "market",
        city_id: c.city_id,
        city_name: c.city_name
      }));

      const response = await priceApi.post("/v1/prices/post-multiple-prices", payload);

      toast.success("Preços enviados com sucesso");
      setSelectedCities([]);
      setFormCity([]);
    } catch (error: any) {
      toast.error("Erro ao enviar preços");
      console.error(error);
    } finally {
      setLoading(false);
      setInvalidCities([]);
    }
  }


  return (
    <div className="w-full flex-1 gap-4 flex flex-col">
      <SelectCity selectedCities={selectedCities} setSelectedCities={setSelectedCities} cities={cities} />

      {selectedCities.map((city) => {
        const cityFormData = formCity.find((f) => f.city_id === city.cd_cidade);

        return (
          <CityForm
            key={city.cd_cidade}
            cityId={city.cd_cidade}
            cityName={`${city.nm_cidade} - ${city.nm_uf}`}
            value={cityFormData?.value || ""}
            boardingMonth={cityFormData?.boardingMonth || ""}
            taxed={cityFormData?.taxed ?? true}
            checkPrice={false}
            onChange={(field, newValue) => {
              handleChange(city, field, newValue);
            }}
            isInvalid={invalidCities.includes(city.cd_cidade)}
          />
        );
      })}
      <ButtonCadaster title="Enviar Preços" onClick={handleSubmit} />
    </div>
  )
}