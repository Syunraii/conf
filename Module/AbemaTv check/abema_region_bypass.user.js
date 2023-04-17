// ==UserScript==
// @name Abema 区域限制
// @author https://gist.github.com/Last-Order/5a1c70686bc0c130fe3fbdcbdb1bf22a
// @version 1.0.0
// @run-at document-end
// @namespace Violentmonkey Scripts
// @match https://abema.tv/*
// @grant none
// ==/UserScript==
Object.defineProperty(__CLIENT_REGION__, 'isAllowed', {
    get: () => true
});
Object.defineProperty(__CLIENT_REGION__, 'status', {
    get: () => false
});