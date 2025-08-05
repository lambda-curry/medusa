/**
 * @schema StoreGiftCard
 * type: object
 * description: The gift card's details.
 * x-schemaName: StoreGiftCard
 * required:
 *   - customer
 *   - line_item
 *   - id
 *   - code
 *   - status
 *   - value
 *   - currency_code
 *   - customer_id
 *   - reference_id
 *   - note
 *   - reference
 *   - expires_at
 *   - created_at
 *   - updated_at
 * properties:
 *   customer:
 *     $ref: "#/components/schemas/StoreCustomer"
 *   line_item:
 *     $ref: "#/components/schemas/StoreOrderLineItem"
 *   id:
 *     type: string
 *     title: id
 *     description: The gift card's ID.
 *   code:
 *     type: string
 *     title: code
 *     description: The gift card's code.
 *   status:
 *     type: string
 *     description: The gift card's status.
 *     enum:
 *       - pending
 *       - redeemed
 *   value:
 *     type: number
 *     title: value
 *     description: The gift card's amount.
 *   currency_code:
 *     type: string
 *     title: currency_code
 *     description: The gift card's currency code.
 *     example: usd
 *   customer_id:
 *     type: string
 *     title: customer_id
 *     description: The ID of the customer that the gift card belongs to.
 *   reference_id:
 *     type: string
 *     title: reference_id
 *     description: The gift card's reference ID.
 *   note:
 *     type: string
 *     title: note
 *     description: A note with more information about the gift card.
 *   reference:
 *     type: string
 *     title: reference
 *     description: The gift card's reference.
 *   expires_at:
 *     type: string
 *     title: expires_at
 *     description: The date the gift card expires.
 *     format: date-time
 *   created_at:
 *     type: string
 *     format: date-time
 *     title: created_at
 *     description: The date the gift card was created.
 *   updated_at:
 *     type: string
 *     format: date-time
 *     title: updated_at
 *     description: The date the gift card was updated.
 * 
*/