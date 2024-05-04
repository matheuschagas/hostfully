import {Container} from "@/components/ui/container.tsx";
import {useProperty} from "@/hooks/useProperty.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useParams} from "react-router-dom";
import {DatePickerWithRange} from "@/components/ui/date-picker.tsx";
import {differenceInCalendarDays} from "date-fns"
import {Header} from "@/components/header.tsx";
import {useMemo, useState} from "react";
import {DateRange} from "react-day-picker";


const numberFormater = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

const _Placeholder = ({loading}: { loading: boolean }) => {
  const numberOfSkeletons = loading ? 12 : 0;
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

export const BookingPage = () => {
  const {slug} = useParams();
  const {property, error, loading} = useProperty(slug);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const disabledDays = useMemo(() => {
    return [new Date("2024-05-10")]
  }, []);

  const handleDateChange = (date: DateRange) => {
    if (date.from) {
      setStartDate(date.from);
    }
    if (date.to) {
      setEndDate(date.to);
    }
  }
  const pricing = property && startDate && endDate ? differenceInCalendarDays(endDate, startDate) * property.pricePerNight : 0;
  const cleaningFee = property?.cleaningFee || 0;
  const total = pricing + cleaningFee + 100;

  return (
    <>
      <Header/>
      <Container>
        {!loading && !error && property ? <section className="grid gap-x-4 grid-cols-1 md:grid-cols-2">
          <img alt={property.name} src={property.image} className="w-full rounded-lg"/>
          <div className="max-w-xs">
            <h1 className="text-3xl font-semibold">{property.name}</h1>
            <p className="text-sm text-gray-500">{property.location}</p>
            <p className="text-lg font-semibold">{numberFormater.format(property.pricePerNight)}</p>
            <p className="mt-4">{property.description}</p>
            <DatePickerWithRange disabledDays={disabledDays} handleDateChange={handleDateChange} startDate={startDate}
                                 endDate={endDate} className="mt-4 w-full"/>
            {startDate && endDate ? <div className="flex flex-col">
              <p
                className="flex justify-between mt-4 text-xs text-gray-500">{numberFormater.format(property.pricePerNight)} x {differenceInCalendarDays(endDate, startDate)} nights
                <span>{numberFormater.format(differenceInCalendarDays(endDate, startDate) * property.pricePerNight)}</span>
              </p>
              <p className="flex justify-between mt-1 text-xs text-gray-500">Cleaning
                fee <span>{numberFormater.format(property.cleaningFee)}</span>
              </p>
              <p className="flex justify-between mt-1 text-xs text-gray-500">Hostfully service
                fee <span>{numberFormater.format(100)}</span>
              </p>
              <p className="flex justify-between mt-1 text-xs text-gray-500">Total before
                taxes <span>{numberFormater.format(total)}</span></p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Book Now</button>
            </div> : null}
          </div>
        </section> : null}
        {error && <div className="text-red-500">{error}</div>}
        <_Placeholder loading={loading}/>
      </Container>
    </>
  );
}