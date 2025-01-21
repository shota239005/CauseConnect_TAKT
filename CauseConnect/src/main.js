import { createApp } from 'vue';
import App from './App.vue'; // App.vue をインポート
import router from './router'; // 作成した router をインポート
import Sarch from '@/components/search.vue'; // 作成した router をインポート
import './styles/button.css'; // グローバルに読み込む
import './styles/button_Not.css'; // グローバルに読み込む
import './styles/syusshi.css'; // グローバルに読み込む
import './styles/jikko.css'; // グローバルに読み込む
import RealTimeClock from './components/RealTimeClock.vue';
import './assets/globalFont.css'//グローバルフォント統一;
import Juggler from './components/Juggler.vue';//おまけ
import CopyLight from '@/components/CopyLight.vue';
import Detail from './views/Detail/Detail.vue';


createApp(App)
  .use(router) // router を使用
  .mount('#app'); // #app 要素にマウント
