import { priceApi } from "@/api/priceApi";
import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import SelectCity from "@/components/FormComponents/SelectCity";
import Layout from "@/components/Layout";
import InputPriceComponent from "@/components/FormComponents/InputPriceComponent";
import { City } from "@/types/Cities";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IFormCity {
  city_name: string;
  city_id: number;
  value: string;
  price_type: string;
}

export default function SendPricePage() {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [formCity, setFormCity] = useState<IFormCity[]>([]);

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

  const handleChange = (city: City, value: string) => {
    setFormCity((prev) => {
      const exists = prev.find((c) => c.city_id === city.cd_cidade);

      if (exists) {
        return prev.map((c) =>
          c.city_id === city.cd_cidade ? { ...c, value: value } : c
        );
      } else {
        return [
          ...prev,
          {
            city_name: `${city.nm_cidade} - ${city.nm_uf}`,
            city_id: city.cd_cidade,
            value: value,
            price_type: "market",
          },
        ];
      }
    });
  }

  const handleSubmit = async () => {
    if (formCity.length === 0) {
      toast.warning("Nenhum preço para enviar");
      return;
    }

    try {
      setLoading(true);
      const payload = formCity.map((c) => ({
        ...c,
        value: Number(c.value),
        creation_date: new Date().toISOString(),
        taxed: true,
        boarding_month: new Date().getMonth() + 1,
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
    }
  }

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="gap-4 max-w-6xl flex flex-col w-full">
          <h1 className="text-white text-center text-4xl font-bold">Envio de Preços</h1>

          <div className="flex flex-col gap-12">
            <SelectCity selectedCities={selectedCities} setSelectedCities={setSelectedCities} cities={cities} />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {selectedCities.length > 0 ? (
                  selectedCities.map((city) => {
                    const current = formCity.find((c) => c.city_id === city.cd_cidade);
                    return (
                      <div key={city.cd_cidade} className="flex flex-col">
                        <InputPriceComponent
                          value={current?.value !== undefined ? String(current.value) : ""}
                          onChange={(value) => {
                            handleChange(city, value);
                          }}
                          selectedCities={city}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col">
                    <InputPriceComponent
                      value=""
                      onChange={() => { }}
                      selectedCities={{
                        cd_cidade: 0,
                        nm_cidade: "Cidade",
                        nm_uf: "UF",
                      }}
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
            <ButtonCadaster title="Enviar Preços" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
