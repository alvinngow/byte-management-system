import { CourseWizardContext } from '../machines/CourseWizardMachine';

export default function createDefaultEmptyCourse(): CourseWizardContext['courseData'] {
  return {
    name: '',
    description: '',
    descriptionPrivate: '',
    subtitle: '',
    coverImage: '',
    defaultStartTime: '19:00:00',
    defaultEndTime: '21:30:00',
  };
}
