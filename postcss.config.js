// module.exports = {
//   plugins: [
//     require("tailwindcss"),
//     require("autoprefixer"),
//     require("postcss-import"),

//     process.env.NODE_ENV === "production" &&
//       require("cssnano")({
//         preset: "default",
//       }),
//   ],
// };

module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {
      flexbox: "no-2009",
    },
    "postcss-url": {
    },
  },
};
