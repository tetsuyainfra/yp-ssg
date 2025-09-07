import { rimraf, rimrafSync, native, nativeSync } from "rimraf";

const target = process.env.OUTPUT_DIR || "build/_site";

if (!target) {
  console.error("TARGET_DIR is not defined");
  process.exit(1);
}

// await rimraf(target, (err) => {
//   if (err) {
//     console.error("Failed to delete:", err);
//     process.exit(1);
//   } else {
//     console.log("Deleted:", target);
//   }
// });
rimraf(target, { glob: true }).then(
  (r) => {
    console.log("deleted: ", target);
  },
  (e) => {
    console.error("Failed to delete:", e);
    process.exit(1);
  }
);
