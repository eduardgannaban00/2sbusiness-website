/**
 * Pure ROI/lead-recovery calculation functions. No DOM, no globals besides
 * the UMD export below — this is what makes the math unit-testable from
 * Node (see test-roi.js) while also running unchanged in the browser.
 *
 * Formulas (documented here and in the final report — nothing hidden):
 *   missedLeads                 = monthlyLeads * (missedPct / 100)
 *   recoveredLeads               = missedLeads * (recoveryPct / 100)
 *   additionalCustomers          = recoveredLeads * (conversionPct / 100)
 *   potentialAdditionalRevenue   = additionalCustomers * avgCustomerValue
 *   laborSavingsValue            = adminHoursSaved * staffHourlyCost
 *   estimatedMonthlyValue        = potentialAdditionalRevenue + laborSavingsValue
 *   estimatedNetBenefit          = estimatedMonthlyValue - automationCost
 *   valueToCostMultiple          = automationCost > 0 ? estimatedMonthlyValue / automationCost : null
 *   estimatedROI (%)             = automationCost > 0 ? ((estimatedMonthlyValue - automationCost) / automationCost) * 100 : null
 *
 * Recovered leads are deliberately converted at the business's OWN current
 * conversion rate — automation is never assumed to also improve conversion.
 * valueToCostMultiple/estimatedROI are null (not 0, not Infinity) when
 * automationCost is 0, so display code can show "—" rather than a
 * fabricated or divide-by-zero figure.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ROIFormulas = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function clamp(n, min, max) {
    if (typeof n !== "number" || isNaN(n) || !isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  }

  // Bounds mirror the calculator's own input min/max attributes.
  var BOUNDS = {
    monthlyLeads: [0, 1000],
    avgCustomerValue: [0, 50000],
    missedPct: [0, 100],
    conversionPct: [0, 100],
    recoveryPct: [0, 100],
    adminHoursSaved: [0, 200],
    staffHourlyCost: [0, 500],
    automationCost: [0, 50000],
  };

  function computeROI(raw) {
    raw = raw || {};
    var monthlyLeads = clamp(raw.monthlyLeads, BOUNDS.monthlyLeads[0], BOUNDS.monthlyLeads[1]);
    var avgCustomerValue = clamp(raw.avgCustomerValue, BOUNDS.avgCustomerValue[0], BOUNDS.avgCustomerValue[1]);
    var missedPct = clamp(raw.missedPct, BOUNDS.missedPct[0], BOUNDS.missedPct[1]);
    var conversionPct = clamp(raw.conversionPct, BOUNDS.conversionPct[0], BOUNDS.conversionPct[1]);
    var recoveryPct = clamp(raw.recoveryPct, BOUNDS.recoveryPct[0], BOUNDS.recoveryPct[1]);
    var adminHoursSaved = clamp(raw.adminHoursSaved, BOUNDS.adminHoursSaved[0], BOUNDS.adminHoursSaved[1]);
    var staffHourlyCost = clamp(raw.staffHourlyCost, BOUNDS.staffHourlyCost[0], BOUNDS.staffHourlyCost[1]);
    var automationCost = clamp(raw.automationCost, BOUNDS.automationCost[0], BOUNDS.automationCost[1]);

    var missedLeads = monthlyLeads * (missedPct / 100);
    var recoveredLeads = missedLeads * (recoveryPct / 100);
    var additionalCustomers = recoveredLeads * (conversionPct / 100);
    var potentialAdditionalRevenue = additionalCustomers * avgCustomerValue;
    var laborSavingsValue = adminHoursSaved * staffHourlyCost;
    var estimatedMonthlyValue = potentialAdditionalRevenue + laborSavingsValue;
    var estimatedNetBenefit = estimatedMonthlyValue - automationCost;
    var valueToCostMultiple = automationCost > 0 ? estimatedMonthlyValue / automationCost : null;
    var estimatedROI =
      automationCost > 0 ? ((estimatedMonthlyValue - automationCost) / automationCost) * 100 : null;

    return {
      // echo back the clamped inputs so display code never needs to
      // re-derive or guess what was actually used in the math
      inputs: {
        monthlyLeads: monthlyLeads,
        avgCustomerValue: avgCustomerValue,
        missedPct: missedPct,
        conversionPct: conversionPct,
        recoveryPct: recoveryPct,
        adminHoursSaved: adminHoursSaved,
        staffHourlyCost: staffHourlyCost,
        automationCost: automationCost,
      },
      missedLeads: missedLeads,
      recoveredLeads: recoveredLeads,
      additionalCustomers: additionalCustomers,
      potentialAdditionalRevenue: potentialAdditionalRevenue,
      laborSavingsValue: laborSavingsValue,
      estimatedMonthlyValue: estimatedMonthlyValue,
      estimatedNetBenefit: estimatedNetBenefit,
      valueToCostMultiple: valueToCostMultiple,
      estimatedROI: estimatedROI,
    };
  }

  return { clamp: clamp, computeROI: computeROI, BOUNDS: BOUNDS };
});
