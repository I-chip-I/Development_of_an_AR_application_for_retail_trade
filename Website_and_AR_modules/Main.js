import { ARManager } from './ARManager.js';
import { ModelManager } from './ModelManager.js';
import { SceneManager } from './SceneManager.js';
import { UIManager } from './UIManager.js';

const uiManager = new UIManager( rebootSystem );
const sceneManager = new SceneManager();
const modelManager = new ModelManager();
const arManager = new ARManager( uiManager, sceneManager, modelManager, rebootSystem );

uiManager.init();
arManager.init();

function onWindowResize() 
{
	sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
	sceneManager.camera.updateProjectionMatrix();
	sceneManager.renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize );

function rebootSystem()
{
    sceneManager.resetModule();
    arManager.resetModule();
}