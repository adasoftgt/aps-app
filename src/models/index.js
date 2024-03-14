// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const BatchStatus = {
  "OPEN": "OPEN",
  "ATRECEPTION": "ATRECEPTION",
  "CLOSED": "CLOSED",
  "AVAILABLE": "AVAILABLE",
  "OVERDUE": "OVERDUE",
  "CANCELLED": "CANCELLED",
  "QUARANTINED": "QUARANTINED",
  "WAITING": "WAITING",
  "SENT": "SENT"
};

const ProductStatus = {
  "AVAILABLE": "AVAILABLE",
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE",
  "SOLDOUT": "SOLDOUT",
  "BOOKED": "BOOKED",
  "DISCONTINUED": "DISCONTINUED",
  "INOFFER": "INOFFER",
  "BEATEN": "BEATEN",
  "STAGED": "STAGED"
};

const PaymentMethod = {
  "CASH": "CASH",
  "CREDIT_CARD": "CREDIT_CARD",
  "DEBIT_CARD": "DEBIT_CARD",
  "BANK_TRANSFER": "BANK_TRANSFER",
  "OTHER": "OTHER"
};

const InvoiceStatus = {
  "DRAFT": "DRAFT",
  "SENT": "SENT",
  "PAID": "PAID",
  "OVERDUE": "OVERDUE",
  "CANCELLED": "CANCELLED"
};

const InvoiceItemStatus = {
  "DRAFT": "DRAFT",
  "CONFIRMED": "CONFIRMED"
};

const BatchChunkStatus = {
  "SALES_QUANTITY": "SALES_QUANTITY",
  "BONUS_QUANTITY": "BONUS_QUANTITY"
};

const InvoiceTerm = {
  "PAYMENT_ON_DELIVERY": "PAYMENT_ON_DELIVERY",
  "ONE_WEEK": "ONE_WEEK",
  "TWO_WEEKS": "TWO_WEEKS",
  "THREE_WEEKS": "THREE_WEEKS",
  "ONE_MONTH": "ONE_MONTH",
  "TWO_MONTHS": "TWO_MONTHS",
  "THREE_MONTHS": "THREE_MONTHS",
  "FOUR_MONTHS": "FOUR_MONTHS",
  "FIVE_MONTHS": "FIVE_MONTHS",
  "SIX_MONTHS": "SIX_MONTHS",
  "SEVEN_MONTHS": "SEVEN_MONTHS",
  "EIGHT_MONTHS": "EIGHT_MONTHS",
  "NINE_MONTHS": "NINE_MONTHS",
  "TEN_MONTHS": "TEN_MONTHS",
  "ELEVEN_MONTHS": "ELEVEN_MONTHS",
  "ONE_YEAR": "ONE_YEAR",
  "TWO_YEAR": "TWO_YEAR"
};

const DiscountRateType = {
  "FLAT": "FLAT",
  "PERCENTAGE": "PERCENTAGE",
  "MEXED": "MEXED"
};

const { Todo, Configuration, Rol, Capability, Category, Batch, Product, ProductPrice, Payment, InvoiceItem, BatchChunk, DiscountRate, Invoice, Digifact, UserConfiguration, Customer } = initSchema(schema);

export {
  Todo,
  Configuration,
  Rol,
  Capability,
  Category,
  Batch,
  Product,
  ProductPrice,
  Payment,
  InvoiceItem,
  BatchChunk,
  DiscountRate,
  Invoice,
  Digifact,
  UserConfiguration,
  Customer,
  BatchStatus,
  ProductStatus,
  PaymentMethod,
  InvoiceStatus,
  InvoiceItemStatus,
  BatchChunkStatus,
  InvoiceTerm,
  DiscountRateType
};