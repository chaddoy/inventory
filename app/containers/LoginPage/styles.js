import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  .loginpage-wrapper {
    width: 100%;
    height: 100%;

    .loginpage {
      position: relative;
      top: 40vh;
      transform: translatey(-50%);

      .loginpage-form-forgot {
        float: right;
      }
      .loginpage-form-button {
        width: 100%;
      }
    }
  }
`;
