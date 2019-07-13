'use strict';

describe('pos', () => {

//   it('should print text', () => {

//     const tags = [
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000001',
//       'ITEM000003-2.5',
//       'ITEM000005',
//       'ITEM000005-2',
//     ];

//     spyOn(console, 'log');

//     printReceipt(tags);

//     const expectText = `***<没钱赚商店>收据***
// 名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
// 名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
// 名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
// ----------------------
// 总计：58.50(元)
// 节省：7.50(元)
// **********************`;

//     expect(console.log).toHaveBeenCalledWith(expectText);
//   });

//test decodeBarcode
it('should print text', () => {

  const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
  ];

  const result = decodeBarcodes(tags);
  expect(result).toEqual([{barcode: "ITEM000001", amount: 5},{barcode: "ITEM000003", amount: 2.5},{barcode: "ITEM000005", amount: 3}]);
});
//test combineItem
it('should print text', () => {

  const decodedBarcodes = [
    {barcode: "ITEM000001", amount: 5},
    {barcode: "ITEM000003", amount: 2.5},
    {barcode: "ITEM000005", amount: 3}
  ];

  const result = combineItems(decodedBarcodes);
  expect(result).toEqual([
  { barcode: "ITEM000001",
    amount: 5,
    name: '雪碧',
    unit: '瓶',
    price: 3.00
  },
  { barcode: "ITEM000003", 
    amount: 2.5,
    name: '荔枝',
    unit: '斤',
    price: 15.00
  },
  { barcode: "ITEM000005", 
    amount: 3,
    name: '方便面',
    unit: '袋',
    price: 4.50
  }
  ]);
});
//test decodeTags
it('should print text', () => {

  const tags = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2.5',
    'ITEM000005',
    'ITEM000005-2',
  ];

  const result = decodeTags(tags);
  expect(result).toEqual([
    { barcode: "ITEM000001",
      amount: 5,
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    { barcode: "ITEM000003", 
      amount: 2.5,
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    { barcode: "ITEM000005", 
      amount: 3,
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
    ]);
});
//test promoteReceiptItems
it('should print text', () => {

  const items = [
    { barcode: "ITEM000001",
      amount: 5,
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    { barcode: "ITEM000003", 
      amount: 2.5,
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    { barcode: "ITEM000005", 
      amount: 3,
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
    ];
  const allPromotion = loadPromotions();
  const result = promoteReceiptItem(items,allPromotion);
  expect(result).toEqual([
    { barcode: "ITEM000001",
      amount: 5,
      name: '雪碧',
      unit: '瓶',
      price: 3.00,
      subtotal: 12.00
    },
    { barcode: "ITEM000003", 
      amount: 2.5,
      name: '荔枝',
      unit: '斤',
      price: 15.00,
      subtotal: 37.50
    },
    { barcode: "ITEM000005", 
      amount: 3,
      name: '方便面',
      unit: '袋',
      price: 4.50,
      subtotal: 9.00
    }
    ]);
});
});
