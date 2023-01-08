
    export interface Location {
        name: string;
        locality?: any;
        region: string;
        metro?: any;
        country: string;
        continent: string;
        street_address?: any;
        address_line_2?: any;
        postal_code?: any;
        geo?: any;
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
        facebook_url?: any;
        twitter_url?: any;
        website?: any;
    }

    export interface Title {
        name: string;
        role: string;
        sub_role?: any;
        levels: any[];
    }

    export interface Experience {
        company: Company;
        location_names: any[];
        end_date?: any;
        start_date?: any;
        title: Title;
        is_primary: boolean;
        summary?: any;
    }

    export interface Profile {
        network: string;
        id: string;
        url: string;
        username: string;
    }
    export interface School {
        name: string;
        type: string;
        id: string;
        location: string;
        linkedin_url: string;
        facebook_url: string;
        twitter_url: string;
        linkedin_id: string;
        website: string;
        domain: string;
    }
    export interface Education {
        school: School;
        degrees: string[];
        start_date: string;
        end_date: string;
        majors: string[];
        minors: string[];
        gpa: string;
        summary: string;
    } 

    export interface VersionStatus {
        status: string;
        contains: any[];
        previous_version: string;
        current_version: string;
    }
  
    export interface Source {
        full_name: string;
        first_name: string;
        middle_initial: string;
        middle_name: string;
        last_name: string;
        gender: string;
        birth_year: string;
        birth_date: string;
        linkedin_url: string;
        linkedin_username: string;
        linkedin_id: string;
        facebook_url: string;
        facebook_username: string;
        facebook_id: string;
        twitter_url: string;
        twitter_username: string;
        github_url: string;
        github_username: string;
        work_email: string;
        mobile_phone: string;
        industry: string;
        job_title: string;
        job_title_role: string;
        job_title_sub_role: string;
        job_title_levels: string[];
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
        job_company_location_name: string
        job_company_location_locality: string;
        job_company_location_metro: string;
        job_company_location_region: string;
        job_company_location_geo: string;
        job_company_location_street_address: string;
        job_company_location_address_line_2: string;
        job_company_location_postal_code: string;
        job_company_location_country: string;
        job_company_location_continent: string;
        job_last_updated: string;
        job_start_date: string;
        job_summary: string;
        location_name: string;
        location_locality: string;
        location_metro: string;
        location_region: string;
        location_country: string;
        location_continent: string;
        location_street_address: string;
        location_address_line_2: string;
        location_postal_code: string;
        location_geo: string;
        location_last_updated: string;
        linkedin_connections: number;
        inferred_salary: string[];
        inferred_years_experience: any;
        summary: string;
        phone_numbers: string[];
        emails: string[];
        interests: string[];
        skills: string[];
        location_names: string[];
        regions: string[];
        countries: string[];
        street_addresses: string[];
        experience: Experience[];
        education: Education[];
        profiles: Profile[];
        certifications: any[];
        languages: string[];
        version_status: VersionStatus;
    }

    export interface Lead {
        _index: string;
        _id: string;
        _score: number;
        _source: Source;
    }

export interface ILeadResponse {
    results: Lead[],
    total_results: number
}