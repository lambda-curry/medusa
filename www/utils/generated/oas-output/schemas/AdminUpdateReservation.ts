/**
 * @schema AdminUpdateReservation
 * type: object
 * description: The properties to update in the reservation.
 * properties:
 *   location_id:
 *     type: string
 *     title: location_id
 *     description: The ID of the associated location.
 *   quantity:
 *     type: number
 *     title: quantity
 *     description: The reserved quantity.
 *   description:
 *     type: string
 *     title: description
 *     description: The reservation's description.
 *   metadata:
 *     type: object
 *     description: The reservation's metadata. Can hold custom key-value pairs.
 *     externalDocs:
 *       url: https://docs.medusajs.com/api/admin#manage-metadata
 *       description: Learn how to manage metadata
 * x-schemaName: AdminUpdateReservation
 * 
*/

