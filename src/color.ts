import randomColor from 'randomcolor';


/** Assign Random Color to an Array */
export const setRandColor = (arr: Array<any> = [], assignBorderColor = false, config: {
  luminosity: "dark" | "light" | "bright" | "random" | undefined,
  format: "rgb" | "rgba" | "hsvArray" | "hslArray" | "hsl" | "hsla" | "rgbArray" | "hex" | undefined,
  borderLum: "dark" | "light" | "bright" | "random" | undefined,
  borderFmt: "rgb" | "rgba" | "hsvArray" | "hslArray" | "hsl" | "hsla" | "rgbArray" | "hex" | undefined,
} = {
    luminosity: 'dark',
    format: 'rgb',
    borderLum: 'light',
    borderFmt: 'rgba'
  }) => {
  return arr.map(element => ({
    ...element,
    color: randomColor({
      luminosity: config.luminosity,
      format: config.format
    }),
    ...(assignBorderColor && {
      borderColor: randomColor({
        luminosity: config.borderLum,
        format: config.borderFmt
      })
    })
  }))
}