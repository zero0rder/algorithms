export class BSTnode {
    data: number;
    leftNode: BSTnode | null = null;
    rightNode: BSTnode | null = null;

    constructor(data: number){
        this.data = data;
    }
}

/**
 * BINARY SEARCH TREE
 */
export class BinarySearchTree {
    root: BSTnode | null = null;
    nodeCount: number = 0;

    constructor() {}

    // - insert node into tree
    insert(value: number, rootNode: BSTnode | null = this.root): BSTnode {
        let newNode = new BSTnode(value);
        
        if(rootNode === null){
            if(this.nodeCount <= 0){
                this.root = rootNode = newNode;
            } else {
                rootNode = newNode;
            }

            this.nodeCount++;

        } else if(value <= rootNode.data){
            //recurse left until ptr falls off the tree
            rootNode.leftNode = this.insert(value, rootNode.leftNode);

        } else {
            //recurse right until ptr falls off the tree
            rootNode.rightNode = this.insert(value, rootNode.rightNode);
            
        }

        return rootNode;
        
    }

    getNodeCount(): number {
        return this.nodeCount;
    }

    // - prints values from min to max (Inorder Traversal)
    printValues(root: BSTnode | null = this.root){

        if(root === null){
            return;
        }

        this.printValues(root.leftNode);
        console.log(root.data);
        this.printValues(root.rightNode);
        
    }

    deleteTree(){
        this.root = null;
        return this.nodeCount = 0;
    }

    // - returns true if given value exists in the tree
    isInTree(value: number, root: BSTnode | null = this.root): boolean {
        if(root === null)
            return false;

        if(value === root.data)
            return true;


        if(value <= root.data){
            return this.isInTree(value, root.leftNode);
        } else {
            return this.isInTree(value, root.rightNode);
        }

    }

    // - returns the height in nodes (single node's height is 1)
    getHeight(root: BSTnode | null = this.root): number {
        if(root === null)
            return -1;

        let leftHeight = this.getHeight(root.leftNode);
        let rightHeight = this.getHeight(root.rightNode);
        console.log(leftHeight, rightHeight)
        return Math.max(leftHeight, rightHeight) + 1;

    }

    // - returns the minimum value stored in the tree
    getMin(){

    }

    // - returns the maximum value stored in the tree
    getMax(){

    }

    isBinarySearchTree(){

    }

    deleteValue(value: number){

    }

    // - returns next-highest value in tree after given value, -1 if none
    getSuccessor(value: number){

    }

    // - returns previous-highest value in tree before given value, -1 if none
    getPredecessor(value: number){

    }

}