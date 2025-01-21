function filterName(name, productsToReturn) {
    if (name) {
        productsToReturn = productsToReturn.filter((p) => p.name.startsWith(name));
    }
    return productsToReturn;
}

function filterDescription(description, productsToReturn) {
    if (description) {
        productsToReturn = productsToReturn.filter((p) => p.desc.includes(description));
    }
    return productsToReturn;
}

function filterPrice(price, productsToReturn) {
    if (price.hasOwnProperty("gt")) {
        productsToReturn = productsToReturn.filter((p) => p.price > parseFloat(price.gt));
    } else if (price.hasOwnProperty("lt")) {
        productsToReturn = productsToReturn.filter((p) => p.price < parseFloat(price.lt));
    } else if (price.hasOwnProperty("eq")) {
        productsToReturn = productsToReturn.filter((p) => p.price === parseFloat(price.eq));
    }
    return productsToReturn;
}

export {filterName, filterDescription, filterPrice};