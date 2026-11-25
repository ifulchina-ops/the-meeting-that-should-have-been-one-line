// The Meeting That Should Have Been One Line.
// One sentence that could have replaced an entire pointless meeting.
// The program composes the line from its parts, gates it, and writes it
// deterministically to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SETUP = "Nine people spent an hour deciding nothing, ";
const DECISION = "so I decided for everyone: we're not doing it, ";
const STING = "and this sentence was the meeting.";

const line = SETUP + DECISION + STING;

// The gate mirrors the competition's own gate: entry.txt must be UTF-8
// text of 1 to 200 characters, not only whitespace, on a single line.
// Anything outside that range is a bug in this program, so fail loudly
// instead of writing an entry the judge would never see.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (line.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(line);
