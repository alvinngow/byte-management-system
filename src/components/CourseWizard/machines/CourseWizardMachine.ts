import {
  Course,
  CourseAddPayload,
  CourseEditPayload,
  CourseManagerEdge,
  FileUploadPayload,
  Location,
  User,
} from '@bims/graphql/schema';
import { assign, createMachine, ServiceMap } from 'xstate';

import isMachineContextSubmittable from '../helpers/isMachineContextSubmittable';

export type CourseData = Pick<
  Course,
  'name' | 'description' | 'descriptionPrivate' | 'subtitle' | 'coverImage'
> & {
  defaultStartTime: string;
  defaultEndTime: string;
};

export type LocationData = Pick<
  Location,
  'name' | 'address' | 'description' | 'lat' | 'lng'
>;

export interface CourseWizardContext {
  courseId?: string;
  courseData: CourseData;
  error?: Error;
  managerUserIds: Set<string>;
  /**
   * Raw search text that the user types into the address box
   *
   * This is only used for search purposes, it is not submitted.
   */
  locationText: string;
  locationUnit: string;
  locationData: LocationData | null;
  locationClusterId: string | null;
  regionName: string;
  file: File | null;
}

export type CourseWizardEvent =
  | {
      type: 'SWITCH_TO_COURSE_DETAILS';
    }
  | {
      type: 'RETRY';
    }
  | {
      type: 'SET_COURSE_NAME';
      value: string;
    }
  | {
      type: 'SET_COURSE_SUBTITLE';
      value: string;
    }
  | {
      type: 'SET_COURSE_DESCRIPTION';
      value: string;
    }
  | {
      type: 'SET_COURSE_DESCRIPTION_PRIVATE';
      value: string;
    }
  | {
      type: 'SET_COURSE_LOCATION';
      locationData: LocationData | null;
    }
  | {
      type: 'SET_LOCATION_TEXT';
      value: string;
    }
  | {
      type: 'SET_LOCATION_UNIT';
      unit: string;
    }
  | {
      type: 'SET_LOCATION_CLUSTER_ID';
      locationClusterId: string | null;
    }
  | {
      type: 'COURSE_SET_DEFAULT_START_TIME' | 'COURSE_SET_DEFAULT_END_TIME';
      time: string;
    }
  | {
      type: 'ADD_COURSE_MANAGER';
      userId: string;
    }
  | {
      type: 'REMOVE_COURSE_MANAGER';
      userId: string;
    }
  | {
      type: 'COVER_SET_FILE';
      file: File | null;
    }
  | {
      type: 'SUBMIT';
    };

export type CourseWizardTypeState =
  | {
      value: 'loading';
      context: CourseWizardContext;
    }
  | {
      value: 'idle' | { idle: 'editing' | 'submittable' | 'autoDetectCluster' };
      context: CourseWizardContext & {
        courseData: CourseData;
      };
    }
  | {
      value: 'error';
      context: CourseWizardContext & {
        error: Error;
      };
    }
  | {
      value: 'submitting';
      context: CourseWizardContext;
    }
  | {
      value: 'submitted';
      context: CourseWizardContext;
    };

export interface CourseWizardServiceMap extends ServiceMap {
  loadCourse: {
    data: CourseData;
  };
  detectLocationCluster: {
    data: {
      clusterId: string | null;
    };
  };
  searchUsers: {
    data: User[];
  };
  uploadFile: {
    data: FileUploadPayload | null;
  };
  submit: {
    data: CourseAddPayload | CourseEditPayload;
  };
  success: {
    data: void;
  };
}

const CourseWizardMachine = createMachine<
  CourseWizardContext,
  CourseWizardEvent,
  CourseWizardTypeState,
  CourseWizardServiceMap
