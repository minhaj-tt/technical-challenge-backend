// source: user.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

import jspb, { Message, BinaryReader, BinaryWriter } from "google-protobuf";
var goog = jspb;
var global = function () {
  if (this) {
    return this;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return Function("return this")();
}.call(null);

goog.exportSymbol("proto.user.UserRequest", null, global);
goog.exportSymbol("proto.user.UserResponse", null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.user.UserRequest = function (opt_data) {
  Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.user.UserRequest, Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.user.UserRequest.displayName = "proto.user.UserRequest";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.user.UserResponse = function (opt_data) {
  Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.user.UserResponse, Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.user.UserResponse.displayName = "proto.user.UserResponse";
}

if (Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.user.UserRequest.prototype.toObject = function (opt_includeInstance) {
    return proto.user.UserRequest.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.user.UserRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.user.UserRequest.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        userid: Message.getFieldWithDefault(msg, 1, ""),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.user.UserRequest}
 */
proto.user.UserRequest.deserializeBinary = function (bytes) {
  var reader = new BinaryReader(bytes);
  var msg = new proto.user.UserRequest();
  return proto.user.UserRequest.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.user.UserRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.user.UserRequest}
 */
proto.user.UserRequest.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setUserid(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.user.UserRequest.prototype.serializeBinary = function () {
  var writer = new BinaryWriter();
  proto.user.UserRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.user.UserRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.UserRequest.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
};

/**
 * optional string userId = 1;
 * @return {string}
 */
proto.user.UserRequest.prototype.getUserid = function () {
  return /** @type {string} */ (Message.getFieldWithDefault(this, 1, ""));
};

/**
 * @param {string} value
 * @return {!proto.user.UserRequest} returns this
 */
proto.user.UserRequest.prototype.setUserid = function (value) {
  return Message.setProto3StringField(this, 1, value);
};

if (Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  proto.user.UserResponse.prototype.toObject = function (opt_includeInstance) {
    return proto.user.UserResponse.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.user.UserResponse} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.user.UserResponse.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        userid: Message.getFieldWithDefault(msg, 1, ""),
        username: Message.getFieldWithDefault(msg, 2, ""),
        email: Message.getFieldWithDefault(msg, 3, ""),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.user.UserResponse}
 */
proto.user.UserResponse.deserializeBinary = function (bytes) {
  var reader = new BinaryReader(bytes);
  var msg = new proto.user.UserResponse();
  return proto.user.UserResponse.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.user.UserResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.user.UserResponse}
 */
proto.user.UserResponse.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setUserid(value);
        break;
      case 2:
        var value = /** @type {string} */ (reader.readString());
        msg.setUsername(value);
        break;
      case 3:
        var value = /** @type {string} */ (reader.readString());
        msg.setEmail(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.user.UserResponse.prototype.serializeBinary = function () {
  var writer = new BinaryWriter();
  proto.user.UserResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.user.UserResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.user.UserResponse.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getUserid();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
  f = message.getUsername();
  if (f.length > 0) {
    writer.writeString(2, f);
  }
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(3, f);
  }
};

/**
 * optional string userId = 1;
 * @return {string}
 */
proto.user.UserResponse.prototype.getUserid = function () {
  return /** @type {string} */ (Message.getFieldWithDefault(this, 1, ""));
};

/**
 * @param {string} value
 * @return {!proto.user.UserResponse} returns this
 */
proto.user.UserResponse.prototype.setUserid = function (value) {
  return Message.setProto3StringField(this, 1, value);
};

/**
 * optional string username = 2;
 * @return {string}
 */
proto.user.UserResponse.prototype.getUsername = function () {
  return /** @type {string} */ (Message.getFieldWithDefault(this, 2, ""));
};

/**
 * @param {string} value
 * @return {!proto.user.UserResponse} returns this
 */
proto.user.UserResponse.prototype.setUsername = function (value) {
  return Message.setProto3StringField(this, 2, value);
};

/**
 * optional string email = 3;
 * @return {string}
 */
proto.user.UserResponse.prototype.getEmail = function () {
  return /** @type {string} */ (Message.getFieldWithDefault(this, 3, ""));
};

/**
 * @param {string} value
 * @return {!proto.user.UserResponse} returns this
 */
proto.user.UserResponse.prototype.setEmail = function (value) {
  return Message.setProto3StringField(this, 3, value);
};

goog.object.extend(exports, proto.user);