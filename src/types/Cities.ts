export interface City {
    cd_cidade: number;
    nm_cidade: string;
    nm_uf: string;
}

export interface PriceCity {
    unique_id: string;
    city_id: number;
    city_name: string;
    value: number;
    value_traded: number | null;
    boarding_month: number | string;
    taxed: boolean;
    value_market?: number;
}