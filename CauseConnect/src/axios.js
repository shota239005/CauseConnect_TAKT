// import axios from 'axios';

// // バックエンドのIPアドレスとポートを指定
// axios.defaults.baseURL = 'http://172.16.3.136:8000/api';  // Laravelのバックエンド

// export default axios;

import axios from 'axios';

// APIのベースURLを設定
const apiClient = axios.create({
   baseURL: 'http://172.16.3.135:8000/api',  // 環境変数を利用
  //baseURL: 'http://127.0.0.1:8000/api',  // 自宅用


  headers: {
    'Content-Type': 'application/json',  // JSONデータ送信
  },
});


// リクエストインターセプターでトークンを自動的に追加
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ローカルストレージからトークンを取得
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // トークンをヘッダーに追加
    }
    return config;
  },
  (error) => {
    // リクエストエラー時にログを出力
    console.error('Request error:', error);
    return Promise.reject(error); // エラーをそのまま返す
  }
);

// レスポンスインターセプター（エラーハンドリング強化）
apiClient.interceptors.response.use(
  (response) => {
    return response; // レスポンスが正常な場合そのまま返す
  },
  (error) => {
    // レスポンスエラーの場合のエラーハンドリング
    if (error.response) {
      // サーバーがエラーコードを返した場合
      console.error('Response error:', error.response);
      if (error.response.status === 401) {
        // トークン無効の場合は再ログインを促すなど
        alert('ログインが必要です');
      } else if (error.response.status === 500) {
        alert('サーバーエラーが発生しました。後ほど再試行してください。');
      } else {
        alert(`エラー: ${error.response.status} - ${error.response.statusText}`);
      }
    } else {
      // ネットワークエラーやリクエストがサーバーに到達していない場合
      console.error('Network or Server error:', error);
      alert('ネットワークまたはサーバーエラーが発生しました。');
    }
    return Promise.reject(error); // エラーを返す
  }
);

export default apiClient;

