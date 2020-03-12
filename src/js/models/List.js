import uniqid from 'uniqid'

export default class List {
    constructor() {
        // all items it will be stored here
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item)
        // good practice to return the new created obj
        return item;
    }

    deleteItem(id) {
        // find the index which where we want to splice
        // find the index that satisfied the condition
        const index = this.items.findIndex(el => el.id === id) 
        // mutate the original array 
        // e.g. -> [2, 4, 8] splice(1, 1) last element 'how many elements to take' -> returns 4, original array is [2, 8]
        // doesn't mutate the original array
        // e.g. -> [2, 4, 8] slice(1, 1) last element 'the index' -> returns 4, original array is [2, 4, 8]
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        // find it will return the element wich has the id the one that we've pass
        this.items.find(el => el.id === id).count = newCount;
    }
}