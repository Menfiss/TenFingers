"use client"

import React, {  useEffect, useState } from 'react';

interface props {
    onFileSelect: (data: any) => void;
    jsonFilePaths: { [key: string]: () => Promise<any> };
}




const JsonFilePicker = (props:props) => {
    const [selectedFile, setSelectedFile] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const setDefaultFile = async (fileKey: string) => {
        setSelectedFile(fileKey);
        setError(null);  // Reset previous error
        setLoading(true); // Set loading to true when a file is being loaded

        try {
            // Dynamically import the JSON file
            const jsonData = await props.jsonFilePaths[fileKey]();
            props.onFileSelect(jsonData.default);  // Pass loaded JSON data to parent component
        } catch (err) {
            setError("Failed to load the JSON file. Please try again.");
        } finally {
            setLoading(false); // Set loading back to false
        }
    };


    // Handle file selection
    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fileKey = event.target.value;
    setSelectedFile(fileKey);
    setError(null);  // Reset previous error
    setLoading(true); // Set loading to true when a file is being loaded

    try {
        // Dynamically import the JSON file
        const jsonData = await props.jsonFilePaths[fileKey]();
        props.onFileSelect(jsonData.default);  // Pass loaded JSON data to parent component
    } catch (err) {
        setError("Failed to load the JSON file. Please try again.");
    } finally {
        setLoading(false); // Set loading back to false
    }
        event.target.blur(); // Remove focus from the select element
    };



    useEffect(() => {
        setDefaultFile(Object.keys(props.jsonFilePaths)[0]);
    } ,[]);
    
    return (
    <>
        <select value={selectedFile} onChange={handleSelectChange} >
        <option value="" disabled>Select language</option>
        {Object.keys(props.jsonFilePaths).map((fileName) => (
            <option key={fileName} value={fileName}>
            {fileName}
            </option>
        ))}
        </select>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
    );
};

export default JsonFilePicker;
