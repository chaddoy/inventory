import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  .test-border {
    border: 1px solid;
  }

  .cursor {
    &.pointer {
      cursor: pointer;
    }
  }

  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }

  .pull-right {
    float: right;
  }

  .pull-left {
    float: left;
  }

  .clearfix {
    clear: both;
  }

  .padding-10 {
    &.pad-all {
      padding: 10px;
    }

    &.pad-top {
      padding-top: 10px;
    }

    &.pad-right {
      padding-right: 10px;
    }

    &.pad-bottom {
      padding-bottom: 10px;
    }

    &.pad-left {
      padding-left: 10px;
    }
  }
`;
