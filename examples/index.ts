/**
 * 示例：搜索商品
 */

import { GooFish } from 'goofish-sdk';

const client = new GooFish({ cookie: '' });

async function searchExample() {
  // 1. 基础搜索
  console.log('🔍 搜索 iPhone...');
  const results = await client.search.search({
    keyword: 'iPhone',
    pageNumber: 1,
    rowsPerPage: 10,
    fromFilter: true,
    sortValue: 'desc',
    sortField: 'create',
    customDistance: '',
    gps: '',
    propValueStr: { searchFilter: '' },
    customGps: '',
    searchReqFromPage: 'pcSearch',
    extraFilterValue: '{}',
    userPositionJson: '{}',
  });

  console.log(results);
}

// 运行示例
searchExample().catch(console.error);
