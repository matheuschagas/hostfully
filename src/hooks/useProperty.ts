import { useEffect, useState } from 'react';
import propertyService from '../services/propertyService';
import { Property } from '../models/property';

export const useProperty = (slug:string | undefined) => {
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

  useEffect(() => {
    loadProperty(slug);
  }, [slug]);

  return { property, error, loading };
};