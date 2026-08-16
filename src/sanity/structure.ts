import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('MIRIT content')
    .items([
      S.documentTypeListItem('classroomItem').title('Gambia Classroom'),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'classroomItem'),
    ])
