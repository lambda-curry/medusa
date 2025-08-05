/**
 * @schema StoreStoreCreditAccount
 * type: object
 * description: The store credit account's details.
 * x-schemaName: StoreStoreCreditAccount
 * required:
 *   - customer
 *   - transaction_groups
 *   - id
 *   - customer_id
 *   - currency_code
 *   - credits
 *   - debits
 *   - balance
 *   - metadata
 *   - created_at
 *   - updated_at
 * properties:
 *   customer:
 *     $ref: "#/components/schemas/StoreCustomer"
 *   id:
 *     type: string
 *     title: id
 *     description: The store credit account's ID.
 *   customer_id:
 *     type: string
 *     title: customer_id
 *     description: The ID of the customer that the store credit account belongs to.
 *   currency_code:
 *     type: string
 *     title: currency_code
 *     description: The store credit account's currency code.
 *     example: usd
 *   credits:
 *     type: number
 *     title: credits
 *     description: The account's credits.
 *   debits:
 *     type: number
 *     title: debits
 *     description: The account's debits.
 *   balance:
 *     type: number
 *     title: balance
 *     description: The store credit account's balance.
 *   transaction_groups:
 *     type: array
 *     description: The store credit account's transaction groups.
 *     items:
 *       $ref: "#/components/schemas/StoreTransactionGroup"
 *   metadata:
 *     type: object
 *     description: The store credit account's metadata, can hold custom key-value pairs.
 *     externalDocs:
 *       url: https://docs.medusajs.com/api/store#manage-metadata
 *       description: Learn how to manage metadata
 *   created_at:
 *     type: string
 *     format: date-time
 *     title: created_at
 *     description: The date the store credit account was created.
 *   updated_at:
 *     type: string
 *     format: date-time
 *     title: updated_at
 *     description: The date the store credit account was updated.
 * 
*/

