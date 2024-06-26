import {Container} from "@/components/ui/container.tsx";
import {useProperty} from "@/hooks/useProperty.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {redirect, useParams} from "react-router-dom";
import {DatePickerWithRange} from "@/components/ui/date-picker.tsx";
import {differenceInCalendarDays} from "date-fns"
import {Header} from "@/components/header.tsx";
import {useMemo, useState} from "react";
import {DateRange} from "react-day-picker";
import {useBookings} from "@/hooks/useBookings.ts";


const numberFormater = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

const _Placeholder = ({loading}: { loading: boolean }) => {
  return loading ?
    <div className="w-full grid gap-x-4 grid-cols-1 md:grid-cols-2">
    <Skeleton className="w-full h-96 object-cover rounded-lg"/>
    <div className="max-w-xs">
      <Skeleton className="w-full h-9"/>
      <Skeleton className="w-full h-5 mt-1"/>
      <Skeleton className="w-full h-7 mt-1"/>
      <Skeleton className="w-full h-20 mt-4"/>
      <Skeleton className="w-full h-16 mt-4"/>
      <Skeleton className="w-full h-10 mt-4"/>
      <Skeleton className="w-full h-10 mt-4"/>
    </div>
  </div> : null
}

export const PropertyDetailPage = () => {
  const {slug} = useParams();
  const {property, error, loading} = useProperty(slug);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const {createBooking} = useBookings();

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

  const openDatePicker = () => {
    document.getElementById("booking-page-date-picker")?.click();
  }

  const pricing = property && startDate && endDate ? differenceInCalendarDays(endDate, startDate) * property.pricePerNight : 0;
  const cleaningFee = property?.cleaningFee || 0;
  const total = pricing + cleaningFee + 100;
  const handleBook = async () => {
    if (!property) return;
    if (!startDate && !endDate) return openDatePicker();
    if (!startDate || !endDate) return;
    await createBooking({
      propertyId: property.id,
      startDate: startDate,
      endDate: endDate,
      amountPaid: total
    });
    redirect('/bookings');
  }

  return (
    <>
      <Header/>
      <Container>
        <_Placeholder loading={loading}/>
        {!loading && !error && property ? <section className="grid gap-x-4 grid-cols-1 md:grid-cols-2">
          <img alt={property.name} src={property.image} className="w-full h-96 object-cover rounded-lg"/>
          <div className="max-w-xs">
            <h1 className="text-3xl font-semibold">{property.name}</h1>
            <p className="text-sm text-gray-500">{property.location}</p>
            <p className="text-lg font-semibold">{numberFormater.format(property.pricePerNight)} per night</p>
            <p className="mt-4 h-20">{property.description}</p>
            <div className={`${startDate && endDate ? 'flex' : 'invisible'} flex-col`}>
              <p
                className="flex justify-between mt-4 text-xs text-gray-500">{numberFormater.format(property.pricePerNight)} x {startDate && endDate && differenceInCalendarDays(endDate, startDate)} nights
                <span>{numberFormater.format(pricing)}</span>
              </p>
              <p className="flex justify-between mt-1 text-xs text-gray-500">Cleaning
                fee <span>{numberFormater.format(property.cleaningFee)}</span>
              </p>
              <p className="flex justify-between mt-1 text-xs text-gray-500">Hostfully service
                fee <span>{numberFormater.format(100)}</span>
              </p>
              <p className="flex justify-between mt-1 text-xs text-gray-500">Total before
                taxes <span>{numberFormater.format(total)}</span></p>
            </div>
            <DatePickerWithRange id={"booking-page-date-picker"} disabledDays={disabledDays}
                                 handleDateChange={handleDateChange} startDate={startDate}
                                 endDate={endDate} className="mt-4 w-full"/>
            <button onClick={handleBook}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">{startDate && endDate ? 'Book Now' : 'Check availability'}</button>
          </div>
        </section> : null}
        {error && <div className="text-red-500">{error}</div>}
      </Container>
    </>
  );
}