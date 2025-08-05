/**
 * @schema AdminCreateSalesChannel
 * type: object
 * description: The sales channel's details.
 * x-schemaName: AdminCreateSalesChannel
 * required:
 *   - name
 * properties:
 *   name:
 *     type: string
 *     title: name
 *     description: The sales channel's name.
 *   description:
 *     type: string
 *     title: description
 *     description: The sales channel's description.
 *   is_disabled:
 *     type: boolean
 *     title: is_disabled
 *     description: Whether the sales channel is disabled.
 *   metadata:
 *     type: object
 *     description: The sales channel's metadata, used to store custom key-value pairs.
 *     externalDocs:
 *       url: https://docs.medusajs.com/api/admin#manage-metadata
 *       description: Learn how to manage metadata
 * 
*/

