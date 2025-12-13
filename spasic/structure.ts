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
      S.divider(),
      S.listItem()
        .title('Blog Posts')
        .icon(() => '📝')
        .child(S.documentTypeList('blogPost').title('All Blog Posts')),
      S.listItem()
        .title('Featured Blog Posts')
        .icon(() => '⭐')
        .child(
          S.documentList()
            .title('Featured Blog Posts')
            .filter('_type == "blogPost" && featured == true')
        ),
      S.listItem()
        .title('Categories')
        .icon(() => '📂')
        .child(S.documentTypeList('category').title('All Categories')),
      S.listItem()
        .title('Locations')
        .icon(() => '📍')
        .child(S.documentTypeList('location').title('All Locations')),
      S.listItem()
        .title('Featured Locations')
        .icon(() => '⭐')
        .child(
          S.documentList()
            .title('Featured Locations')
            .filter('_type == "location" && featured == true')
        ),
    ])
