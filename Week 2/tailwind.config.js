/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Drag and Drop/**/*.{html,js}","./to-do/**/*.{html,js}","./Kanban Board/**/*.{html,js}"],
  theme: {
    extend: {backgroundImage:{'radial-blue': 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(96,165,250,1) 100%)',} },
  },
  plugins: [],
}

