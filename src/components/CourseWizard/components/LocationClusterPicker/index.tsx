import { useQuery } from '@apollo/client';
import React from 'react';

import * as LocationClusters from '../../../../graphql/frontend/queries/LocationClustersQuery';
import Select, { SelectItem } from '../../../Select';

interface Props {
  locationClusterId: string | null;
  onLocationClusterPicked: (clusterId: string | null) => void;
}

const LocationClusterPicker: React.FC<Props> = function (props) {
  const { locationClusterId, onLocationClusterPicked } = props;

  const { data } = useQuery<LocationClusters.Data, LocationClusters.Variables>(
    LocationClusters.Query
  );

  const items = React.useMemo<SelectItem[]>(() => {
    const clusterItems: SelectItem[] = [];

    if (data != null) {
      for (const locationClusterEdge of data.locationClusters.edges) {
        clusterItems.push({
          label: locationClusterEdge.node.name,
          value: locationClusterEdge.node.id,
        });
      }
    }

    return clusterItems;
  }, [data]);

  return (
    <div className="flex">
      <Select
        items={items}
        label="Region"
        value={locationClusterId}
        onChange={onLocationClusterPicked}
      />
    </div>
  );
};

export default LocationClusterPicker;
