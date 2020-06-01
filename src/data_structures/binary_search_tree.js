class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {
    if (this._root === undefined){
      this._root = new this.Node({key, value});
      this._count++;
      return this._root;
    }
    var currentNode = this._root;
    var parent = null;

    while (currentNode) {
      if (key < currentNode.key) {
        parent = currentNode;

        if (currentNode.left){
          currentNode = currentNode.left;
        }
        else {
          currentNode.left = new this.Node({key, value, parent});
          this._count++;
          return currentNode.left;
        }

      } else if (key > currentNode.key) {
        parent = currentNode;

        if (currentNode.right){
          currentNode = currentNode.right;
        }
        else {
          currentNode.right = new this.Node({key, value, parent});
          this._count++;
          return currentNode.right;
        }
      } else {
        currentNode.value = value;
        return currentNode;
      }
    }
  }

  lookup(key){
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {
    let deletedNode = this._deleteNode(key);
    this._count--;
    if(deletedNode == undefined){return undefined};

    return deletedNode.value;
  }

  _deleteNode(key) {
    let parent;
    let currentNode = this._root;

    while(currentNode && currentNode.key != key){
      parent = currentNode;

      if (key < currentNode.key){
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if(!currentNode){
      return currentNode;
    }
    // If node has no children
    if (!currentNode.left && !currentNode.right){
      if(currentNode != this._root){
        if(parent.left == currentNode){
          parent.left = undefined;
        } else {
          parent.right = undefined;
        }
      } else {
        this.root = undefined;
      }
    // If node has two children
    } else if(currentNode.left && currentNode.right){
        let replacement;
        while(currentNode.left){
          currentNode = currentNode.left;
      }
      replacement = currentNode;
      _deleteNode(replacement.key)
      currentNode.key = replacement.key;
    // If node has one child
    } else {
      let child;

      if(currentNode.left){
        child = currentNode.left;
      } else {
        child = currentNode.right;
      }

      if (currentNode != this._root){
        if (currentNode == parent.left){
          parent.left = child;
        } else {
          parent.right = child;
        }
      } else {
        this._root = child;
      }
    }
    return currentNode;
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;
