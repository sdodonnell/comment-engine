import React, { useCallback, useEffect, useState } from 'react';
import * as MongoAPI from './api/MongoAPI';
import Table from './components/Table';
import Modal from './components/Modal';

const SKILL_SETS = [
  {
    full_name: 'Historical comprehension',
    short_name: 'historical comprehension',
    assessed_by: 'quizzes'
  },
  {
    full_name: 'Historical analysis',
    short_name: 'historical analysis',
    assessed_by: 'quizzes and written assignments'
  },
  {
    full_name: 'Research',
    short_name: 'research',
    assessed_by: 'written and verbal components of project'
  }
];

function App() {
  const [activeStudent, setActiveStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  // listen for new data

  useEffect(() => {
    MongoAPI.fetchComments().then(comments => setComments(comments));
  }, []);

  const handleAddNewStudent = e => {
    e.preventDefault();

    setShowModal(true);
  };

  const hideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl my-8 font-bold underline">Comment Generator</h1>
      <Table comments={comments} />
      <button className="bg-green-500 rounded-full p-4 m-8" onClick={handleAddNewStudent}>
        Add New Student
      </button>
      {showModal && (
        <Modal
          activeStudent={activeStudent}
          hideModal={hideModal}
          skillSets={SKILL_SETS}
          saveComment={MongoAPI.saveComment}
        />
      )}
    </div>
  );
}

export default App;
