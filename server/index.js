
const Koa = require('koa')
const consola = require('consola')
const static = require('koa-static');
const koaBody = require("koa-body");
const path = require('path');
const { Nuxt, Builder } = require('nuxt');
const session = require("koa-session2");
const uuid = require("uuid");

const { setConfig } = require("./utils/config");
const { proxy } = require("./utils/proxy.js");
const request = require("./utils/request");
