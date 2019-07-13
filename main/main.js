'use strict';
const decodeBarcodes = tags => {
    return tags.reduce((pre,curr) => {
        let barcode = curr;
        let amount = 1;
        if(curr.indexOf('-') != -1){
            barcode = curr.split('-')[0];
            amount = parseFloat(curr.split('-')[1]);
        }
        const item = pre.find(it => it.barcode == barcode);
        item ? item.amount += amount : pre.push({'barcode': barcode,'amount':parseFloat(amount)});
        return pre;
    },[]);
}
