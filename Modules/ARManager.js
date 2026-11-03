import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';

export class ARManager
{
    sceneManager = null;
    modelManager = null;
    mark = new THREE.Mesh(
        new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
        new THREE.MeshBasicMaterial()
    );
    controller1 = null;
    controller2 = null;
    hitTestSource = null;
    hitTestSourceRequested = false;
    lastMarkPosition = new THREE.Vector3();
    lastMarkQuaternion = new THREE.Quaternion();
    firstHit = true;

    constructor( sceneManager, modelManager )
    {
        this.sceneManager = sceneManager;
        this.modelManager = modelManager;
        this.controller1 = this.sceneManager.renderer.xr.getController( 0 );
        this.controller2 = this.sceneManager.renderer.xr.getController( 1 );
    }

    addNewObject()
    {
        if ( this.mark.visible && this.modelManager.decorationModel != null ) 
        { 
            const decorationObject = this.modelManager.createNewCopy();
                            
            this.mark.matrix.decompose( decorationObject.position, decorationObject.quaternion, decorationObject.scale );

            const displacement = 2;
            const modelScale = 0.5;
    
            decorationObject.position.y = displacement;
            decorationObject.scale.set( modelScale, modelScale, modelScale );
    
            this.sceneManager.scene.add( decorationObject );
        }
    }

    init()
    {
        document.body.appendChild( ARButton.createButton( this.sceneManager.renderer, { requiredFeatures: [ 'hit-test' ] } ) );
    
        this.sceneManager.renderer.setAnimationLoop( this.animate.bind( this ) );

        this.controller1.addEventListener( 'select', this.addNewObject.bind( this ) );
        this.sceneManager.scene.add( this.controller1 );
    
        this.controller2.addEventListener( 'select', this.addNewObject.bind( this ) );
        this.sceneManager.scene.add( this.controller2 );
    
        this.mark.matrixAutoUpdate = false;
        this.mark.visible = false;
        this.sceneManager.scene.add( this.mark );
    }

    processHitTestResult( frame, referenceSpace )
    {
        const hitTestResults = frame.getHitTestResults( this.hitTestSource );

		if ( hitTestResults.length ) 
        {
			const hit = hitTestResults[ 0 ];

			const newMatrix = new THREE.Matrix4().fromArray( hit.getPose( referenceSpace ).transform.matrix );
			const newPosition = new THREE.Vector3();
			const newQuaternion = new THREE.Quaternion();
			newMatrix.decompose( newPosition, newQuaternion, new THREE.Vector3() );

			const surfaceNormal = new THREE.Vector3( 0, 1, 0 ).applyQuaternion( newQuaternion );

			if ( Math.abs( surfaceNormal.y ) > 0.7)
            {
				if ( this.firstHit == true )
                {
					this.lastMarkPosition.copy( newPosition );
					this.lastMarkQuaternion.copy( newQuaternion );
					this.firstHit = false;
				}
				else
				{
					this.lastMarkPosition.lerp( newPosition, 0.15 );
					this.lastMarkQuaternion.slerp( newQuaternion, 0.15 );
				}

				this.mark.matrix.compose( this.lastMarkPosition, this.lastMarkQuaternion, new THREE.Vector3( 1, 1, 1 ) );
				this.mark.visible = true;
			}
			else
			{
				this.mark.visible = false;
			}
        }
        else
        {
			this.mark.visible = false;
			this.firstHit = true;
		}
    }

    animate( timestamp, frame ) 
    {

	    if ( frame ) 
        {

		    const referenceSpace = this.sceneManager.renderer.xr.getReferenceSpace();
		    const session = this.sceneManager.renderer.xr.getSession();

		    if ( this.hitTestSourceRequested === false )
            {
			    session.requestReferenceSpace( 'viewer' ).then( ( referenceSpace ) =>
                {
                    session.requestHitTestSource( { space: referenceSpace } ).then( ( source ) =>
                    {
				        this.hitTestSource = source;
			        } );
			    } );

			    session.addEventListener( 'end', () =>
                {
				    this.hitTestSourceRequested = false;
				    this.hitTestSource = null;
			    } );

			    this.hitTestSourceRequested = true;
		    }

		    if ( this.hitTestSource ) 
            {
		        this.processHitTestResult( frame, referenceSpace );
		    }

	    }

        this.sceneManager.render();
    }
}