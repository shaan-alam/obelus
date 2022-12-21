
export interface Location {
    name: string;
    locality: string;
    region: string;
    metro: string;
    country: string;
    continent: string;
    street_address: string;
    address_line_2?: string;
    postal_code: string;
    geo: string;
}

export interface Company {
    name: string;
    size: string;
    id: string;
    founded: string;
    industry: string;
    location: Location;
    linkedin_url: string;
    linkedin_id: string;
    facebook_url: string;
    twitter_url: string;
    website: string;
}

export interface Title {
    name: string;
    role?: string;
    sub_role?: string;
    levels: any[];
}

export interface Experience {
    company: Company;
    start_date?: any;
    end_date?: any;
    title: Title;
    location_names: string[];
    is_primary: boolean;
    summary?: string;
}

export interface Profile {
    network: string;
    id?: string;
    url: string;
    username: string;
}

export interface VersionStatus {
    status: string;
    contains: any[];
    previous_version: string;
    current_version: string;
}

export interface Lead {
    data: {
        id: string;
        full_name: string;
        first_name: string;
        middle_initial?: string;
        middle_name?: string;
        last_name: string;
        gender: string;
        birth_year?: number;
        birth_date?: string;
        linkedin_url: string;
        linkedin_username: string;
        linkedin_id?: string;
        facebook_url?: string;
        facebook_username?: string;
        facebook_id?: string;
        twitter_url?: string;
        twitter_username?: string;
        github_url?: string;
        github_username?: string;
        work_email?: string;
        mobile_phone?: string;
        industry?: string;
        job_title: string;
        job_title_role?: string;
        job_title_sub_role?: string;
        job_title_levels: any[];
        job_company_id: string;
        job_company_name: string;
        job_company_website: string;
        job_company_size: string;
        job_company_founded: string;
        job_company_industry: string;
        job_company_linkedin_url: string;
        job_company_linkedin_id: string;
        job_company_facebook_url: string;
        job_company_twitter_url: string;
        job_company_location_name: string;
        job_company_location_locality: string;
        job_company_location_metro: string;
        job_company_location_region: string;
        job_company_location_geo: string;
        job_company_location_street_address: string;
        job_company_location_address_line_2?: string;
        job_company_location_postal_code: string;
        job_company_location_country: string;
        job_company_location_continent: string;
        job_last_updated: string;
        job_start_date?: string;
        job_summary?: string;
        location_name?: string;
        location_locality?: string;
        location_metro?: string;
        location_region?: string;
        location_country?: string;
        location_continent?: string;
        location_street_address?: string;
        location_address_line_2?: string;
        location_postal_code?: string;
        location_geo?: string;
        location_last_updated?: string;
        linkedin_connections?: string;
        inferred_salary?: string;
        inferred_years_experience?: string;
        summary?: string;
        phone_numbers: string[];
        emails: string[];
        interests: string[];
        skills: string[];
        location_names: string[];
        regions: string[];
        countries: string[];
        street_addresses: string[];
        experience: Experience[];
        education: string[];
        profiles: Profile[];
        certifications: string[];
        languages: string[];
        version_status: VersionStatus;
    }
}


export type APIResponse = Lead[]