>({
  id: 'CourseWizardMachine',
  initial: 'loading',
  predictableActionArguments: true,
  states: {
    loading: {
      invoke: {
        src: 'loadCourse',
        onDone: {
          target: 'idle',
          actions: assign({
            courseData: (context, event) => event.data,
            locationClusterId: (context, event) =>
              event.data.defaultLocation?.cluster?.id ?? null,
            locationText: (context, event) => {
              return event.data.defaultLocation?.address ?? '';
            },
            locationData: (context, event) =>
              event.data.defaultLocation ?? null,
            locationUnit: (context, event) =>
              event.data.defaultLocation?.unit ?? '',
            managerUserIds: (context, event) => {
              const edges: CourseManagerEdge[] =
                event.data.courseManagers?.edges ?? [];

              return new Set(edges.map((edge) => edge.node.user.id));
            },
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: (context, event) => event.data,
          }),
        },
      },
    },
    idle: {
      initial: 'editing',
      states: {
        editing: {
          always: {
            target: 'submittable',
            cond: (context) => isMachineContextSubmittable(context),
          },
        },
        submittable: {
          always: {
            target: 'editing',
            cond: (context) => !isMachineContextSubmittable(context),
          },
          on: {
            SUBMIT: {
              target: '#CourseWizardMachine.submitting',
              cond: (context) => isMachineContextSubmittable(context),
            },
          },
        },
        autoDetectCluster: {
          invoke: {
            src: 'detectLocationCluster',
            onDone: {
              target: 'submittable',
              actions: assign({
                locationClusterId: (context, event) =>
                  event.data?.clusterId ?? null,
              }),
            },
            onError: {
              // Ignore errors with auto detection
              target: 'submittable',
            },
          },
        },
      },
      on: {
        SET_COURSE_NAME: {
          actions: assign({
            courseData: (context, event) => {
              return {
                ...context.courseData,
                name: event.value,
              };
            },
          }),
        },
        SET_COURSE_SUBTITLE: {
          actions: assign({
            courseData: (context, event) => {
              return {
                ...context.courseData,
                subtitle: event.value || null, // Fallback empty string to become null
              };
            },
          }),
        },
        SET_COURSE_DESCRIPTION: {
          actions: assign({
            courseData: (context, event) => {
              return {
                ...context.courseData,
                description: event.value,
              };
            },
          }),
        },
        SET_COURSE_DESCRIPTION_PRIVATE: {
          actions: assign({
            courseData: (context, event) => {
              return {
                ...context.courseData,
                descriptionPrivate: event.value,
              };
            },
          }),
        },
        COURSE_SET_DEFAULT_START_TIME: {
          actions: assign({
            courseData: (context, event) => {
              return {
                ...context.courseData,
                defaultStartTime: event.time,
              };
            },
          }),
        },
        COURSE_SET_DEFAULT_END_TIME: {
          actions: assign({
            courseData: (context, event) => {
              return {
                ...context.courseData,
                defaultEndTime: event.time,
              };
            },
          }),
        },
        SET_LOCATION_TEXT: {
          actions: assign({
            locationText: (context, event) => event.value,
          }),
        },
        SET_LOCATION_UNIT: {
          actions: assign({
            locationUnit: (context, event) => event.unit,
          }),
        },
        SET_LOCATION_CLUSTER_ID: {
          actions: assign({
            locationClusterId: (context, event) => event.locationClusterId,
          }),
        },
        SET_COURSE_LOCATION: {
          target: '.autoDetectCluster',
          actions: assign({
            locationData: (context, event) => event.locationData,
            locationText: (context, event) => event.locationData?.address ?? '',
          }),
        },
        ADD_COURSE_MANAGER: {
          actions: assign({
            managerUserIds: (context, event) => {
              const updatedSet = new Set(context.managerUserIds);
              updatedSet.add(event.userId);

              return updatedSet;
            },
          }),
        },
        REMOVE_COURSE_MANAGER: {
          actions: assign({
            managerUserIds: (context, event) => {
              const updatedSet = new Set(context.managerUserIds);
              updatedSet.delete(event.userId);

              return updatedSet;
            },
          }),
        },
        COVER_SET_FILE: {
          actions: assign({
            file: (context, event) => event.file,
          }),
        },
      },
    },
    submitting: {
      initial: 'uploading_cover',
      states: {
        uploading_cover: {
          invoke: {
            src: 'uploadFile',
            onDone: {
              target: 'course',
              actions: assign({
                courseData: (context, event) => {
                  return {
                    ...context.courseData,
                    coverImage: event.data?.fileName ?? null,
                  };
                },
              }),
            },
            onError: {
              target: '#CourseWizardMachine.error',
              actions: assign({
                error: (context, event) => event.data,
              }),
            },
          },
        },
        course: {
          invoke: {
            src: 'submit',
            onDone: {
              target: '#CourseWizardMachine.submitted',
              actions: assign({
                courseId: (context, event) => event.data.course.id,
              }),
            },
            onError: {
              target: '#CourseWizardMachine.error',
              actions: assign({
                error: (context, event) => event.data,
              }),
            },
          },
        },
      },
    },
    submitted: {
      type: 'final',
      invoke: {
        src: 'success',
      },
    },
    error: {
      on: {
        RETRY: {
          target: 'loading',
        },
      },
    },
  },
});

export default CourseWizardMachine;
