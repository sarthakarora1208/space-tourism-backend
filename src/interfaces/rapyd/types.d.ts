
// ids
export type ewallet_id = `ewallet_${string}`;
export type customer_id = `cus_${string}`;
export type sender_id = `sender_${string}`;
export type kycid_id = `kycid_${string}`;
export type contact_id = `cont_${string}`;
export type address_id = `address_${string}`;

export type categories = "bank_redirect" | "bank_transfer" | "card" | "cash" | "ewallet" | "rapyd_ewallet";
export type payment_flow_type = "redirect_url" | categories | "rapyd_ewallet";



export type MM = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
export type DD = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31';
export type YYYY = '1899' | '1900' | '1901' | '1902' | '1903' | '1904' | '1905' | '1906' | '1907' | '1908' | '1909' | '1910' | '1911' | '1912' | '1913' | '1914' | '1915' | '1916' | '1917' | '1918' | '1919' | '1920' | '1921' | '1922' | '1923' | '1924' | '1925' | '1926' | '1927' | '1928' | '1929' | '1930' | '1931' | '1932' | '1933' | '1934' | '1935' | '1936' | '1937' | '1938' | '1939' | '1940' | '1941' | '1942' | '1943' | '1944' | '1945' | '1946' | '1947' | '1948' | '1949' | '1950' | '1951' | '1952' | '1953' | '1954' | '1955' | '1956' | '1957' | '1958' | '1959' | '1960' | '1961' | '1962' | '1963' | '1964' | '1965' | '1966' | '1967' | '1968' | '1969' | '1970' | '1971' | '1972' | '1973' | '1974' | '1975' | '1976' | '1977' | '1978' | '1979' | '1980' | '1981' | '1982' | '1983' | '1984' | '1985' | '1986' | '1987' | '1988' | '1989' | '1990' | '1991' | '1992' | '1993' | '1994' | '1995' | '1996' | '1997' | '1998' | '1999' | '2000' | '2001' | '2002' | '2003' | '2004' | '2005' | '2006' | '2007' | '2008' | '2009' | '2010' | '2011' | '2012' | '2013' | '2014' | '2015' | '2016' | '2017' | '2018' | '2019' | '2020' | '2021' | '2022' | '2023' | '2024' | '2025' | '2026' | '2027' | '2028' | '2029' | '2030' | '2031' | '2032' | '2033' | '2034' | '2035' | '2036' | '2037' | '2038' | '2039' | '2040' | '2041' | '2042' | '2043' | '2044' | '2045' | '2046' | '2047' | '2048' | '2049'

export type WalletTransactionTypes = "bank_issuing_in" | "payout_funds_in" | "card_issuing_in" | "card_issuing_adjustment" | "deposit_funds" | "payout_funds_out" | "provider_service_funds_out" | "add_funds" | "payment_funds_in" | "card_issuing_out" | "remove_funds" | "put_funds_on_hold" | "payment_funds_out" | "release_escrow" | "release_on_hold_funds" | "p2p_transfer" | "withdraw_funds"
export type dateformate = `${MM}/${DD}/${YYYY}`;

// types
export type contact_type = "personal" | "business"

export interface DataRow {
  id?: number;
  fb_id?: string;
  data_1?: string;
  email?: string;
  phone?: string;
  religion?: string;
  birthdate?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  fb_link?: string;
  data_10?: string;
  username?: string;
  middle?: string;
  profile_status?: string;
  job_company?: string;
  job_title?: string;
  city?: string;
  government?: string;
  collage?: string;
  fb_email?: string;
  data_20?: string;
  data_21?: string;
  data_22?: string;
  data_23?: string;
  data_24?: string;
  marital_status?: string;
  data_26?: string;
  data_27?: string;
  data_28?: string;
  data_29?: string;
  data_30?: string;
  data_31?: string;
  data_32?: string;
  data_33?: string;
  data_34?: string;
}

export interface IAPIServerResponse<T = any> {
  performance: number,
  success: boolean,
  message?: any,
  data: T
}
