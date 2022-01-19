import React, { useCallback, useState } from "react";
import axios from 'axios';
import Table from "./Table";
import Modal from './Modal';

function App() {
  const [activeStudent, setActiveStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // listen for new data

  const handleAddNewStudent = e => {
    e.preventDefault();

    setShowModal(true);
  }

  const hideModal = useCallback(() => {
    setShowModal(false);
  }, [])

  const saveComment = axios.post('/api/comment', {})

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-8 font-bold underline">Comment Generator</h1>
      <Table />
      <button className="bg-green-500 rounded-full p-4 m-8" onClick={handleAddNewStudent}>Add New Student</button>
      {showModal && <Modal activeStudent={activeStudent} hideModal={hideModal} saveComment={saveComment}/>}
    </div>
  );
}

export default App;
