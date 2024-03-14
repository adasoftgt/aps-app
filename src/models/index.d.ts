import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum BatchStatus {
  OPEN = "OPEN",
  ATRECEPTION = "ATRECEPTION",
  CLOSED = "CLOSED",
  AVAILABLE = "AVAILABLE",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
  QUARANTINED = "QUARANTINED",
  WAITING = "WAITING",
  SENT = "SENT"
}

export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SOLDOUT = "SOLDOUT",
  BOOKED = "BOOKED",
  DISCONTINUED = "DISCONTINUED",
  INOFFER = "INOFFER",
  BEATEN = "BEATEN",
  STAGED = "STAGED"
}

export enum PaymentMethod {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  OTHER = "OTHER"
}

export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED"
}

export enum InvoiceItemStatus {
  DRAFT = "DRAFT",
  CONFIRMED = "CONFIRMED"
}

export enum BatchChunkStatus {
  SALES_QUANTITY = "SALES_QUANTITY",
  BONUS_QUANTITY = "BONUS_QUANTITY"
}

export enum InvoiceTerm {
  PAYMENT_ON_DELIVERY = "PAYMENT_ON_DELIVERY",
  ONE_WEEK = "ONE_WEEK",
  TWO_WEEKS = "TWO_WEEKS",
  THREE_WEEKS = "THREE_WEEKS",
  ONE_MONTH = "ONE_MONTH",
  TWO_MONTHS = "TWO_MONTHS",
  THREE_MONTHS = "THREE_MONTHS",
  FOUR_MONTHS = "FOUR_MONTHS",
  FIVE_MONTHS = "FIVE_MONTHS",
  SIX_MONTHS = "SIX_MONTHS",
  SEVEN_MONTHS = "SEVEN_MONTHS",
  EIGHT_MONTHS = "EIGHT_MONTHS",
  NINE_MONTHS = "NINE_MONTHS",
  TEN_MONTHS = "TEN_MONTHS",
  ELEVEN_MONTHS = "ELEVEN_MONTHS",
  ONE_YEAR = "ONE_YEAR",
  TWO_YEAR = "TWO_YEAR"
}

export enum DiscountRateType {
  FLAT = "FLAT",
  PERCENTAGE = "PERCENTAGE",
  MEXED = "MEXED"
}



type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

type EagerConfiguration = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Configuration, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly value: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyConfiguration = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Configuration, 'id'>;
  };
  readonly id: string;
  readonly name: string;
  readonly value: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Configuration = LazyLoading extends LazyLoadingDisabled ? EagerConfiguration : LazyConfiguration

export declare const Configuration: (new (init: ModelInit<Configuration>) => Configuration) & {
  copyOf(source: Configuration, mutator: (draft: MutableModel<Configuration>) => MutableModel<Configuration> | void): Configuration;
}

type EagerRol = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Rol, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly displayname: string;
  readonly type: string;
  readonly capabilities: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRol = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Rol, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly displayname: string;
  readonly type: string;
  readonly capabilities: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Rol = LazyLoading extends LazyLoadingDisabled ? EagerRol : LazyRol

export declare const Rol: (new (init: ModelInit<Rol>) => Rol) & {
  copyOf(source: Rol, mutator: (draft: MutableModel<Rol>) => MutableModel<Rol> | void): Rol;
}

type EagerCapability = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Capability, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly section?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCapability = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Capability, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly section?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Capability = LazyLoading extends LazyLoadingDisabled ? EagerCapability : LazyCapability

export declare const Capability: (new (init: ModelInit<Capability>) => Capability) & {
  copyOf(source: Capability, mutator: (draft: MutableModel<Capability>) => MutableModel<Capability> | void): Capability;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerBatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Batch, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sku: string;
  readonly expiration_date: string;
  readonly day: string;
  readonly month: string;
  readonly year: string;
  readonly quantity: number;
  readonly status: BatchStatus | keyof typeof BatchStatus;
  readonly userId: string;
  readonly locked: boolean;
  readonly product?: Product | null;
  readonly chunks?: (BatchChunk | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productBatchesId?: string | null;
}

type LazyBatch = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Batch, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sku: string;
  readonly expiration_date: string;
  readonly day: string;
  readonly month: string;
  readonly year: string;
  readonly quantity: number;
  readonly status: BatchStatus | keyof typeof BatchStatus;
  readonly userId: string;
  readonly locked: boolean;
  readonly product: AsyncItem<Product | undefined>;
  readonly chunks: AsyncCollection<BatchChunk>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productBatchesId?: string | null;
}

export declare type Batch = LazyLoading extends LazyLoadingDisabled ? EagerBatch : LazyBatch

