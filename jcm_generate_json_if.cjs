const object = require('./order.json');
let holder = { 'fulfillment': {} };
const filter_array = ['shipping_lines'];

const processLineItems = (array) => {
    let holder = []
    if (array.length > 0) {
        array.forEach((list_value) => {
            holder.push({
                'sku': list_value.sku,
                'quantity': list_value.quantity,
            })
        });
    }
    return holder
}

Object.keys(object).forEach(keys => {
    const nested_object_keys = object[keys];
    if (keys == 'order') {
        Object.keys(nested_object_keys).forEach(nested_keys => {
            if (nested_keys == 'line_items') {
                let lineItemsArray = processLineItems(nested_object_keys[nested_keys])
                holder['fulfillment'][nested_keys] = lineItemsArray;
            } else {
                holder['fulfillment'][nested_keys] = nested_object_keys[nested_keys];
            };
        });
    }
});

console.log(holder)