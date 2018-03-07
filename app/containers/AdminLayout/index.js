/**
 *
 * AdminLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Layout, Menu, Icon, Avatar, Row, Col, Dropdown, Badge } from 'antd';
import FontAwesome from 'react-fontawesome';

import { makeSelectUser } from 'containers/App/selectors';
import messages from './messages';
import './styles';

const { Header, Content, Footer, Sider } = Layout;

export class AdminLayout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Edit Profile</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Sign out</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="adminlayout">
        <Layout style={{ height: '100vh' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="adminlayout-logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1">
                <FontAwesome className="padding-10 pad-right" name="user-o" />
                <span className="nav-text">Users</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">nav 3</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">nav 4</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <FormattedMessage {...messages.header} />
                  </Col>
                  <Col
                    className="padding-10 pad-left pad-right"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    <div
                      className="pull-right text-center"
                      style={{
                        paddingTop: '0px',
                        width: '60px',
                        height: '64px',
                      }}
                    >
                      <Badge count={0}>
                        <FontAwesome name="group" size="2x" />
                        <FontAwesome name="caret-right" />
                      </Badge>
                    </div>
                    <div
                      className="pull-right text-center"
                      style={{
                        paddingTop: '0px',
                        width: '60px',
                        height: '64px',
                      }}
                    >
                      <Badge count={100}>
                        <FontAwesome name="bell-o" size="2x" />
                      </Badge>
                    </div>
                    <div
                      className="pull-right padding-10 pad-left pad-right"
                    >
                      <Dropdown
                        overlay={menu}
                        placement="bottomRight"
                        trigger={['click']}
                      >
                        <div>
                          <span className="padding-10 pad-right">
                            {(this.props.user || {}).lastName}
                          </span>
                          <Avatar
                            shape="square"
                            src={(this.props.user || {}).avatar}
                            style={{ border: '1px solid !important' }}
                          />
                        </div>
                      </Dropdown>
                    </div>
                  </Col>
                </Row>
              </div>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                id="component-wrapper"
                style={{ padding: 24, background: '#fff', minHeight: 360 }}
              >
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <FormattedMessage {...messages.footer} />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

AdminLayout.propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(AdminLayout);
