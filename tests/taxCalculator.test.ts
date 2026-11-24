import assert from 'node:assert/strict';
import { test } from 'node:test';
import { estimateTaxes, type TaxScenario } from '../src/utils/taxCalculator';

const example: TaxScenario = {
  segment: 'servicos', monthlyRevenue: 45000, revenue12: 540000, payroll12: 168000,
  pisCofinsBase: 45000, localTaxes: null, employerCharges: null,
};

function calculate(changes: Partial<TaxScenario> = {}) {
  const result = estimateTaxes({ ...example, ...changes });
  assert.ok('das' in result);
  return result;
}

test('usa RBT12 real para a faixa e a folha histórica para o limite de 28%', () => {
  assert.equal(calculate().das, 4605);
  assert.equal(calculate({ payroll12: 151200 }).annex, 'III');
  assert.equal(calculate({ payroll12: 151199.99 }).annex, 'V');
  assert.equal(calculate({ segment: 'servicosIII', payroll12: 0 }).annex, 'III');
  assert.equal(calculate({ revenue12: 180000 }).bracket, 1);
  assert.equal(calculate({ revenue12: 180000.01 }).bracket, 2);
});

test('distingue os anexos de comércio e indústria e usa a base informada de PIS/Cofins', () => {
  const goods = { monthlyRevenue: 30000, revenue12: 360000, pisCofinsBase: 25000 };
  const trade = calculate({ ...goods, segment: 'comercio' });
  assert.equal(trade.das, 1695);
  assert.equal(trade.federal, 1596.5);
  assert.equal(calculate({ ...goods, segment: 'industria' }).das, 1845);
});

test('inclui adicional de IRPJ somente sobre a parcela trimestral excedente', () => {
  assert.equal(calculate({ monthlyRevenue: 62500 }).irpj, 3000);
  assert.equal(calculate({ monthlyRevenue: 75000 }).irpj, 4000);
});

test('distingue custos desconhecidos de custos iguais a zero', () => {
  assert.equal(calculate().presumedTotal, null);
  assert.equal(calculate({ localTaxes: 0 }).presumedTotal, null);
  assert.equal(calculate({ localTaxes: 0, employerCharges: 0 }).presumedTotal, 5098.5);
  assert.equal(calculate({ localTaxes: 900, employerCharges: 1250 }).presumedTotal, 7248.5);
});

test('mostra o limite do modelo sem truncar o faturamento ou produzir totais inválidos', () => {
  assert.equal(calculate({ revenue12: 3600000 }).bracket, 5);
  for (const changes of [
    { revenue12: 3600000.01 }, { monthlyRevenue: 400001 }, { revenue12: NaN },
    { payroll12: -1 }, { pisCofinsBase: 45001 }, { localTaxes: -1 },
  ]) {
    assert.ok('issue' in estimateTaxes({ ...example, ...changes }));
  }
});
