import { type SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { gambiaProject } from "./gambiaProject";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, gambiaProject],
};