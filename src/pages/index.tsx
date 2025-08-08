import Button from "@/components/FormComponents/Button";
import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import InputPrimary from "@/components/FormComponents/InputPrimary";
import InputSecondary from "@/components/FormComponents/InputSecondary";
import TextArea from "@/components/FormComponents/TextArea";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-neutral-900 flex flex-row gap-10">
      <div className="flex flex-col max-w-[30%] gap-4">
        <h1 className="text-white">Form Components:</h1>
        <ButtonCadaster
          title="Acessar"
        />
        <Button
          title="Atualizar Posição"
        />
        <InputSecondary
          placeholder="Digite seu email..."
        />
        <InputPrimary
          placeholder="Digite seu email..."
        />
        <TextArea
          placeholder="Digite o texto..."
        />
      </div>
    </div>
  );
}
