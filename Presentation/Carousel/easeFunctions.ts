/**
 * Easing functions for animation. More options: https://easings.net/#
 */

/**
 * Linear easing
 */
export function linear(x: number) {
  return x
}

/**
 * https://easings.net/#easeInOutCubic
 */
export function easeInOutCubic(x: number) {
  if (x < 0.5) {
    return 4 * x * x * x
  }
  return 1 - Math.pow(-2 * x + 2, 3) / 2
}
