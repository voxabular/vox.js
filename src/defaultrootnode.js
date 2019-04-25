(function() {

    /**
     * レイヤー構造に対応していないvoxファイルのデフォルトノード
     */
    vox.defaultRootNode = function(voxel) {
        return {
            type: 'transform',
            nodeId: -1,
            nodeAttributes: {
                name: '',
                hidden: 0
            },
            childNodeId: 1,
            childNode: {
                type: 'group',
                nodeId: 1,
                nodeAttributes: {},
                childNodeIds: [2],
                childNodes: [{
                    type: 'transform',
                    nodeId: 2,
                    nodeAttributes: {
                        name: '',
                        hidden: 0
                    },
                    childNodeId: 3,
                    childNode: {
                        type: 'shape',
                        nodeId: 3,
                        nodeAttributes: {},
                        modelId: 0,
                        modelAttributes: {
                            size: voxel.size,
                            voxels: voxel.voxels
                        }
                    },
                    layerId: -1,
                    frameAttributes: {}
                }]
            },
            layerId: -1,
            frameAttributes: {}
        };
    }
})();