export declare const Batch: (new (init: ModelInit<Batch>) => Batch) & {
  copyOf(source: Batch, mutator: (draft: MutableModel<Batch>) => MutableModel<Batch> | void): Batch;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly description?: string | null;
  readonly quantity: number;
  readonly status: ProductStatus | keyof typeof ProductStatus;
  readonly userId: string;
  readonly price?: ProductPrice | null;
  readonly batches?: (Batch | null)[] | null;
  readonly items?: (InvoiceItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productPriceId?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly description?: string | null;
  readonly quantity: number;
  readonly status: ProductStatus | keyof typeof ProductStatus;
  readonly userId: string;
  readonly price: AsyncItem<ProductPrice | undefined>;
  readonly batches: AsyncCollection<Batch>;
  readonly items: AsyncCollection<InvoiceItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productPriceId?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerProductPrice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductPrice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly unit: number;
  readonly offer: number;
  readonly et: number;
  readonly pharmacy: number;
  readonly dateCreated: string;
  readonly userId: string;
  readonly product?: Product | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productPriceProductId?: string | null;
}

type LazyProductPrice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductPrice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly unit: number;
  readonly offer: number;
  readonly et: number;
  readonly pharmacy: number;
  readonly dateCreated: string;
  readonly userId: string;
  readonly product: AsyncItem<Product | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productPriceProductId?: string | null;
}

export declare type ProductPrice = LazyLoading extends LazyLoadingDisabled ? EagerProductPrice : LazyProductPrice

export declare const ProductPrice: (new (init: ModelInit<ProductPrice>) => ProductPrice) & {
  copyOf(source: ProductPrice, mutator: (draft: MutableModel<ProductPrice>) => MutableModel<ProductPrice> | void): ProductPrice;
}

type EagerPayment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Payment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly method: PaymentMethod | keyof typeof PaymentMethod;
  readonly reference?: string | null;
  readonly userId: string;
  readonly clientId: string;
  readonly invoice?: Invoice | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly invoicePaymentId?: string | null;
}

type LazyPayment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Payment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly amount: number;
  readonly method: PaymentMethod | keyof typeof PaymentMethod;
  readonly reference?: string | null;
  readonly userId: string;
  readonly clientId: string;
  readonly invoice: AsyncItem<Invoice | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly invoicePaymentId?: string | null;
}

export declare type Payment = LazyLoading extends LazyLoadingDisabled ? EagerPayment : LazyPayment

export declare const Payment: (new (init: ModelInit<Payment>) => Payment) & {
  copyOf(source: Payment, mutator: (draft: MutableModel<Payment>) => MutableModel<Payment> | void): Payment;
}

type EagerInvoiceItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InvoiceItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly product?: Product | null;
  readonly chunks?: (BatchChunk | null)[] | null;
  readonly price: number;
  readonly total: number;
  readonly status: InvoiceItemStatus | keyof typeof InvoiceItemStatus;
  readonly invoice?: Invoice | null;
  readonly dateCreated: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productItemsId?: string | null;
  readonly invoiceItemsId?: string | null;
}

type LazyInvoiceItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<InvoiceItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly product: AsyncItem<Product | undefined>;
  readonly chunks: AsyncCollection<BatchChunk>;
  readonly price: number;
  readonly total: number;
  readonly status: InvoiceItemStatus | keyof typeof InvoiceItemStatus;
  readonly invoice: AsyncItem<Invoice | undefined>;
  readonly dateCreated: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productItemsId?: string | null;
  readonly invoiceItemsId?: string | null;
}

export declare type InvoiceItem = LazyLoading extends LazyLoadingDisabled ? EagerInvoiceItem : LazyInvoiceItem

export declare const InvoiceItem: (new (init: ModelInit<InvoiceItem>) => InvoiceItem) & {
  copyOf(source: InvoiceItem, mutator: (draft: MutableModel<InvoiceItem>) => MutableModel<InvoiceItem> | void): InvoiceItem;
}

type EagerBatchChunk = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BatchChunk, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly status: BatchChunkStatus | keyof typeof BatchChunkStatus;
  readonly batch?: Batch | null;
  readonly item?: InvoiceItem | null;
  readonly dateCreated: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly batchChunksId?: string | null;
  readonly invoiceItemChunksId?: string | null;
}

type LazyBatchChunk = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BatchChunk, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly status: BatchChunkStatus | keyof typeof BatchChunkStatus;
  readonly batch: AsyncItem<Batch | undefined>;
  readonly item: AsyncItem<InvoiceItem | undefined>;
  readonly dateCreated: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly batchChunksId?: string | null;
  readonly invoiceItemChunksId?: string | null;
}

export declare type BatchChunk = LazyLoading extends LazyLoadingDisabled ? EagerBatchChunk : LazyBatchChunk

export declare const BatchChunk: (new (init: ModelInit<BatchChunk>) => BatchChunk) & {
  copyOf(source: BatchChunk, mutator: (draft: MutableModel<BatchChunk>) => MutableModel<BatchChunk> | void): BatchChunk;
}

type EagerDiscountRate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DiscountRate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: DiscountRateType | keyof typeof DiscountRateType;
  readonly flat?: number | null;
  readonly percentage?: number | null;
  readonly userId: string;
  readonly invoice?: Invoice | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly invoiceDiscountsId?: string | null;
}

type LazyDiscountRate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DiscountRate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: DiscountRateType | keyof typeof DiscountRateType;
  readonly flat?: number | null;
  readonly percentage?: number | null;
  readonly userId: string;
  readonly invoice: AsyncItem<Invoice | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly invoiceDiscountsId?: string | null;
}

