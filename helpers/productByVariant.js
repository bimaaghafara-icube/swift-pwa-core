/**
 * function to get combination available
 * @param selected object example {code: "color", value: "Black"}
 * @param array varians product
 * @returns object product
 */

export const CheckAvailableStock = (attribute = '', variants = []) => {
    let available = true;
    for (let index = 0; index < variants.length; index += 1) {
        if (variants[index].attributes[0].value_index === attribute.value_index) {
            if (variants[index].product.stock_status === 'OUT_OF_STOCK') {
                available = false;
            }
        }
    }
    return available;
};

// export const getCombinationVariants = (selected = {}, variants = []) => {
//     const combination = {
//         code: selected.code,
//         value: selected.value,
//         available_combination: [],
//     };
//     if (selected.code) {
//         // eslint-disable-next-line no-plusplus
//         for (let index = 0; index < variants.length; index++) {
//             if (variants[index].product.stock_status === 'IN_STOCK') {
//                 const { attributes } = variants[index];
//                 let isSameFirstCode = false;
//                 // eslint-disable-next-line no-plusplus
//                 for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
//                     if (selected.code === attributes[idxAtt].code) {
//                         isSameFirstCode = attributes[idxAtt].value_index === selected.value;
//                     }
//                 }
//                 // eslint-disable-next-line no-plusplus
//                 for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
//                     if (selected.code !== attributes[idxAtt].code && isSameFirstCode) {
//                         combination.available_combination.push(attributes[idxAtt]);
//                     }
//                 }
//             }
//         }
//     }
//     return combination;
// };

export const getCombinationVariants = (selected = {}, variants = [], options = []) => {
    const combination = {
        available_combination: [],
    };
    const selectKey = Object.keys(selected);

    // if (selected && selectKey.length > 0) {
    //     for (let key = 0; key < selectKey.length; key += 1) {
    //         // eslint-disable-next-line no-plusplus
    //         for (let index = 0; index < variants.length; index++) {
    //             if (variants[index].product.stock_status === 'IN_STOCK') {
    //                 const { attributes } = variants[index];
    //                 let isSameFirstCode = false;
    //                 // eslint-disable-next-line no-plusplus
    //                 for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
    //                     if (selectKey[key] === attributes[idxAtt].code) {
    //                         isSameFirstCode = attributes[idxAtt].value_index === selected[selectKey[key]];
    //                     }
    //                 }
    //                 // eslint-disable-next-line no-plusplus
    //                 for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
    //                     if (selectKey[key] !== attributes[idxAtt].code && isSameFirstCode) {
    //                         combination.available_combination.push(attributes[idxAtt]);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    if (selected && selectKey.length > 0) {
        for (let index = 0; index < variants.length; index += 1) {
            const { attributes, product } = variants[index];
            if (product.stock_status === 'IN_STOCK') {
                if (selectKey.length === options.length) {
                    for (let key = 0; key < selectKey.length; key += 1) {
                        let isSameFirstCode = false;
                        // eslint-disable-next-line no-plusplus
                        for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
                            if (selectKey[key] === attributes[idxAtt].code) {
                                isSameFirstCode = attributes[idxAtt].value_index === selected[selectKey[key]];
                            }
                        }
                        // eslint-disable-next-line no-plusplus
                        for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
                            if (selectKey[key] !== attributes[idxAtt].code && isSameFirstCode) {
                                combination.available_combination.push(attributes[idxAtt]);
                            }
                        }
                    }
                } else {
                    for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
                        combination.available_combination.push(attributes[idxAtt]);
                    }
                }
            }
            // else if (selectKey.length < options.length) {
            //     for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
            //         for (let idxKey = 0; idxKey < selectKey.length; idxKey += 1) {
            //             if (selected[selectKey[idxKey]] !== attributes[idxAtt].value_index) {
            //                 combination.available_combination = combination.available_combination.filter(
            //                     (att) => att.value_index !== attributes[idxAtt].value_index,
            //                 );
            //             }
            //         }
            //     }
            // }
        }
    }

    return combination;
};

// export const CheckAvailableOptions = (availableCombination = [], value) => {
//     let available = false;
//     // eslint-disable-next-line no-plusplus
//     for (let index = 0; index < availableCombination.length; index++) {
//         if (availableCombination[index].value_index === value) {
//             available = true;
//             break;
//         }
//     }
//     return available;
// };

// eslint-disable-next-line no-unused-vars
export const CheckAvailableOptions = (availableCombination = [], option = {}, value) => {
    let available = false;
    // // eslint-disable-next-line no-plusplus
    for (let index = 0; index < availableCombination.length; index += 1) {
        // if (option && availableCombination[0].code === option.attribute_code) {
        if (value.value_index === availableCombination[index].value_index) {
            available = true;
            break;
        }
        // }
    }
    return available;
};

// export const CheckAvailableOptions = (selected = {}, code, value = '', variants = []) => {
//     let available = false;
//     if (!selected || !selected[code]) {
//         available = true;
//     } else if (selected[code] && selected[code] === value) {
//         available = true;
//     } else {
//         available = false;
//         // // console.log('sini');
//         // for (let index = 0; index < variants.length; index += 1) {
//         //     let productAvailable = false;
//         //     let attributeAvailable = false;
//         //     const { attributes, product } = variants[index];
//         //     for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
//         //         if (attributes[idxAtt].code === code && attributes[idxAtt].value_index === value) {
//         //             attributeAvailable = true;
//         //         }
//         //     }

//         //     if (attributeAvailable && product.stock_status === 'IN_STOCK') {
//         //         console.log('ketemu');
//         //         productAvailable = true;
//         //     }

//         //     available = productAvailable;
//         //     if (productAvailable) break;
//         // }
//     }
//     return available;
// };

/**
 * function to get product by spesific variant
 * @param options object
 * @param array varians product
 * @returns object product
 *  */
export default function productByVariant(options = {}, variants = []) {
    let spesificProduct = {};
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < variants.length; index++) {
        const { attributes, product } = variants[index];
        let isSpesific = false;
        if (product.stock_status === 'IN_STOCK') {
            // eslint-disable-next-line no-plusplus
            for (let idxAtt = 0; idxAtt < attributes.length; idxAtt++) {
                if (typeof options[attributes[idxAtt].code] !== 'undefined') {
                    if (options[attributes[idxAtt].code] === attributes[idxAtt].value_index) {
                        isSpesific = true;
                    } else {
                        isSpesific = false;
                        break;
                    }
                }
            }
        }
        if (isSpesific) {
            spesificProduct = variants[index].product;
            break;
        }
    }
    return spesificProduct;
}
