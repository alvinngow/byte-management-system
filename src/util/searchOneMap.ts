import axios from 'axios';

export interface OneMapSearchResult {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
  LONGTITUDE: string;
}

export interface OneMapResponse {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: OneMapSearchResult[];
}

export default async function searchOneMap(
  term: string
): Promise<OneMapResponse> {
  const request = await axios.get<OneMapResponse>(
    'https://developers.onemap.sg/commonapi/search',
    {
      params: {
        searchVal: term,
        returnGeom: 'Y',
        getAddrDetails: 'Y',
        pageNum: 1,
      },
    }
  );

  return request.data;
}
