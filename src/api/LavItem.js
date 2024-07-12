import LavItemClass from '@/api/LavItemClass';

export default class LavItem {

    constructor(jsonItem, count) {
        this.id = jsonItem.id;
        this.name = jsonItem.name;
		this.icon = jsonItem.icon;
		this.count = count;
		this.type = LavItemClass.getType(jsonItem);
    }

}