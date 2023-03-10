import { Lead } from "../../types"

export interface BarkLead {
  bark_country_id: number
  bark_country_name: string
  be_first: boolean
  buyer_avatar: any
  buyer_email: string
  buyer_interaction_callout_text: boolean
  buyer_interaction_most_significant: any
  buyer_messages: any
  buyer_share_name: string
  buyer_telephone: string
  buyer_telephone_type: string
  buyer_user_id: number
  categ_promo: boolean
  category_id: number
  city_string: string
  clicked: string
  created: number
  credits_required: number
  credits_required_before_discount: any
  credits_required_original: number
  custom_fields: CustomField[]
  estimate_highest: string
  estimate_lower: string
  estimate_lowest: string
  estimate_type: string
  estimate_upper: string
  estimator_enabled: boolean
  estimator_value: boolean
  expected_credits_required: string
  expecting_free_responses: boolean
  files: any[]
  hide_prev_cr: boolean
  images: any[]
  is_buyer_phone_verified: number
  is_free: boolean
  is_local: number
  is_remote_supported: boolean
  is_shortlisted: boolean
  latitude: string
  longitude: string
  national_label: any
  opened_bark: boolean
  project_detail: string
  project_id: number
  project_title: string
  project_postcode: string
  response_cap: number
  response_count: number
  resubmitted_project: boolean
  since: string
  summary: string
  time_since: string
  viewed: boolean
  highlights: any[]
  is_urgent: boolean
  is_contact_pref_type_email: boolean
  is_contact_pref_type_phone: boolean
  is_contact_pref_type_sms: boolean
  is_top_opportunity: boolean
  matches: Lead[]
}

export interface CustomField {
  question: string
  answer: string
}
