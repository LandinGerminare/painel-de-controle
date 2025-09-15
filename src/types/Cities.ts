export interface City {
    cd_cidade: number;
    nm_cidade: string;
    nm_uf: string;
}

export interface PriceCity {
    city_id: number;
    city_name: string;
    value_market: number;
    value_traded: number | null;
}