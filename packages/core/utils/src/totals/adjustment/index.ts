import { AdjustmentLineDTO, BigNumberInput } from "@medusajs/types"
import { isDefined } from "../../common"
import { BigNumber } from "../big-number"
import { MathBN } from "../math"

export function calculateAdjustmentTotal({
  adjustments,
  taxRate,
}: {
  adjustments: Pick<AdjustmentLineDTO, "amount" | "is_tax_inclusive">[]
  taxRate?: BigNumberInput
}) {
  // the sum of all adjustment amounts excluding tax
  let adjustmentsSubtotal = MathBN.convert(0)
  // the sum of all adjustment amounts including tax
  let adjustmentsTotal = MathBN.convert(0)
  // the sum of all taxes on subtotals
  let adjustmentsTaxTotal = MathBN.convert(0)

  for (const adj of adjustments) {
    if (!isDefined(adj.amount)) {
      continue
    }

    const adjustmentSubtotal =
      isDefined(taxRate) && adj.is_tax_inclusive
        ? MathBN.div(adj.amount, MathBN.add(1, taxRate))
        : adj.amount

    const adjustmentTaxTotal = isDefined(taxRate)
      ? MathBN.mult(adjustmentSubtotal, taxRate)
      : 0
    const adjustmentTotal = MathBN.add(adjustmentSubtotal, adjustmentTaxTotal)

    adjustmentsSubtotal = MathBN.add(adjustmentsSubtotal, adjustmentSubtotal)
    adjustmentsTaxTotal = MathBN.add(adjustmentsTaxTotal, adjustmentTaxTotal)
    adjustmentsTotal = MathBN.add(adjustmentsTotal, adjustmentTotal)

    adj["subtotal"] = new BigNumber(adjustmentsSubtotal)
    adj["total"] = new BigNumber(adjustmentsTotal)
  }

  return {
    adjustmentsTotal,
    adjustmentsSubtotal,
    adjustmentsTaxTotal,
  }
}
