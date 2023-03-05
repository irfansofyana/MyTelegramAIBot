"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var handlers_exports = {};
__export(handlers_exports, {
  ama: () => ama,
  brainstorm: () => brainstorm,
  chat: () => chat,
  explainCode: () => explainCode,
  image: () => image,
  tldr: () => tldr,
  writeCode: () => writeCode
});
module.exports = __toCommonJS(handlers_exports);
var import_telegraf = require("telegraf");
var import_filters = require("telegraf/filters");
var import_client = require("./client");
const myAI = new import_client.MyOpenAI();
const tldr = new import_telegraf.Scenes.BaseScene("tldr");
tldr.enter((ctx) => ctx.reply("Please give me the text boss"));
tldr.on((0, import_filters.message)("text"), async (ctx) => {
  const textInput = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.tldr(textInput);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const ama = new import_telegraf.Scenes.BaseScene("ama");
ama.enter((ctx) => ctx.reply("Give me your question boss, I would like to help!"));
ama.on((0, import_filters.message)("text"), async (ctx) => {
  const question = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.ama(question);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const writeCode = new import_telegraf.Scenes.BaseScene("writecode");
writeCode.enter((ctx) => ctx.reply(`Give me your question boss!
Note: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));
writeCode.on((0, import_filters.message)("text"), async (ctx) => {
  const instruction = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.writeCode(instruction);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const explainCode = new import_telegraf.Scenes.BaseScene("explaincode");
explainCode.enter((ctx) => ctx.reply(`Give me that hard code boss, I would like to help explain it!
Note: Check https://platform.openai.com/docs/guides/code to maximize the use of me on this.`));
explainCode.on((0, import_filters.message)("text"), async (ctx) => {
  const codes = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.explainCode(codes);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const brainstorm = new import_telegraf.Scenes.BaseScene("brainstorm");
brainstorm.enter((ctx) => ctx.reply("what do we want to brainstorm?boss?"));
brainstorm.on((0, import_filters.message)("text"), async (ctx) => {
  const topic = ctx.message.text;
  try {
    ctx.reply("Hang on boss.. this might take a while.");
    const response = await myAI.brainstorm(topic);
    ctx.reply(response);
    return ctx.scene.leave();
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const image = new import_telegraf.Scenes.BaseScene("image");
image.enter((ctx) => ctx.reply("what kind of image that you want to create, boss?"));
image.on((0, import_filters.message)("text"), async (ctx) => {
  const text = ctx.message.text;
  try {
    const response = await myAI.createImage(text);
    ctx.replyWithPhoto({ url: response });
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
});
const chat = async (ctx) => {
  const text = ctx.message.text;
  try {
    const response = await myAI.chat(text);
    ctx.reply(response);
  } catch (err) {
    console.error(err);
    ctx.reply("Oopss.. there something wrong boss, please try again later!");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ama,
  brainstorm,
  chat,
  explainCode,
  image,
  tldr,
  writeCode
});
//# sourceMappingURL=handlers.js.map
