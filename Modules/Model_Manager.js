import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ModelManager
{
    decorationModel = null;
    loader = new GLTFLoader();

    constructor( filePath )
    {
        this.loadNewModel( filePath );
    }

    loadNewModel( filePath )
    {
        this.loader.load( filePath, (gltf) => { this.decorationModel = gltf.scene; });
    }

    createNewCopy()
    {
        return this.decorationModel.clone();
    }
}