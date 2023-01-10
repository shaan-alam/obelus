import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import Modal from "../index";
import { HiDownload } from "react-icons/hi";
import { exportCSVDocument, exportJSONDocuments } from "../../../util";
import { parse as parseToCSV } from "json2csv";
import { Lead } from "../../../types";
import type { ModalProps } from "../types";

interface Props extends ModalProps {
  fields: string[];
  selectedDocuments: Lead[];
  exportChoice: string;
}

const ExportModal = ({
  isOpen,
  setIsOpen,
  selectedDocuments,
  title,
  fields: defaultFields,
  exportChoice,
}: Omit<Props, "children">) => {
  const [fields] = useState<string[]>(defaultFields);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [fieldChoice, setFieldChoice] = useState<
    "All Fields" | "Selected Fields"
  >("All Fields");

  useEffect(() => {
    // Reset the state when modal is closed
    // thats because the modal isn't conditionally rendered
    // because transition doesnt happen in conditional rendering
    if (!isOpen) {
      setFieldChoice("All Fields");
      setSelectedFields([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (fieldChoice === "Selected Fields") setSelectedFields([]);
  }, [fieldChoice]);

  useEffect(() => {
    if (error && selectedFields.length !== 0) {
      setError("");
    }
  }, [error, selectedFields]);

  const downloadDocuments = () => {
    if (fieldChoice === "Selected Fields" && selectedFields.length === 0) {
      return setError("Please select atleast one field!");
    }

    setError("");
    let docs = [];

    if (fieldChoice === "Selected Fields") {
      docs = selectedDocuments.map((doc) => {
        const mutatedDocs: Record<string, any> = {};

        selectedFields.forEach((field) => {
          mutatedDocs[field] = (doc._source as Record<string, any>)[field];
        });

        return mutatedDocs;
      });
    } else {
      docs = [...selectedDocuments.map((doc) => ({ ...doc._source }))];
    }

    if (exportChoice === "CSV") {
      const csvString = parseToCSV(docs);
      return exportCSVDocument(csvString);
    }

    exportJSONDocuments(docs);
  };

  const onSelectField = (field: string) => {
    if (selectedFields.indexOf(field) >= 0) {
      setSelectedFields((fields) => fields.filter((f) => f !== field));
    } else {
      setSelectedFields((fields) => [...fields, field]);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
      <div className="p-12">
        <RadioGroup value={fieldChoice} onChange={setFieldChoice}>
          <RadioGroup.Label className="text-blue-800 font-semibold mb-4 text-lg">
            Choose if you want all fields or selected fields to download:
          </RadioGroup.Label>
          <RadioGroup.Option value="All Fields" defaultChecked={true}>
            {({ checked }) => (
              <div
                className={classNames(
                  "p-2 rounded-md my-2 mt-4 flex items-center font-medium cursor-pointer",
                  checked ? "text-blue-800" : ""
                )}
              >
                <span
                  className={classNames(
                    "h-4 w-4 rounded-full bg-white border-4 border-gray-300 mr-2",
                    checked ? "border-blue-800" : ""
                  )}
                ></span>
                &nbsp;All Fields
              </div>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option
            value="Selected Fields"
            onClick={() => setFieldChoice("Selected Fields")}
            defaultChecked={false}
          >
            {({ checked }) => (
              <div
                className={classNames(
                  "p-2 rounded-md my-2 flex items-center font-medium cursor-pointer",
                  checked ? "text-blue-800" : ""
                )}
              >
                <span
                  className={classNames(
                    "h-4 w-4 rounded-full bg-white border-4 border-gray-300 mr-2",
                    checked ? "border-blue-800" : ""
                  )}
                ></span>
                Selected Fields
              </div>
            )}
          </RadioGroup.Option>
        </RadioGroup>
        {error && <div className="my-4 text-red-500 text-sm">{error}</div>}
        {fieldChoice === "Selected Fields" && (
          <div className="p-4 grid grid-cols-2 h-[200px] overflow-y-auto bg-gray-50 rounded-md">
            {fields.map((field) => (
              <div className="flex items-center" key={field}>
                <input type="checkbox" onChange={() => onSelectField(field)} />
                <p className="ml-2">{field}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-800 flex items-center justify-between outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 my-4 disabled:bg-gray-400 transition-all"
            onClick={() => downloadDocuments()}
          >
            <HiDownload />
            &nbsp;Download
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;
