//导入我们封装好的axios 
import service from './index'

export const apiArticleEdit = info => service.post('/api/v1/articleEdit', info);

export const apiNavigationGet=()=>{
  return new Promise((resolve, reject) => {
    service("get",'getAllLinkInformation').then(res => {
      resolve (res);
    },error => {
      console.log("网络异常~",error);
      reject(error)
    })
  }) 
}