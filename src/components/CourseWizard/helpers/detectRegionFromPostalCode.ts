export default function detectRegionFromPostalCode(postalString: string) {
  const west = [11, 12, 13, 60, 61, 62, 63, 64, 65, 66, 67, 68];
  const north = [69, 70, 71, 72, 73, 75, 76];
  const northEast = [53, 54, 55, 82, 56, 57, 77, 78];
  const east = [42, 43, 44, 45, 46, 47, 48, 49, 50, 81, 51, 52];

  const first_two = Number(postalString.slice(0, 2));

  if (west.includes(first_two)) {
    return 'West';
  } else if (north.includes(first_two)) {
    return 'North';
  } else if (northEast.includes(first_two)) {
    return 'North East';
  } else if (east.includes(first_two)) {
    return 'East';
  } else {
    return 'Central';
  }
}
