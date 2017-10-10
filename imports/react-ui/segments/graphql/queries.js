const segmentFields = `
  _id
  name
  description
  subOf
  color
  connector
  conditions
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

export const segmentsGetFields = `
  query segmentsGetFields($kind: String) {
    segmentsGetFields(kind: $kind) {
      name
      label
    }
  }
`;
