import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Real Estate Portal')
    .items([
      // Properties section
      S.listItem()
        .title('Properties')
        .icon(() => '🏠')
        .child(
          S.list()
            .title('Properties')
            .items([
              S.listItem()
                .title('All Properties')
                .child(S.documentTypeList('property').title('All Properties')),
              S.listItem()
                .title('Featured Properties')
                .child(
                  S.documentList()
                    .title('Featured Properties')
                    .filter('_type == "property" && featured == true')
                ),
              S.listItem()
                .title('For Sale')
                .child(
                  S.documentList()
                    .title('For Sale')
                    .filter('_type == "property" && status == "For Sale"')
                ),
              S.listItem()
                .title('For Rent')
                .child(
                  S.documentList()
                    .title('For Rent')
                    .filter('_type == "property" && status == "For Rent"')
                ),
              S.listItem()
                .title('Sold/Rented')
                .child(
                  S.documentList()
                    .title('Sold/Rented')
                    .filter('_type == "property" && (status == "Sold" || status == "Rented")')
                ),
            ])
        ),

      // Agents section
      S.listItem()
        .title('Agents')
        .icon(() => '👥')
        .child(
          S.list()
            .title('Agents')
            .items([
              S.listItem()
                .title('All Agents')
                .child(S.documentTypeList('agent').title('All Agents')),
              S.listItem()
                .title('Featured Agents')
                .child(
                  S.documentList()
                    .title('Featured Agents')
                    .filter('_type == "agent" && featured == true')
                ),
              S.listItem()
                .title('Active Agents')
                .child(
                  S.documentList()
                    .title('Active Agents')
                    .filter('_type == "agent" && active == true')
                ),
            ])
        ),

      // Blog section
      S.listItem()
        .title('Blog')
        .icon(() => '📝')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('All Posts')
                .child(S.documentTypeList('blogPost').title('All Posts')),
              S.listItem()
                .title('Published Posts')
                .child(
                  S.documentList()
                    .title('Published Posts')
                    .filter('_type == "blogPost" && draft != true')
                ),
              S.listItem()
                .title('Draft Posts')
                .child(
                  S.documentList()
                    .title('Draft Posts')
                    .filter('_type == "blogPost" && draft == true')
                ),
              S.listItem()
                .title('Featured Posts')
                .child(
                  S.documentList()
                    .title('Featured Posts')
                    .filter('_type == "blogPost" && featured == true')
                ),
              S.divider(),
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category').title('Categories')),
            ])
        ),

      // Locations section
      S.listItem()
        .title('Locations')
        .icon(() => '📍')
        .child(
          S.list()
            .title('Locations')
            .items([
              S.listItem()
                .title('All Locations')
                .child(S.documentTypeList('location').title('All Locations')),
              S.listItem()
                .title('Featured Locations')
                .child(
                  S.documentList()
                    .title('Featured Locations')
                    .filter('_type == "location" && featured == true')
                ),
            ])
        ),

      // Settings section (if you want to add site settings later)
      S.divider(),
      
      // Remaining document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['property', 'agent', 'blogPost', 'category', 'location'].includes(listItem.getId()!)
      ),
    ])