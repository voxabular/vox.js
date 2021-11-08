export declare interface Color {
    ///[0..255]
    a: number;
    ///[0..255]
    r: number;
    ///[0..255]
    g: number;
    ///[0..255]
    b: number;
}
export declare interface Voxel {
    x: number,
    y: number,
    z: number,
    colorIndex: number
}
export declare interface Layer {
    layerId: number,
    layerAttributes: any,
}

export declare interface VoxVector3 {
    x: number,
    y: number,
    z: number
}

export declare interface VoxNodeBase {
    nodeId: number
    layerId: number
    nodeAtttributes: any
}
export declare interface Transform extends VoxNodeBase {
    type: 'transform',
    frameAttributes: {
        rotation: VoxVector3,
        translation: VoxVector3
    }
    childNode: VoxNode
}


export declare interface Group extends VoxNodeBase {
    type: 'group'
    childNodeIds: number[]
    childNodes: VoxNode[]
}

export declare interface Shape extends VoxNodeBase {
    type: 'shape'
    modelAttributes: {
        voxels: Array<Voxel>; // voxel position and color data
        size: { x: number, y: number, z: number }; // model size
    }
}
export declare type VoxNode = Transform | Group | Shape


export declare interface ParseResult {
    layer: Layer[];
    rootNode: VoxNode;
    palette: Array<Color>; // palette data
}


export declare interface SimpleVoxData {
    palette: Color[];
    voxels: Voxel[];
    size: {
        x: number;
        y: number;
        z: number;
    };
}

export declare class Parser {
    parse(url: string): Promise<ParseResult>
    parseUint8Array(array: Uint8Array, callback: (error: any, result: ParseResult) => void): void
}
