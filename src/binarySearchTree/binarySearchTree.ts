type BSTNodeType = BSTnode | null;

export class BSTnode {
    data: number;
    leftNode: BSTNodeType = null;
    rightNode: BSTNodeType = null;

    constructor(data: number){
        this.data = data;
    }
}

type NodeConstraintType = {
    node: BSTNodeType;
    lowConstraint: number;
    highConstraint: number
}

/**
 * BINARY SEARCH TREE
 */
export class BinarySearchTree {
    root: BSTNodeType = null;
    nodeCount: number = 0;

    constructor() {}

    // - insert node into tree
    insert(value: number, rootNode: BSTNodeType = this.root): BSTnode {
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
    printValues(root: BSTNodeType = this.root){
        if(root === null)
            return;

        this.printValues(root.leftNode);
        console.log(root.data);
        this.printValues(root.rightNode);

    }

    deleteTree(){
        this.root = null;
        return this.nodeCount = 0;

    }

    // - returns true if given value exists in the tree
    isInTree(value: number, root: BSTNodeType = this.root): boolean {
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
    getHeight(root: BSTNodeType = this.root): number {
        if(root === null)
            return 0;

        let leftHeight = this.getHeight(root.leftNode);
        let rightHeight = this.getHeight(root.rightNode);

        return Math.max(leftHeight, rightHeight) + 1;

    }

    // - returns the minimum value stored in the tree
    getMin(root: BSTNodeType = this.root): number | null {
        if(root === null)
            return null;
        
        if(root.leftNode !== null)
           return this.getMin(root.leftNode);
        
        return root.data;

    }

    // - returns the maximum value stored in the tree
    getMax(root: BSTNodeType = this.root): number | null {
        if(root === null)
            return null;

        if(root.rightNode !== null)
            return this.getMax(root.rightNode);
        
        return root.data;

    }

    // - determines if binary tree is a BST, return bool
    isBinarySearchTree(root: BSTNodeType = this.root){
        let queue: NodeConstraintType[] = [];

        queue.push({ node: root, lowConstraint: -Infinity, highConstraint: Infinity })

        while(queue.length > 0){
            let front = queue.shift();

             if(front?.node === null || front?.node === undefined){
                 return true;

             } else {
             
                if(!(front.lowConstraint <= front.node.data) || !(front.highConstraint >= front.node.data))
                    return false;

                queue.push({node: front.node.leftNode, lowConstraint: front.lowConstraint, highConstraint: front.highConstraint})
                queue.push({node: front.node.rightNode, lowConstraint: front.lowConstraint, highConstraint: front.highConstraint})

            }

        }
        
        return true;
        
    }

    deleteValue(value: number){
        //check if a leaf, has 1 child, or has 2 children
        if(this.root === null)
            return -1;

    }

    // - returns next-highest value in tree after given value, -1 if none
    getSuccessor(value: number){}

    // - returns previous-highest value in tree before given value, -1 if none
    getPredecessor(value: number){}

}