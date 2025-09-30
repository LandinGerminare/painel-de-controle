import { priceApi } from "@/api/priceApi";
import Button from "@/components/FormComponents/Button";
import CityForm from "@/components/FormComponents/CityForm";
import useModal from "@/context/Modal";
import { PriceCity } from "@/types/Cities";
import { DwPdf } from "@/utils/DownloadPdf";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalSendWhatsapp from "../ModalSendWhatsapp";
import { FaWhatsapp } from "react-icons/fa";
import Loading from "@/lib/Loading";
import InputPrimary from "@/components/FormComponents/InputPrimary";

export default function CheckPriceViewComponent() {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<PriceCity[]>([]);
  const [sendPdf, setSendPdf] = useState()
  const [isHovered, setIsHovered] = useState(false);
  const { setModalContent } = useModal();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await priceApi.get(`/v1/prices/all-today-prices/`, {
          params: { date: searchData || "" },
        });

        setCities(response.data);
      } catch (error: any) {
        toast.error("Erro ao carregar preços.");
        console.error(error);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchData]);

  const handlePdf = async () => {
    try {
      setLoading(true);
      const payload = cities.map((c) => ({
        ...c,
        value: Number(c.value),
      }));

      const response = await priceApi.post("/v1/prices/generate-pdf", payload, {
        responseType: "arraybuffer",
      });
      setSendPdf(response.data)
      DwPdf(response)

      toast.success("PDF baixado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao gerar PDF");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (city: PriceCity, field: string, newValue: any) => {
    setCities((prev) => {
      const exists = prev.find((f) => f.unique_id === city.unique_id);
      let parsedValue = newValue;

      if (field === "value" && typeof newValue === "string") {
        parsedValue = newValue.replace(/[^0-9.]/g, "");
      }
      if (field === "value_traded" && typeof newValue === "string") {
        parsedValue = newValue.replace(/[^0-9.]/g, "");
      }
      if (exists) {
        return prev.map((f) =>
          f.unique_id === city.unique_id ? { ...f, [field]: parsedValue } : f
        );
      }
      return [
        ...prev,
        {
          unique_id: city.unique_id,
          city_id: city.city_id,
          city_name: `${city.city_name}`,
          value: field === "value" ? newValue : "",
          value_traded: field === "value_traded" ? newValue : "",
          boarding_month: field === "boarding_month" ? newValue : "",
          taxed: field === "taxed" ? newValue : true,
          price_type: "market",
        },
      ];
    });
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="w-full">
      <div className="gap-4 flex flex-col w-full">
        <div className="flex flex-col gap-6">
          <InputPrimary
            label="Data dos Preços"
            type="date"
            onClick={(e) => e.currentTarget.showPicker?.()}
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            {cities.length > 0 ? (
              cities.map((city, index) => {
                const cityFormData = cities.find((f) => f.unique_id === city.unique_id);
                const formattedMonth = cityFormData?.boarding_month
                  ? `${new Date().getFullYear()}-${String(cityFormData.boarding_month).padStart(2, "0")}`
                  : "";

                return (
                  <CityForm
                    key={city.unique_id}
                    cityId={city.city_id}
                    cityName={`${city.city_name}`}
                    value={cityFormData?.value_market || ""}
                    boardingMonth={formattedMonth}
                    taxed={cityFormData?.taxed ?? true}
                    value_traded={cityFormData?.value_traded || ""}
                    checkPrice={true}
                    onChange={(field, newValue) => {
                      handleChange(city, field, newValue);
                    }}
                  />
                )
              })
            ) : (
              <p className="text-white">Nenhuma cidade encontrada.</p>
            )}
          </div>
          <div className="flex w-full gap-4">
            <Button containerStyle={"w-full"} title="Gerar Pdf" onClick={handlePdf} />
            <Button
              title="Enviar Planilha"
              onClick={() => {
                sendPdf ? setModalContent(<ModalSendWhatsapp sendPdf={sendPdf} />) : toast.warning("Favor Gerar o PDF.");
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: "100%",
                fontWeight: "600",
                color: isHovered ? "#62E390" : "#4EB673",
                borderColor: isHovered ? "#62E390" : "#4EB673",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <FaWhatsapp size={20} className="mb-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}