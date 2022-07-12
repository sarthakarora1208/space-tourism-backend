export interface ICreateVirtualAccount {
  currency: string;
  country: string;
  description: string;
  ewallet: string;
  merchant_reference_id: string;
  metadata: any;
}

export interface ICreateVirtualAccountResponse {
  id: string;
  merchant_reference_id: string;
  ewallet: string;
  bank_account: {
    iban: string;
  };
  metadata: {
    merchant_defined: boolean;
  };
  status: string;
  description: string;
  funding_instructions: null;
  currency: string;
  transactions: [];
}

export interface ISimulateBankTransfer {
  issued_bank_account: string;
  amount: string;
  currency: string;
}

export interface IBankAccount {
  account_id: string;
  account_id_type: string;
  currency: string;
  country_iso: string;
  issuing_id: string;
}
export interface IListAllVirtualAccountsResponse {
  ewallet: string;
  bank_accounts: IBankAccount[];
}
