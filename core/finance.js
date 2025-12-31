// VOO long-term average ~10% nominal
const VOO_RETURN = 0.10;

export function futureValue(amount, years) {
  return amount * Math.pow(1 + VOO_RETURN, years);
}
