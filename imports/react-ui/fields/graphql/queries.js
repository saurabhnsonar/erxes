export const fields = `
  query fields($contentType: String!, $contentTypeId: String) {
    fields(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
      type
      validation
      text
      description
      options
      isRequired
      order
    }
  }
`;

export const fieldsDefaultColumnsConfig = `
  query {
    fieldsDefaultColumnsConfig {
      name
      label
      order
    }
  }
`;
