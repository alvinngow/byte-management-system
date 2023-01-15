import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

async function readFile<T>(fileName: string) {
  const filePath = path.join(__dirname, fileName);
  const fileData = fs.readFileSync(filePath);

  const data = parse(fileData, {
    columns: true,
    cast: false,
  });

  return data as T;
}

interface BIMSSeedUser {
  id: string;
  email: string;
  pwHash: string;
  firstName: string;
  lastName: string;
  schoolId?: string;
  school?: string;
  mobileNo: string;
  avatar: string;
  role: string;
}

export async function readUsers() {
  return readFile<BIMSSeedUser[]>('user.csv');
}

interface BIMSSeedSchool {
  id: string;
  name: string;
}

export async function readSchools() {
  return readFile<BIMSSeedSchool[]>('school.csv');
}

interface BIMSSeedLocationCluster {
  id: string;
  name: string;
}

export async function readLocationClusters() {
  return readFile<BIMSSeedLocationCluster[]>('locationCluster.csv');
}

interface BIMSSeedLocation {
  id: string;
  name: string;
  address: string;
  description: string;
}

export async function readLocations() {
  return readFile<BIMSSeedLocation[]>('location.csv');
}
