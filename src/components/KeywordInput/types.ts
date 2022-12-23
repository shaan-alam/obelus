export interface Keyword {
  id: string;
  text: string;
}

export interface IProps {
  keywords: Keyword[];
  setKeywords: React.ChangeEventHandler<HTMLInputElement> | undefined;
  deleteKeyword: (id: string) => void;
}