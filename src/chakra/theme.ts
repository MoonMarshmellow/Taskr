import { extendTheme } from "@chakra-ui/react"
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#d6f5f5",
      200: "#191a1a",
      300: "#38cccc",
      400: "#082020",
      500: "#e70878"

    },
  },
  fonts: {
    body: "Open Sans, sans-serif"
  },
  styles: {
    global: () => ({
        body: {
            bg: "#191a1a"
        }
    })
  },
  shadows: {
    custom: '0px 5px 40px 4px rgba(56, 204, 204, 0.3)'
  }
})