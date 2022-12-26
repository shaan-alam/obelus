import { createContext, useState } from "react";
import { Lead } from "../types";

interface AppContext {
  selectedDocuments: Lead[];
  setSelectedDocuments: React.Dispatch<React.SetStateAction<Lead[]>>;
  exportJSONDocuments: () => void;
}

export const Context = createContext<AppContext>({} as AppContext);

export const Provider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [selectedDocuments, setSelectedDocuments] = useState<Lead[]>([]);

  const exportJSONDocuments = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(selectedDocuments)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  return (
    <Context.Provider
      value={{ selectedDocuments, setSelectedDocuments, exportJSONDocuments }}
    >
      {children}
    </Context.Provider>
  );
};
