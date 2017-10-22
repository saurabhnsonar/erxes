import React from 'react';
import PropTypes from 'prop-types';
import {
  ButtonToolbar,
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap';

const propTypes = {
  addCompany: PropTypes.func.isRequired
};

const contextTypes = {
  closeModal: PropTypes.func.isRequired
};

class CompanyForm extends React.Component {
  constructor(props) {
    super(props);

    this.addCompany = this.addCompany.bind(this);
  }

  addCompany(e) {
    e.preventDefault();

    this.props.addCompany({
      doc: {
        name: document.getElementById('company-name').value,
        website: document.getElementById('company-website').value
      },

      callback: () => {
        this.context.closeModal();
      }
    });
  }

  render() {
    const onClick = () => {
      this.context.closeModal();
    };

    return (
      <form onSubmit={this.addCompany}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl id="company-name" type="text" required />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Website</ControlLabel>
          <FormControl id="company-website" type="text" required />
        </FormGroup>

        <Modal.Footer>
          <ButtonToolbar className="pull-right">
            <Button bsStyle="link" onClick={onClick}>
              Cancel
            </Button>

            <Button type="submit" bsStyle="primary">
              Save
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </form>
    );
  }
}

CompanyForm.propTypes = propTypes;
CompanyForm.contextTypes = contextTypes;

export default CompanyForm;