import React, { useState } from "react";

const Modal = ({ activeStudent, hideModal, saveComment }) => {
    const [name, setName] = useState("");
    const [performance, setPerformance] = useState({})

    const handleNameChange = e => {
        setName(e.target.value);
    }
    const handlePerformanceChange = (e, skillSet) => {
        setPerformance(perf => perf[skillSet] = e.target.value)
    }

    const handleSubmit = () => {
        saveComment(name, performance)
    }
    
    return (
        <div className="absolute h-screen w-screen bg-trans-black flex justify-center items-center">
            <div className="relative h-5/6 w-4/6 bg-slate-50">
                <p className="absolute top-0 right-0" onClick={hideModal}>x</p>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label>
                        <span>Student Name</span>
                        <input type="text" value={name} onChange={handleNameChange}/>
                    </label>
                    <label>
                    <span>Performance in area A</span>
                        <input type="text" onChange={e => handlePerformanceChange(e, "Area A")}/>
                    </label>
                    <label>
                    <span>Performance in area B</span>
                        <input type="text" onChange={e => handlePerformanceChange(e, "Area B")}/>
                    </label>
                    <label>
                    <span>Performance in area C</span>
                        <input type="text" onChange={e => handlePerformanceChange(e, "Area C")}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default Modal;
