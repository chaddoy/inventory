import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  .publiclayout {
    height: 100vh;

    .publiclayout-header {
      color: #FFF;
    }

    .publiclayout-logo {
      width: 120px;
      height: 31px;
      background: rgba(255,255,255,.2);
      margin: 16px 24px 16px 0;
      float: left;
    }

    .publiclayout-content {
      background-color: #f0f2f5;
    }

    .publiclayout-footer {
      text-align: center;
    }
  }
`;
