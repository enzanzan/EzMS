import { Modal } from 'antd';
import axios from 'axios';
import JsonP from 'jsonp';
import Utils from './../utils/utils';

export default class Axios {

    static requestList(_this, url, params, isMock) {
        var data = {
            params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then(data => {
            if (data && data.result) {
                let list = data.result.map((item, index) => {
                    item.key = index;
                    return item;
                })
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, current => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }

    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: "callback"
            }, (err, response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject(err.message);
                }
            })
        })
    }

    // 请求table数据
    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById("ajaxLoading");
            loading.style.display = "block";
        }
        let baseApi = ''
        if (options.data.isMock) {
            baseApi = "https://mock.apipost.cn/app/mock/project/86680e29-7a22-4999-832a-a2ee3b9d9571";
        } else {
            baseApi = "https://mock.apipost.cn/app/mock/project/86680e29-7a22-4999-832a-a2ee3b9d9571";
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display = "none";
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        // console.log(res);
                        resolve(res)
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })
    }
}
