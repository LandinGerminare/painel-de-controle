export function getStateAbbreviation(state: string): string {
    const map: Record<string, string> = {
        "ACRE": "AC",
        "ALAGOAS": "AL",
        "AMAPÁ": "AP",
        "AMAZONAS": "AM",
        "BAHIA": "BA",
        "CEARÁ": "CE",
        "DISTRITO FEDERAL": "DF",
        "ESPÍRITO SANTO": "ES",
        "GOIAS": "GO",
        "MARANHÃO": "MA",
        "MATO GROSSO": "MT",
        "MATO GROSSO DO SUL": "MS",
        "MINAS GERAIS": "MG",
        "PARA": "PA",
        "PARAIBA": "PB",
        "PARANA": "PR",
        "PERNAMBUCO": "PE",
        "PIAUI": "PI",
        "RIO DE JANEIRO": "RJ",
        "RIO GRANDE DO NORTE": "RN",
        "RIO GRANDE DO SUL": "RS",
        "RONDÔNIA": "RO",
        "RORAIMA": "RR",
        "SANTA CATARINA": "SC",
        "SÃO PAULO": "SP",
        "SERGIPE": "SE",
        "TOCANTINS": "TO",
    };

    return map[state.toUpperCase()] ?? state;
}

export function formatCityName(cityName: string): string {
    // Exemplo: "RONDONOPOLIS - MATO GROSSO"
    const parts = cityName.split(" - ");
    if (parts.length === 2) {
        const [city, state] = parts;
        return `${city} - ${getStateAbbreviation(state)}`;
    }
    return cityName; // se não tiver "-"
}