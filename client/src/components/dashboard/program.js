import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios'

function ProgramCard({ program, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)

    const [initialFields, setInitialFields] = useState({
        program_text: program.program_text,
        description: program.description,
        explanation: program.explanation,
        focusArea: program.focusArea,
        focusLearning: program.focusLearning,
        tip: program.tip,
    });

    const [updateFields, setUpdateFields] = useState(initialFields);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateFields((prevFields) => ({
            ...prevFields,
            [name]: value, // Update the specific field
        }));
    };

    const handleCancel = () => {
        setIsEditing(false)
        setUpdateFields(initialFields);
    };

    const handleSave = async () => {
        setInitialFields(updateFields);
        onUpdate(program.program_id, updateFields)
        setIsEditing(false);
    };

    return(
        <div className="flex flex-col flex-wrap gap-y-4 py-6 rounded rounded-lg border dark:border-gray-800 dark:bg-gray-800" >


            {!isEditing ? (
                <>
                    <dl className="flex flex-row px-5 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">ID:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.program_id}</dd>
                        <div className="flex flex-row justify-end px-5 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ">
                            <button onClick={() => setIsEditing(true)} type="button" className="w-full bg-green-500 dark:bg-green-700 rounded-lg border text-white border-green-700 px-5 py-1 text-center text-sm font-medium hover:bg-green-500 hover:text-white lg:w-auto">
                                Edit
                            </button>
                        </div>
                    </dl>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Code:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.program_code}</dd>
                    </dl>

                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Name:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.program_text}</dd>
                    </dl>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Description:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.description}</dd>
                    </dl>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Explanation:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.explanation}</dd>
                    </dl>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Focus area:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.focusArea}</dd>
                    </dl>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Focus learning:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.focusLearning}</dd>
                    </dl>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Tip:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.tip}</dd>
                    </dl>
                </>
            ) : (
                <>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">ID:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.program_id}</dd>
                    </dl>
                    <dl className="flex flex-row px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Code:</dt>
                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{program.program_code}</dd>
                    </dl>

                    <dl className="flex flex-row items-center px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Name:</dt>
                        <dd className="text-base text-gray-900 dark:text-white">  
                            <textarea type="text" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                name='program_text'
                                cols='50'
                                value={updateFields.program_text}
                                onChange={handleChange}
                            />
                        </dd>
                    </dl>
                    <dl className="flex flex-row items-center px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Description:</dt>
                        <textarea type="text" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                name='description'
                                rows='3'
                                value={updateFields.description}
                                onChange={handleChange}
                            />
                    </dl>
                    <dl className="flex flex-row items-center px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Explanation:</dt>
                        <textarea type="text" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                name='explanation'
                                rows ='3'
                                value={updateFields.explanation}
                                onChange={handleChange}
                            />
                    </dl>
                    <dl className="flex flex-row items-center px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Focus area:</dt>
                        <textarea type="text" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                name='focusArea'
                                rows ='3'
                                value={updateFields.focusArea}
                                onChange={handleChange}
                            />
                    </dl>
                    <dl className="flex flex-row items-center px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Focus learning:</dt>
                        <textarea type="text" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                name='focusLearning'
                                rows ='3'
                                value={updateFields.focusLearning}
                                onChange={handleChange}
                            />
                    </dl>
                    <dl className="flex flex-row items-center px-5 py-2 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">tip:</dt>
                        <textarea type="text" 
                                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                name='tip'
                                rows ='3'
                                value={updateFields.tip}
                                onChange={handleChange}
                            />
                    </dl>
                    <div className="flex flex-row justify-end px-5 space-x-3 w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ">
                        <button onClick={handleCancel} type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white lg:w-auto">
                            Cancel
                        </button>
                        <button onClick={handleSave} type="button" className="w-full dark:bg-green-700 rounded-lg border text-white border-green-700 px-5 py-2 text-center text-sm font-medium hover:bg-green-500 hover:text-white lg:w-auto">
                            Save
                        </button>
                    </div>
            </>
            )}
            
        </div>
  )
}

const Program = () => {
    const [programs, setPrograms] = useState([])
    const [loadingPrograms, setLoadingPrograms] = useState(true)

    useEffect(() => {
      const fetchUsers = async () => {
          try {
              const res = await fetch("http://localhost:5000/api/app/program")
              const data = await res.json();
              setPrograms(data.programs[0]);
          } catch (error) {
              console.log(error);
          } finally {
            setLoadingPrograms(false)
          }
      }
      fetchUsers()
    }, [])

    console.log(programs)

    const handleUpdate = async (program_id, updateData) => {
        try {
            await axios.put(`http://localhost:5000/api/app/program/` + program_id, updateData);
            } catch (error) {
            console.error("Error updating user:", error);
        }
        setPrograms((prevPrograms) =>
            prevPrograms.map((p) =>
                p.program_id === program_id
                    ? { ...p, ...updateData }  
                    : p  
            )
        );
    };

    if(loadingPrograms) {
        return(
            <div>Loading...</div>
        )
    }

  return (
    <div className="w-full px-5 py-10 font-sans dark:text-white">
        <div className="w-full px-20 py-10 font-sans dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Programs Management</h1>
            <div className="space-y-5">
                {programs.map((p) => (
                <ProgramCard
                    key={p.program_id}
                    program={p}
                    onUpdate={handleUpdate}
                />
                ))}
            </div>
        </div>
    </div>
  );
};

export default React.memo(Program);