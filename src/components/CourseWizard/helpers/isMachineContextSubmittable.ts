import { CourseWizardContext } from '../machines/CourseWizardMachine';

/**
 * This function validates the state machine context to check
 * if it in a submittable state
 */
export default function isMachineContextSubmittable(
  context: CourseWizardContext
) {
  const { courseData, locationData } = context;

  if (courseData.name.length === 0) {
    return false;
  } else if (courseData.description.length === 0) {
    return false;
  } else if (locationData == null) {
    return false;
  }

  return true;
}
