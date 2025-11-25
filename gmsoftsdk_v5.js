/* ================================
   LOCAL GMSoft SDK (Clean Version)
   For Escape-Road-CIty-2-local
   ================================ */

// -------- Unity required stubs --------
window.firebaseLogEvent = function(name, params){
    console.log("firebaseLogEvent", name, params);
};

// Unity sometimes passes invalid event names
const REAL_addEventListener = document.addEventListener.bind(document);
document.addEventListener = function(type, fn, opts){
    if (typeof type !== "string") {
        console.warn("Ignored invalid Unity event:", type);
        return;
    }
    return REAL_addEventListener(type, fn, opts);
};

// -------- Unity expects GMSoft object --------
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

// -------- Custom API host (Local) --------
let list_api_host = [
    "https://staticquasar931.github.io/Escape-Road-CIty-2-local/",
    "https://api.1games.io/"
];
let api_host = list_api_host[0];

// -------- Debug Info --------
window.GMDEBUG = {};
window.GMDEBUG["LOADED SDK"] = Date.now();

// -------- Minimal safe config --------
window.GMSOFT_OPTIONS = {
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

let _gameId = window.GMSOFT_OPTIONS.gameId || "local";

// -------- Always local --------
function isDiffHost() {
    return false;
}
function isHostOnGDSDK() {
    return false;
}

// -------- Fake API response so Unity never breaks --------
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
            image: "cover.jpg",
            redirect_url: "#"
        }
    });
}

// -------- SDK Init Logic --------
function sdkInit() {

    let response = httpGet(api_host + "ajax/infov3?params=local");
    let info = JSON.parse(response);

    window.GMDEBUG["LOADED_SDK_SUCCESS"] = Date.now();
    window.GMSOFT_MSG = response;
    window.GMDEBUG["site_info"] = info;

    window.GMSOFT_OPTIONS.game = info.game;
    window.GMSOFT_OPTIONS.allow_play = "yes";
    window.GMSOFT_OPTIONS.allow_host = "yes";
    window.GMSOFT_OPTIONS.allow_embed = "yes";

    console.log("Local GMSoft SDK ready");

    // Notify Unity
    document.dispatchEvent(new CustomEvent("gmsoftSdkReady"));
}

// Run init
sdkInit();

// Unity compatibility (unused but required)
var unityhostname = "local";
