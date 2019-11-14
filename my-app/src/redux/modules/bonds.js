import {generateBondDataPoints, generateBondsList} from "../../helpers/bondDataGenerator";

const CHANGE_CURRENT_BOND = 'CHANGE_CURRENT_BOND';
const CHANGE_DATE_OPTION = 'CHANGE_DATE_OPTION';
const CHANGE_TYPE_OPTION = 'CHANGE_TYPE_OPTION';

let initialState = {
    bondsList: generateBondsList(),
    currentBond: null,
    bondsDataPoints: {},
    dateOption: 0,
    typeOption: 'Price',
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case CHANGE_CURRENT_BOND:
            let bondIsin = {...state.currentBond},
                pointers = {...state.bondsDataPoints};

            if (action.isin !== bondIsin) {
                bondIsin = action.isin;
                if (!pointers[bondIsin]) {
                    pointers[bondIsin] = generateBondDataPoints(state.bondsList[bondIsin].founded)
                }
            }

            return {
                ...state,
                currentBond: bondIsin,
                bondsDataPoints: pointers,
            };

        case CHANGE_TYPE_OPTION:

            return {
                ...state,
                typeOption: action.typeBond,
            };

        case CHANGE_DATE_OPTION:

            return {
                ...state,
                dateOption: action.typeDate,
            };

        default:
            return state;
    }
}

export function changeBond(isin) {
    return {
        type: CHANGE_CURRENT_BOND,
        isin,
    };
}
export function changeDateOption(typeDate) {
    return {
        type: CHANGE_DATE_OPTION,
        typeDate,
    };
}
export function changeTypeOption(typeBond) {
    return {
        type: CHANGE_TYPE_OPTION,
        typeBond,
    };
}