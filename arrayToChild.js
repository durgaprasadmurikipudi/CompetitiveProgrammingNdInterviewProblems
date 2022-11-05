/**
 * Written by M: Durga Prasad @https://github.com/durgaprasadmurikipudi
 * Given tree input in form of array where each element in array is a node in tree and each node contains information about child and parents.
 * Construct the tree.
 * Example Input:
 * {
    1: {
        name: 1,
        parent: undefined,
        children: [2, 3]
    }, 
    2: {
        name: 2,
        parent: 1,
        children: [4]
    },
    3: {
        name: 3,
        parent: 1,
        children: [5, 6]
    },
    4: {
        name: 4,
        parent: 2,
        children: []
    },
    5: {
        name: 5,
        parent: 3,
        children: [7]
    },
    6: {
        name: 6,
        parent: 3,
        children: []
    },
    7: {
        name: 7,
        parent: 5,
        children: []
    },
    8: {
        name: 8,
        parent: undefined,
        children: [9],
    },
    9: {
        name: 9,
        parent: 8,
        children: []
    }
}
 */

const getObjEntity = (name, parent) => {
    return {
        name,
        parent,
        children: []
    }
}

const pushToChild = (data, parentOld, parentNew) => {
    parentOld.children.forEach(childId => {
        const ref = getObjEntity( data[childId].name, data[childId].parent)
        parentNew.children.push(ref);
        pushToChild(data, data[childId], ref)
    });
}

const dataToArry = data => {
    const res = [];

    for(let key of Object.keys(data)) {
        if(!data[key].parent) {
            const parent = getObjEntity(data[key].name, data[key].parent)
            
            res.push(parent);

            pushToChild(data, data[key], parent);
        }
    }

    //console.log(JSON.stringify(res, null, 4));
    return res;
}

/**
Example Invocation: 

dataToArry({
    1: {
        name: 1,
        parent: undefined,
        children: [2, 3]
    }, 
    2: {
        name: 2,
        parent: 1,
        children: [4]
    },
    3: {
        name: 3,
        parent: 1,
        children: [5, 6]
    },
    4: {
        name: 4,
        parent: 2,
        children: []
    },
    5: {
        name: 5,
        parent: 3,
        children: [7]
    },
    6: {
        name: 6,
        parent: 3,
        children: []
    },
    7: {
        name: 7,
        parent: 5,
        children: []
    },
    8: {
        name: 8,
        parent: undefined,
        children: [9],
    },
    9: {
        name: 9,
        parent: 8,
        children: []
    }
});

**/

/**
 * 
 * Output: 
[
    {
        "name": 1,
        "children": [
            {
                "name": 2,
                "parent": 1,
                "children": [
                    {
                        "name": 4,
                        "parent": 2,
                        "children": []
                    }
                ]
            },
            {
                "name": 3,
                "parent": 1,
                "children": [
                    {
                        "name": 5,
                        "parent": 3,
                        "children": [
                            {
                                "name": 7,
                                "parent": 5,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": 6,
                        "parent": 3,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": 8,
        "children": [
            {
                "name": 9,
                "parent": 8,
                "children": []
            }
        ]
    }
]
 */