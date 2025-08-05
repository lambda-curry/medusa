/**
 * @schema AdminAddDraftOrderItems
 * type: object
 * description: The details of the items to add to a draft order.
 * x-schemaName: AdminAddDraftOrderItems
 * properties:
 *   items:
 *     type: array
 *     description: The items to add to the draft order.
 *     items:
 *       type: object
 *       description: The item's details
 *       required:
 *         - quantity
 *       properties:
 *         quantity:
 *           type: number
 *           title: quantity
 *           description: The item's quantity.
 *         variant_id:
 *           type: string
 *           title: variant_id
 *           description: The ID of the variant to add to the draft order.
 *         title:
 *           type: string
 *           title: title
 *           description: The item's title.
 *         unit_price:
 *           type: number
 *           title: unit_price
 *           description: The item's unit price.
 *         compare_at_unit_price:
 *           type: number
 *           title: compare_at_unit_price
 *           description: The original price of the item before a promotion or sale.
 *         internal_note:
 *           type: string
 *           title: internal_note
 *           description: A note viewed only by admin users about the item.
 *         allow_backorder:
 *           type: boolean
 *           title: allow_backorder
 *           description: Whether the item can be purchased if it's out of stock.
 *         metadata:
 *           type: object
 *           description: The item's metadata, can hold custom key-value pairs.
 *           externalDocs:
 *             url: https://docs.medusajs.com/api/admin#manage-metadata
 *             description: Learn how to manage metadata
 * 
*/

