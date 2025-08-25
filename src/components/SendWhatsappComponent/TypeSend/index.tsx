import { FileArrowUp } from "phosphor-react";
import { useState } from "react"
import { FaUserAlt } from "react-icons/fa"

interface ITypeSend {
  selectedType: string;
  setFileUrl?: (url: string) => void;
  setFileName?: (name: string) => void;
}

export default function TypeSend(props: ITypeSend) {

  const [image, setImage] = useState<string>()
  const [fileName, setFileName] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      if (props.setFileUrl) props.setFileUrl(imageUrl);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      if (props.setFileName) props.setFileName(file.name);
    }
  };

  return (
    <div className="w-full">
      {props.selectedType === "image" && (
        <button
          className="relative h-72 w-96 rounded-xl border border-neutral-300 flex justify-center items-center cursor-pointer overflow-hidden"
          style={
            image
              ? {
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
              : {}
          }
        >
          {!image && <FileArrowUp size={60} color="#2A2C32" />}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </button>
      )}

      {props.selectedType === "file" && (
        <div className="w-full">
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden w-1/3"
            onChange={handleDocumentChange}
          />
          <label
            htmlFor="file-upload"
            className="w-1/3 cursor-pointer block p-2 border border-neutral-700 rounded-lg text-white text-center bg-neutral-800 hover:bg-neutral-700"
          >
            Selecionar Arquivo
          </label>

          {fileName && (
            <p className="mt-2 text-lg text-neutral-100 w-full">Arquivo: {fileName}</p>
          )}
        </div>
      )}

    </div>
  )
}