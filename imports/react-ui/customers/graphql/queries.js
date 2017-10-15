const customerFields = `
    _id
    name
    email
    phone
    isUser
    integrationId
    createdAt

    customFieldsData
    messengerData
    twitterData
    facebookData

    tagIds
    getTags {
      _id
      name
      colorCode
    }
`;

export const customers = `
  query customers($params: CustomerListParams) {
    customers(params: $params) {
      ${customerFields}
    }
  }
`;

export const customerCounts = `
  query customerCounts($params: CustomerListParams) {
    customerCounts(params: $params)
  }
`;

export const customerDetail = `
  query customerDetail($_id: String!) {
    customerDetail(_id: $_id) {
      ${customerFields}
      companies {
        _id
        name
      }
      conversations {
        _id
        content
        tags {
          _id
          name
        }
      }
    }
  }
`;

export const brands = `
  query brands {
    brands {
      _id
      name
    }
  }
`;

export const tags = `
  query tags($type: String) {
    tags(type: $type) {
      _id
      name
      colorCode
    }
  }
`;

export const totalCustomersCount = `
  query totalCustomersCount {
    customersTotalCount
  }
`;

export const fields = `
  query {
    fields(contentType: "customer") {
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

export const customersListConfig = `
  query {
    fieldsDefaultColumnsConfig(contentType: "customer") {
      name
      label
      order
    }
  }
`;
