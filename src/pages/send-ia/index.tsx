import ButtonCadaster from "@/components/FormComponents/ButtonCadaster";
import TextArea from "@/components/FormComponents/TextArea";
import Layout from "@/components/Layout";

export default function SendIa() {
  return (
    <Layout>
      <div className="w-full flex justify-center">
        <div className="gap-4 max-w-6xl flex flex-col">
          <h1 className="text-white text-center text-4xl font-bold">Inteligência I.A</h1>
          <p className="text-white">Neste campo, você pode digitar textos relacionados à área de commodities para contribuir com a melhoria da eficiência e da inteligência da I.A. Germinare. Dessa forma, conseguiremos entregar respostas com maior precisão e eficácia aos nossos clientes.</p>

          <TextArea
            placeholder="Digite o texto..."
          />

          <ButtonCadaster
            title="Enviar"
          />
        </div>
      </div>
    </Layout>
  )
}