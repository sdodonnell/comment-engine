import axios from 'axios';
import { formatTermDescription, formatSkillSets } from '../utils';

export const fetchComments = async () => {
  const res = await axios.get('http://localhost:8000/api/comment');

  return res.data;
};

export const saveComment = (name, skillSets) => {
    debugger
    const formattedSkillSets = formatSkillSets(skillSets);
    const formattedTermDescription = formatTermDescription();
    const course = 'placeholder';
    const futureComment = 'placeholder';

    const data = {
        student_name: name,
        course,
        term_description: formattedTermDescription,
        skill_sets: formattedSkillSets,
        future_comment: futureComment
    }


    axios.post('http://localhost:8000/api/comment', data);
};
