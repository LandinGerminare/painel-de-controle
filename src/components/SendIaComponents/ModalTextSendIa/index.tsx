import InputSecondary from "@/components/FormComponents/InputSecondary";
import BaseModal from "@/components/Lib/BaseModal";
import TableTextSendIa from "../TableTextSendIa";
import Pagination from "@/components/Lib/Pagination";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { useEffect, useState } from "react";
import TripleRender from "@/components/Lib/TripleRender";

export default function ModalTextSendIa() {
  const [texts, getTexts] =
    useTripleRequest<any>("GET");
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getTexts({
      url: `/knowledge-base/titles`,
      defaultError:
        "Ocorreu um erro ao obter as informações de mercado. Tente novamente mais tarde.",
    });
  }, []);

  return (
    <BaseModal
      title="Textos - Inteligência I.A"
      containerStyle="w-[800px] max-h-[90%]"
    >
      <TripleRender
        tripleState={texts}
        successComponent={(data) => {
          const totalPages = Math.ceil(data.length / itemsPerPage);
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const pageItems = data.slice(startIndex, endIndex);

          return (
            <div className="flex flex-1 flex-col gap-8">
              <InputSecondary placeholder="Buscar pelo título..." />

              <TableTextSendIa dados={pageItems} />

              <Pagination
                totalPages={totalPages}
                initialPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          );
        }}
      />
    </BaseModal>
  )
}