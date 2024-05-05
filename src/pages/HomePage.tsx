import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useProperties} from "@/hooks/useProperties.ts";
import {useCallback} from "react";
import {Property} from "@/models/property.ts";
import {Container} from "@/components/ui/container.tsx";
import {useNavigate} from "react-router-dom";
import {Header} from "@/components/header.tsx";

const numberFormater = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const _Placeholders = ({loading}: { loading: boolean }) => {
  const numberOfSkeletons = loading ? 5 : 0;
  return Array.from({length: numberOfSkeletons}).map((_, index) => (
    <div key={index} className="flex gap-1 flex-col bg-white p-4 shadow rounded-lg">
      <Skeleton className="w-full h-32"/>
      <Skeleton className="w-full h-7"/>
      <Skeleton className="w-full h-12"/>
      <Skeleton className="w-full h-6"/>
      <Skeleton className="w-full h-10"/>
    </div>
  ));
}

function HomePage() {
  const {properties, error, loading} = useProperties();
  const navigate = useNavigate();
  const handlePropertyClick = useCallback((property: Property) => {
    navigate(`/property/${property.slug}`);
  }, []);
  return (
    <>
      <Header/>
      <Container>
        <h1 className="text-5xl">Properties</h1>
        <div className="mt-10 w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" data-testid="properties-list">
          {!loading && !error ? properties.map((property) => (
            <div data-testid="property" onClick={()=>handlePropertyClick(property)} key={property.id} className="flex cursor-pointer gap-1 flex-col bg-white p-4 shadow rounded-lg">
              <img src={property.image} alt={property.name} className="w-full h-32 object-cover rounded-lg" data-testid="image"/>
              <h2 className="text-lg font-semibold" data-testid="name">{property.name}</h2>
              <p className="text-xs" data-testid="description">{property.description}</p>
              <p data-testid="price">{numberFormater.format(property.pricePerNight)} per night</p>
            </div>
          )): null}
          {error && <div className="text-red-500">{error}</div>}
          <_Placeholders loading={loading}/>
        </div>
      </Container>
  </>
  )
}

export default HomePage
