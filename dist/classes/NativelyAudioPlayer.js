function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { generateID } from "../utils/generateID.js";
import globalContext from "../utils/globalThis.js";
export class NativelyAudioPlayer {
  constructor() {
    _defineProperty(this, "id", generateID());
  }
  buildMetadata(metadata) {
    var params = {};
    if (!metadata) {
      return params;
    }
    if (metadata.id !== undefined) params.id = metadata.id;
    if (metadata.title !== undefined) params.title = metadata.title;
    if (metadata.artist !== undefined) params.artist = metadata.artist;
    if (metadata.album !== undefined) params.album = metadata.album;
    if (metadata.genre !== undefined) params.genre = metadata.genre;
    if (metadata.artwork !== undefined) params.artwork = metadata.artwork;
    if (metadata.duration != null) params.duration = metadata.duration;
    if (metadata.extras !== undefined) params.extras = metadata.extras;
    return params;
  }
  play(source, options, play_callback) {
    var _options$is_stream, _options$autoplay;
    var params = _objectSpread({
      source,
      is_stream: (_options$is_stream = options === null || options === void 0 ? void 0 : options.is_stream) !== null && _options$is_stream !== void 0 ? _options$is_stream : false,
      autoplay: (_options$autoplay = options === null || options === void 0 ? void 0 : options.autoplay) !== null && _options$autoplay !== void 0 ? _options$autoplay : true
    }, this.buildMetadata(options));
    if ((options === null || options === void 0 ? void 0 : options.headers) !== undefined) params.headers = options.headers;
    if ((options === null || options === void 0 ? void 0 : options.start_position) != null) params.start_position = options.start_position;
    if ((options === null || options === void 0 ? void 0 : options.volume) != null) params.volume = options.volume;
    if ((options === null || options === void 0 ? void 0 : options.speed) != null) params.speed = options.speed;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, play_callback, "audio_play", params);
  }
  pause(pause_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, pause_callback, "audio_pause", {});
  }
  stop(stop_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, stop_callback, "audio_stop", {});
  }
  seek(position, seek_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, seek_callback, "audio_seek", {
      position
    });
  }
  queueAdd(source, options, queue_add_callback) {
    var _options$play_now, _options$is_stream2;
    var params = _objectSpread({
      source,
      play_now: (_options$play_now = options === null || options === void 0 ? void 0 : options.play_now) !== null && _options$play_now !== void 0 ? _options$play_now : false,
      is_stream: (_options$is_stream2 = options === null || options === void 0 ? void 0 : options.is_stream) !== null && _options$is_stream2 !== void 0 ? _options$is_stream2 : false
    }, this.buildMetadata(options));
    if ((options === null || options === void 0 ? void 0 : options.headers) !== undefined) params.headers = options.headers;
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, queue_add_callback, "audio_queue_add", params);
  }
  queueGet(queue_get_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, queue_get_callback, "audio_queue_get", {});
  }
  queueRemove(index, queue_remove_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, queue_remove_callback, "audio_queue_remove", {
      index
    });
  }
  setMetadata(metadata, set_metadata_callback) {
    var params = this.buildMetadata(metadata);
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, set_metadata_callback, "audio_set_metadata", params);
  }
  setVolume(volume, set_volume_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, set_volume_callback, "audio_set_volume", {
      volume
    });
  }
  setSpeed(speed, set_speed_callback) {
    globalContext === null || globalContext === void 0 || globalContext.natively.trigger(this.id, 39, set_speed_callback, "audio_set_speed", {
      speed
    });
  }
}