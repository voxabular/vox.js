(function() {

    /**
     * @constructor
     * @property {Object} size {x, y, z}
     * @property {Array} voxels [{x, y, z, colorIndex}...]
     * @property {Array} palette [{r, g, b, a}...]
     */
    vox.VoxelData = function() {
        this.palette = [];
        this.rootNode = [];

        this.anim = [{
            size: null,
            voxels: [],
        }];

        this.transform = [];
        this.group = [];
        this.shape = [];
    };
    
})();
