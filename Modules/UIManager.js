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

        this.arManager.init(); 
    }

    changeARbuttondesign( AR_button )
    {
        AR_button.style.backgroundColor = '#1a3079';
        AR_button.style.color = 'white';
        AR_button.style.border = 'none';
        AR_button.style.borderRadius = '12px';
        AR_button.style.fontWeight = '600';
        AR_button.style.whiteSpace = 'nowrap';
        AR_button.style.display = 'block';
        AR_button.style.width = '90%';
        AR_button.style.padding = '16px';
        AR_button.style.boxSizing = 'border-box';
        AR_button.style.position = 'relative';
        AR_button.style.margin = '0';
        AR_button.style.left = '50%';
        AR_button.style.right = 'auto';
        AR_button.style.top = 'auto';
        AR_button.style.bottom = 'auto';
        AR_button.style.transform = 'none';
    }

    closeProductCardPage()
    {
        this.productCardPage.classList.add( "hidden" );
        this.cataloguePage.classList.remove( "hidden" );

        const session = this.sceneManager.renderer.xr.getSession();
        if ( session )
        {
            session.end();
        }
    }
}