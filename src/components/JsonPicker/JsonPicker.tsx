"use client";

import React, { useEffect, useState } from "react";

interface props {
  onFileSelect: (data: any) => void;
  jsonFilePaths: { [key: string]: () => Promise<any> };
}

const JsonFilePicker = (props: props) => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const setDefaultFile = async (fileKey: string) => {
    setSelectedFile(fileKey);
    setError(null); // Reset previous error
    setLoading(true); // Set loading to true when a file is being loaded

    try {
      // Dynamically import the JSON file
      const jsonData = await props.jsonFilePaths[fileKey]();
      props.onFileSelect(jsonData.default); // Pass loaded JSON data to parent component
    } catch (err) {
      setError("Failed to load the JSON file. Please try again.");
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  useEffect(() => {
    setDefaultFile(Object.keys(props.jsonFilePaths)[0]);
  }, []);

  return (
    <div className="flex flex-col items-center ">
        <button onClick={(e) => {setShowDropdown(!showDropdown); e.currentTarget.blur()}}>
            <div className="group flex items-center">
                <svg className= {!showDropdown ? "h-8 w-8 text-white group-hover:text-orange-500 transition duration-300" : "h-8 w-8 text-orange-500"}   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                </svg>
                <div className= {!showDropdown ? "ml-3 mr-6 group-hover:text-orange-500 transition duration-300": "ml-3 mr-6 text-orange-500"}>{loading ? "Loading":selectedFile}</div>
            </div>
        </button>
        {showDropdown ? 
        <div className="absolute h-auto w-48 max-h-64  overflow-y-scroll mt-10 bg-slate-600 rounded-md z-10">
            <div className="flex flex-col">
            {Object.keys(props.jsonFilePaths).map((fileName) => (
              <button className="text-white p-3 hover:text-orange-500 hover:bg-slate-700 transition duration-300" key={fileName} onClick={() => {setDefaultFile(fileName); setShowDropdown(false)}}>
                {fileName}
              </button>
            ))}
            </div>
        </div>:null}
    </div>
  );
};

export default JsonFilePicker;
