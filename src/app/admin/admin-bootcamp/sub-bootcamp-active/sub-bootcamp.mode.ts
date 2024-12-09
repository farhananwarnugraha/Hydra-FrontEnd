export interface Trainer{
  trainerId: number;
  trainerName: string;
}

export interface Skill{
  skillId: string;
  skillName: string;
}

export interface CourseForm{
  trainerId: number;
  skillId: string;
  bootcampClass: number;
  startDate: string;
  endDate: string;
}

export interface EndBootcampClass{
  bootcampId: number,
  skillId: string,
  trainerId: number,
  startDate: string,
  endDate: string
}

export interface CandidateCourseBootcamp{
  courseId: string,
  candidateId: number,
  fullName: string
}

export interface CandidateEvaluationForm{
  courseId: string,
  candidateId: number,
  note?: string
}
