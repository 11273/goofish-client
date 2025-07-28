// 商品状态
export const ITEM_STATUS = {
  NORMAL: 0, // 正常
  SOLD: 1, // 已售出
  DELETED: 2, // 已删除
  OFFLINE: 3, // 已下架
} as const;

// 订单状态
export const ORDER_STATUS = {
  CREATED: 'CREATED', // 已创建
  PAID: 'PAID', // 已支付
  SHIPPED: 'SHIPPED', // 已发货
  RECEIVED: 'RECEIVED', // 已收货
  COMPLETED: 'COMPLETED', // 已完成
  CANCELLED: 'CANCELLED', // 已取消
  REFUNDING: 'REFUNDING', // 退款中
  REFUNDED: 'REFUNDED', // 已退款
} as const;

// 商品分类
export const ITEM_CATEGORIES = {
  DIGITAL: '127388003', // 数码产品
  CLOTHING: '126860592', // 服装
  BOOKS: '126496001', // 图书
  HOME: '126860575', // 家居
  // ... 更多分类
} as const;

// 排序方式
export const SORT_TYPES = {
  DEFAULT: 'default', // 默认排序
  PRICE_ASC: 'price_asc', // 价格升序
  PRICE_DESC: 'price_desc', // 价格降序
  TIME: 'time', // 时间排序
  DISTANCE: 'distance', // 距离排序
} as const;

// 分页配置
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_SIZE: 20,
  MAX_SIZE: 100,
} as const;

// 价格范围
export const PRICE_RANGES = [
  { min: 0, max: 50, label: '50元以下' },
  { min: 50, max: 100, label: '50-100元' },
  { min: 100, max: 300, label: '100-300元' },
  { min: 300, max: 500, label: '300-500元' },
  { min: 500, max: 1000, label: '500-1000元' },
  { min: 1000, max: null, label: '1000元以上' },
] as const;
