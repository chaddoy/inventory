import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  .adminlayout {
    .adminlayout-trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
    }

    .adminlayout-trigger:hover {
      color: #1890ff;
    }

    .adminlayout-logo {
      height: 32px;
      background: rgba(255,255,255,.2);
      margin: 16px;
    }
  }
`;
