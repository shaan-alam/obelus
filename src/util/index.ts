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
    link.download = "data.json";
    link.click();
  };