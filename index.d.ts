import type { PluginImpl } from "rollup";
import type { FilterPattern } from "@rollup/pluginutils";

interface RollupPluginStringOptions {
  exclude?: FilterPattern;
  include?: FilterPattern;
}

type RollupPluginString = PluginImpl<RollupPluginStringOptions>;

export default RollupPluginString;
export { RollupPluginStringOptions };
