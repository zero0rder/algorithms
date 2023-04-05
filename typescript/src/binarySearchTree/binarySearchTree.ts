type BSTNodeType = BSTnode | null;

type NodeConstraintType = {
    node: BSTNodeType;
    lowConstraint: number;
    highConstraint: number;
}

export class BSTnode {
    data: number;
    leftNode: BSTNodeType = null;
    rightNode: BSTNodeType = null;

    constructor(data: number){
        this.data = data;
    }
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
        if(rootNode === null){
            const newNode = new BSTnode(value);
            this.nodeCount <= 0 
                ? this.root = rootNode = newNode
                : rootNode = newNode;
        
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
    printValues(root: BSTNodeType = this.root): void {
        if(root === null)
            return;

        this.printValues(root.leftNode);
        console.log(root.data);
        this.printValues(root.rightNode);

    }

    deleteTree(): number {
        this.root = null;
        return this.nodeCount = 0;
    }

    // - returns true if given value exists in the tree
    isInTree(value: number, root: BSTNodeType = this.root): boolean {
        if(root === null){
            return false;
        } else if(value === root.data){
            return true;
        }

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

        const leftHeight = this.getHeight(root.leftNode);
        const rightHeight = this.getHeight(root.rightNode);

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
    isBinarySearchTree(root: BSTNodeType = this.root): boolean {
        const queue: NodeConstraintType[] = [];

        queue.push({ node: root, lowConstraint: -Infinity, highConstraint: Infinity });

        while(queue.length > 0){
            const front = queue.shift();

            if(front?.node === null || front?.node === undefined){
                return true;
            } else {
                if(!(front.lowConstraint <= front.node.data) || !(front.highConstraint >= front.node.data))
                    return false;

                queue.push({node: front.node.leftNode, lowConstraint: front.lowConstraint, highConstraint: front.node.data})
                queue.push({node: front.node.rightNode, lowConstraint: front.node.data, highConstraint: front.highConstraint})

            }

        }
        
        return true;
        
    }

    delete(value: number, root: BSTNodeType = this.root): BSTNodeType {
        if(root === null)
            return root;

        if(root.data > value){
            // not found yet, keep travesing left
            root.leftNode = this.delete(value, root.leftNode);
        } else if(root.data < value){
            // not found yet, keep travesing right
            root.rightNode = this.delete(value, root.rightNode);
        } else { 
            if(root.leftNode === null && root.rightNode === null){
                // found the node... if no children just remove pointer to current node
                root = null;
            } else if (root.leftNode === null){ 
                // if node has 1 child then make node's parent point to that only child node, removing pointer to current node
                root = root.rightNode;
            } else if (root.rightNode === null) {
                root = root.leftNode;
            } else {
                // if node has 2 children.. 
                // find min in right subtree and swap w current root (it'll be greater than <left subT> and less than <right subT> satisfying BST Prop)
                // then delete the leaf which is now the previous root
                const minNode = this.findMin(root.rightNode);
                if(minNode?.data !== undefined){
                    root.data = minNode?.data;
                    root.rightNode = this.delete(minNode?.data, root.rightNode);
                }
            }
        }

        return root;
    }

    // - returns next-highest value in tree after given value (InOrder)
    getSuccessor(value: number, root: BSTNodeType = this.root): BSTNodeType | undefined {
        //returns a pointer to node w/ specified value -> O(h) 
        const currNode = this.find(root, value);
        if(currNode === null)
            return null;

        //case 1: node has a right subtree -> find min in right subtree
        if(currNode.rightNode !== null){
            return this.findMin(currNode.rightNode); // O(h)
        } else {
            //case 2: node doesn't have a right subtree ->  go to nearest ancestor, for which given node would be in left subtree
            let successor = null;
            let ancestor = root;

            while(ancestor !== currNode){
                if(ancestor?.data !== undefined)
                    if(currNode.data < ancestor?.data){
                        successor = ancestor;
                        ancestor = ancestor.leftNode; // check to see of you can find a deeper node with this property
                    } else {
                        ancestor = ancestor.rightNode;
                    }

            }

            return successor; // not all nodes have a successor (e.g. max node)

        }
         
    }

    // - returns previous-highest value in tree before given value (InOrder)
    getPredecessor(value: number, root: BSTNodeType = this.root): BSTNodeType | undefined {
        // returns a pointer to node w/ specified value -> O(h) 
        const currNode = this.find(root, value);
        if(currNode === null)
            return null;

        // case 1: node has a left subtree -> find max in left subtree
        if(currNode.leftNode !== null){
            return this.findMax(currNode.leftNode)
        } else {
            //case 2: node doesn't have a left subtree ->  go to nearest ancestor, for which given node would be in right subtree
            let predecessor = null;
            let ancestor = root;

            while(ancestor !== currNode){
                if(ancestor?.data !== undefined)
                    if(currNode.data > ancestor?.data){
                        predecessor = ancestor;
                        ancestor = ancestor.rightNode; // check to see of you can find a deeper node with this property
                    } else {
                        ancestor = ancestor.leftNode;
                    }

            }

            return predecessor; // not all nodes have a predecessor (e.g. max node)
        }
    }
    
    private findMin(root: BSTNodeType): BSTNodeType {
        if(root === null)
            return root;

        if(root.leftNode !== null)
           return this.findMin(root.leftNode);

        return root;
    }

    private findMax(root: BSTNodeType): BSTNodeType {
        if(root === null)
            return root;

        if(root.rightNode !== null)
           return this.findMax(root.rightNode);

        return root;
    }

    private find(root: BSTNodeType, data: number): BSTNodeType {
        if(root === null)
            return null;

        if(data === root.data)
            return root;


        if(data <= root.data){
            return this.find(root.leftNode, data);
        } else {
            return this.find(root.rightNode, data);
        }

    }
}