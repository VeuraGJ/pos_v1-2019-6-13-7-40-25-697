'use strict';
const decodeBarcodes = tags => {
    return tags.reduce((pre,curr) => {
        let barcode = curr;
        let amount = 1;
        if(curr.indexOf('-') != -1){
            barcode = curr.split('-')[0];
            amount = parseFloat(curr.split('-')[1]);
        }
        const item = pre.find(it => it.barcode === barcode);
        item ? item.amount += amount : pre.push({'barcode': barcode,'amount':parseFloat(amount)});
        return pre;
    },[]);
}
const combineItems = decodedBarcodes =>{
    const allItems = loadAllItems();
    return decodedBarcodes.map(it => {
        const item = allItems.find(item => item.barcode === it.barcode);
        it.name = item.name;
        it.unit = item.unit;
        it.price = item.price;
        return it;
    });
}
const decodeTags = tags =>{
    const decodedBarcodes = decodeBarcodes(tags);
    return combineItems(decodedBarcodes);
}
const promoteReceiptItem = (items,allPromotions) =>{
    return items.map(it => {
        const buyTwoGetOne = allPromotions.find(promotion => promotion.type === 'BUY_TWO_GET_ONE_FREE').barcodes;
        if(buyTwoGetOne.includes(it.barcode) && it.amount > 2){
            it.subtotal = (it.amount - 1)* it.price;
        }else{
            it.subtotal = it.amount * it.price;
        }
        return it;
    });
}
