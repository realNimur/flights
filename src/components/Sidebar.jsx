import React, { useContext, useEffect } from 'react';
import { FlightsContext } from '../context';
import CompanyItem from './CompanyItem';

function Sidebar() {
    const {
        sortTime,
        sortTimeDuration,
        sortPriceUp,
        sortPriceUpFunction,
        sortPriceDown,
        sortPriceDownFunction,
        filterNoTransfer,
        filterListNoTransfer,
        filterOneTransfer,
        filterListOneTransfer,
        filterPriceTo,
        filterPriceToFunction,
        filterPriceFrom,
        filterPriceFromFunction,
        filterListCompany,
        setFilterListCompany,
        filteredArray,
    } = useContext(FlightsContext);
    useEffect(() => {
        let massiveCoincidences = [];
        for (let i = 0; i < filteredArray.length; i++) {
            if (
                !massiveCoincidences.includes(
                    filteredArray[i].flight.carrier.caption
                )
            ) {
                massiveCoincidences.push(
                    filteredArray[i].flight.carrier.caption
                );
            }
        }

        massiveCoincidences
            .map((companyFlight, ind) => {
                const allFlighsCompany = filteredArray.filter((flight) => {
                    if (flight.flight.carrier.caption === companyFlight) {
                        return true;
                    }
                    return false;
                });

                let price = 1000000;

                allFlighsCompany.map((item) => {
                    if (item.flight.price.total.amount < price)
                        return (price = Number(item.flight.price.total.amount));
                    return item;
                });
                massiveCoincidences[ind] = {
                    name: [companyFlight],
                    price: Number(price),
                };
                return companyFlight;
            })
            .sort((a, b) => a.price - b.price);
        setFilterListCompany(massiveCoincidences);
        // eslint-disable-next-line
    }, [filteredArray]);
    return (
        <div className="sidebar">
            <div className="sidebar__group sidebar-group">
                <p className="sidebar-group__caption">??????????????????????</p>
                <div className="sidebar-group__item">
                    <input
                        className="sidebar-group__item"
                        type="radio"
                        name="sort_by"
                        checked={sortPriceDown}
                        onChange={() => {
                            sortPriceDownFunction();
                        }}
                    />{' '}
                    ???? ?????????????????????? ????????
                </div>
                <div className="sidebar-group__item">
                    <input
                        className="sidebar-group__item"
                        type="radio"
                        name="sort_by"
                        checked={sortPriceUp}
                        onChange={() => {
                            sortPriceUpFunction();
                        }}
                    />{' '}
                    ???? ???????????????? ????????
                </div>
                <div className="sidebar-group__item">
                    <input
                        className="sidebar-group__item"
                        type="radio"
                        name="sort_by"
                        checked={sortTimeDuration}
                        onChange={() => {
                            sortTime();
                        }}
                    />{' '}
                    ???? ?????????????? ?? ????????
                </div>
            </div>
            <div className="sidebar__group sidebar-group">
                <p className="sidebar-group__caption">??????????????????????</p>
                <div>
                    <input
                        className="sidebar-group__item"
                        type="checkbox"
                        name=""
                        id=""
                        checked={filterOneTransfer}
                        onChange={() => {
                            filterListOneTransfer();
                        }}
                    />{' '}
                    - 1 ??????????????????
                </div>
                <div>
                    <input
                        className="sidebar-group__item"
                        type="checkbox"
                        name=""
                        id=""
                        checked={filterNoTransfer}
                        onChange={() => {
                            filterListNoTransfer();
                        }}
                    />{' '}
                    - ?????? ??????????????????
                </div>
            </div>
            <div className="sidebar__group sidebar-group">
                <p className="sidebar-group__caption">????????</p>
                <div>
                    ????
                    <input
                        className="sidebar-group__item"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => filterPriceFromFunction(e)}
                        value={filterPriceFrom}
                    />
                </div>
                <div>
                    {' '}
                    ????
                    <input
                        className="sidebar-group__item"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => filterPriceToFunction(e)}
                        value={filterPriceTo}
                    />
                </div>
            </div>
            <div className="sidebar__group sidebar-group">
                <p className="sidebar-group__caption">????????????????????????</p>
                {filterListCompany.length > 0 ? (
                    filterListCompany.map((item, i) => (
                        <CompanyItem key={i} item={item} />
                    ))
                ) : (
                    <p>?????? ??????????????????????</p>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
