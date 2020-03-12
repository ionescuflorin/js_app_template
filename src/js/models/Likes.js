export default class Likes {
    constructor() {
        this.likes = []
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img}
        this.likes.push(like);
        return like
    }

    deleteLike(){
         // find the index which where we want to splice
        // find the index that satisfied the condition
        const index = this.likes.findIndex(el => el.id === id) 
        // mutate the original array 
        // e.g. -> [2, 4, 8] splice(1, 1) last element 'how many elements to take' -> returns 4, original array is [2, 8]
        // doesn't mutate the original array
        // e.g. -> [2, 4, 8] slice(1, 1) last element 'the index' -> returns 4, original array is [2, 4, 8]
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1
    }

    getNumLikes() {
        return this.likes.length;
    }
}