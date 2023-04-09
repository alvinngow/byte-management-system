import { useApolloClient, useMutation } from '@apollo/client';
import { useMachine } from '@xstate/react';
import axios from 'axios';
import { DateTime } from 'luxon';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as CourseAdd from '../../graphql/frontend/mutations/CourseAddMutation';
import * as CourseEdit from '../../graphql/frontend/mutations/CourseEditMutation';
import * as FileUpload from '../../graphql/frontend/mutations/FileUploadMutation';
import * as CourseQuery from '../../graphql/frontend/queries/CourseQuery';
import * as LocationClusters from '../../graphql/frontend/queries/LocationClustersQuery';
import ClassInfo from './components/ClassInfo';
import createDefaultEmptyCourse from './helpers/createDefaultEmptyCourse';
import detectRegionFromPostalCode from './helpers/detectRegionFromPostalCode';
import CourseWizardMachine, {
  CourseWizardContext,
  CourseWizardServiceMap,
} from './machines/CourseWizardMachine';

interface Props {
  courseId?: string;
  onSuccess?: (courseId: string) => void;
}

const CourseWizard: React.FC<Props> = function (props) {
  const { courseId, onSuccess } = props;

  const apolloClient = useApolloClient();

  const [fileUpload] = useMutation<FileUpload.Data, FileUpload.Variables>(
    FileUpload.Mutation
  );

  const [courseAdd] = useMutation<CourseAdd.Data, CourseAdd.Variables>(
    CourseAdd.Mutation
  );

  const [courseEdit] = useMutation<CourseEdit.Data, CourseEdit.Variables>(
    CourseEdit.Mutation
  );

  const loadCourse = React.useCallback<
    () => Promise<CourseWizardServiceMap['courseData']['data']>
  >(async () => {
    if (courseId == null) {
      return createDefaultEmptyCourse();
    }

    const result = await apolloClient.query<
      CourseQuery.Data,
      CourseQuery.Variables
    >({
      query: CourseQuery.Query,
      variables: {
        id: courseId,
      },
    });

    return {
      ...result.data.course,

      /**
       * Transform required as browser HTML <input type="time" /> does not
       * accept ISO time string with offset included
       */
      defaultStartTime: DateTime.fromISO(
        result.data.course.defaultStartTime
      ).toISOTime({
        includeOffset: false,
      }),
      defaultEndTime: DateTime.fromISO(
        result.data.course.defaultEndTime
      ).toISOTime({
        includeOffset: false,
      }),
    };
  }, [apolloClient, courseId]);

  const detectLocationCluster = React.useCallback<
    (
      context: CourseWizardContext
    ) => Promise<CourseWizardServiceMap['detectLocationCluster']['data']>
  >(
    async (context) => {
      const postalCodeMatches = context.locationData?.address!.match(/(\d{6})/);

      if (postalCodeMatches == null) {
        return {
          clusterId: null,
        };
      }

      const detectedRegion = detectRegionFromPostalCode(postalCodeMatches[1]);
      if (detectedRegion == null) {
        return {
          clusterId: null,
        };
      }

      const result = await apolloClient.query<
        LocationClusters.Data,
        LocationClusters.Variables
      >({
        query: LocationClusters.Query,
      });

      for (const edge of result.data.locationClusters.edges) {
        if (edge.node.name.toLowerCase() === detectedRegion.toLowerCase()) {
          return {
            clusterId: edge.node.id,
          };
        }
      }

      return {
        clusterId: null,
      };
    },
    [apolloClient]
  );

  const uploadFile = React.useCallback<
    (
      context: CourseWizardContext
    ) => Promise<CourseWizardServiceMap['uploadFile']['data']>
  >(
    async (context) => {
      if (context.file == null) {
        return null;
      }

      const result = await fileUpload({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            contentType: context.file.type,
          },
        },
      });

      if (result.data == null) {
        throw result.errors;
      }

      await axios.put(result.data.fileUpload.signedUrl, context.file);

      return result.data.fileUpload;
    },
    [fileUpload]
  );

  const submit = React.useCallback<
    (
      context: CourseWizardContext
    ) => Promise<CourseWizardServiceMap['submit']['data']>
  >(
    async (context) => {
      if (courseId == null) {
        const result = await courseAdd({
          variables: {
            input: {
              clientMutationId: uuidv4(),
              courseName: context.courseData.name,
              courseDescription: context.courseData.description,
              courseDescriptionPrivate: context.courseData.descriptionPrivate,
              courseSubtitle: context.courseData.subtitle,
              courseDefaultStartTime: DateTime.fromISO(
                context.courseData.defaultStartTime
              ).toISOTime({
                includeOffset: true,
              }),
              courseDefaultEndTime: DateTime.fromISO(
                context.courseData.defaultEndTime
              ).toISOTime({
                includeOffset: true,
              }),
              locationName: context.locationData!.name,
              locationDescription: context.locationData!.description,
              locationAddress: context.locationData!.address,
              locationLat: context.locationData!.lat,
              locationLng: context.locationData!.lng,
              locationUnit: context.locationUnit,
              locationClusterId: context.locationClusterId,
            },
          },
        });

        if (result.data == null) {
          throw result.errors;
        }

        return result.data.courseAdd;
      }

      const result = await courseEdit({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            courseId,
            courseName: context.courseData.name,
            courseDescription: context.courseData.description,
            courseDescriptionPrivate: context.courseData.descriptionPrivate,
            courseSubtitle: context.courseData.subtitle,
            courseDefaultStartTime: DateTime.fromISO(
              context.courseData.defaultStartTime
            ).toISOTime({
              includeOffset: true,
            }),
            courseDefaultEndTime: DateTime.fromISO(
              context.courseData.defaultEndTime
            ).toISOTime({
              includeOffset: true,
            }),
            locationName: context.locationData!.name,
            locationDescription: context.locationData!.description,
            locationAddress: context.locationData!.address,
            locationLat: context.locationData!.lat,
            locationLng: context.locationData!.lng,
            locationUnit: context.locationUnit,
            locationClusterId: context.locationClusterId,
          },
        },
      });

      if (result.data == null) {
        throw result.errors;
      }

      return result.data.courseEdit;
    },
    [courseAdd, courseEdit, courseId]
  );

  const success = React.useCallback<
    (
      context: CourseWizardContext
    ) => Promise<CourseWizardServiceMap['success']['data']>
  >(
    async (context) => {
      onSuccess?.(context.courseId!);
    },
    [onSuccess]
  );

  const [state, send] = useMachine(CourseWizardMachine, {
    context: {
      courseId,
      locationText: '',
      managerUserIds: new Set(),
    },
    services: {
      loadCourse,
      detectLocationCluster,
      uploadFile,
      submit,
      success,
    },
  });

  return (
    <div className=" flex flex-col">
      <ClassInfo state={state} send={send} />
    </div>
  );
};

export default CourseWizard;
