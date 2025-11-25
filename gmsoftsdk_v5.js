/* ================================
   LOCAL GMSoft SDK (Clean Version)
   For Escape-Road-CIty-2-local
   ================================ */

// Unity uses firebaseLogEvent hooks
window.firebaseLogEvent = function(name, params){
    console.log("firebaseLogEvent", name, params);
};

// Patch document.getElementById so Unity cannot crash when an element is missing
(function(){
    var REAL_getElementById = document.getElementById.bind(document);
    var dummyMap = {};

    document.getElementById = function(id){
        var el = REAL_getElementById(id);
        if (el) return el;

        if (!id) return null;

        if (dummyMap[id]) return dummyMap[id];

        var dummy = document.createElement("div");
        dummy.id = id;
        dummy.style.display = "none";
        dummyMap[id] = dummy;

        if (document.body) {
            document.body.appendChild(dummy);
        } else {
            // if body not ready yet, queue it
            document.addEventListener("DOMContentLoaded", function(){
                if (!dummy.isConnected && document.body) {
                    document.body.appendChild(dummy);
                }
            });
        }

        return dummy;
    };
})();

// Unity sometimes passes invalid event names into document.addEventListener
var REAL_addEventListener = document.addEventListener.bind(document);
document.addEventListener = function(type, fn, opts){
    if (typeof type !== "string") {
        console.warn("Ignored invalid Unity event:", type);
        return;
    }
    return REAL_addEventListener(type, fn, opts);
};

// GmSoft object expected by game
window.GmSoft = window.GmSoft || {};

window.GmSoft.Init = function(){
    console.log("GmSoft.Init (Unity-safe)", arguments);
    return true;
};

window.GmSoft.Ready = function(){
    console.log("GmSoft.Ready (Unity-safe)", arguments);
    return true;
};

window.GmSoft.SetParam = function(){
    console.log("GmSoft.SetParam (Unity-safe)", arguments);
    return true;
};

window.GmSoft.GetParam = function(){
    console.log("GmSoft.GetParam (Unity-safe)", arguments);
    return "";
};

window.GmSoft.Event = function(){
    console.log("GmSoft.Event (Unity-safe)", arguments);
    return true;
};

// Custom API host (local first, but we always bypass actual network)
var list_api_host = [
    "https://staticquasar931.github.io/Escape-Road-CIty-2-local/",
    "https://api.1games.io/"
];
var api_host = list_api_host[0];

window.GMDEBUG = window.GMDEBUG || {};
window.GMDEBUG["LOADED SDK"] = Date.now();

// Minimal safe config
window.GMSOFT_OPTIONS = window.GMSOFT_OPTIONS || {
    enableAds: false,
    debug: false,
    pub_id: "",
    unlockTimer: 0,
    timeShowInter: 60,
    domainHost: "local",
    sourceHtml: "",
    sdkversion: 5,
    adsDebug: false,
    game: null,
    promotion: null,
    allow_play: "yes",
    allow_host: "yes",
    allow_embed: "yes",
    sdkType: "h5",
    enablePreroll: false,
    timeShowReward: 0,
    gdHost: false
};

var _gameId = window.GMSOFT_OPTIONS.gameId || "local";

function isDiffHost() {
    return false;
}
function isHostOnGDSDK() {
    return false;
}

// Fake API response so Unity never breaks
function httpGet(url) {
    console.log("httpGet bypassed:", url);

    return JSON.stringify({
        enable_ads: "no",
        hostindex: 0,
        adsDebug: "no",
        unlock_timer: 0,
        enablePreroll: "no",
        pub_id: "",
        timeShowInter: 60,
        timeShowReward: 0,
        allow_embed: "yes",
        allow_host: "yes",
        sdkType: "h5",
        game: {
            name: "Escape Road City 2",
            description: "Drive fast and escape the city.",
            image: "loading.png",
            redirect_url: "#"
        }
    });
}

// SDK Init Logic
function sdkInit() {
    var response = httpGet(api_host + "ajax/infov3?params=local");
    var info = {};
    try {
        info = JSON.parse(response);
    } catch (e) {
        console.error("Error parsing local GMSoft info", e);
        info = { game: { name: "Escape Road City 2" } };
    }

    window.GMDEBUG["LOADED_SDK_SUCCESS"] = Date.now();
    window.GMSOFT_MSG = response;
    window.GMDEBUG["site_info"] = info;

    window.GMSOFT_OPTIONS.game = info.game || window.GMSOFT_OPTIONS.game;
    window.GMSOFT_OPTIONS.allow_play = "yes";
    window.GMSOFT_OPTIONS.allow_host = "yes";
    window.GMSOFT_OPTIONS.allow_embed = "yes";

    console.log("Local GMSoft SDK ready");

    try {
        document.dispatchEvent(new CustomEvent("gmsoftSdkReady"));
    } catch (e) {
        console.warn("Could not dispatch gmsoftSdkReady event", e);
    }
}

sdkInit();

// Unity compatibility
var unityhostname = "local";
