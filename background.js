function onClick(tab) {
    browser.tabs.executeScript({
        code: `
        if (!window.hasRun) {
            window.hasRun = true;
            
            browser.runtime.onMessage.addListener((request) => {
                const s = Array.from(document.querySelectorAll("tr.simpTblRow > td:nth-child(3) > fin-streamer")).map((e) => e.getAttribute("value")).join("\t");
                navigator.clipboard.writeText(s);
                alert(s);
                return Promise.resolve({ response: "Hi from content script" });
            });
        }
        `
    }).then(() => {
        browser.tabs.sendMessage(
            tab.id,     // integer
            { message: "copy_last" }
            )
    });
        
}
    
browser.browserAction.onClicked.addListener(onClick);
