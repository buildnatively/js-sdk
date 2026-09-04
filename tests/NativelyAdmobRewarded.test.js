import assert from "node:assert/strict";
import test from "node:test";

import {Natively} from "../dist/classes/Natively.js";
import {NativelyAdmobRewarded} from "../dist/classes/NativelyAdmobRewarded.js";

test("rewarded ads use the Android unit ID and dispatch setup", () => {
    const calls = [];
    globalThis.natively = new Natively();
    globalThis.natively.injected = true;
    globalThis.natively.app_version = 47;
    globalThis.natively.isAndroidApp = true;
    globalThis.$agent = {
        response() {},
        trigger(method, body) {
            calls.push({method, body});
        },
    };

    const callbackCalls = [];
    new NativelyAdmobRewarded(
        "ios-unit-id",
        "android-unit-id",
        (result, error) => callbackCalls.push({result, error}),
        false,
        undefined,
        {userId: "user-123", customData: "reward-456"},
    );

    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, "rewardedad_setup");
    assert.equal(calls[0].body.unitId, "android-unit-id");
    assert.equal(calls[0].body.userId, "user-123");
    assert.equal(calls[0].body.customData, "reward-456");

    const responseHandlerName =
        `rewardedad_setup_response_${calls[0].body.response_id}`;
    globalThis[responseHandlerName]({event: "DID_LOAD_AD"}, {});

    assert.deepEqual(callbackCalls, [
        {result: {event: "DID_LOAD_AD"}, error: {}},
    ]);
});
