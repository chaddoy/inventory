/**
 *
 * PublicLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Layout, Row, Col } from 'antd';

import './styles';

const { Header, Content, Footer } = Layout;

export function PublicLayout(props) {
  return (
    <Layout className="publiclayout">
      <Header>
        <Row>
          <Col xs={0} sm={0} md={0} lg={2} xl={3}></Col>
          <Col xs={24} sm={24} md={24} lg={20} xl={18}>
            <div className="publiclayout-header padding-10 pad-left pad-right">
              <div className="publiclayout-logo" />
              <div className="clearfix"></div>
            </div>
          </Col>
          <Col xs={0} sm={0} md={0} lg={2} xl={3}></Col>
        </Row>
      </Header>

      <Content className="publiclayout-content">
        <Row>
          <Col xs={0} sm={24} md={0} lg={0} xl={0}>
            <br />
            <br />
          </Col>
        </Row>
        {props.children}
        <Row>
          <Col xs={0} sm={24} md={0} lg={0} xl={0}>
            <br />
          </Col>
        </Row>
      </Content>

      <Footer className="publiclayout-footer">
        TritonTek, Inc. ©2016 Created by Web Team
      </Footer>
    </Layout>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

const withConnect = connect(null, null);

export default compose(
  withConnect,
)(PublicLayout);
