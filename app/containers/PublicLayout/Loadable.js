/**
 *
 * Asynchronously loads the component for PublicLayout
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
