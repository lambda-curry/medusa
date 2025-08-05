/**
 * @schema AdminAddDraftOrderShippingMethod
 * type: object
 * description: The details of the shipping method to add to a draft order.
 * x-schemaName: AdminAddDraftOrderShippingMethod
 * required:
 *   - shipping_option_id
 * properties:
 *   shipping_option_id:
 *     type: string
 *     title: shipping_option_id
 *     description: The ID of the shipping option that this method is created from.
 *   custom_amount:
 *     type: number
 *     title: custom_amount
 *     description: A custom amount to be charged for this shipping method. If not provided, the shipping option's amount will be used.
 *   description:
 *     type: string
 *     title: description
 *     description: The shipping method's description.
 *   internal_note:
 *     type: string
 *     title: internal_note
 *     description: A note viewed only by admin users about the shipping method.
 *   metadata:
 *     type: object
 *     description: The shipping method's metadata, can hold custom key-value pairs.
 *     externalDocs:
 *       url: https://docs.medusajs.com/api/admin#manage-metadata
 *       description: Learn how to manage metadata
 * 
*/

