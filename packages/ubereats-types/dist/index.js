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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EmailPayloadCommand: () => EmailPayloadCommand,
  EmailQueueMessageSubject: () => EmailQueueMessageSubject,
  SmsPayloadCommand: () => SmsPayloadCommand,
  SmsQueueMessageSubjects: () => SmsQueueMessageSubjects,
  UserRoles: () => UserRoles
});
module.exports = __toCommonJS(src_exports);

// src/user.ts
var UserRoles = /* @__PURE__ */ ((UserRoles2) => {
  UserRoles2["Customer"] = "customer";
  UserRoles2["Vendor"] = "vendor";
  UserRoles2["Rider"] = "rider";
  return UserRoles2;
})(UserRoles || {});

// src/sms.ts
var SmsPayloadCommand = /* @__PURE__ */ ((SmsPayloadCommand2) => {
  SmsPayloadCommand2["SendOtp"] = "auth.notification.otp";
  SmsPayloadCommand2["SendDeliveryStatus"] = "SendDeliveryStatus";
  return SmsPayloadCommand2;
})(SmsPayloadCommand || {});
var SmsQueueMessageSubjects = /* @__PURE__ */ ((SmsQueueMessageSubjects2) => {
})(SmsQueueMessageSubjects || {});

// src/email.ts
var EmailQueueMessageSubject = /* @__PURE__ */ ((EmailQueueMessageSubject2) => {
  EmailQueueMessageSubject2["CreateAccount"] = "CreateAccount";
  EmailQueueMessageSubject2["ResetPassword"] = "ResetPassword";
  EmailQueueMessageSubject2["DeliveryStatus"] = "DeliveryStatus";
  EmailQueueMessageSubject2["OrderStatus"] = "OrderStatus";
  return EmailQueueMessageSubject2;
})(EmailQueueMessageSubject || {});
var EmailPayloadCommand = /* @__PURE__ */ ((EmailPayloadCommand2) => {
  EmailPayloadCommand2["SendRegistrationStatus"] = "SendRegistrationStatus";
  EmailPayloadCommand2["SendPromotionalMail"] = "SendPromotionalMail";
  EmailPayloadCommand2["SendOrderStatus"] = "SendOrderStatus";
  return EmailPayloadCommand2;
})(EmailPayloadCommand || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailPayloadCommand,
  EmailQueueMessageSubject,
  SmsPayloadCommand,
  SmsQueueMessageSubjects,
  UserRoles
});
