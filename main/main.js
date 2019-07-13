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
const calculateReceiptItems = items =>{
    const allPromotions = loadPromotions();
    return promoteReceiptItem(items,allPromotions);
}
const calculateReceiptTotal = receiptItems =>{
    let total = 0;
    for(let i of receiptItems){
        total += i.subtotal;
    }
    return total;
}
const calculateReceiptSaving = receiptItems =>{
    let saving = 0;
    for(let i of receiptItems){
        saving += i.amount * i.price - i.subtotal;
    }
    return saving;
}
const calculateReceipt = receiptItems =>{
    const receipt = {};
    const total = calculateReceiptTotal(receiptItems);
    const saving = calculateReceiptSaving(receiptItems);
    receipt.receiptItems = receiptItems;
    receipt.total = total;
    receipt.saving = saving;
    return receipt;
}
const renderReceipt = receipt => {
    let renderedReceipt = `***<没钱赚商店>收据***\n`;
    for(let i of receipt.receiptItems){
        renderedReceipt = renderedReceipt + `名称：${i.name}，数量：${i.amount}${i.unit}，单价：${(i.price.toFixed(2))}(元)，小计：${i.subtotal.toFixed(2)}(元)\n`;
    }
    renderedReceipt = renderedReceipt + `----------------------\n总计：${receipt.total.toFixed(2)}(元)\n节省：${receipt.saving.toFixed(2)}(元)\n**********************`;
    return renderedReceipt;
}
const printReceipt = tags =>{
    const items = decodeTags(tags);
    const receiptItems = calculateReceiptItems(items);
    const receipt = calculateReceipt(receiptItems);
    console.log(renderReceipt(receipt));
}