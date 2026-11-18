export class UIManager
{
    sceneManager = null;
    modelManager = null;
    arManager = null;
    cataloguePage = document.getElementById( 'catalogue-page' );
    catalogueGrid = document.getElementById( 'catalogue-grid' );
    productCardPage = document.getElementById( 'product-card-page' );
    productCardTitle = document.getElementById( 'product-card-title' );

    constructor( sceneManager, modelManager, arManager )
    {
        this.sceneManager = sceneManager;
        this.modelManager = modelManager;
        this.arManager = arManager;
    }

    init()
    {
        this.catalogueGrid.addEventListener( 'click', ( event ) =>
        {
            const chosenCard = event.target.closest( '.product-card' );
            
            if ( chosenCard )
            {
                const cardName = chosenCard.querySelector( '.catalogue-product-title' ).innerText;
                
                this.openProductCardPage( cardName );
            }
        } );

        document.getElementById( 'close-button' ).addEventListener( 'click', () =>
        {
            this.closeProductCardPage();
        } );
    }

    openProductCardPage( cardName )
    {
        this.cataloguePage.classList.add( "hidden" );
        this.productCardPage.classList.remove( "hidden" );
        this.productCardTitle.innerText = cardName;
    }

    changeARButtonDesign( arButton )
    {
        arButton.style.backgroundColor = '#1a3079';
        arButton.style.color = 'white';
        arButton.style.border = 'none';
        arButton.style.borderRadius = '12px';
        arButton.style.fontWeight = '600';
        arButton.style.whiteSpace = 'nowrap';
        arButton.style.display = 'block';
        arButton.style.width = '90%';
        arButton.style.padding = '16px';
        arButton.style.boxSizing = 'border-box';
        arButton.style.position = 'relative';
        arButton.style.margin = '0';
        arButton.style.left = '50%';
        arButton.style.right = 'auto';
        arButton.style.top = 'auto';
        arButton.style.bottom = 'auto';
        arButton.style.transform = 'none';
    }

    endARSession()
    {
        this.sceneManager.resetModule();
        this.arManager.resetModule();
    }

    closeProductCardPage()
    {
        this.productCardPage.classList.add( "hidden" );
        this.cataloguePage.classList.remove( "hidden" );

        this.sceneManager.resetModule();
        this.arManager.resetModule();
    }
}