import { type SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { gambiaProject } from "./gambiaProject";
import { classroomItem } from "./classroomItem";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, gambiaProject, classroomItem],
};
