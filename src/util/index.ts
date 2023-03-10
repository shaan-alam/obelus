import _ from 'lodash'

 export const getValueOf = (str: string[] | string | undefined) => {
    if (str instanceof Array) {
      let results;
      if (str.length !== 0) {
        results = str.filter((s) => s).join(", ");
        return results;
      } else {
        return "NA";
      }
    }
    
    return str;
  };

export const getEmails = (
  emails: string[]
) => {
  return emails?.join(", ");
};

export const checkObjectHasValues = <T,>(obj: T) => {
  return (
    Object.values(obj as { [s: string]: unknown }).filter((field) => {
      if (field instanceof Array && field.length > 0) {
        return field;
      } else if (field instanceof Object) {
        return !_.values(field).every(_.isEmpty);
      } else if (!(field instanceof Array) && field) {
        return field;
      }
    }).length !== 0
  );
};

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