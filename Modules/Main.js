import { SceneManager } from './Scene_Manager.js';
import { ModelManager } from './Model_Manager.js';
import { ARManager } from './ARManager.js';

const sceneManager = new SceneManager();
const modelManager = new ModelManager();
const arManager = new ARManager( sceneManager, modelManager );

arManager.init();

function onWindowResize() 
{
	sceneManager.camera.aspect = window.innerWidth / window.innerHeight;
	sceneManager.camera.updateProjectionMatrix();
	sceneManager.renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize );