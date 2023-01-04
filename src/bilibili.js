// ==UserScript==
// @name         Default Bilibili UI Fix
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  设置 bilibili 默认 UI 为旧版，禁用搜索历史，屏蔽定时登录提示
// @author       Chenrt
// @match        *://*.bilibili.com/*
// @match        *://s1.hdslb.com/*
// @grant        none
// ==/UserScript==

(function () {
    const defaultOnload = document.body.onload;
    const setState = (state, zero, inf) => {
        state.loginBackBlockAbTestCountingSecond = state.loginBackBlockCountingSecond = state.loginCountingSecond = inf;
        state.loginDialogCountDuration = state.loginDialogCountTimes = state.loginWechatCountingSecond = zero;
    };
    const refreshState = (state) => state && state.constants && setState(state.constants, 0, 365 * 24 * 60 * 60);
    const setCookie = (name, value, expireDays) => {
        const date = new Date();
        date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + '; domain=.bilibili.com; path=/; ' + expires;
    };
    if (document.domain.indexOf('bilibili') !== -1) {
        const lockFields = (lockList) => {
            let count = 0;
            const interval = setInterval(() => {
                const dict = new Map(
                    document.cookie
                        ? document.cookie.split(';').map((i) => {
                              const buf = i.split('=');
                              return [buf[0].trim(), buf[1].trim()];
                          })
                        : undefined
                );
                if (
                    count++ >= 10 ||
                    lockList.every((i) => dict.has(i.name) && dict.get(i.name) === i.value.toString())
                ) {
                    clearInterval(interval);
                } else {
                    lockList
                        .filter((i) => !dict.has(i.name) || dict.get(i.name) !== i.value.toString())
                        .forEach((i) => setCookie(i.name, i.value, 365));
                    location.reload();
                }
            }, 100);
        };
        window.onload = (param) => {
            refreshState(window.__INITIAL_STATE__);
            lockFields([
                { name: 'i-wanna-go-back', value: 2 },
                { name: 'i-wanna-go-feeds', value: 2 },
                { name: 'go_old_video', value: 1 },
                { name: 'nostalgia_conf', value: 2 }
            ]);
            typeof defaultOnload === 'function' && defaultOnload(param);
        };
    } else {
        window.onload = (param) => {
            setInterval(() => localStorage.clear(), 5000);
            typeof defaultOnload === 'function' && defaultOnload(param);
        };
    }
})();
