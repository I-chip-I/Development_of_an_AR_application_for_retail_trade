import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ModelManager
{
    decorationModel = null;
    loader = new GLTFLoader();
    modelPath = null;
    displacement = null;
    modelScale = null;

    constructor()
    {
        this.loadNewModel();
    }

    loadNewModel()
    {
        this.getModelParameters();
        this.loader.load( this.modelPath, (gltf) => { this.decorationModel = gltf.scene; });
    }

    getModelParameters()
    {
        this.modelPath = './Models_and_tools/origami_paper_crane_on_string.glb'
        this.displacement = 2;
        this.modelScale = 0.5;
    }

    createNewCopy()
    {
        return this.decorationModel.clone();
    }
}