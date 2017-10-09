export const customersEdit = `
  mutation customersEdit($_id: String!, $name: String, $email: String, $phone: String) {
    customersEdit(_id: $_id, name: $name, email: $email, phone: $phone) {
      name
      email
      phone
    }
  }
`;
