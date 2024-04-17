import { cpSync, mkdirSync, writeFileSync } from "fs";
import { rimrafSync } from "rimraf";
import { pages } from "../website";

rimrafSync("./web");

pages.map((page) => {
  mkdirSync(`./web${page.path}`, { recursive: true });
  mkdirSync(`./web/fr${page.path}`, { recursive: true });

  writeFileSync(`./web${page.path}/index.html`, page.en);
  writeFileSync(`./web/fr${page.path}/index.html`, page.fr);
});

cpSync("./src/assets", "./web/public", { recursive: true });
