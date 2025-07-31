// AI Summary Generator
export const generateAISummary = (title: string, description?: string): string => {
  const summaries = [
    "AI Analysis: High-priority task requiring immediate attention with complex technical requirements.",
    "AI Insight: Standard development work with moderate complexity and clear deliverables.",
    "AI Assessment: Creative project focusing on user experience and visual design elements.",
    "AI Evaluation: Database optimization task requiring performance analysis and query improvements.",
    "AI Review: Documentation and API integration work with comprehensive testing requirements.",
    "AI Summary: Client communication and project coordination with stakeholder management focus.",
    "AI Analysis: Bug fixing and maintenance work requiring systematic debugging approach.",
    "AI Insight: Research and planning phase with strategic decision-making components.",
    "AI Assessment: Quality assurance and testing procedures with automated validation.",
    "AI Evaluation: Deployment and infrastructure setup with monitoring and security considerations."
  ];

  // Generate a consistent summary based on task title hash
  const hash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const index = Math.abs(hash) % summaries.length;
  return summaries[index];
};