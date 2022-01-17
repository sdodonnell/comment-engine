import React from "react";

const Modal = ({ activeStudent, hideModal }) => {
    
    return (
        <div className="absolute h-screen w-screen bg-trans-black flex justify-center items-center">
            <div className="relative h-5/6 w-4/6 bg-slate-50">
                <p className="absolute top-0 right-0" onClick={hideModal}>x</p>
                <form className="flex flex-col">
                    <label>
                        <span>Student Name</span>
                        <input type="text" />
                    </label>
                    <label>
                    <span>Student Name</span>
                        <input type="text" />
                    </label>
                    <label>
                    <span>Student Name</span>
                        <input type="text" />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Modal;
