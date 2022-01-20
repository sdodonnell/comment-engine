export const formatTermDescription = () => {
  return "<div><p>In History of the Ancient World this quarter, students learned about the earliest human settlements that gave rise to complex urban societies in ancient China and ancient India. Students also compoeted their first full-scale research project, which culminated in a ten minute presentation to their classmates.</p> <p>The three main skill sets that were practiced in history this quarter were:</p><ol><li>Historical comprehension, assessed via quizzes.</li><li>Historical analysis, assessed via quizzes and written assignments.</li><li>Research, assessed via written and verbal components of project.</li></ol></div>"
};

export const formatSkillSets = skillSets => {
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

      return SKILL_SETS.map(skillSet => {
          // TODO: This is terrible. Please refactor this.
          return { ...skillSet, rank: skillSets[skillSet.short_name] }
      })
}
