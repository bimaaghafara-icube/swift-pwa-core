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

export const getCombinationVariants = (selected = {}, variants = [], options = []) => {
    const combination = {
        available_combination: [],
    };
    const selectKey = Object.keys(selected);

    if (selected && selectKey.length > 0) {
        let alloptions = [];
        for (let index = 0; index < options.length; index += 1) {
            const { values, attribute_code } = options[index];
            for (let idxVal = 0; idxVal < values.length; idxVal += 1) {
                alloptions.push({
                    code: attribute_code,
                    label: values[idxVal].label,
                    value_index: values[idxVal].value_index,
                });
            }
        }
        for (let index = 0; index < variants.length; index += 1) {
            const { attributes, product } = variants[index];
            if (product.stock_status !== 'IN_STOCK') {
                let first = false;
                for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
                    const { value_index, code } = attributes[idxAtt];
                    if (value_index === selected[code]) {
                        first = true;
                        break;
                    }
                }
                if (first) {
                    for (let idxAtt = 0; idxAtt < attributes.length; idxAtt += 1) {
                        const { value_index, code } = attributes[idxAtt];
                        if (value_index !== selected[code]) {
                            alloptions = alloptions.filter(
                                (att) => att.value_index !== value_index,
                            );
                        }
                    }
                }
            }
        }
        combination.available_combination = alloptions;
    }

    return combination;
};

// eslint-disable-next-line no-unused-vars
export const CheckAvailableOptions = (availableCombination = [], option = {}, value) => {
    let available = false;
    for (let index = 0; index < availableCombination.length; index += 1) {
        if (value.value_index === availableCombination[index].value_index) {
            available = true;
            break;
        }
    }
    return available;
};

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
