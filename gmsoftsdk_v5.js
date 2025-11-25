
let list_api_host = [
    "https://staticquasar931.github.io/Escape-Road-CIty-2-local/",
    "https://api.1games.io/"
];
let api_host = list_api_host[0];


window.GMDEBUG = {};
window.GMDEBUG["LOADED SDK"] = Date.now();

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

// The game sometimes reads this
let _gameId = window.GMSOFT_OPTIONS.gameId || "local-game";


function isDiffHost() {
    return false;
}


function httpGet(url) {
    console.log("httpGet bypassed:", url);

    // Always return a valid JSON string so JSON.parse works
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

// =====================================================
//  function for compatibility
// =====================================================
function isHostOnGDSDK() {
    return false;
}

window.GMSOFT_OPTIONS.gdHost = false;

// =====================================================
// Core init function — simplified and safe
// =====================================================
function _0x170291() {

    // Get fake API data
    let response = httpGet(api_host + "ajax/infov3?params=local");
    let info = JSON.parse(response);

    window.GMDEBUG["LOADED_SDK_SUCCESS"] = Date.now();
    window.GMSOFT_MSG = response;
    window.GMDEBUG["site_info"] = info;

    // Apply important fields
    window.GMSOFT_OPTIONS.game = info.game;
    window.GMSOFT_OPTIONS.allow_play = "yes";
    window.GMSOFT_OPTIONS.allow_host = "yes";
    window.GMSOFT_OPTIONS.allow_embed = "yes";

    console.log("Local SDK ready. Game playable.");

    // Tell the game the SDK is ready
    document.dispatchEvent(new CustomEvent("gmsoftSdkReady"));
}

// Call the init
_0x170291();



// Unity hostname (kept only for compatibility)
var unityhostname = "local";
