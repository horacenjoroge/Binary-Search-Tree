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
    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        }

        return node;
    }

    delete(value) {
        this.root = this._delete(this.root, value);
    }

    _delete(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this._delete(node.left, value);
        } else if (value > node.data) {
            node.right = this._delete(node.right, value);
        } else {
            // Node to be deleted found

            if (node.left === null && node.right === null) {
                // Case 1: Node has no children
                return null;
            } else if (node.left === null) {
                // Case 2: Node has one child (right)
                return node.right;
            } else if (node.right === null) {
                // Case 2: Node has one child (left)
                return node.left;
            } else {
                // Case 3: Node has two children
                // Find the minimum value in the right subtree
                const minValue = this.findMinValue(node.right);
                // Replace the current node's data with the minimum value
                node.data = minValue;
                // Delete the node with the minimum value in the right subtree
                node.right = this._delete(node.right, minValue);
            }
        }

        return node;
    }

    findMinValue(node) {
        // Helper function to find the minimum value in a BST
        while (node.left !== null) {
            node = node.left;
        }
        return node.data;
    }
    find(value) {
        return this._find(this.root, value);
    }

    _find(node, value) {
        if (node === null || node.data === value) {
            return node;
        }

        if (value < node.data) {
            return this._find(node.left, value);
        } else {
            return this._find(node.right, value);
        }
    }
    levelOrder(callback) {
        const result = [];
        const queue = [this.root];

        const traverse = (node) => {
            if (node) {
                result.push(callback ? callback(node) : node.data);
                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
                traverse(queue.shift());
            }
        };

        traverse(queue.shift());
        return result;
    }
    inOrder(callback) {
        const result = [];
        this._inOrder(this.root, callback, result);
        return result;
    }

    _inOrder(node, callback, result) {
        if (node) {
            this._inOrder(node.left, callback, result);
            result.push(callback ? callback(node) : node.data);
            this._inOrder(node.right, callback, result);
        }
    }

    preOrder(callback) {
        const result = [];
        this._preOrder(this.root, callback, result);
        return result;
    }

    _preOrder(node, callback, result) {
        if (node) {
            result.push(callback ? callback(node) : node.data);
            this._preOrder(node.left, callback, result);
            this._preOrder(node.right, callback, result);
        }
    }

    postOrder(callback) {
        const result = [];
        this._postOrder(this.root, callback, result);
        return result;
    }

    _postOrder(node, callback, result) {
        if (node) {
            this._postOrder(node.left, callback, result);
            this._postOrder(node.right, callback, result);
            result.push(callback ? callback(node) : node.data);
        }
    }

    height(node) {
        if (!node) {
            return -1; // Height of an empty tree is -1
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (!node) {
            return -1; // Depth of a null node is -1
        }

        return this.calculateDepth(node, 0);
    }

    calculateDepth(node, currentDepth) {
        if (!node) {
            return currentDepth - 1;
        }

        return this.calculateDepth(node.parent, currentDepth + 1);
    }
    isBalanced() {
        return this.checkBalanced(this.root) !== -1;
    }

    checkBalanced(node) {
        if (!node) {
            return 0; // Height of an empty tree is 0
        }

        const leftHeight = this.checkBalanced(node.left);
        const rightHeight = this.checkBalanced(node.right);

        // If any subtree is unbalanced, propagate the unbalanced status
        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        // Return the height of the current subtree
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
