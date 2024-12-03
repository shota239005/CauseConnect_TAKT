// import axios from 'axios';

// // バックエンドのIPアドレスとポートを指定
// axios.defaults.baseURL = 'http://172.16.3.136:8000/api';  // Laravelのバックエンド

// export default axios;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://172.16.3.136:8000/api',  // APIのベースURLを設定
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
