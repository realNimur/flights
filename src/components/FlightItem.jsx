import React, { useEffect, useContext } from 'react';

import { FlightsContext } from '../context';

const FlightItem = ({ flight }) => {
    const { price, legs, carrier } = flight.flight;
    const thereFlight = {
        departureCity: legs[0].segments[0].departureCity.caption,
        departureAirport: legs[0].segments[0].departureAirport.caption,
        departureAirportUid: legs[0].segments[0].departureAirport.uid,
        departureTime: legs[0].segments[0].departureDate.slice(11, 16),
        departureDate: legs[0].segments[0].departureDate.slice(0, 10),
        arrivalCity: legs[0].segments[legs[0].segments.length - 1].arrivalCity
            ? legs[0].segments[legs[0].segments.length - 1].arrivalCity.caption
            : 'Пустота',
        arrivalAirport:
            legs[0].segments[legs[0].segments.length - 1].arrivalAirport
                .caption,
        arrivalAirportUid:
            legs[0].segments[legs[0].segments.length - 1].arrivalAirport.uid,
        arrivalTime: legs[0].segments[
            legs[0].segments.length - 1
        ].arrivalDate.slice(11, 16),
        arrivalDate: legs[0].segments[
            legs[0].segments.length - 1
        ].arrivalDate.slice(0, 10),
        travelTime:
            Math.trunc(Number(legs[0].duration) / 60) +
            ' ч ' +
            (Number(legs[0].duration) % 60) +
            ' мин',
        transfer:
            legs[0].segments.length > 1 ? legs[0].segments.length - 1 : null,
    };

    const backFlight = {
        departureCity: legs[1].segments[0].departureCity
            ? legs[1].segments[0].departureCity.caption
            : 'Пустота',
        departureAirport: legs[1].segments[0].departureAirport.caption,
        departureAirportUid: legs[1].segments[0].departureAirport.uid,
        departureTime: legs[1].segments[0].departureDate.slice(11, 16),
        departureDate: legs[1].segments[0].departureDate.slice(0, 10),
        arrivalCity: legs[1].segments[legs[1].segments.length - 1].arrivalCity
            ? legs[1].segments[legs[1].segments.length - 1].arrivalCity.caption
            : 'Пустота',
        arrivalAirport:
            legs[1].segments[legs[1].segments.length - 1].arrivalAirport
                .caption,
        arrivalAirportUid:
            legs[1].segments[legs[1].segments.length - 1].arrivalAirport.uid,
        arrivalTime: legs[1].segments[
            legs[1].segments.length - 1
        ].arrivalDate.slice(11, 16),
        arrivalDate: legs[1].segments[
            legs[1].segments.length - 1
        ].arrivalDate.slice(0, 10),
        travelTime:
            Math.trunc(Number(legs[1].duration) / 60) +
            ' ч ' +
            (Number(legs[1].duration) % 60) +
            ' мин',
        transfer:
            legs[1].segments.length > 1 ? legs[1].segments.length - 1 : null,
    };
    const { filteredArray } = useContext(FlightsContext);
    let classHidden = flight.faded ? 'hidden-none' : '';
    useEffect(() => {}, [filteredArray]);
    return (
        <div className={`flight-item ${classHidden}`}>
            <header className="flight-item__header">
                <div className="flight-item__logo">
                    <img
                        src={'/flights/logo.png'}
                        alt="Logo"
                        className="flight-item__picture"
                    />
                </div>
                <div className="flight-item__info_header">
                    <p className="flight-item__price">
                        {price.total.amount} {price.total.currency}
                    </p>
                    <p className="flight-item__text">
                        Стоимость для одного взрослого пассажира
                    </p>
                </div>
            </header>
            <div className="flight-item__departure">
                <div className="flight-item__body">
                    <div className="flight-item__way">
                        <p className="flight-item__from">
                            {thereFlight.departureCity},{' '}
                            {thereFlight.departureAirport} (
                            {thereFlight.departureAirportUid})
                        </p>
                        <p className="flight-item__to">
                            {thereFlight.arrivalCity},{' '}
                            {thereFlight.arrivalAirport} (
                            {thereFlight.arrivalAirportUid})
                        </p>
                    </div>

                    <div className="flight-item__info">
                        <div className="flight-item__timedate flight-item__timedate_departure">
                            <p className="flight-item__time">
                                {thereFlight.departureTime}
                            </p>
                            <p className="flight-item__date">
                                {thereFlight.departureDate}
                            </p>
                        </div>
                        <p className="flight-item__duration">
                            {thereFlight.travelTime}
                        </p>
                        <div className="flight-item__timedate flight-item__timedate_arrival">
                            <p className="flight-item__time">
                                {thereFlight.arrivalTime}
                            </p>
                            <p className="flight-item__date">
                                {thereFlight.arrivalDate}
                            </p>
                        </div>
                    </div>
                    {thereFlight.transfer && (
                        <div className="flight-item__transfer">
                            <p className="flight-item__transfer-number">
                                {thereFlight.transfer} пересадка
                            </p>
                        </div>
                    )}
                </div>
                <footer className="flight-item__footer">
                    <p className="flight-item__carrier">
                        Рейс выполняет: {carrier.caption}
                    </p>
                </footer>
            </div>
            <div className="flight-item__arrival">
                <div className="flight-item__body">
                    <div className="flight-item__way">
                        <p className="flight-item__from">
                            {backFlight.departureCity},{' '}
                            {backFlight.departureAirport} (
                            {backFlight.departureAirportUid})
                        </p>
                        <p className="flight-item__to">
                            {backFlight.arrivalCity},{' '}
                            {backFlight.arrivalAirport} (
                            {backFlight.arrivalAirportUid})
                        </p>
                    </div>

                    <div className="flight-item__info">
                        <div className="flight-item__timedate flight-item__timedate_departure">
                            <p className="flight-item__time">
                                {backFlight.departureTime}
                            </p>
                            <p className="flight-item__date">
                                {backFlight.departureDate}
                            </p>
                        </div>
                        <p className="flight-item__duration">
                            {backFlight.travelTime}
                        </p>
                        <div className="flight-item__timedate flight-item__timedate_arrival">
                            <p className="flight-item__time">
                                {backFlight.arrivalTime}
                            </p>
                            <p className="flight-item__date">
                                {backFlight.arrivalDate}
                            </p>
                        </div>
                    </div>
                    {backFlight.transfer && (
                        <div className="flight-item__transfer">
                            <p className="flight-item__transfer-number">
                                {backFlight.transfer} пересадка
                            </p>
                        </div>
                    )}
                </div>
                <footer className="flight-item__footer">
                    <p className="flight-item__carrier">
                        Рейс выполняет: {carrier.caption}
                    </p>
                </footer>
            </div>
            <button className="flight-item__btn">Выбрать</button>
        </div>
    );
};

export default FlightItem;
