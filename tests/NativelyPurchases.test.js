import assert from "node:assert/strict";
import test from "node:test";

import {Natively} from "../dist/classes/Natively.js";
import {NativelyPurchases} from "../dist/classes/NativelyPurchases.js";

test("presentOfferCodeRedemptionSheet dispatches and handles a one-shot response", () => {
    const calls = [];
    globalThis.natively = new Natively();
    globalThis.natively.injected = true;
    globalThis.natively.app_version = 10;
    globalThis.$agent = {
        response() {},
        trigger(method, body) {
            calls.push({method, body});
        },
    };

    const purchases = new NativelyPurchases();
    const callbackCalls = [];
    purchases.presentOfferCodeRedemptionSheet((result, error) => {
        callbackCalls.push({result, error});
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].method, "purchases_present_code_redemption_sheet");
    assert.equal(typeof calls[0].body.response_id, "string");
    assert.deepEqual(Object.keys(calls[0].body), ["response_id"]);

    const responseHandlerName =
        `purchases_present_code_redemption_sheet_response_${calls[0].body.response_id}`;
    const responseHandler = globalThis[responseHandlerName];
    assert.equal(typeof responseHandler, "function");

    const result = {status: "PRESENTED"};
    const error = {message: "native details"};
    responseHandler(result, error);

    assert.deepEqual(callbackCalls, [{result, error}]);
    assert.equal(globalThis[responseHandlerName], undefined);
});
