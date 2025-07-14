type EmptyContext<DB> = {
  $db: DB
}

type AnyEmptyContext = EmptyContext<any>;

type SelectableContext<DB> = EmptyContext<DB> & {
  _operation: "select";
  _table: keyof DB;
};

type AnySelectableContext = SelectableContext<any>;

type FilterableContext<DB> = SelectableContext<DB> & {
  _fields: (keyof DB[keyof DB])[] | "ALL";
};

type AnyFilterableContext = FilterableContext<any>;


export type UserTable = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
};
export type CompanyTable = {
  id: string;
  name: string;
};

export type CustomerDatabase = {
  users: UserTable;
  companies: CompanyTable;
};

type Price = number;

export type ProductTable = {
  id: string;
  name: string;
  description: string;
  unitPrice: Price;
};

export type CartTable = {
  id: string;
  items: ProductTable["id"][];
};

export type ShoppingDatabase = {
  carts: CartTable;
  products: ProductTable;
};

export const buildContext = <DB>() => {
  return {
    $db: undefined,
  } as EmptyContext<DB>;
};

export const selectFrom = <
  Ctx extends AnyEmptyContext,
  TB extends keyof Ctx["$db"]
>(
  ctx: Ctx,
  tableName: TB
) => ({
  ...ctx,
  _operation: "select" as const,
  _table: tableName,
});

export const selectFields = <Ctx extends AnySelectableContext>(
  ctx: Ctx,
  fieldNames: (keyof Ctx["$db"][Ctx["_table"]])[]
) => ({
  ...ctx,
  _fields: fieldNames,
});

export const selectAll = <Ctx extends AnySelectableContext>(ctx: Ctx) => ({
  ...ctx,
  _fields: "ALL" as const,
});

export const where = <
  Ctx extends AnySelectableContext,
  Field extends keyof Ctx["$db"][Ctx["_table"]]
>(
  ctx: Ctx,
  field: Field,
  operator: "=",
  value: Ctx["$db"][Ctx["_table"]][Field]
) => ({
  ...ctx,
  _where: {
    field,
    operator,
    value,
  },
});

export const deleteFrom = (ctx: any, tableName: any) => ({
  ...ctx,
  _operation: "delete",
  _table: tableName,
});
