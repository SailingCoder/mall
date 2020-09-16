export default function ({ $axios, redirect, store }) {
  const IS_DEV = process.env.NODE_ENV !== 'production'
  console.log('IS_DEV', IS_DEV)
  $axios.defaults.baseURL = IS_DEV ? 'http://0.0.0.0:3001' : ''

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse(response => {
    console.log('axios', response.data)
    if(response.status == 200) {
      return response.data;
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })


  $axios.interceptors.request.use(config => {
      let nowDate = new Date()
      let signTime = nowDate.getTime()
      // console.log(1111)
      // if (store.state.token != null && store.state.expireTime > nowDate.getTime()) {
      //   config.headers.sign_time = signTime
      //   config.headers.auth_Code = store.state.authCode
      //   config.headers.sign = sha256.hmac(store.state.token, signTime + store.state.authCode)
      // }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )


  $axios.interceptors.response.use(response => {      
      console.log('axios response', response)
      if(response.data.success == false && response.data.code == 30333){     
          redirect('/login/login')
          return;      
      }      
      // console.log(response);            
      return response    
	}, err => {      
    // console.log('axios err', err)
		// if (err && err.response) {         
		// 	switch (err.response.status) {              
		// 		case 400: err.message = '请求错误(400)'; break;              
		// 		case 401: return history.push('/login'); break;              
		// 		case 403: err.message = '拒绝访问(403)'; break;              
		// 		case 404: err.message = '请求出错(404)'; break;              
		// 		case 408: err.message = '请求超时(408)'; break;              
		// 		case 500: err.message = '服务器错误(500)'; break;              
		// 		case 501: err.message = '服务未实现(501)'; break;              
		// 		case 502: err.message = '网络错误(502)'; break;              
		// 		case 503: err.message = '服务不可用(503)'; break;              
		// 		case 504: err.message = '网络超时(504)'; break;              
		// 		case 505: err.message = 'HTTP版本不受支持(505)'; break;              
		// 		default: err.message = `连接出错(${err.response.status})!`;          
		// 	}      
		// } else {          
		// 	err.message = '连接服务器失败!'      
		// }      
		// message.error(err.message);      
		return Promise.reject(err);    
	})
}