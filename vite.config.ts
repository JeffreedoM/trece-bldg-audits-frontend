import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // eslint-disable-next-line no-undef
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: {
      "process.env": env,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
