import React, { useState } from 'react';

const Modal = ({ activeStudent, hideModal, skillSets, saveComment }) => {
  const [name, setName] = useState('');
  const [performance, setPerformance] = useState({});

  const handleNameChange = e => {
    setName(e.target.value);
  };
  const handlePerformanceChange = (e, skillSet) => {
    setPerformance(perf => ({
        ...perf,
        [skillSet]: e.target.value
    }));
  };

  const handleSubmit = () => {
    saveComment(name, performance);
  };

  const skillSetSelect = skillSets => {
    return skillSets.map(({ short_name: skillSet }) => (
      <label key={skillSet}>
        <span>{`Performance in ${skillSet}`}</span>
        <select onChange={e => handlePerformanceChange(e, skillSet)} value={performance[skillSet]}>
          <option value="2">Exceeds expectations</option>
          <option value="1">Meets expectations</option>
          <option value="0">Does not meet expectations</option>
        </select>
      </label>
    ));
  };

  return (
    <div className="absolute h-screen w-screen bg-trans-black flex justify-center items-center">
      <div className="relative h-5/6 w-4/6 bg-slate-50">
        <p className="absolute top-0 right-0" onClick={hideModal}>
          x
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            <span>Student Name</span>
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          {skillSetSelect(skillSets)}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
