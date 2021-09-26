import React, { useContext } from 'react';

import { FlightsContext } from '../context';

function CompanyItem({ item }) {
    const { setFilterCompanyBy } = useContext(FlightsContext);
    return (
        <>
            <div className="sidebar-group__item">
                <input
                    className=""
                    type="checkbox"
                    name="company_by"
                    id=""
                    onChange={() => setFilterCompanyBy(item.name)}
                />
                {item.name} от {item.price} руб.
            </div>
        </>
    );
}

export default CompanyItem;
