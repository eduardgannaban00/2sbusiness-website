// Pure unit tests for src/js/roi-formulas.js. No DOM, no build step needed —
// run directly with `node test-roi.js`.
const { computeROI, clamp } = require("./src/js/roi-formulas");

function run() {
  let pass = 0;
  let fail = 0;
  function check(label, cond) {
    if (cond) {
      console.log(`PASS  ${label}`);
      pass++;
    } else {
      console.log(`FAIL  ${label}`);
      fail++;
    }
  }
  function approx(a, b, eps) {
    return Math.abs(a - b) < (eps || 0.001);
  }

  // 1. Default values (Monthly Leads 100, Value $500, Missed 20%, Conversion 10%,
  //    Recovery 50%, Admin Hours Saved 10, Staff Cost $20, Automation Cost $399)
  const defaults = {
    monthlyLeads: 100,
    avgCustomerValue: 500,
    missedPct: 20,
    conversionPct: 10,
    recoveryPct: 50,
    adminHoursSaved: 10,
    staffHourlyCost: 20,
    automationCost: 399,
  };
  const r1 = computeROI(defaults);
  check("default: missedLeads = 20", approx(r1.missedLeads, 20));
  check("default: recoveredLeads = 10", approx(r1.recoveredLeads, 10));
  check("default: additionalCustomers = 1", approx(r1.additionalCustomers, 1));
  check("default: potentialAdditionalRevenue = $500", approx(r1.potentialAdditionalRevenue, 500));
  check("default: laborSavingsValue = $200", approx(r1.laborSavingsValue, 200));
  check("default: estimatedMonthlyValue = $700", approx(r1.estimatedMonthlyValue, 700));
  check("default: estimatedNetBenefit = $301", approx(r1.estimatedNetBenefit, 301));
  check("default: valueToCostMultiple ≈ 1.754", approx(r1.valueToCostMultiple, 700 / 399, 0.001));
  check("default: estimatedROI ≈ 75.44%", approx(r1.estimatedROI, ((700 - 399) / 399) * 100, 0.01));

  // 2. Zero automation cost — must show null (not Infinity, not a fabricated number)
  const r2 = computeROI({ ...defaults, automationCost: 0 });
  check("zero cost: valueToCostMultiple is null", r2.valueToCostMultiple === null);
  check("zero cost: estimatedROI is null", r2.estimatedROI === null);
  check("zero cost: estimatedNetBenefit still computed (= monthly value)", approx(r2.estimatedNetBenefit, r2.estimatedMonthlyValue));

  // 3. 0% missed leads — nothing to recover, revenue-recovery side is zero
  const r3 = computeROI({ ...defaults, missedPct: 0 });
  check("0% missed: missedLeads = 0", r3.missedLeads === 0);
  check("0% missed: recoveredLeads = 0", r3.recoveredLeads === 0);
  check("0% missed: potentialAdditionalRevenue = 0", r3.potentialAdditionalRevenue === 0);
  check("0% missed: estimatedMonthlyValue = laborSavingsValue only", approx(r3.estimatedMonthlyValue, r3.laborSavingsValue));

  // 4. 0% recovery rate — same idea, recovery-side path zeroed out
  const r4 = computeROI({ ...defaults, recoveryPct: 0 });
  check("0% recovery: recoveredLeads = 0", r4.recoveredLeads === 0);
  check("0% recovery: additionalCustomers = 0", r4.additionalCustomers === 0);
  check("0% recovery: potentialAdditionalRevenue = 0", r4.potentialAdditionalRevenue === 0);

  // 5. Boundary/clamped inputs — values outside range get clamped, not passed through raw
  const r5 = computeROI({
    monthlyLeads: -50, // below min → clamp to 0
    avgCustomerValue: 999999999, // above max → clamp to 50000
    missedPct: 150, // above 100 → clamp to 100
    conversionPct: -10, // below 0 → clamp to 0
    recoveryPct: 500, // above 100 → clamp to 100
    adminHoursSaved: 99999, // above max → clamp to 200
    staffHourlyCost: -5, // below 0 → clamp to 0
    automationCost: -100, // below 0 → clamp to 0
  });
  check("clamp: monthlyLeads clamped to 0", r5.inputs.monthlyLeads === 0);
  check("clamp: avgCustomerValue clamped to 50000", r5.inputs.avgCustomerValue === 50000);
  check("clamp: missedPct clamped to 100", r5.inputs.missedPct === 100);
  check("clamp: conversionPct clamped to 0", r5.inputs.conversionPct === 0);
  check("clamp: recoveryPct clamped to 100", r5.inputs.recoveryPct === 100);
  check("clamp: adminHoursSaved clamped to 200", r5.inputs.adminHoursSaved === 200);
  check("clamp: staffHourlyCost clamped to 0", r5.inputs.staffHourlyCost === 0);
  check("clamp: automationCost clamped to 0", r5.inputs.automationCost === 0);
  check("clamp: NaN/non-numeric falls back to the range minimum", clamp("abc", 5, 10) === 5);
  check("clamp: undefined falls back to the range minimum", clamp(undefined, 3, 9) === 3);

  // 6. Decimal values — math should handle fractional inputs cleanly
  const r6 = computeROI({
    monthlyLeads: 87.5,
    avgCustomerValue: 412.25,
    missedPct: 17.5,
    conversionPct: 8.25,
    recoveryPct: 33.3,
    adminHoursSaved: 6.5,
    staffHourlyCost: 18.75,
    automationCost: 399,
  });
  const expectedMissed = 87.5 * 0.175;
  const expectedRecovered = expectedMissed * 0.333;
  const expectedCustomers = expectedRecovered * 0.0825;
  const expectedRevenue = expectedCustomers * 412.25;
  const expectedLabor = 6.5 * 18.75;
  check("decimals: missedLeads matches hand-computed value", approx(r6.missedLeads, expectedMissed));
  check("decimals: recoveredLeads matches hand-computed value", approx(r6.recoveredLeads, expectedRecovered));
  check("decimals: potentialAdditionalRevenue matches hand-computed value", approx(r6.potentialAdditionalRevenue, expectedRevenue, 0.01));
  check("decimals: laborSavingsValue matches hand-computed value", approx(r6.laborSavingsValue, expectedLabor, 0.01));

  // 7. Net benefit calculation, independently re-derived
  const r7 = computeROI(defaults);
  const handNetBenefit = r7.estimatedMonthlyValue - defaults.automationCost;
  check("net benefit: estimatedNetBenefit = estimatedMonthlyValue - automationCost", approx(r7.estimatedNetBenefit, handNetBenefit));

  // 8. Value-to-cost calculation, independently re-derived
  const handMultiple = r7.estimatedMonthlyValue / defaults.automationCost;
  check("value-to-cost: matches estimatedMonthlyValue / automationCost", approx(r7.valueToCostMultiple, handMultiple));

  // 9. True ROI percentage calculation, independently re-derived
  const handROI = ((r7.estimatedMonthlyValue - defaults.automationCost) / defaults.automationCost) * 100;
  check("ROI %: matches ((value - cost) / cost) × 100", approx(r7.estimatedROI, handROI, 0.01));

  // Extra: conversion rate is never assumed to improve — recovered leads use
  // the SAME conversionPct as the rest of the business, not a boosted one.
  const rSameRate = computeROI({ ...defaults, conversionPct: 25 });
  const expectedCustomersAtSameRate = defaults.monthlyLeads * (defaults.missedPct / 100) * (defaults.recoveryPct / 100) * 0.25;
  check(
    "recovered leads convert at the same stated rate, not a boosted one",
    approx(rSameRate.additionalCustomers, expectedCustomersAtSameRate)
  );

  console.log(`\n${pass} passed, ${fail} failed.`);
  process.exit(fail > 0 ? 1 : 0);
}

run();
