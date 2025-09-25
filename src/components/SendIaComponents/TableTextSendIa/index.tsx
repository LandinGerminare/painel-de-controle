import useModal from "@/context/Modal";
import { useTripleRequest } from "@/hooks/triple/useTripleRequest";
import { useState } from "react";
import { FiTrash2, FiChevronDown } from "react-icons/fi";

interface TableProps {
  dados: string[];
}

export default function TableTextSendIa({ dados }: TableProps) {
  const { setModalContent } = useModal()
  const [deleteResult, deleteTitle] = useTripleRequest("DELETE", {
    onSuccess(_) {
      setModalContent(null)
    }
  })

  return (
    <div className="w-full mx-auto">
      <table className="w-full rounded-lg overflow-hidden text-white">
        <thead>
          <tr className=" text-white">
            <th className="text-left py-3 px-4 font-semibold text-lg">Título</th>
            <th className="text-right py-3 px-4 font-semibold text-lg">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr
              key={item}
              className={`border-t border-b border-neutral-600 h-16`}
            >
              <td
                className={`py-3 px-4 text-lg font-normal w-full cursor-pointer`}
              >
                {item}
              </td>
              <td className="py-6 px-4 flex justify-end items-center mx-auto gap-3">
                <FiTrash2
                  size={18}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  onClick={() => {
                    deleteTitle({
                      url: `/knowledge-base/${item}`
                    })
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
