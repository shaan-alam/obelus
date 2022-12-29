import {v4} from 'uuid'

export const decodeToHTML = (str: string) => {
  let txt = new DOMParser().parseFromString(str, "text/html");
  return txt.documentElement.textContent;
};

export const exportJSONDocuments = <T, >(data: T) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "export.json";
    link.click();
  };

export const exportCSVDocument = (csvString: string) => {
  const hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);  
    hiddenElement.target = '_blank';  
      
    //provide the name for the CSV file to be downloaded  
    hiddenElement.download = "export.csv"  
    hiddenElement.click();  
}