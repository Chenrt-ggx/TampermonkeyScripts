// ==UserScript==
// @name         Bing Background Replace
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  换掉必应首页的背景图片，快乐面向对象
// @author       Chenrt
// @match        *://*.bing.com/*
// @grant        none
// ==/UserScript==

(function () {
    document.body.onload = () => {
        const sampleBackground = (choices) => choices[Math.floor(Math.random() * choices.length)];
        const updateBackground = (element, choice) => {
            element.style.removeProperty('background');
            element.style.removeProperty('background-image');
            element.style.setProperty('background', 'url(' + choice + ') center/cover no-repeat');
        };
        const replaceBackground = (choice, filter, isClass) => {
            if (isClass) {
                const imgSelect = document.getElementsByClassName(filter);
                imgSelect && imgSelect.length === 1 && updateBackground(imgSelect[0], choice);
            } else {
                const imgSelect = document.getElementById(filter);
                imgSelect && updateBackground(imgSelect, choice);
            }
        };
        const choice = sampleBackground([
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183648375-1712586452.jpg',
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183651954-1609506534.jpg',
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183659909-1070854398.jpg',
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183711112-203664577.jpg'
        ]);
        replaceBackground(choice, 'img_cont', true);
        replaceBackground(choice, 'hp_top_cover', true);
        const scrollFix = document.getElementById('scroll_cont');
        if (scrollFix && scrollFix.parentNode && scrollFix.parentNode.parentNode) {
            scrollFix.parentNode.parentNode.removeChild(scrollFix.parentNode);
        }
    };
})();
