import { ReactElement } from "react";

export interface PrimaryInstitutionProps {
  email?: string;
  legal_name?: string;
  uid?: string;
}

export interface PrimaryInstitutionPayloadPropTypes {
  name: string;
  uid: string;
  email: string;
}

export interface InstitutionsProps extends PrimaryInstitutionProps {
  value?: InstitutionsProps;
  id?: number;
  name?: string;
  cost?: string | number;
  commission?: string;
}

export interface CreateReferralPayload extends InstitutionsProps {
  institution: PrimaryInstitutionProps;
}

export interface PrimaryKeyValuePair {
  value: any;
  text: string;
  icon?: ReactElement;
  hideSM?: boolean;
  hideMD?: boolean;
  hideLG?: boolean
}

export type ServiceCatalogue = {
  name: string;
  cost: number | string;
  day: string;
};

export type ReferralType = {
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  phone_number: string;
  referral_comment: string;
  entry: File | null;
  to_institution: InstitutionsProps;
  state_of_origin: string;
  from_institution?: InstitutionsProps;
  service_cost?: string;
};

export type FetchInstitutionPropsResults = {
  authorizing_signatories: null;
  avatar?: string | null;
  city: string;
  code?: string;
  country: string;
  email: string;
  institution_services: Array<string>;
  institution_type: string;
  is_wallet_active: boolean | null;
  legal_name: string;
  links: Array<string>;
  owner: string;
  phone: string;
  project_count: number;
  status: string;
  uid: string;
};

export type InstitutionArray = Array<FetchInstitutionPropsResults>;
export type ServiceCatalogueList = Array<ServiceCatalogue>;

export type Params = { slug: string };
export type SearchParams = { [key: string]: string | string[] | undefined };
