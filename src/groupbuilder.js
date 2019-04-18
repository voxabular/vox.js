(function() {

    /**
     * @constructor
     *
     * @param {vox.VoxelData.rootNode} rootNode
     * @param {Object=} param
     * @param {number=} param.voxelSize ボクセルの大きさ. default = 1.0.
     * @param {boolean=} param.vertexColor 頂点色を使用する. default = false.
     * @param {boolean=} param.optimizeFaces 隠れた頂点／面を削除する. dafalue = true.
     * @param {boolean=} param.originToBottom 地面の高さを形状の中心にする. dafalue = true.
     */
    vox.GroupBuilder = function(rootNode, palette, param) {
        this.rootNode = rootNode;
        this.palette = palette;
        this.param = param;
    };

    vox.GroupBuilder.prototype.createGroup = function() {
        return getModel(this.rootNode, null, this.palette, this.param);
    };

    /**
     * @return {THREE.Texture}
     */
    vox.GroupBuilder.prototype.getTexture = function() {
        return vox.MeshBuilder.textureFactory.getTexture(this.palette);
    };

    var getModel = function(currentNode, parentNode, palette, meshBuilderParam) {
        // TODO: layerのデータを使ってhiddenを設定する
        // 親transformがhiddenだったらその時点でデータはレンダリングしないようにする
        switch (currentNode.type) {
            case 'transform':
                return getModel(currentNode.childNode, currentNode, palette, meshBuilderParam);
            case 'group':
                const boxes = new THREE.Group();
                currentNode.childNodes.forEach(function(node) {
                    boxes.add(getModel(node, currentNode, palette, meshBuilderParam));
                });
                boxes.rotation.set(parentNode.frameAttributes.rotation.x, parentNode.frameAttributes.rotation.y, parentNode.frameAttributes.rotation.z);
                boxes.position.set(parentNode.frameAttributes.translation.x, parentNode.frameAttributes.translation.y, - parentNode.frameAttributes.translation.z);
                return boxes;
            case 'shape':
                const builder = new vox.MeshBuilder(currentNode.modelAttributes, palette, meshBuilderParam);
                const mesh = builder.createMesh();

                mesh.geometry.computeBoundingBox();
                const middle = new THREE.Vector3();
                middle.x = (mesh.geometry.boundingBox.max.x + mesh.geometry.boundingBox.min.x) / 2;
                middle.y = (mesh.geometry.boundingBox.max.y + mesh.geometry.boundingBox.min.y) / 2;
                middle.z = (mesh.geometry.boundingBox.max.z + mesh.geometry.boundingBox.min.z) / 2;
                mesh.position.set( middle.x, middle.y, middle.z );
                mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation( - middle.x, - middle.y, - middle.z ) );

                mesh.rotation.set(parentNode.frameAttributes.rotation.x, parentNode.frameAttributes.rotation.y, parentNode.frameAttributes.rotation.z);
                mesh.position.set(parentNode.frameAttributes.translation.x, parentNode.frameAttributes.translation.y, - parentNode.frameAttributes.translation.z);
                return mesh;
        }
    };

})();