export declare type DiscountRate = LazyLoading extends LazyLoadingDisabled ? EagerDiscountRate : LazyDiscountRate

export declare const DiscountRate: (new (init: ModelInit<DiscountRate>) => DiscountRate) & {
  copyOf(source: DiscountRate, mutator: (draft: MutableModel<DiscountRate>) => MutableModel<DiscountRate> | void): DiscountRate;
}

type EagerInvoice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Invoice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cashierId: string;
  readonly clientId: string;
  readonly total: number;
  readonly status: InvoiceStatus | keyof typeof InvoiceStatus;
  readonly notes?: string | null;
  readonly amountPaid?: number | null;
  readonly remainingBalance?: number | null;
  readonly paymentCollectionDate?: string | null;
  readonly term: InvoiceTerm | keyof typeof InvoiceTerm;
  readonly discounts?: (DiscountRate | null)[] | null;
  readonly digitalInvoice?: Digifact | null;
  readonly items?: (InvoiceItem | null)[] | null;
  readonly payment?: (Payment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly invoiceDigitalInvoiceId?: string | null;
}

type LazyInvoice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Invoice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly cashierId: string;
  readonly clientId: string;
  readonly total: number;
  readonly status: InvoiceStatus | keyof typeof InvoiceStatus;
  readonly notes?: string | null;
  readonly amountPaid?: number | null;
  readonly remainingBalance?: number | null;
  readonly paymentCollectionDate?: string | null;
  readonly term: InvoiceTerm | keyof typeof InvoiceTerm;
  readonly discounts: AsyncCollection<DiscountRate>;
  readonly digitalInvoice: AsyncItem<Digifact | undefined>;
  readonly items: AsyncCollection<InvoiceItem>;
  readonly payment: AsyncCollection<Payment>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly invoiceDigitalInvoiceId?: string | null;
}

export declare type Invoice = LazyLoading extends LazyLoadingDisabled ? EagerInvoice : LazyInvoice

export declare const Invoice: (new (init: ModelInit<Invoice>) => Invoice) & {
  copyOf(source: Invoice, mutator: (draft: MutableModel<Invoice>) => MutableModel<Invoice> | void): Invoice;
}

type EagerDigifact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Digifact, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Referencia_interna_digifact: string;
  readonly Autorizacion: string;
  readonly Serie: string;
  readonly NUMERO: string;
  readonly Fecha_DTE: string;
  readonly NIT_EFACE: string;
  readonly NOMBRE_EFACE: string;
  readonly NIT_COMPRADOR: string;
  readonly NOMBRE_COMPRADOR: string;
  readonly Fecha_de_certificacion: string;
  readonly BACKPROCESOR: string;
  readonly invoice?: Invoice | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly digifactInvoiceId?: string | null;
}

type LazyDigifact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Digifact, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Referencia_interna_digifact: string;
  readonly Autorizacion: string;
  readonly Serie: string;
  readonly NUMERO: string;
  readonly Fecha_DTE: string;
  readonly NIT_EFACE: string;
  readonly NOMBRE_EFACE: string;
  readonly NIT_COMPRADOR: string;
  readonly NOMBRE_COMPRADOR: string;
  readonly Fecha_de_certificacion: string;
  readonly BACKPROCESOR: string;
  readonly invoice: AsyncItem<Invoice | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly digifactInvoiceId?: string | null;
}

export declare type Digifact = LazyLoading extends LazyLoadingDisabled ? EagerDigifact : LazyDigifact

export declare const Digifact: (new (init: ModelInit<Digifact>) => Digifact) & {
  copyOf(source: Digifact, mutator: (draft: MutableModel<Digifact>) => MutableModel<Digifact> | void): Digifact;
}

type EagerUserConfiguration = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserConfiguration, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly value: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserConfiguration = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserConfiguration, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly name: string;
  readonly value: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserConfiguration = LazyLoading extends LazyLoadingDisabled ? EagerUserConfiguration : LazyUserConfiguration

export declare const UserConfiguration: (new (init: ModelInit<UserConfiguration>) => UserConfiguration) & {
  copyOf(source: UserConfiguration, mutator: (draft: MutableModel<UserConfiguration>) => MutableModel<UserConfiguration> | void): UserConfiguration;
}

type EagerCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly nit?: string | null;
  readonly phone?: string | null;
  readonly owner?: string | null;
  readonly seller: string;
  readonly transportation_observations?: string | null;
  readonly observations?: string | null;
  readonly countryDepartment: string;
  readonly municipality: string;
  readonly carrier: string;
  readonly sector: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly nit?: string | null;
  readonly phone?: string | null;
  readonly owner?: string | null;
  readonly seller: string;
  readonly transportation_observations?: string | null;
  readonly observations?: string | null;
  readonly countryDepartment: string;
  readonly municipality: string;
  readonly carrier: string;
  readonly sector: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Customer = LazyLoading extends LazyLoadingDisabled ? EagerCustomer : LazyCustomer

export declare const Customer: (new (init: ModelInit<Customer>) => Customer) & {
  copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}