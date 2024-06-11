export interface ExchangeRate {
  broj_tecajnice: string;
  datum_primjene: string;
  drzava: string;
  drzava_iso: string;
  kupovni_tecaj: string;
  prodajni_tecaj: string;
  sifra_valute: string;
  srednji_tecaj: string;
  valuta: string;
}

export interface ExchangeRateRes {
  data: ExchangeRate[] | [];
  error: string | null;
}
