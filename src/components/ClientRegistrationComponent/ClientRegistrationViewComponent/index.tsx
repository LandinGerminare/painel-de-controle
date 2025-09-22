import ClientTable from "@/components/ClientRegistrationComponent/ClientTable";
import InputPrimary from "@/components/FormComponents/InputPrimary";

export default function ClientRegistrationViewComponent() {
  return (
    <div className="w-full flex-1 gap-4 flex flex-col">
      <div className="flex flex-row gap-4 w-full">
        <InputPrimary
          placeholder="Pesquise pelo nome do Cliente..."
          componentStyle="w-full"
        />
        <InputPrimary
          placeholder="Pesquise pelo nome da Empresa..."
          componentStyle="w-full"
        />
      </div>

      <ClientTable />
    </div>
  )
}