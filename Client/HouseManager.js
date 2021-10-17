﻿class HouseManager {

    constructor() {
        this.menuPool = null;
        this.dict = new Map();
        this.teleId = 0;
    }

    get menupool() {
        return this.menuPool;
    }

    sendEnterHouseRequest(menu, item) {
        let value = this.dict.get(item.Text);
        API.triggerServerEvent("EVENT_REQUEST_ENTER_HOUSE", value);
        menu.Visible = false;
        this.dict.clear();
    }

    sendHouseExitRequest(menu, item) {
        API.triggerServerEvent("EVENT_REQUEST_EXIT_HOUSE", this.teleId, this.dict.get(item.Text));
        menu.Visible = false;
        this.dict.clear();
    }

    handleHouseEvent(eventName, args) {
        switch (eventName) {
            case 'EVENT_DISPLAY_ENTER_HOUSE_MENU':
                this.handleEnterHouseMenu(args);
                break;

            case 'EVENT_DISPLAY_EXIT_HOUSE_MENU':
                this.handleExitHouseMenu(args);
                break;

            default:
                break;
        }
    }

    handleExitHouseMenu(args) {
        this.menuPool = API.getMenuPool();
        let menu = API.createMenu(args[3], "Select exit", 0, 0, 6);
        this.teleId = args[0];
        let nameList = args[1];
        let idList = args[2];

        for (var i = 0; i < nameList.Count; i++) {
            let item = API.createMenuItem(nameList[i], "Exit");
            let id = idList[i];
            this.dict.set(nameList[i], id);

            item.Activated.connect(() => this.sendHouseExitRequest(menu, item));
            menu.AddItem(item);
        }

        this.menuPool.Add(menu);
        menu.Visible = true;
    }


    handleEnterHouseMenu(args) {
        this.menuPool = API.getMenuPool();
        let menu = API.createMenu(args[2], "Select apartment to enter", 0, 0, 6);
        let nameList = args[0];
        let idList = args[1];

        for (var i = 0; i < nameList.Count; i++) {
            let item = API.createMenuItem(nameList[i], "");
            let id = idList[i];
            this.dict.set(nameList[i], id);

            item.Activated.connect(() => this.sendEnterHouseRequest(menu, item));
            menu.AddItem(item);
        }

        this.menuPool.Add(menu);
        menu.Visible = true;
    }

    processMenus() {
        if (this.menuPool != null) {
            this.menuPool.ProcessMenus();
        }
    }
}

let houseManager = new HouseManager();

API.onServerEventTrigger.connect(function (eventName, args) {
    houseManager.handleHouseEvent(eventName, args);
});

API.onUpdate.connect(function () {
    houseManager.processMenus();
});
