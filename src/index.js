import dva from 'dva';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

import './utils/globalFunction';
import './index.less';

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }), // 去掉路由中_k
  onError(error) {
    console.error('app onError -- ', error);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/apps'));
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
