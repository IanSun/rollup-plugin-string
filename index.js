import { readFile } from "node:fs/promises";
import { createFilter } from "@rollup/pluginutils";
import { SourceNode } from "source-map";

const OFFSET_BASE = 0,
      LINE_BASE = 1, COLUMN_BASE = 0;
const BACKSPACE = "\u0008",
      CARRIAGE_RETURN = "\u000d",
      CHARACTER_TABULATION = "\u0009",
      FORM_FEED = "\u000c",
      LINE_FEED = "\u000a",
      QUOTATION_MARK = "\u0022",
      REVERSE_SOLIDUS = "\u005c",
      SOLIDUS = "\u002f";
const ESCAPE_CHARACTER = [BACKSPACE, CARRIAGE_RETURN, CHARACTER_TABULATION, FORM_FEED, LINE_FEED, QUOTATION_MARK, REVERSE_SOLIDUS, SOLIDUS];

/** @type {import("./index").default} */
export default function (options = {}) {
  const filter = createFilter(
    options.include,
    options.exclude,
  );

  return {
    name: "string",
    async load (id) {
      if (filter(id)) {
        const code = await readFile(id, "utf8");
        const result = transform(code, id);

        return result;
      }
    },
  };
}

/**
 * @param {string} code
 * @param {string} id
 * @return {import("rollup").SourceDescription}
 */
function transform (code, id) {
  const sourceNode = new SourceNode(LINE_BASE, COLUMN_BASE, id);

  const ITERATION_BASE = 1;
  let line = LINE_BASE, column = COLUMN_BASE;
  for (
    let index = OFFSET_BASE, { [index]: character } = code;
    character;
    { [index += ITERATION_BASE]: character } = code
  ) {
    sourceNode.add(
      new SourceNode(
        line,
        column,
        id,
        ESCAPE_CHARACTER.includes(character)
          ? JSON
            .stringify(character)
            .slice(QUOTATION_MARK.length, -QUOTATION_MARK.length)
          : character,
      ),
    );

    switch (character) {
    case LINE_FEED:
      line += ITERATION_BASE;
      column = COLUMN_BASE;
      break;

    default:
      column += ITERATION_BASE;
    }
  }
  sourceNode.prepend(`export default ${ QUOTATION_MARK }`);
  sourceNode.add(`${ QUOTATION_MARK };${ LINE_FEED }`);

  const result = sourceNode.toStringWithSourceMap();
  const map = result.map.toJSON();

  return {
    code: result.code,
    map: {
      mappings: map.mappings,
      sources: map.sources,
    },
  };
}
