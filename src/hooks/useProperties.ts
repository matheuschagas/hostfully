import { useEffect, useState } from 'react';
import propertyService from '../services/propertyService';
import { Property } from '../models/property';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  const loadProperties = async () => {
    setLoading(true)
    try {
      const data = await propertyService.fetchProperties();
      setProperties(data);
    } catch (error) {
      const {message} = error as Error;
      setError(message);
    }
    setLoading(false)
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return { properties, error, loading };
};