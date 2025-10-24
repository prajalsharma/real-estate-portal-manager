import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Real Estate Portal')
    .items([
      S.listItem()
        .title('All Properties')
        .icon(() => '🏠')
        .child(S.documentTypeList('property').title('All Properties')),
      S.listItem()
        .title('Featured Properties')
        .icon(() => '⭐')
        .child(
          S.documentList()
            .title('Featured Properties')
            .filter('_type == "property" && featured == true')
        ),
      S.listItem()
        .title('Carousel Properties')
        .icon(() => '🖼️')
        .child(
          S.documentList()
            .title('Carousel Properties')
            .filter('_type == "property" && carousel == true')
        ),
      S.listItem()
        .title('Agents')
        .icon(() => '👥')
        .child(S.documentTypeList('agent').title('All Agents')),
    ])
