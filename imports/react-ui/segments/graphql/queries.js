const segmentFields = `
  _id
  name
  description
  subOf
  color
  connector
  conditions
`;

export const segments = `
  query segments($contentType: String!) {
    segments(contentType: $contentType) {
      ${segmentFields}

      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

export const segmentDetail = `
  query segmentDetail($_id: String) {
    segmentDetail(_id: $_id) {
      ${segmentFields}
      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

export const headSegments = `
  query headSegments {
    segmentsGetHeads {
      ${segmentFields}
      getSubSegments {
        ${segmentFields}
      }
    }
  }
`;

export const combinedFields = `
  query fieldsCombinedByContentType($contentType: String!) {
    fieldsCombinedByContentType(contentType: $contentType)
  }
`;
