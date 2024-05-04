import { useEffect, useState } from 'react';
import propertyService from '../services/propertyService';
import { Property } from '../models/property';

export const useProperty = (key:string | number | undefined) => {
  const [property, setProperty] = useState<Property>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const loadProperty = async (slug:string | undefined) => {
    setLoading(true)
    try {
      if(!slug) {
        throw new Error('Slug is required');
      }
      const data = await propertyService.fetchProperty(slug);
      setProperty(data);
    } catch (error) {
      const {message} = error as Error;
      setError(message);
    }
    setLoading(false)
  };

  const loadPropertyById = async (id:number) => {
    setLoading(true)
    try {
      const data = await propertyService.fetchPropertyById(id);
      setProperty(data);
    } catch (error) {
      const {message} = error as Error;
      setError(message);
    }
    setLoading(false)
  }

  useEffect(() => {
    if(typeof key === 'number') {
      loadPropertyById(key);
      return;
    }else if(typeof key === 'string') {
      loadProperty(key);
      return;
    }
  }, [key]);

  return { property, error, loading };
};