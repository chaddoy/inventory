/**
 *
 * PublicLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import messages from './messages';

export function PublicLayout(props) {
  return (
    <div>
      <FormattedMessage {...messages.header} />
      {props.children}
    </div>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

const withConnect = connect(null, null);

export default compose(
  withConnect,
)(PublicLayout);
