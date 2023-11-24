class Tree {
    constructor(array) {
        this.root = Tree.buildTree(Tree.sortAndRemoveDuplicates(array));
    }

    static sortAndRemoveDuplicates(array) {
        // Sort the array and remove duplicates
        return [...new Set(array.sort((a, b) => a - b))];
    }

    static buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const newNode = new Node(array[mid]);

        newNode.left = Tree.buildTree(array, start, mid - 1);
        newNode.right = Tree.buildTree(array, mid + 1, end);

        return newNode;
    }
}
