export interface IProps {
  options: string[] | undefined;
  values: string[];
  onSelect: (country: string) => void;
  onDelete: (countryCode: string) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}