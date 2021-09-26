export function reducer(state, { type, payload }) {
    switch (type) {
        case 'SORT_TIME':
            return {
                ...state,
                sortPriceDown: false,
                sortPriceUp: false,
                sortTimeDuration: true,
            };
        case 'SORT_PRICE_UP':
            return {
                ...state,
                sortTimeDuration: false,
                sortPriceDown: false,
                sortPriceUp: true,
            };
        case 'SORT_PRICE_DOWN':
            return {
                ...state,
                sortTimeDuration: false,
                sortPriceUp: false,
                sortPriceDown: true,
            };
        case 'FILTER_NO_TRANSFER':
            return {
                ...state,
                filterOneTransfer: false,
                filterNoTransfer: !state.filterNoTransfer,
            };
        case 'FILTER_ONE_TRANSFER':
            return {
                ...state,
                filterOneTransfer: !state.filterOneTransfer,
                filterNoTransfer: false,
            };
        case 'FILTER_PRICE_FROM': {
            return { ...state, filterPriceFrom: payload.event.target.value };
        }
        case 'FILTER_PRICE_TO': {
            return { ...state, filterPriceTo: payload.event.target.value };
        }
        case 'SET_FILTER_LIST_COMPANY': {
            return { ...state, filterListCompany: payload.array };
        }
        case 'SET_FILTER_COMPANY': {
            const currentArray = state.filterSelectCompany.slice();

            if (currentArray.length === 0) {
                return { ...state, filterSelectCompany: [payload.company[0]] };
            }
            if (currentArray.includes(payload.company[0])) {
                let newArray = currentArray.filter(
                    (item) => item !== payload.company[0]
                );
                return { ...state, filterSelectCompany: newArray };
            } else {
                return {
                    ...state,
                    filterSelectCompany: [
                        ...state.filterSelectCompany,
                        payload.company[0],
                    ],
                };
            }
        }
        case 'SET_FILTERED_ARRAY': {
            return { ...state, filteredArray: payload.array };
        }
        default:
            return state;
    }
}
