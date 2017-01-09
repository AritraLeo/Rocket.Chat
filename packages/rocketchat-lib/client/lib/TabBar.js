RocketChat.TabBar = new (class TabBar {
	constructor() {
		this.buttons = new ReactiveVar({});

		this.extraGroups = {};
	}

	show() {
		$('.flex-tab-bar').show();
	}

	hide() {
		$('.flex-tab-bar').hide();
	}

	addButton(config) {
		if (!config || !config.id) {
			return false;
		}

		Tracker.nonreactive(() => {
			let btns = this.buttons.get();
			btns[config.id] = config;

			if (this.extraGroups[config.id]) {
				btns[config.id].groups = _.union((btns[config.id].groups || []), this.extraGroups[config.id]);
			}

			this.buttons.set(btns);
		});
	}

	removeButton(id) {
		Tracker.nonreactive(() => {
			let btns = this.buttons.get();
			delete btns[id];
			this.buttons.set(btns);
		});
	}

	updateButton(id, config) {
		Tracker.nonreactive(() => {
			let btns = this.buttons.get();
			if (btns[id]) {
				btns[id] = _.extend(btns[id], config);
				this.buttons.set(btns);
			}
		});
	}

	getButtons() {
		return _.sortBy(_.toArray(this.buttons.get()), 'order');
	}

	getButton(id) {
		return _.findWhere(this.buttons.get(), { id });
	}

	addGroup(id, groups) {
		Tracker.nonreactive(() => {
			let btns = this.buttons.get();
			if (btns[id]) {
				btns[id].groups = _.union((btns[id].groups || []), groups);
				this.buttons.set(btns);
			} else {
				this.extraGroups[id] = _.union((this.extraGroups[id] || []), groups);
			}
		});
	}

	removeGroup(id, groups) {
		Tracker.nonreactive(() => {
			let btns = this.buttons.get();
			if (btns[id]) {
				btns[id].groups = _.difference((btns[id].groups || []), groups);
				this.buttons.set(btns);
			} else {
				this.extraGroups[id] = _.difference((this.extraGroups[id] || []), groups);
			}
		});
	}
});
