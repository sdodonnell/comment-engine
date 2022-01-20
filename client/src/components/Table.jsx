import React from 'react';

const Table = ({ comments }) => {
  return (
    <div className="w-3/5 border border-slate divide-y divide-slate">
      {comments.map(comment => (
        <div className="h-16 flex justify-between" key={comment.student_name}>
          <div>{comment.student_name}</div>
          <div>{comment.course}</div>
        </div>
      ))}
    </div>
  );
};

export default Table;
