export const companiesAdd = `
  mutation companiesAdd($name: String!, $website: String) {
    companiesAdd(name: $name, website: $website) {
      _id
    }
  }
`;

export const companiesEdit = `
  mutation companiesEdit(
    $_id: String!,
    $name: String!,
    $size: Int,
    $industry: String,
    $website: String,
    $plan: String,
    $customFieldsData: JSON
    $tagIds: [String]
  ) {

    companiesEdit(
      _id: $_id,
      name: $name,
      size: $size,
      industry: $industry,
      website: $website,
      plan: $plan,
      tagIds: $tagIds,
      customFieldsData: $customFieldsData
    ) {
      name
    }
  }
`;
