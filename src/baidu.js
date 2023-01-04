// ==UserScript==
// @name         Baidu Background Adder
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  百度搜索增加背景图片，快乐面向对象，顺便去广告
// @author       Chenrt
// @match        *://www.baidu.com/*
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
        const removeElement = (id) => {
            const element = document.getElementById(id);
            element && element.parentNode && element.parentNode.removeChild(element);
        };
        const choice = sampleBackground([
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183648375-1712586452.jpg',
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183651954-1609506534.jpg',
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183659909-1070854398.jpg',
            'https://img2020.cnblogs.com/blog/2322553/202104/2322553-20210423183711112-203664577.jpg'
        ]);
        if (document.getElementById('container') === null) {
            replaceBackground(choice, 'wrapper', false);
            removeElement('s_top_wrap');
            removeElement('s_side_wrapper');
            removeElement('bottom_layer');
            const fixPadding = document.getElementById('lg');
            fixPadding && fixPadding.style.setProperty('padding-top', '10vh');
            const fixTitles = document.getElementsByClassName('title-content-title');
            for (let i = 0; fixTitles && i < fixTitles.length; ++i) {
                const shadow = Array(4).fill('0 0 3px #ffffff').join(', ');
                fixTitles[i].style.setProperty('text-shadow', shadow);
            }
        }
    };
})();
