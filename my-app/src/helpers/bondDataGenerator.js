import moment from "moment";

const getIntegerRandom = (min, max, inclusive = true) => Math.floor(Math.random() * (max - min + (inclusive ? 1 : 0))) + min;

export const generateBondsList = () => {
    const bondsList = {};
    for (let i = 0; i < getIntegerRandom(15, 30); ++i) {
        let isin = 'ABC' + getIntegerRandom(Math.pow(10, 8), Math.pow(10, 9), false);
        bondsList[isin] = {
            isin: isin,
            corpName: `СLOUDBONDS ${i + 1} CORP,Telecommunications,RF`,
            corpTitle: `СLOUDBONDS ${i + 1}`,
            founded: moment().subtract(getIntegerRandom(360, 900), "d").format('MM.DD.YYYY'),
            currency: "USD",
            totalRatio: `${getIntegerRandom(5, 35)}.${getIntegerRandom(Math.pow(10, 4), Math.pow(10, 5), false)}`

        }
    }
    return bondsList;
};
const createBondDataDay = (price, yieldBond, spread, date) => ({
    'price': price,
    'yield': yieldBond,
    'spread': spread,
    'date': date
});

export const generateBondDataPoints = (founded) => {
    const bondData = [[createBondDataDay(getIntegerRandom(6500, 10500) / 100, getIntegerRandom(0, 2000) / 100, getIntegerRandom(-200, 200) / 100, founded)]];

    let count = 0;
    let currentPrice = bondData[0][0]['price'];
    let currentYield = bondData[0][0]['yield'];
    let totalDays = moment().diff(founded, 'days');

    for (let i = totalDays - 1; i >= 0; i--) {
        if ([364, 92, 30, 6].some((j) => j === i)) {
            count += 1;
            bondData.push([])
        }
        let newSpread = getIntegerRandom(-200, 200) / 100;
        let newPrice = +(currentPrice + newSpread).toFixed(2);
        let newYield = +(currentYield + (getIntegerRandom(4, 8) / 10) * newSpread).toFixed(2);
        currentPrice = newPrice;
        currentYield = newYield;
        bondData[count].push(createBondDataDay(newPrice, newYield, newSpread, moment().subtract(i, "d").format('MM.DD.YYYY')))

    }
    return bondData;
};