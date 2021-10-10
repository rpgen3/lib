// https://qiita.com/artox/items/efae08b33259bb631ed9
/**
 * @param {number} start
 * @param {number} end
 * @param {number} [step = 1]
 * @returns {{ start: number, end: number, step: number, [Symbol.iterator](): Generator<number, void, unknown> }}
 */
export const range = (start, end, step = 1) => {
  // range()
  if (typeof start === 'undefined' && typeof end === 'undefined') {
    throw new TypeError('range expected at least 1 argument, got 0')
  }

  // overload range(end)
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }

  /**
   * @type {number}
   */
  const max = (
    (
      step === 0 ||
      (start > end && step > -1) ||
      (start < end && step < 0)
    )
      ? 0
      : Math.abs(Math.ceil((end - start) / step))
  )

  return {
    start,
    end,
    step,
    *[Symbol.iterator]() {
      for (let i = 0; i < max; i++) {
        yield start + step * i
      }
    }
  }
}
