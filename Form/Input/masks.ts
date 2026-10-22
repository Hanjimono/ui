import { maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin } from "@maskito/kit"
import type { InputMask } from "./types"

/**
 * Ready-made input masks.
 */
export const inputMasks = {
  phone: {
    focusValue: "+7-(",
    options: {
      mask: [
        "+",
        "7",
        "-",
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        "-",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/
      ],
      preprocessors: [
        ({ elementState, data }) => {
          // Paste handling so a phone can be pasted from another
          // source in any format
          const digits = data.replace(/\D/g, "")
          if (digits.length < 10) {
            return { elementState, data }
          }

          // 11 digits starting with 7 or 8 — country code. Only 10 national digits go into the mask.
          const national =
            digits.length >= 11 && (digits.startsWith("7") || digits.startsWith("8"))
              ? digits.slice(1, 11)
              : digits.slice(0, 10)

          return { elementState, data: national }
        }
      ],
      plugins: [maskitoAddOnFocusPlugin("+7-("), maskitoRemoveOnBlurPlugin("+7-(")]
    },
    formatter: (value) => {
      const digits = value.replace(/\D/g, "")
      const national = digits.startsWith("7") ? digits.slice(1) : digits

      return national ? `+7${national}` : ""
    }
  }
} satisfies Record<string, InputMask>
