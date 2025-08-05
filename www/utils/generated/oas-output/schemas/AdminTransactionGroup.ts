/**
 * @schema AdminTransactionGroup
 * type: object
 * description: The transaction group's details.
 * x-schemaName: AdminTransactionGroup
 * required:
 *   - account
 *   - id
 *   - code
 *   - credits
 *   - debits
 *   - balance
 *   - metadata
 * properties:
 *   id:
 *     type: string
 *     title: id
 *     description: The transaction group's ID.
 *   code:
 *     type: string
 *     title: code
 *     description: The transaction group's code.
 *   credits:
 *     type: number
 *     title: credits
 *     description: The transaction group's credits.
 *   debits:
 *     type: number
 *     title: debits
 *     description: The transaction group's debits.
 *   balance:
 *     type: number
 *     title: balance
 *     description: The transaction group's balance.
 *   account:
 *     $ref: "#/components/schemas/AdminStoreCreditAccount"
 *   metadata:
 *     type: object
 *     description: The transaction group's metadata, can hold custom key-value pairs.
 *     externalDocs:
 *       url: https://docs.medusajs.com/api/admin#manage-metadata
 *       description: Learn how to manage metadata
 * 
*/

