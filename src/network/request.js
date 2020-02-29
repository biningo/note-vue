import axiox from 'axios'

export default function request(option) {

    return new Promise((resolve, reject) => {
        // 1.创建axios的实例
        const instance = axiox.create({
            baseURL: 'http://118.178.180.115:9000/api',
            timeout: 60*60*1000
        });





        // 2.传入对象进行网络请求
        instance(option).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })

    // //请求拦截器
    // instance.interceptors.request.use(config=>{
    //         console.log(config.baseURL);
    //         return config;
    //     },
    //     error=>{
    //         console.log(error);
    //     });
    //
    // //回复拦截器
    // instance.interceptors.response.use(
    //     result=>{
    //         console.log(result.data);
    //
    //         return result;
    //     },
    //     error=>{
    //         console.log(error);
    //     });




}