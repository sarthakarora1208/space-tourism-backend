import { DE, DK, GB, SG } from "./countryCodes";
import {
  AED,
  AUD,
  CAD,
  CHF,
  CZK,
  DKK,
  EUR,
  GBP,
  HKD,
  HRK,
  HUF,
  ILS,
  JPY,
  MXN,
  NOK,
  NZD,
  PLN,
  RON,
  SAR,
  SEK,
  SGD,
  TRY,
  USD,
  ZAR,
} from "./currencyCodes";

export const countries = [
  {
    countryName: "United Kingdom",
    countryCode: GB,
    currenciesAccepted: [GBP],
    payout_method_type: ["gb_general_bank"],
  },
  {
    countryName: "Germany",
    countryCode: DE,
    currenciesAccepted: [EUR],
  },
  {
    countryName: "Denmark",
    countryCode: DK,
    currenciesAccepted: [
      AED,
      AUD,
      CAD,
      CHF,
      CZK,
      DKK,
      HKD,
      HRK,
      HUF,
      ILS,
      JPY,
      MXN,
      NOK,
      NZD,
      PLN,
      RON,
      SAR,
      SEK,
      SGD,
      TRY,
      USD,
      ZAR,
    ],
  },
  {
    countryName: "Mexico",
    countryCode: MXN,
    currenciesAccepted: [MXN],
  },
  {
    countryName: "Singapore",
    countryCode: SG,
    currenciesAccepted: [SGD, USD],
  },
];
