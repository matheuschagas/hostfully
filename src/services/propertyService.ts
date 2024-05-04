import { Property } from '../models/property';
import initialData from "../../mocks/property";

const properties: Property[] = initialData as Property[];

const fakeDelay = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
}

const fetchProperties = async (): Promise<Property[]> => {
  //fake delay
  await fakeDelay();
  return properties;
};

const fetchProperty = async (slug:string): Promise<Property> => {
  //fake delay
  await fakeDelay();
  const property = properties.find(p => p.slug === slug);
  if (!property) {
    throw new Error('Property not found');
  }
  return property;
};

const fetchPropertyById = async (id:number): Promise<Property> => {
  //fake delay
  await fakeDelay();
  const property = properties.find(p => p.id === id);
  if (!property) {
    throw new Error('Property not found');
  }
  return property;
};

const addProperty = async (property: Property): Promise<Property> => {
  //fake delay
  await fakeDelay();
  properties.push(property);
  return property;
};

const updateProperty = async (propertyId: number, property: Property): Promise<Property> => {
  //fake delay
  await fakeDelay();
  const index = properties.findIndex(p => p.id === propertyId);
  properties[index] = property;
  return property;
};

const deleteProperty = async (propertyId: number): Promise<void> => {
  //fake delay
  await fakeDelay();
  const index = properties.findIndex(p => p.id === propertyId);
  properties.splice(index, 1);
};

export default {
  fetchProperties,
  fetchProperty,
  fetchPropertyById,
  addProperty,
  updateProperty,
  deleteProperty
}