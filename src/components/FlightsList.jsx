import React, { useContext, useEffect } from 'react';
import { FlightsContext } from '../context';
import FlightItem from './FlightItem';

function FlightsList({ flights }) {
    const {
        sortTimeDuration,
        sortPriceUp,
        sortPriceDown,
        filterNoTransfer,
        filterOneTransfer,
        filterPriceFrom,
        filterPriceTo,
        filterSelectCompany,
        setFilteredArray,
        filteredArray,
    } = useContext(FlightsContext);

    useEffect(() => {
        let arrayFiltered = flights.slice();
        if (sortTimeDuration) {
            const arraySorted = arrayFiltered.slice().sort((a, b) => {
                const firstFlight = a.flight.legs.reduce((acc, item) => {
                    return acc + item.duration;
                }, 0);
                const secondFlight = b.flight.legs.reduce((acc, item) => {
                    return acc + item.duration;
                }, 0);
                return firstFlight - secondFlight;
            });
            arrayFiltered = arraySorted;
        }

        if (sortPriceUp) {
            const arraySorted = arrayFiltered
                .slice()
                .sort(
                    (a, b) =>
                        b.flight.price.total.amount -
                        a.flight.price.total.amount
                );
            arrayFiltered = arraySorted;
        }

        if (sortPriceDown) {
            const arraySorted = arrayFiltered
                .slice()
                .sort(
                    (a, b) =>
                        a.flight.price.total.amount -
                        b.flight.price.total.amount
                );
            arrayFiltered = arraySorted;
        }

        if (filterNoTransfer) {
            const arraySorted = arrayFiltered.slice().filter((flight) => {
                const transfer = flight.flight.legs.reduce((acc, item) => {
                    return item.segments.length + acc;
                }, 0);
                return transfer === 2 ? true : false;
            });
            arrayFiltered = arraySorted;
        }
        if (filterOneTransfer) {
            const arraySorted = arrayFiltered.slice().filter((flight) => {
                const transfer = flight.flight.legs.reduce((acc, item) => {
                    return item.segments.length + acc;
                }, 0);
                return transfer > 3 ? true : false;
            });
            arrayFiltered = arraySorted;
        }

        arrayFiltered = arrayFiltered.filter((flight) => {
            const currentPrice = Number(flight.flight.price.total.amount);
            return currentPrice <= filterPriceTo &&
                currentPrice >= filterPriceFrom
                ? true
                : false;
        });

        arrayFiltered = arrayFiltered.map((flightElement) => {
            if (filterSelectCompany.length === 0) {
                flightElement.faded = false;
            } else {
                const currentCarrier = flightElement.flight.carrier.caption;

                flightElement.faded = true;

                filterSelectCompany.forEach((item) => {
                    if (currentCarrier === item) {
                        flightElement.faded = false;
                    }
                    return item;
                });
            }
            return flightElement;
        });

        setFilteredArray(arrayFiltered);
        // eslint-disable-next-line
    }, [
        sortTimeDuration,
        sortPriceUp,
        sortPriceDown,
        filterNoTransfer,
        filterOneTransfer,
        filterPriceFrom,
        filterPriceTo,
        filterSelectCompany,
        flights,
    ]);

    return (
        <div className="flights-list">
            {filteredArray.length > 0 ? (
                filteredArray.map((flight, i) => {
                    return <FlightItem key={i} flight={flight} />;
                })
            ) : (
                <p>Нет результатов</p>
            )}
        </div>
    );
}

export default FlightsList;
