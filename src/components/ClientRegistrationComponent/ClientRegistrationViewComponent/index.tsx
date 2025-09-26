import ClientTable from "@/components/ClientRegistrationComponent/ClientTable";
import InputPrimary from "@/components/FormComponents/InputPrimary";
import TripleRender from "@/components/Lib/TripleRender";
import useClientRegistration from "@/context/ClientRegistration";
import { useMemo, useState } from "react";

export default function ClientRegistrationViewComponent() {
  const { users } = useClientRegistration();
  const [search, setSearch] = useState("");

  return (
    <TripleRender
      tripleState={users}
      successComponent={(data) => {
        const filteredData = useMemo(
          () =>
            data.filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            ),
          [data, search]
        );
        return (
          <div className="w-full flex-1 gap-4 flex flex-col">
            <div className="flex flex-row gap-4 w-full">
              <InputPrimary
                placeholder="Pesquise pelo nome do Cliente..."
                componentStyle="w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ClientTable users={filteredData} />
          </div>
        )
      }}
    />
  )
}